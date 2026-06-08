const missedKey = "coding-hub-missed-concepts";
const tableBody = document.getElementById("missed-table-body");
const emptyState = document.getElementById("empty-state");
const clearButton = document.getElementById("clear-reviewed");
const countNode = document.getElementById("missed-count");

renderMissedConcepts();

clearButton.addEventListener("click", () => {
  const missedConcepts = readMissedConcepts();
  const keptConcepts = missedConcepts.filter((item) => !item.reviewed);
  localStorage.setItem(missedKey, JSON.stringify(keptConcepts));
  renderMissedConcepts();
});

tableBody.addEventListener("click", (event) => {
  const button = event.target.closest("[data-action]");
  if (!button) {
    return;
  }

  const missedConcepts = readMissedConcepts();
  const concept = missedConcepts.find((item) => item.id === button.dataset.id);

  if (!concept) {
    return;
  }

  if (button.dataset.action === "mark-reviewed") {
    concept.reviewed = true;
    concept.reviewedAt = new Date().toISOString();
  }

  if (button.dataset.action === "need-again") {
    concept.reviewed = false;
    concept.timesMissed += 1;
    concept.lastMissed = new Date().toISOString();
    concept.nextReview = addDays(1).toISOString();
  }

  localStorage.setItem(missedKey, JSON.stringify(missedConcepts));
  renderMissedConcepts();
});

function renderMissedConcepts() {
  const missedConcepts = readMissedConcepts();
  tableBody.innerHTML = "";
  countNode.textContent = missedConcepts.length;
  emptyState.hidden = missedConcepts.length > 0;

  missedConcepts.forEach((item) => {
    const row = document.createElement("tr");
    row.className = item.reviewed ? "reviewed" : "";
    row.innerHTML = `
      <td>
        <strong>${escapeHtml(item.prompt)}</strong>
        <span>${escapeHtml(item.explanation)}</span>
      </td>
      <td>${escapeHtml(item.topic)}</td>
      <td>${item.timesMissed}</td>
      <td>${formatDate(item.nextReview)}</td>
      <td>
        <button data-action="mark-reviewed" data-id="${escapeHtml(item.id)}" type="button">
          Got it
        </button>
        <button data-action="need-again" data-id="${escapeHtml(item.id)}" type="button">
          Review again
        </button>
      </td>
    `;
    tableBody.append(row);
  });
}

function readMissedConcepts() {
  try {
    return JSON.parse(localStorage.getItem(missedKey)) || [];
  } catch {
    return [];
  }
}

function addDays(days) {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + days);
  return date;
}

function formatDate(dateString) {
  if (!dateString) {
    return "1d";
  }

  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
