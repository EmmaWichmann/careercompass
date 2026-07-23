(function () {
  const certifications = {
    activeCertificationId: "sql-relational-database",
    certifications: [
      {
        id: "sql-relational-database",
        name: "SQL / Relational Database",
        organization: "freeCodeCamp",
        url: "https://www.freecodecamp.org/learn/relational-database/",
        cost: "Free",
        verificationType: "Public certificate",
        status: "Preparing",
        readinessStage: "Building Foundations",
        careerValue:
          "Strong SQL supports data analyst, product analyst, AI implementation, and technical product work.",
        readinessSummary: "6 of 18 required SQL skills introduced",
        currentSkill: "LIKE",
        currentLesson: {
          title: "SQLBolt Lesson 4",
          skillFocus: "Filtering and pattern matching",
          url: "https://sqlbolt.com/lesson/filtering_sorting_query_results",
        },
        nextMilestone: "SQL Foundations Readiness Check",
        lockedUntil: "Complete the required beginner SQL skills",
        requiredSkillGroups: [
          {
            name: "SQL Basics",
            skills: [
              { id: "sql-select", name: "SELECT", status: "READY" },
              { id: "sql-from", name: "FROM", status: "READY" },
              { id: "sql-where", name: "WHERE", status: "READY" },
              { id: "sql-distinct", name: "DISTINCT", status: "NOT STARTED" },
              { id: "sql-order-by", name: "ORDER BY", status: "LEARNING" },
            ],
          },
          {
            name: "Filtering",
            skills: [
              { id: "sql-between", name: "BETWEEN", status: "PRACTICING" },
              { id: "sql-like", name: "LIKE", status: "PRACTICING" },
              { id: "sql-in", name: "IN", status: "NOT STARTED" },
              { id: "sql-is-null", name: "IS NULL", status: "NOT STARTED" },
              { id: "sql-limit", name: "LIMIT", status: "READY" },
            ],
          },
          {
            name: "Aggregation",
            skills: [
              { id: "sql-count", name: "COUNT", status: "NOT STARTED" },
              { id: "sql-sum", name: "SUM", status: "NOT STARTED" },
              { id: "sql-avg", name: "AVG", status: "NOT STARTED" },
              { id: "sql-group-by", name: "GROUP BY", status: "NOT STARTED" },
              { id: "sql-having", name: "HAVING", status: "NOT STARTED" },
            ],
          },
          {
            name: "Relational Queries",
            skills: [
              { id: "sql-join", name: "JOIN", status: "NOT STARTED" },
              { id: "sql-left-join", name: "LEFT JOIN", status: "NOT STARTED" },
              { id: "sql-subquery", name: "SUBQUERIES", status: "NOT STARTED" },
            ],
          },
        ],
      },
      {
        id: "python-foundation",
        name: "Python",
        organization: "freeCodeCamp",
        url: "https://www.freecodecamp.org/learn/scientific-computing-with-python/",
        cost: "Free",
        verificationType: "Public certificate",
        status: "Locked",
        readinessStage: "Future",
        careerValue: "Python supports analysis, automation, data cleanup, and lightweight tooling.",
      },
      {
        id: "apis-json",
        name: "APIs + JSON / Data Workflows",
        organization: "freeCodeCamp",
        url: "https://www.freecodecamp.org/learn/back-end-development-and-apis/",
        cost: "Free",
        verificationType: "Public certificate",
        status: "Locked",
        readinessStage: "Future",
        careerValue: "APIs and JSON support real data workflows and automation.",
      },
      {
        id: "data-visualization",
        name: "Data Visualization / BI",
        organization: "freeCodeCamp",
        url: "https://www.freecodecamp.org/learn/data-visualization/",
        cost: "Free",
        verificationType: "Public certificate",
        status: "Locked",
        readinessStage: "Future",
        careerValue: "Visualization turns analysis into clear, decision-ready communication.",
      },
      {
        id: "ai-foundations",
        name: "AI / Data Foundations",
        organization: "IBM SkillsBuild",
        url: "https://skillsbuild.org/",
        cost: "Free",
        verificationType: "Digital credential",
        status: "Future",
        readinessStage: "Future",
        careerValue: "AI foundations support later automation, product, and implementation work.",
      },
    ],
  };

  window.CodingHubCertifications = certifications;
})();
