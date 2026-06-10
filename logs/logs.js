const exportButton = document.getElementById("export-data");
const importInput = document.getElementById("import-data");
const importStatus = document.getElementById("import-status");
const feed = document.getElementById("log-feed");
const attemptCount = document.getElementById("attempt-count");
const passedCount = document.getElementById("passed-count");
const cardCount = document.getElementById("card-count");

exportButton.addEventListener("click", window.CodingHubStorage.exportAll);

importInput.addEventListener("change", function () {
  const file = importInput.files[0];
  if (!file) {
    return;
  }

  window.CodingHubStorage
    .importAll(file)
    .then(function () {
      importStatus.textContent = "Progress restored. Refreshing the page.";
      window.setTimeout(function () {
        window.location.reload();
      }, 700);
    })
    .catch(function () {
      importStatus.textContent = "That file could not be imported.";
    });
});

renderLogs();

function renderLogs() {
  const log = window.CodingHubStorage.read(
    window.CodingHubStorage.keys.activityLog,
    []
  );
  const progress = window.CodingHubStorage.getExamProgress();
  const cards = window.CodingHubStorage.read(
    window.CodingHubStorage.keys.missedConcepts,
    []
  );

  attemptCount.textContent = log.filter(function (item) {
    return item.type === "exam";
  }).length;
  passedCount.textContent = Object.values(progress).filter(function (item) {
    return item.passed;
  }).length;
  cardCount.textContent = cards.length;
  feed.innerHTML = "";

  if (log.length === 0) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    empty.textContent = "Complete an exam and the result will appear here.";
    feed.append(empty);
    return;
  }

  log.forEach(function (entry) {
    const item = document.createElement("article");
    item.className = "log-entry";

    const row = document.createElement("div");
    row.className = "top-row";

    const title = document.createElement("h3");
    title.textContent =
      (entry.languageName || entry.language) + " Exam " + entry.examNumber + ": " + entry.examTitle;

    const pill = document.createElement("span");
    pill.className = "pill";
    pill.textContent = entry.passed ? "Passed" : "Review";
    row.append(title, pill);

    const summary = document.createElement("p");
    summary.textContent =
      entry.percent +
      "% in " +
      formatTime(entry.timeSeconds) +
      ". " +
      new Date(entry.date).toLocaleString();

    const missed = document.createElement("p");
    missed.className = "muted";
    missed.textContent =
      entry.missedTopics.length === 0
        ? "No missed topics."
        : "Missed topics: " + entry.missedTopics.join(", ");

    item.append(row, summary, missed);
    feed.append(item);
  });
}

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return minutes + "m " + seconds + "s";
}
