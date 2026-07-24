(function () {
  const skills = {
    sql: {
      key: "sql",
      tabLabel: "SQL",
      exploreLater: false,
      courseName: "SQLBolt",
      courseLink: "https://sqlbolt.com/",
      description:
        "Short interactive SQL lessons and exercises completed directly in the browser.",
      lessonUrl: function (lessonNumber) {
        return "https://sqlbolt.com/lesson/" + lessonNumber;
      },
      proofProject:
        "Analyze a small job application database and answer questions using filters, grouping, and joins.",
      note: null,
      extraLinksLabel: "Optional readiness check",
      extraLinks: [
        { label: "SQL readiness check", href: "../exams/" },
      ],
      seed: { currentLesson: 4, completedLessons: 3 },
    },
    python: {
      key: "python",
      tabLabel: "Python",
      exploreLater: false,
      courseName: "LearnPython.org",
      courseLink: "https://www.learnpython.org/",
      description:
        "Short browser based Python lessons with an explanation, editable code, and an exercise.",
      lessonUrl: null,
      proofProject:
        "Create a small script that organizes job application data or summarizes a CSV file.",
      note: null,
      extraLinksLabel: "Optional readiness check",
      extraLinks: [
        { label: "Python readiness check", href: "../exams/" },
      ],
      seed: { currentLesson: 1, completedLessons: 0 },
    },
  };

  const order = ["sql", "python"];

  // 0 = Sunday ... 6 = Saturday, matching Date.getDay(). Sunday has no assigned skill.
  const rotation = {
    0: null,
    1: "sql",
    2: "python",
    3: "sql",
    4: "python",
    5: "sql",
    6: "python",
  };

  const rotationDayNames = {
    0: "Sunday",
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
  };

  window.SkillPracticeData = {
    skills: skills,
    order: order,
    rotation: rotation,
    rotationDayNames: rotationDayNames,
  };
})();
