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
      extraLinks: [],
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
      extraLinks: [],
      seed: { currentLesson: 1, completedLessons: 0 },
    },
    html: {
      key: "html",
      tabLabel: "HTML",
      exploreLater: false,
      courseName: "freeCodeCamp Responsive Web Design",
      courseLink: "https://www.freecodecamp.org/learn/2022/responsive-web-design/",
      description:
        "Hands on HTML lessons that build real page structures and small projects. Focus areas: elements, headings, paragraphs, links, images, forms, semantic HTML, and accessibility.",
      lessonUrl: null,
      proofProject: "Create a clean accessible personal profile page.",
      note: null,
      extraLinks: [],
      seed: { currentLesson: 1, completedLessons: 0 },
    },
    css: {
      key: "css",
      tabLabel: "CSS",
      exploreLater: false,
      courseName: "freeCodeCamp Responsive Web Design",
      courseLink: "https://www.freecodecamp.org/learn/2022/responsive-web-design/",
      description:
        "Hands on CSS lessons covering styling, layouts, responsiveness, Flexbox, and Grid.",
      lessonUrl: null,
      proofProject: "Style the profile page so it is responsive on desktop and mobile.",
      note: null,
      extraLinksLabel: "Optional practice games (not required daily)",
      extraLinks: [
        { label: "CSS Diner", href: "https://flukeout.github.io/" },
        { label: "Flexbox Froggy", href: "https://flexboxfroggy.com/" },
        { label: "Grid Garden", href: "https://cssgridgarden.com/" },
      ],
      seed: { currentLesson: 1, completedLessons: 0 },
    },
    javascript: {
      key: "javascript",
      tabLabel: "JavaScript",
      exploreLater: false,
      courseName: "freeCodeCamp JavaScript Algorithms and Data Structures",
      courseLink:
        "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures-v8/",
      description:
        "Interactive JavaScript lessons and projects covering variables, arrays, objects, conditions, loops, and functions.",
      lessonUrl: null,
      proofProject:
        "Add an interactive filter, form, or saved item feature to an existing project.",
      note: "Learn JavaScript fundamentals before adding React.",
      extraLinks: [],
      seed: { currentLesson: 1, completedLessons: 0 },
    },
    git: {
      key: "git",
      tabLabel: "Git and GitHub",
      exploreLater: false,
      courseName: "GitHub Skills",
      courseLink: "https://skills.github.com/",
      description:
        "Learn repositories, commits, branches, pull requests, and the basic workflow used to manage coding projects. Recommended first course: Introduction to GitHub.",
      lessonUrl: null,
      proofProject:
        "Create a repository, make several clear commits, create a branch, and merge a change.",
      note: null,
      extraLinksLabel: "Optional visual practice",
      extraLinks: [
        { label: "Learn Git Branching", href: "https://learngitbranching.js.org/" },
      ],
      seed: { currentLesson: 1, completedLessons: 0 },
    },
    cpp: {
      key: "cpp",
      tabLabel: "C++ Later",
      exploreLater: true,
      courseName: "Learn C++",
      courseLink: "https://www.learn-cpp.org/",
      description:
        "Optional preparation for systems, embedded, wireless, defense, and performance focused software roles.",
      lessonUrl: null,
      proofProject: "Create a small console application after completing the fundamentals.",
      note: "This is an optional future track. It is not part of your current daily practice plan.",
      extraLinks: [],
      seed: { currentLesson: 1, completedLessons: 0 },
    },
  };

  const order = ["sql", "python", "html", "css", "javascript", "git", "cpp"];

  // 0 = Sunday ... 6 = Saturday, matching Date.getDay(). Sunday has no assigned skill.
  const rotation = {
    0: null,
    1: "sql",
    2: "python",
    3: "html",
    4: "css",
    5: "javascript",
    6: "git",
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
