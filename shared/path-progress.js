(function () {
  const STORAGE_KEY = "coding-hub-path-v1";
  const order = window.CareerPathData.order;
  const languages = window.CareerPathData.languages;

  function defaultState() {
    const state = { currentLanguage: order[0], completions: [] };
    order.forEach(function (key) {
      state[key] = { completed: 0 };
    });
    return state;
  }

  function load() {
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

    const merged = { currentLanguage: order[0], completions: [] };

    order.forEach(function (key) {
      const total = languages[key].lessons.length;
      const savedCompleted = raw[key] && raw[key].completed;
      merged[key] = {
        completed:
          Number.isFinite(savedCompleted) && savedCompleted >= 0 && savedCompleted <= total
            ? savedCompleted
            : 0,
      };
    });

    merged.currentLanguage = order.includes(raw.currentLanguage)
      ? raw.currentLanguage
      : order[0];

    merged.completions = Array.isArray(raw.completions) ? raw.completions.slice(0, 20) : [];

    return merged;
  }

  function save(state) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      // localStorage may be unavailable (private browsing, quota exceeded); fail silently.
    }
  }

  function isLanguageDone(state, key) {
    return state[key].completed >= languages[key].lessons.length;
  }

  // The active language: whichever isn't finished yet, in order. Null once everything is done.
  function getCurrentLanguage(state) {
    const next = order.find(function (key) {
      return !isLanguageDone(state, key);
    });
    return next || null;
  }

  // Today's single lesson: language, 0-based index, and the lesson data itself.
  function getCurrentLesson(state) {
    const key = getCurrentLanguage(state);
    if (!key) {
      return null;
    }

    const index = state[key].completed;
    const lesson = languages[key].lessons[index];

    return {
      languageKey: key,
      language: languages[key],
      index: index,
      stepNumber: index + 1,
      lesson: lesson,
      totalLessons: languages[key].lessons.length,
    };
  }

  // Marks the current lesson for `languageKey` done, advances the counter, and logs it.
  function markComplete(state, languageKey) {
    const language = languages[languageKey];
    const index = state[languageKey].completed;
    const lesson = language.lessons[index];

    if (!lesson) {
      return null;
    }

    state[languageKey].completed = index + 1;
    state.completions.unshift({
      languageKey: languageKey,
      title: lesson.title,
      date: new Date().toISOString(),
    });
    state.completions = state.completions.slice(0, 20);
    save(state);

    return {
      languageKey: languageKey,
      stepNumber: index + 1,
      lesson: lesson,
      languageDone: isLanguageDone(state, languageKey),
    };
  }

  function reset() {
    const fresh = defaultState();
    save(fresh);
    return fresh;
  }

  window.CareerPath = {
    load: load,
    save: save,
    isLanguageDone: isLanguageDone,
    getCurrentLanguage: getCurrentLanguage,
    getCurrentLesson: getCurrentLesson,
    markComplete: markComplete,
    reset: reset,
  };
})();
