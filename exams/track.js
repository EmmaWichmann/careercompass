const languageButtons = document.querySelectorAll("[data-language]");
const grid = document.getElementById("exam-grid");
const trackTitle = document.getElementById("track-title");
const trackSummary = document.getElementById("track-summary");
const passedLabel = document.getElementById("passed-label");
const trackProgress = document.getElementById("track-progress");

let activeLanguage = "html";
renderTrack();

languageButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    activeLanguage = button.dataset.language;
    languageButtons.forEach(function (item) {
      item.classList.toggle("primary", item === button);
    });
    renderTrack();
  });
});

function renderTrack() {
  const languageName = activeLanguage === "html" ? "HTML" : "JavaScript";
  const topics = window.CodingHubExamData.languages[activeLanguage];
  const progress = window.CodingHubStorage.getExamProgress();
  const passedCount = topics.filter(function (_, index) {
    const item = progress[activeLanguage + "-" + (index + 1)];
    return item && item.passed;
  }).length;

  trackTitle.textContent = languageName + " Beginner Track";
  trackSummary.textContent =
    passedCount === 10
      ? "Beginner complete. Your Intermediate badge is unlocked."
      : "Pass each exam with a score of eighty percent or higher.";
  passedLabel.textContent = "Exams passed: " + passedCount + " of 10";
  trackProgress.style.width = passedCount * 10 + "%";
  grid.innerHTML = "";

  topics.forEach(function (topic, index) {
    const examNumber = index + 1;
    const saved = progress[activeLanguage + "-" + examNumber] || {};
    const card = document.createElement("article");
    card.className = "exam-card" + (saved.passed ? " passed" : "");

    const number = document.createElement("p");
    number.className = "exam-number";
    number.textContent = "Exam " + examNumber;

    const title = document.createElement("h3");
    title.textContent = topic[0];

    const description = document.createElement("p");
    description.className = "muted";
    description.textContent = topic[1] + ".";

    const status = document.createElement("p");
    status.textContent = saved.passed
      ? "Passed. Best score: " + saved.bestScore + "%"
      : saved.attempts
        ? "Best score: " + saved.bestScore + "%"
        : "Not attempted yet";

    const link = document.createElement("a");
    link.className = "button " + (saved.passed ? "secondary" : "primary");
    link.href = "exam.html?language=" + activeLanguage + "&exam=" + examNumber;
    link.textContent = saved.passed ? "Take Again" : "Start Exam";

    card.append(number, title, description, status, link);
    grid.append(card);
  });
}
