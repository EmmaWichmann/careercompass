(function () {
  const skills = {
    sql: {
      key: "sql",
      tabLabel: "SQL",
      courseName: "SQLBolt",
      courseLink: "https://sqlbolt.com/",
      description:
        "Short interactive SQL lessons and exercises completed directly in the browser.",
      lessonUrl: function (lessonNumber) {
        return "https://sqlbolt.com/lesson/" + lessonNumber;
      },
      seedCompleted: 3,
    },
    python: {
      key: "python",
      tabLabel: "Python",
      courseName: "LearnPython.org",
      courseLink: "https://www.learnpython.org/",
      description:
        "Short browser based Python lessons with an explanation, editable code, and an exercise.",
      lessonUrl: null,
      seedCompleted: 0,
    },
  };

  const order = ["sql", "python"];

  window.SkillPracticeData = {
    skills: skills,
    order: order,
  };
})();
