const questions = [
  {
    prompt: "What does document.getElementById(\"closet-grid\") do?",
    choices: {
      A: "Creates a new closet grid",
      B: "Finds the existing element whose id is closet-grid",
      C: "Changes the grid's CSS",
      D: "Deletes the grid",
    },
    correct: "B",
    explanation: "getElementById finds one existing HTML element by its unique id so JavaScript can work with it.",
  },
  {
    prompt: "Why would an app use addEventListener(\"click\", ...)?",
    choices: {
      A: "To run code when the user clicks an element",
      B: "To make every element look clickable",
      C: "To save the whole website automatically",
      D: "To connect a CSS file",
    },
    correct: "A",
    explanation: "An event listener waits for an action such as a click and then runs the function connected to it.",
  },
  {
    prompt: "What does input.value give JavaScript?",
    choices: {
      A: "The CSS width of the input",
      B: "The id of the input",
      C: "The information currently entered in the input",
      D: "The number of times the input was clicked",
    },
    correct: "C",
    explanation: "The value property reads the current information inside a form input.",
  },
  {
    prompt: "What is an array useful for in Outfit Archive?",
    choices: {
      A: "Keeping an ordered collection of clothing item objects",
      B: "Changing a PNG into CSS",
      C: "Creating a heading automatically",
      D: "Publishing the project to GitHub Pages",
    },
    correct: "A",
    explanation: "An array can store many related values, such as all of the clothing item objects in the closet.",
  },
  {
    prompt: "What does localStorage help the browser app do?",
    choices: {
      A: "Upload clothing photos to a public server",
      B: "Remember data in that browser after the page is refreshed",
      C: "Turn JavaScript into HTML",
      D: "Resize the page for phones",
    },
    correct: "B",
    explanation: "localStorage keeps text data in the current browser, allowing the app to remember saved items after a refresh.",
  },
  {
    prompt: "Why is JSON.stringify(items) used before saving an array to localStorage?",
    choices: {
      A: "localStorage stores strings, so the array must be converted to text",
      B: "It sorts all clothing alphabetically",
      C: "It removes duplicate photos",
      D: "It makes the array private",
    },
    correct: "A",
    explanation: "localStorage stores string values. JSON.stringify converts an array or object into a string that can be saved.",
  },
  {
    prompt: "What does items.filter(...) return?",
    choices: {
      A: "The first item only",
      B: "A new array containing the items that passed the test",
      C: "A CSS class",
      D: "A permanently changed image",
    },
    correct: "B",
    explanation: "filter checks each item and returns a new array containing only the entries that match the condition.",
  },
  {
    prompt: "What does element.textContent = \"Trash\" change?",
    choices: {
      A: "The visible text inside that element",
      B: "The element's file name",
      C: "The browser's saved history",
      D: "The element's background color",
    },
    correct: "A",
    explanation: "textContent replaces the visible text contained inside an HTML element.",
  },
  {
    prompt: "Why does a form submit listener often call event.preventDefault()?",
    choices: {
      A: "To stop JavaScript from reading the form",
      B: "To stop the browser's normal page reload so JavaScript can handle the form",
      C: "To make every field required",
      D: "To clear localStorage",
    },
    correct: "B",
    explanation: "preventDefault stops the normal form submission and reload, giving JavaScript control over what happens next.",
  },
  {
    prompt: "What should renderCloset() usually do after the clothing data changes?",
    choices: {
      A: "Update the visible closet so it matches the current data",
      B: "Download every image again",
      C: "Rename the JavaScript file",
      D: "Open Visual Studio Code",
    },
    correct: "A",
    explanation: "A render function redraws or updates the interface so users see the latest data.",
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
