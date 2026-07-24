(function () {
  const sql = {
    key: "sql",
    label: "SQL",
    course: "SQLBolt",
    courseLink: "https://sqlbolt.com/",
    whyItMatters:
      "SQL skills like this are used constantly in data analyst, product analyst, and reporting work.",
    lessons: [
      {
        title: "SELECT and FROM",
        skillFocus: "SELECT, FROM, basic column selection",
        lessonUrl: "https://sqlbolt.com/lesson/select_queries_introduction",
      },
      {
        title: "WHERE",
        skillFocus: "WHERE, AND, OR, LIKE, IN, text and numeric filters",
        lessonUrl: "https://sqlbolt.com/lesson/select_queries_with_constraints",
      },
      {
        title: "ORDER BY and LIMIT",
        skillFocus: "ORDER BY, ASC, DESC, LIMIT",
        lessonUrl: "https://sqlbolt.com/lesson/filtering_sorting_query_results",
      },
      {
        title: "COUNT, SUM, AVG",
        skillFocus: "COUNT, SUM, AVG, aggregate functions",
        lessonUrl: "https://sqlbolt.com/lesson/select_queries_with_aggregates",
      },
      {
        title: "GROUP BY",
        skillFocus: "GROUP BY, grouped aggregates",
        lessonUrl: "https://sqlbolt.com/lesson/select_queries_with_aggregates_pt_2",
      },
      {
        title: "HAVING",
        skillFocus: "HAVING, filtering grouped results",
        lessonUrl: "https://sqlbolt.com/lesson/select_queries_with_aggregates_pt_2",
      },
      {
        title: "INNER JOIN",
        skillFocus: "INNER JOIN, ON, table aliases",
        lessonUrl: "https://sqlbolt.com/lesson/select_queries_with_joins",
      },
      {
        title: "LEFT JOIN",
        skillFocus: "LEFT JOIN, unmatched rows, null fill",
        lessonUrl: "https://sqlbolt.com/lesson/select_queries_with_outer_joins",
      },
      {
        title: "CASE WHEN",
        skillFocus: "CASE WHEN, output logic, conditional labeling",
        lessonUrl: "https://sqlbolt.com/lesson/select_queries_with_expressions",
      },
      {
        title: "Subqueries",
        skillFocus: "nested SELECT, IN with subquery, scalar subquery",
        lessonUrl: "https://sqlbolt.com/lesson/select_queries_with_subqueries",
      },
      {
        title: "NULL handling and cleaning",
        skillFocus: "IS NULL, DISTINCT, BETWEEN, basic data cleaning",
        lessonUrl: "https://sqlbolt.com/lesson/select_queries_with_nulls",
      },
    ],
  };

  const python = {
    key: "python",
    label: "Python",
    course: "LearnPython.org",
    courseLink: "https://www.learnpython.org/",
    whyItMatters:
      "Python skills like this help you clean, explore, and work with real data.",
    lessons: [
      {
        title: "Variables and data types",
        skillFocus: "int, float, str, bool, variable assignment",
        lessonUrl: "https://www.learnpython.org/",
      },
      {
        title: "Strings and methods",
        skillFocus: "concatenation, len, upper, lower, f-strings",
        lessonUrl: "https://www.learnpython.org/",
      },
      {
        title: "Lists",
        skillFocus: "indexing, append, remove, slicing, list length",
        lessonUrl: "https://www.learnpython.org/",
      },
      {
        title: "Dictionaries",
        skillFocus: "key-value pairs, get, keys, values, update",
        lessonUrl: "https://www.learnpython.org/",
      },
      {
        title: "Control flow",
        skillFocus: "if, elif, else, comparison operators",
        lessonUrl: "https://www.learnpython.org/",
      },
      {
        title: "Loops",
        skillFocus: "for, while, range, break, continue",
        lessonUrl: "https://www.learnpython.org/",
      },
      {
        title: "Functions",
        skillFocus: "def, parameters, return, default arguments",
        lessonUrl: "https://www.learnpython.org/",
      },
      {
        title: "Modules and imports",
        skillFocus: "import, from-import, standard library",
        lessonUrl: "https://www.learnpython.org/",
      },
      {
        title: "Comprehensive review",
        skillFocus: "all beginner Python topics",
        lessonUrl: "https://www.learnpython.org/",
      },
      {
        title: "Beginner final",
        skillFocus: "debugging, logic, data structures, scope",
        lessonUrl: "https://www.learnpython.org/",
      },
    ],
  };

  // Later stages, shown only inside the collapsed roadmap. Matches data/certifications.js.
  const roadmap = [
    { label: "Current", name: "SQL" },
    { label: "Next", name: "Python" },
    { label: "Later", name: "APIs and JSON" },
    { label: "Later", name: "Data Visualization" },
    { label: "Later", name: "AI Foundations" },
  ];

  window.CareerPathData = {
    languages: { sql: sql, python: python },
    order: ["sql", "python"],
    roadmap: roadmap,
  };
})();
