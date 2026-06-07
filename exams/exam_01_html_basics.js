const questions = [
  {
    prompt: "What does the <button> element create?",
    choices: {
      A: "A heading",
      B: "A clickable button",
      C: "A folder",
      D: "A browser tab",
    },
    correct: "B",
    explanation: "The <button> element creates an interactive button users can click.",
  },
  {
    prompt: "What is the main job of the <p> element?",
    choices: {
      A: "Connect a JavaScript file",
      B: "Create a page heading",
      C: "Create a paragraph",
      D: "Store a CSS color",
    },
    correct: "C",
    explanation: "The <p> element is used for a paragraph of text.",
  },
  {
    prompt: "Why is an <h2> useful after an <h1> on a page?",
    choices: {
      A: "It can label a new section under the main page heading",
      B: "It automatically creates bullet points",
      C: "It turns the page into a form",
      D: "It replaces the need for CSS",
    },
    correct: "A",
    explanation: "An <h2> is commonly used as a section heading under the main <h1>.",
  },
  {
    prompt: "What does a <ul> element do?",
    choices: {
      A: "It creates a text input",
      B: "It groups bullet list items together",
      C: "It creates a clickable link",
      D: "It changes page spacing",
    },
    correct: "B",
    explanation: "A <ul> is an unordered list container for list items.",
  },
  {
    prompt: "What is the purpose of id=\"feedback\" on an element?",
    choices: {
      A: "It makes the text bold by default",
      B: "It gives the browser a new built-in component",
      C: "It lets JavaScript find that specific element later",
      D: "It automatically listens for clicks",
    },
    correct: "C",
    explanation: "An id acts like a unique name tag so JavaScript can target that element.",
  },
  {
    prompt: "What does the <input> element usually give a user?",
    choices: {
      A: "A paragraph",
      B: "A browser tab",
      C: "A place to type",
      D: "A page heading",
    },
    correct: "C",
    explanation: "An <input> usually gives the user a place to enter information.",
  },
  {
    prompt: "Why would you use a <div> in a layout?",
    choices: {
      A: "To group related elements together",
      B: "To create a built-in exam score",
      C: "To automatically style the page",
      D: "To replace every heading",
    },
    correct: "A",
    explanation: "A <div> is a general-purpose container that helps group related elements.",
  },
  {
    prompt: "What does <!DOCTYPE html> tell the browser?",
    choices: {
      A: "This is a CSS file",
      B: "This page should load without text",
      C: "This is an HTML document",
      D: "Open GitHub Pages mode",
    },
    correct: "C",
    explanation: "The doctype tells the browser to interpret the file as an HTML document.",
  },
  {
    prompt: "Why is indentation helpful in HTML?",
    choices: {
      A: "It changes how the browser renders spacing",
      B: "It makes the code easier for humans to read",
      C: "It adds JavaScript automatically",
      D: "It converts list items into buttons",
    },
    correct: "B",
    explanation: "Indentation improves readability by making structure easier to see.",
  },
  {
    prompt: "What is the difference between a <ul> and an <li>?",
    choices: {
      A: "<ul> styles text and <li> runs JavaScript",
      B: "<ul> is one bullet and <li> is the whole list",
      C: "<ul> creates headings and <li> creates paragraphs",
      D: "<ul> holds the list and <li> is one item inside it",
    },
    correct: "D",
    explanation: "A <ul> is the list container, and each <li> is one item inside that list.",
  },
];

const instructions = document.getElementById("instructions");
const startExamButton = document.getElementById("start-exam");
const examShell = document.getElementById("exam-shell");
const resultsShell = document.getElementById("results-shell");
const questionTotal = document.getElementById("question-total");
const timer = document.getElementById("timer");
const questionLabel = document.getElementById("question-label");
const questionText = document.getElementById("question-text");
const answers = document.getElementById("answers");
const feedback = document.getElementById("feedback");
const submitAnswerButton = document.getElementById("submit-answer");
const nextQuestionButton = document.getElementById("next-question");
const scoreLine = document.getElementById("score-line");
const resultsSummary = document.getElementById("results-summary");
const reviewList = document.getElementById("review-list");

let currentQuestionIndex = 0;
let selectedAnswer = "";
let submitted = false;
let score = 0;
let timeRemaining = 8 * 60;
let timerId = null;
const responses = [];

questionTotal.textContent = questions.length;

startExamButton.addEventListener("click", function () {
  instructions.style.display = "none";
  examShell.classList.add("active");
  renderQuestion();
  startTimer();
});

submitAnswerButton.addEventListener("click", function () {
  if (submitted) {
    return;
  }

  if (selectedAnswer === "") {
    feedback.textContent = "Please choose an answer first.";
    feedback.className = "feedback warning";
    return;
  }

  submitted = true;
  const currentQuestion = questions[currentQuestionIndex];
  const isCorrect = selectedAnswer === currentQuestion.correct;

  if (isCorrect) {
    score += 1;
    feedback.textContent = "Correct!";
    feedback.className = "feedback correct";
  } else {
    feedback.textContent = "Incorrect. The correct answer is " + currentQuestion.correct + ".";
    feedback.className = "feedback incorrect";
  }

  responses.push({
    question: currentQuestion.prompt,
    selectedAnswer,
    correctAnswer: currentQuestion.correct,
    explanation: currentQuestion.explanation,
    isCorrect,
  });

  disableAnswerButtons();
  submitAnswerButton.disabled = true;
  nextQuestionButton.disabled = false;
});

nextQuestionButton.addEventListener("click", function () {
  currentQuestionIndex += 1;

  if (currentQuestionIndex >= questions.length) {
    finishExam();
    return;
  }

  selectedAnswer = "";
  submitted = false;
  renderQuestion();
});

function renderQuestion() {
  const currentQuestion = questions[currentQuestionIndex];

  questionLabel.textContent =
    "Question " + (currentQuestionIndex + 1) + " of " + questions.length;
  questionText.textContent = currentQuestion.prompt;
  feedback.textContent = "";
  feedback.className = "feedback";
  submitAnswerButton.disabled = false;
  nextQuestionButton.disabled = true;
  answers.innerHTML = "";

  Object.entries(currentQuestion.choices).forEach(function ([letter, text]) {
    const button = document.createElement("button");
    button.className = "answer-button";
    button.type = "button";
    button.dataset.answer = letter;
    button.textContent = letter + ". " + text;

    button.addEventListener("click", function () {
      if (submitted) {
        return;
      }

      selectedAnswer = letter;

      document.querySelectorAll(".answer-button").forEach(function (answerButton) {
        answerButton.classList.remove("selected");
      });

      button.classList.add("selected");
    });

    answers.append(button);
  });
}

function disableAnswerButtons() {
  document.querySelectorAll(".answer-button").forEach(function (button) {
    button.disabled = true;
  });
}

function startTimer() {
  updateTimer();

  timerId = setInterval(function () {
    timeRemaining -= 1;
    updateTimer();

    if (timeRemaining <= 0) {
      clearInterval(timerId);
      finishExam();
    }
  }, 1000);
}

function updateTimer() {
  const minutes = String(Math.floor(timeRemaining / 60)).padStart(2, "0");
  const seconds = String(timeRemaining % 60).padStart(2, "0");
  timer.textContent = minutes + ":" + seconds;
}

function finishExam() {
  if (timerId) {
    clearInterval(timerId);
  }

  timer.textContent = "Completed";

  examShell.classList.remove("active");
  resultsShell.classList.add("active");

  scoreLine.textContent = "Score: " + score + " / " + questions.length;
  resultsSummary.textContent =
    "You answered " + score + " out of " + questions.length + " questions correctly.";

  reviewList.innerHTML = "";

  responses.forEach(function (response, index) {
    const item = document.createElement("article");
    item.className = "review-item";

    item.innerHTML =
      "<h3>Question " +
      (index + 1) +
      "</h3>" +
      '<div class="review-grid">' +
      "<p><strong>Your answer:</strong> " +
      response.selectedAnswer +
      "</p>" +
      "<p><strong>Correct:</strong> " +
      response.correctAnswer +
      "</p>" +
      "</div>" +
      '<p class="review-explanation"><strong>Why:</strong> ' +
      response.explanation +
      "</p>";

    reviewList.append(item);
  });
}
