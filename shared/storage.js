(function () {
  const keys = {
    examProgress: "coding-hub-exam-progress-v2",
    activityLog: "coding-hub-activity-log",
    missedConcepts: "coding-hub-missed-concepts",
  };

  function read(key, fallback) {
    try {
      return JSON.parse(localStorage.getItem(key)) ?? fallback;
    } catch (error) {
      return fallback;
    }
  }

  function write(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function getExamProgress() {
    return read(keys.examProgress, {});
  }

  function saveExamAttempt(attempt) {
    const progress = getExamProgress();
    const progressId = attempt.language + "-" + attempt.examNumber;
    const previous = progress[progressId] || {};

    progress[progressId] = {
      passed: previous.passed || attempt.passed,
      bestScore: Math.max(previous.bestScore || 0, attempt.percent),
      attempts: (previous.attempts || 0) + 1,
      lastAttempt: attempt.date,
    };
    write(keys.examProgress, progress);

    const log = read(keys.activityLog, []);
    log.unshift(attempt);
    write(keys.activityLog, log);
  }

  function addMissedCard(question, language, location) {
    const cards = read(keys.missedConcepts, []);
    const id =
      "exam-" +
      language +
      "-" +
      question.topic.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const existing = cards.find(function (card) {
      return card.id === id;
    });

    if (existing) {
      existing.timesMissed = (existing.timesMissed || 1) + 1;
      existing.lastMissed = new Date().toISOString();
      existing.nextReview = addDays(1);
    } else {
      cards.unshift({
        id: id,
        prompt: question.cardPrompt.replace(/\{\{.*?\}\}/, "_____"),
        answer: question.cardAnswer,
        explanation: question.explanation,
        topic: language,
        source: location,
        timesMissed: 1,
        lastMissed: new Date().toISOString(),
        nextReview: addDays(1),
      });
    }

    write(keys.missedConcepts, cards);
  }

  function addDays(days) {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() + days);
    return date.toISOString();
  }

  function exportAll() {
    const data = {};
    Object.keys(localStorage).forEach(function (key) {
      if (key.startsWith("coding-hub")) {
        data[key] = localStorage.getItem(key);
      }
    });

    const file = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(file);
    link.download = "coding-learning-hub-backup.json";
    link.click();
    URL.revokeObjectURL(link.href);
  }

  function importAll(file) {
    return file.text().then(function (text) {
      const data = JSON.parse(text);
      Object.entries(data).forEach(function ([key, value]) {
        if (key.startsWith("coding-hub") && typeof value === "string") {
          localStorage.setItem(key, value);
        }
      });
    });
  }

  window.CodingHubStorage = {
    keys: keys,
    read: read,
    write: write,
    getExamProgress: getExamProgress,
    saveExamAttempt: saveExamAttempt,
    addMissedCard: addMissedCard,
    exportAll: exportAll,
    importAll: importAll,
  };
})();
