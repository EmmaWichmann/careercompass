(function () {
  const params = new URLSearchParams(window.location.search);
  const language = params.get("language") || "html";
  const examNumber = Math.min(10, Math.max(1, Number(params.get("exam")) || 1));
  const exam = window.CodingHubExamData.getExam(language, examNumber);

  const intro = document.getElementById("exam-intro");
  const examShell = document.getElementById("exam-shell");
  const results = document.getElementById("exam-results");
  const startButton = document.getElementById("start-exam");
  const submitButton = document.getElementById("submit-answer");
  const nextButton = document.getElementById("next-question");
  const retakeButton = document.getElementById("retake-exam");
  const title = document.getElementById("exam-title");
  const description = document.getElementById("exam-description");
  const questionCount = document.getElementById("question-count");
  const timer = document.getElementById("exam-timer");
  const questionLabel = document.getElementById("question-label");
  const questionTopic = document.getElementById("question-topic");
  const questionText = document.getElementById("question-text");
  const answers = document.getElementById("answers");
  const feedback = document.getElementById("feedback");
  const progress = document.getElementById("question-progress");
  const score = document.getElementById("result-score");
  const resultMessage = document.getElementById("result-message");
  const missedList = document.getElementById("missed-list");

  let index = 0;
  let correctCount = 0;
  let selectedAnswer = "";
  let answered = false;
  let startedAt = null;
  let timerId = null;
  const responses = [];

  title.textContent = exam.languageName + " Exam " + exam.examNumber + ": " + exam.title;
  description.textContent = exam.description + ".";
  questionCount.textContent = exam.questions.length;

  startButton.addEventListener("click", startExam);
  submitButton.addEventListener("click", submitAnswer);
  nextButton.addEventListener("click", nextQuestion);
  retakeButton.addEventListener("click", function () {
    window.location.reload();
  });

  function startExam() {
    startedAt = Date.now();
    intro.hidden = true;
    examShell.hidden = false;
    renderQuestion();
    timerId = window.setInterval(updateTimer, 1000);
    updateTimer();
  }

  function renderQuestion() {
    const question = exam.questions[index];
    selectedAnswer = "";
    answered = false;
    answers.innerHTML = "";
    feedback.textContent = "Choose an answer, then check it.";
    feedback.className = "feedback";
    submitButton.disabled = false;
    nextButton.disabled = true;
    questionLabel.textContent = "Question " + (index + 1) + " of " + exam.questions.length;
    questionTopic.textContent = question.topic;
    questionText.textContent = question.prompt;
    progress.style.width = Math.round((index / exam.questions.length) * 100) + "%";

    if (question.type === "fill") {
      const input = document.createElement("input");
      input.className = "text-answer";
      input.id = "text-answer";
      input.autocomplete = "off";
      input.placeholder = "Type the missing answer";
      input.addEventListener("input", function () {
        selectedAnswer = input.value;
      });
      answers.append(input);
      return;
    }

    question.options.forEach(function (option) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "answer-option";
      button.textContent = option;
      button.addEventListener("click", function () {
        if (answered) {
          return;
        }
        selectedAnswer = option;
        answers.querySelectorAll(".answer-option").forEach(function (item) {
          item.classList.remove("selected");
        });
        button.classList.add("selected");
      });
      answers.append(button);
    });
  }

  function submitAnswer() {
    if (answered) {
      return;
    }

    if (!selectedAnswer.trim()) {
      feedback.textContent = "Add an answer first.";
      return;
    }

    answered = true;
    const question = exam.questions[index];
    const isCorrect = normalize(selectedAnswer) === normalize(question.answer);
    if (isCorrect) {
      correctCount += 1;
      feedback.textContent = "Correct. " + question.explanation;
      feedback.className = "feedback correct";
    } else {
      feedback.textContent =
        "Not quite. The answer is " + question.answer + ". " + question.explanation;
      feedback.className = "feedback incorrect";
      window.CodingHubStorage.addMissedCard(
        question,
        exam.languageName,
        "Exam " + exam.examNumber
      );
    }

    responses.push({
      topic: question.topic,
      isCorrect: isCorrect,
    });
    markAnswers(question, isCorrect);
    submitButton.disabled = true;
    nextButton.disabled = false;
  }

  function markAnswers(question, isCorrect) {
    if (question.type === "fill") {
      const input = document.getElementById("text-answer");
      input.classList.add(isCorrect ? "correct" : "incorrect");
      input.disabled = true;
      return;
    }

    answers.querySelectorAll(".answer-option").forEach(function (button) {
      button.disabled = true;
      if (normalize(button.textContent) === normalize(question.answer)) {
        button.classList.add("correct");
      } else if (button.classList.contains("selected")) {
        button.classList.add("incorrect");
      }
    });
  }

  function nextQuestion() {
    index += 1;
    if (index >= exam.questions.length) {
      finishExam();
      return;
    }
    renderQuestion();
  }

  function finishExam() {
    window.clearInterval(timerId);
    examShell.hidden = true;
    results.hidden = false;
    progress.style.width = "100%";

    const percent = Math.round((correctCount / exam.questions.length) * 100);
    const passed = percent >= exam.passingPercent;
    const missedTopics = Array.from(
      new Set(
        responses
          .filter(function (response) {
            return !response.isCorrect;
          })
          .map(function (response) {
            return response.topic;
          })
      )
    );
    const elapsedSeconds = Math.round((Date.now() - startedAt) / 1000);

    score.textContent = percent + "%";
    resultMessage.textContent = passed
      ? "You passed. This exam is now marked complete."
      : "Keep going. Review the missed topics, then retake this exam.";
    missedList.textContent =
      missedTopics.length === 0 ? "No missed topics." : missedTopics.join(", ");

    window.CodingHubStorage.saveExamAttempt({
      type: "exam",
      date: new Date().toISOString(),
      language: exam.language,
      languageName: exam.languageName,
      examNumber: exam.examNumber,
      examTitle: exam.title,
      score: correctCount,
      total: exam.questions.length,
      percent: percent,
      passed: passed,
      timeSeconds: elapsedSeconds,
      missedTopics: missedTopics,
    });
  }

  function updateTimer() {
    const seconds = Math.floor((Date.now() - startedAt) / 1000);
    const minutesPart = String(Math.floor(seconds / 60)).padStart(2, "0");
    const secondsPart = String(seconds % 60).padStart(2, "0");
    timer.textContent = minutesPart + ":" + secondsPart;
  }

  function normalize(value) {
    return value.trim().toLowerCase().replace(/\s+/g, " ");
  }
})();
