(function () {
  const STORAGE_KEY = "coding-hub-skill-practice-v2";
  const data = window.SkillPracticeData;

  const tabListNode = document.getElementById("tab-list");
  const panelsNode = document.getElementById("tab-panels");

  let state = loadState();

  buildTabs();
  buildPanels();
  setActiveTab(data.order[0]);

  function buildTabs() {
    data.order.forEach(function (key) {
      const skill = data.skills[key];
      const button = document.createElement("button");
      button.type = "button";
      button.className = "tab-button";
      button.id = "tab-btn-" + key;
      button.setAttribute("role", "tab");
      button.setAttribute("aria-controls", "panel-" + key);
      button.setAttribute("aria-selected", "false");
      button.textContent = skill.tabLabel;
      button.addEventListener("click", function () {
        setActiveTab(key);
      });
      tabListNode.append(button);
    });
  }

  function buildPanels() {
    data.order.forEach(function (key) {
      panelsNode.append(buildPanel(key));
    });
  }

  function buildPanel(key) {
    const skill = data.skills[key];

    const panel = document.createElement("section");
    panel.className = "card tab-panel";
    panel.id = "panel-" + key;
    panel.setAttribute("role", "tabpanel");
    panel.setAttribute("aria-labelledby", "tab-btn-" + key);
    panel.hidden = true;

    const heading = document.createElement("h2");
    heading.textContent = skill.courseName;
    panel.append(heading);

    const description = document.createElement("p");
    description.className = "muted";
    description.textContent = skill.description;
    panel.append(description);

    const lessonText = document.createElement("p");
    lessonText.id = "lesson-text-" + key;
    panel.append(lessonText);

    const buttonRow = document.createElement("div");
    buttonRow.className = "button-row";

    const continueLink = document.createElement("a");
    continueLink.className = "button primary";
    continueLink.id = "continue-" + key;
    continueLink.target = "_blank";
    continueLink.rel = "noopener noreferrer";
    continueLink.textContent = "Open " + skill.courseName;
    buttonRow.append(continueLink);

    const doneButton = document.createElement("button");
    doneButton.className = "button secondary";
    doneButton.type = "button";
    doneButton.textContent = "Mark Lesson Done";
    doneButton.addEventListener("click", function () {
      state[key].completed += 1;
      saveState();
      renderPanel(key);
      showConfirmation(key);
    });
    buttonRow.append(doneButton);

    panel.append(buttonRow);

    const fieldRow = document.createElement("div");
    fieldRow.className = "field-row";
    const label = document.createElement("label");
    label.setAttribute("for", "completed-" + key);
    label.textContent = "Lessons completed";
    const input = document.createElement("input");
    input.className = "field";
    input.type = "number";
    input.min = "0";
    input.id = "completed-" + key;
    input.addEventListener("change", function () {
      state[key].completed = Math.max(0, parseInt(input.value, 10) || 0);
      saveState();
      renderPanel(key);
    });
    fieldRow.append(label, input);
    panel.append(fieldRow);

    const confirmation = document.createElement("p");
    confirmation.className = "confirmation";
    confirmation.id = "confirmation-" + key;
    confirmation.setAttribute("role", "status");
    confirmation.setAttribute("aria-live", "polite");
    confirmation.hidden = true;
    panel.append(confirmation);

    return panel;
  }

  function setActiveTab(key) {
    data.order.forEach(function (otherKey) {
      const button = document.getElementById("tab-btn-" + otherKey);
      const panel = document.getElementById("panel-" + otherKey);
      const isActive = otherKey === key;
      button.setAttribute("aria-selected", String(isActive));
      panel.hidden = !isActive;
    });
    renderPanel(key);
  }

  function renderPanel(key) {
    const skill = data.skills[key];
    const completed = state[key].completed;
    const currentLesson = completed + 1;

    document.getElementById("lesson-text-" + key).textContent =
      "Current lesson: Lesson " + currentLesson;
    document.getElementById("completed-" + key).value = completed;
    document.getElementById("continue-" + key).href = skill.lessonUrl
      ? skill.lessonUrl(currentLesson)
      : skill.courseLink;
  }

  function showConfirmation(key) {
    const node = document.getElementById("confirmation-" + key);
    node.textContent = "Lesson done. That is enough for today.";
    node.hidden = false;
  }

  function defaultState() {
    const skills = {};
    data.order.forEach(function (key) {
      skills[key] = { completed: data.skills[key].seedCompleted };
    });
    return skills;
  }

  function loadState() {
    const fallback = defaultState();
    let raw;

    try {
      raw = JSON.parse(localStorage.getItem(STORAGE_KEY));
    } catch (error) {
      raw = null;
    }

    if (!raw || typeof raw !== "object") {
      return fallback;
    }

    const merged = {};
    data.order.forEach(function (key) {
      const savedEntry = raw[key];
      merged[key] = {
        completed:
          savedEntry && Number.isFinite(savedEntry.completed) && savedEntry.completed >= 0
            ? savedEntry.completed
            : fallback[key].completed,
      };
    });

    return merged;
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      // localStorage may be unavailable (private browsing, quota exceeded); fail silently.
    }
  }
})();
