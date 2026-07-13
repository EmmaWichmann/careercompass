const questions = [
  {
    prompt: "Why would you use display: grid on a container?",
    choices: {
      A: "To automatically make all text bold",
      B: "To place child elements into rows and columns more deliberately",
      C: "To connect HTML to JavaScript",
      D: "To delete extra spacing between headings",
    },
    correct: "B",
    explanation: "display: grid gives you more control over rows, columns, and how items line up inside a container.",
  },
  {
    prompt: "What is the difference between margin and padding?",
    choices: {
      A: "Margin is outside space, padding is inside space",
      B: "Margin is only for text and padding is only for buttons",
      C: "Padding is outside space, margin is inside space",
      D: "They mean the same thing in CSS",
    },
    correct: "A",
    explanation: "Margin adds space outside an element. Padding adds space inside an element.",
  },
  {
    prompt: "Why is a hero section useful near the top of a page?",
    choices: {
      A: "It stores hidden JavaScript variables",
      B: "It replaces the need for headings and paragraphs",
      C: "It gives the page a strong first section that introduces the purpose and mood",
      D: "It forces all links to open in a new tab",
    },
    correct: "C",
    explanation: "A hero section helps set the tone, explain the page quickly, and create a stronger first impression.",
  },
  {
    prompt: "Why would you use a field grid for two related inputs in a project form?",
    choices: {
      A: "To make them easier to place side by side in a cleaner layout",
      B: "To automatically save the form to localStorage",
      C: "To turn the inputs into buttons",
      D: "To hide them on mobile devices",
    },
    correct: "A",
    explanation: "A field grid helps related inputs line up neatly, which makes the form easier to scan and use.",
  },
  {
    prompt: "What does responsive layout mean?",
    choices: {
      A: "The browser answers user questions automatically",
      B: "The page changes shape to fit different screen sizes more gracefully",
      C: "The app saves every input immediately",
      D: "The stylesheet loads faster after refresh",
    },
    correct: "B",
    explanation: "Responsive layout means the design adjusts to different screen sizes instead of staying locked in one desktop arrangement.",
  },
  {
    prompt: "Why are cards or panels useful in interface design?",
    choices: {
      A: "They make JavaScript optional",
      B: "They only exist for mobile apps",
      C: "They help separate content visually so sections feel clearer and easier to scan",
      D: "They are required any time a page uses buttons",
    },
    correct: "C",
    explanation: "Cards and panels create visual boundaries that make information feel more organized and less overwhelming.",
  },
  {
    prompt: "What is visual hierarchy in a design?",
    choices: {
      A: "A GitHub folder order for CSS files",
      B: "A way of showing what matters most first using size, spacing, color, and placement",
      C: "A rule that every heading must be centered",
      D: "A JavaScript technique for sorting arrays",
    },
    correct: "B",
    explanation: "Visual hierarchy helps the eye notice the most important content first through contrast, spacing, scale, and placement.",
  },
  {
    prompt: "Why might you add 'coming soon' panels for future project features?",
    choices: {
      A: "To suggest the app can expand later without pretending those features already exist",
      B: "To disable CSS until the features are built",
      C: "To stop users from saving data",
      D: "To convert the page into a multi-step form",
    },
    correct: "A",
    explanation: "'Coming soon' panels hint at future growth while staying honest about what the app can do right now.",
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
let timeRemaining = 6 * 60;
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
  if (submitted) return;

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
  questionLabel.textContent = "Question " + (currentQuestionIndex + 1) + " of " + questions.length;
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
      if (submitted) return;
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
  if (timerId) clearInterval(timerId);
  timer.textContent = "Completed";
  examShell.classList.remove("active");
  resultsShell.classList.add("active");

  scoreLine.textContent = "Score: " + score + " / " + questions.length;
  resultsSummary.textContent = "You answered " + score + " out of " + questions.length + " questions correctly.";
  reviewList.innerHTML = "";

  responses.forEach(function (response, index) {
    const item = document.createElement("article");
    item.className = "review-item";

    const title = document.createElement("h3");
    title.textContent = "Question " + (index + 1);

    const grid = document.createElement("div");
    grid.className = "review-grid";

    const yourAnswer = document.createElement("p");
    yourAnswer.innerHTML = "<strong>Your answer:</strong> ";
    yourAnswer.append(document.createTextNode(response.selectedAnswer));

    const correct = document.createElement("p");
    correct.innerHTML = "<strong>Correct:</strong> ";
    correct.append(document.createTextNode(response.correctAnswer));

    grid.append(yourAnswer, correct);

    const why = document.createElement("p");
    why.className = "review-explanation";
    const label = document.createElement("strong");
    label.textContent = "Why:";
    why.append(label, document.createTextNode(" " + response.explanation));

    item.append(title, grid, why);
    reviewList.append(item);
  });
}
