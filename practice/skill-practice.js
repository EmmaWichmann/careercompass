(function () {
  const STORAGE_KEY = "coding-hub-skill-practice-v1";
  const data = window.SkillPracticeData;

  const tabListNode = document.getElementById("tab-list");
  const panelsNode = document.getElementById("tab-panels");
  const todaySkillSelect = document.getElementById("today-skill-select");
  const todaySkillName = document.getElementById("today-skill-name");
  const todayLessonText = document.getElementById("today-lesson-text");
  const todayDayPill = document.getElementById("today-day-pill");
  const todayRestText = document.getElementById("today-rest-text");
  const todayActions = document.getElementById("today-actions");
  const todayContinue = document.getElementById("today-continue");
  const todayComplete = document.getElementById("today-complete");
  const todayNote = document.getElementById("today-note");
  const todayConfirmation = document.getElementById("today-confirmation");

  let activeSkillKey = null;
  let state = loadState();

  buildTodaySkillOptions();
  buildTabs();
  buildPanels();
  setActiveTab(getAssignedSkillKey() || data.order[0]);
  renderToday();

  todaySkillSelect.addEventListener("change", function () {
    const chosen = todaySkillSelect.value;
    if (chosen) {
      state.dailyChoice[todayKey()] = chosen;
    } else {
      delete state.dailyChoice[todayKey()];
    }
    saveState();
    renderToday();
    setActiveTab(getAssignedSkillKey() || data.order[0]);
  });

  todayComplete.addEventListener("click", function () {
    const skillKey = getAssignedSkillKey();
    if (!skillKey) {
      return;
    }
    markLessonComplete(skillKey);
    todayConfirmation.textContent = "Lesson complete. That is enough for today.";
    todayConfirmation.hidden = false;
  });

  todayNote.addEventListener("change", function () {
    const skillKey = getAssignedSkillKey();
    if (!skillKey) {
      return;
    }
    state.skills[skillKey].notes = todayNote.value;
    saveState();
    renderPanelValues(skillKey);
  });

  function buildTodaySkillOptions() {
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "Use today's rotation";
    todaySkillSelect.append(defaultOption);

    data.order
      .filter(function (key) {
        return !data.skills[key].exploreLater;
      })
      .forEach(function (key) {
        const option = document.createElement("option");
        option.value = key;
        option.textContent = data.skills[key].tabLabel;
        todaySkillSelect.append(option);
      });
  }

  function buildTabs() {
    data.order.forEach(function (key) {
      const skill = data.skills[key];
      const button = document.createElement("button");
      button.type = "button";
      button.className = "tab-button" + (skill.exploreLater ? " explore-later" : "");
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

    if (skill.exploreLater) {
      const banner = document.createElement("div");
      banner.className = "banner";
      banner.textContent = skill.note;
      panel.append(banner);
    }

    const heading = document.createElement("h2");
    heading.textContent = skill.courseName;
    panel.append(heading);

    const description = document.createElement("p");
    description.className = "muted";
    description.textContent = skill.description;
    panel.append(description);

    if (skill.note && !skill.exploreLater) {
      const note = document.createElement("p");
      note.className = "skill-note";
      note.textContent = skill.note;
      panel.append(note);
    }

    const fieldRowLesson = document.createElement("div");
    fieldRowLesson.className = "field-row";
    const lessonLabel = document.createElement("label");
    lessonLabel.setAttribute("for", "lesson-" + key);
    lessonLabel.textContent = "Current lesson";
    const lessonInput = document.createElement("input");
    lessonInput.className = "field";
    lessonInput.type = "number";
    lessonInput.min = "1";
    lessonInput.id = "lesson-" + key;
    lessonInput.addEventListener("change", function () {
      const value = Math.max(1, parseInt(lessonInput.value, 10) || 1);
      state.skills[key].currentLesson = value;
      saveState();
      renderPanelValues(key);
      renderToday();
    });
    fieldRowLesson.append(lessonLabel, lessonInput);
    panel.append(fieldRowLesson);

    const fieldRowCompleted = document.createElement("div");
    fieldRowCompleted.className = "field-row";
    const completedLabel = document.createElement("label");
    completedLabel.setAttribute("for", "completed-" + key);
    completedLabel.textContent = "Lessons completed";
    const completedInput = document.createElement("input");
    completedInput.className = "field";
    completedInput.type = "number";
    completedInput.min = "0";
    completedInput.id = "completed-" + key;
    completedInput.addEventListener("change", function () {
      const value = Math.max(0, parseInt(completedInput.value, 10) || 0);
      state.skills[key].completedLessons = value;
      saveState();
      renderPanelValues(key);
    });
    fieldRowCompleted.append(completedLabel, completedInput);
    panel.append(fieldRowCompleted);

    const fieldRowStatus = document.createElement("div");
    fieldRowStatus.className = "field-row";
    const statusLabel = document.createElement("label");
    statusLabel.setAttribute("for", "status-" + key);
    statusLabel.textContent = "Status";
    const statusSelect = document.createElement("select");
    statusSelect.className = "field";
    statusSelect.id = "status-" + key;
    [
      { value: "learning", label: "Learning" },
      { value: "ready", label: "Ready to List" },
    ].forEach(function (option) {
      const opt = document.createElement("option");
      opt.value = option.value;
      opt.textContent = option.label;
      statusSelect.append(opt);
    });
    statusSelect.addEventListener("change", function () {
      state.skills[key].status = statusSelect.value;
      saveState();
    });
    fieldRowStatus.append(statusLabel, statusSelect);
    panel.append(fieldRowStatus);

    const buttonRow = document.createElement("div");
    buttonRow.className = "button-row";
    buttonRow.style.marginTop = "16px";

    const continueLink = document.createElement("a");
    continueLink.className = "button primary";
    continueLink.id = "continue-" + key;
    continueLink.target = "_blank";
    continueLink.rel = "noopener noreferrer";
    continueLink.textContent = "Continue Course";
    buttonRow.append(continueLink);

    const completeButton = document.createElement("button");
    completeButton.className = "button secondary";
    completeButton.type = "button";
    completeButton.textContent = "Mark Lesson Complete";
    completeButton.addEventListener("click", function () {
      markLessonComplete(key);
      showPanelConfirmation(key, "Lesson complete. That is enough for today.");
    });
    buttonRow.append(completeButton);

    const resetButton = document.createElement("button");
    resetButton.className = "button";
    resetButton.type = "button";
    resetButton.textContent = "Reset skill";
    resetButton.addEventListener("click", function () {
      const confirmed = window.confirm(
        "Reset " + skill.tabLabel + " progress back to its starting point? This cannot be undone."
      );
      if (!confirmed) {
        return;
      }
      state.skills[key] = defaultSkillEntry(key);
      saveState();
      renderPanelValues(key);
      renderToday();
      showPanelConfirmation(key, "Progress reset for " + skill.tabLabel + ".");
    });
    buttonRow.append(resetButton);

    panel.append(buttonRow);

    if (skill.extraLinks && skill.extraLinks.length > 0) {
      const extraWrap = document.createElement("div");
      extraWrap.className = "extra-links";
      const extraLabel = document.createElement("p");
      extraLabel.className = "muted";
      extraLabel.textContent = skill.extraLinksLabel || "Optional resource";
      extraWrap.append(extraLabel);

      const extraButtonRow = document.createElement("div");
      extraButtonRow.className = "button-row";
      skill.extraLinks.forEach(function (link) {
        const a = document.createElement("a");
        a.className = "button";
        a.href = link.href;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        a.textContent = link.label;
        extraButtonRow.append(a);
      });
      extraWrap.append(extraButtonRow);
      panel.append(extraWrap);
    }

    const notesLabel = document.createElement("label");
    notesLabel.className = "today-note-label";
    notesLabel.setAttribute("for", "notes-" + key);
    notesLabel.textContent = "Notes (optional)";
    panel.append(notesLabel);

    const notesField = document.createElement("textarea");
    notesField.className = "notes-field";
    notesField.id = "notes-" + key;
    notesField.placeholder = "Anything worth remembering from this skill.";
    notesField.addEventListener("change", function () {
      state.skills[key].notes = notesField.value;
      saveState();
      if (getAssignedSkillKey() === key) {
        todayNote.value = notesField.value;
      }
    });
    panel.append(notesField);

    const proofBox = document.createElement("div");
    proofBox.className = "proof-box";
    const proofLabel = document.createElement("p");
    proofLabel.innerHTML = "<strong>Proof project idea (optional):</strong> " + skill.proofProject;
    proofBox.append(proofLabel);
    panel.append(proofBox);

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
    activeSkillKey = key;
    data.order.forEach(function (otherKey) {
      const button = document.getElementById("tab-btn-" + otherKey);
      const panel = document.getElementById("panel-" + otherKey);
      const isActive = otherKey === key;
      button.setAttribute("aria-selected", String(isActive));
      panel.hidden = !isActive;
    });
    renderPanelValues(key);
  }

  function renderPanelValues(key) {
    const skill = data.skills[key];
    const entry = state.skills[key];

    document.getElementById("lesson-" + key).value = entry.currentLesson;
    document.getElementById("completed-" + key).value = entry.completedLessons;
    document.getElementById("status-" + key).value = entry.status;
    document.getElementById("notes-" + key).value = entry.notes || "";

    const continueLink = document.getElementById("continue-" + key);
    continueLink.href = skill.lessonUrl
      ? skill.lessonUrl(entry.currentLesson)
      : skill.courseLink;
  }

  function renderToday() {
    const skillKey = getAssignedSkillKey();
    const dayOfWeek = new Date().getDay();
    todayDayPill.textContent = data.rotationDayNames[dayOfWeek] + "'s Practice";
    todayConfirmation.hidden = true;
    todaySkillSelect.value = state.dailyChoice[todayKey()] || "";

    if (!skillKey) {
      todaySkillName.textContent = "Rest day";
      todayLessonText.textContent = "";
      todayRestText.hidden = false;
      todayActions.hidden = true;
      todayNote.hidden = true;
      document.querySelector('label[for="today-note"]').hidden = true;
      return;
    }

    todayRestText.hidden = true;
    todayActions.hidden = false;
    todayNote.hidden = false;
    document.querySelector('label[for="today-note"]').hidden = false;

    const skill = data.skills[skillKey];
    const entry = state.skills[skillKey];

    todaySkillName.textContent = skill.tabLabel;
    todayLessonText.textContent = "Current lesson: Lesson " + entry.currentLesson;
    todayContinue.href = skill.lessonUrl ? skill.lessonUrl(entry.currentLesson) : skill.courseLink;
    todayNote.value = entry.notes || "";
  }

  function markLessonComplete(skillKey) {
    const entry = state.skills[skillKey];
    entry.completedLessons += 1;
    entry.currentLesson += 1;
    entry.lastCompletedDate = todayKey();
    saveState();
    renderPanelValues(skillKey);
    renderToday();
  }

  function showPanelConfirmation(key, message) {
    const node = document.getElementById("confirmation-" + key);
    node.textContent = message;
    node.hidden = false;
  }

  function getAssignedSkillKey() {
    const manual = state.dailyChoice[todayKey()];
    if (manual) {
      return manual;
    }
    return data.rotation[new Date().getDay()];
  }

  function todayKey() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return year + "-" + month + "-" + day;
  }

  function defaultSkillEntry(key) {
    const seed = data.skills[key].seed;
    return {
      currentLesson: seed.currentLesson,
      completedLessons: seed.completedLessons,
      notes: "",
      status: "learning",
      lastCompletedDate: null,
    };
  }

  function defaultState() {
    const skills = {};
    data.order.forEach(function (key) {
      skills[key] = defaultSkillEntry(key);
    });
    return { skills: skills, dailyChoice: {} };
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

    const merged = { skills: {}, dailyChoice: {} };

    data.order.forEach(function (key) {
      const savedEntry = raw.skills && typeof raw.skills === "object" ? raw.skills[key] : null;
      const seedEntry = fallback.skills[key];

      merged.skills[key] = {
        currentLesson:
          savedEntry && Number.isFinite(savedEntry.currentLesson) && savedEntry.currentLesson >= 1
            ? savedEntry.currentLesson
            : seedEntry.currentLesson,
        completedLessons:
          savedEntry &&
          Number.isFinite(savedEntry.completedLessons) &&
          savedEntry.completedLessons >= 0
            ? savedEntry.completedLessons
            : seedEntry.completedLessons,
        notes: savedEntry && typeof savedEntry.notes === "string" ? savedEntry.notes : "",
        status:
          savedEntry && (savedEntry.status === "learning" || savedEntry.status === "ready")
            ? savedEntry.status
            : "learning",
        lastCompletedDate:
          savedEntry && typeof savedEntry.lastCompletedDate === "string"
            ? savedEntry.lastCompletedDate
            : null,
      };
    });

    if (raw.dailyChoice && typeof raw.dailyChoice === "object") {
      Object.keys(raw.dailyChoice).forEach(function (dateKey) {
        const value = raw.dailyChoice[dateKey];
        if (typeof value === "string" && data.skills[value] && !data.skills[value].exploreLater) {
          merged.dailyChoice[dateKey] = value;
        }
      });
    }

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
