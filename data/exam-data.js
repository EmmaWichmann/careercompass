(function () {
  const htmlTopics = [
    ["Document foundations", "doctype, html, head, body, title, metadata"],
    ["Text and meaning", "headings, paragraphs, emphasis, quotations, semantic meaning"],
    ["Links and images", "anchors, paths, image sources, alternate text, figures"],
    ["Lists and tables", "ordered lists, unordered lists, table structure, captions"],
    ["Forms and inputs", "labels, inputs, buttons, selects, validation"],
    ["Semantic layout", "header, nav, main, section, article, footer"],
    ["Accessibility basics", "labels, alternate text, landmarks, button meaning"],
    ["Media and embedding", "audio, video, iframe, source elements"],
    ["Comprehensive review", "all beginner HTML topics"],
    ["Beginner final", "debugging, accessibility, structure, intermediate preview"],
  ];

  const javascriptTopics = [
    ["Variables and values", "const, let, strings, numbers, booleans, null"],
    ["Operators and decisions", "comparison, logical operators, if, else, switch"],
    ["Loops", "for, while, counters, iteration"],
    ["Functions", "parameters, return values, scope, callbacks"],
    ["Arrays", "indexes, length, push, map, filter, find"],
    ["Objects", "properties, methods, nesting, destructuring preview"],
    ["Document basics", "document, selectors, textContent, classList"],
    ["Events and forms", "listeners, submit, preventDefault, input values"],
    ["Comprehensive review", "all beginner JavaScript topics"],
    ["Beginner final", "debugging, data flow, DOM projects, async preview"],
  ];

  const banks = {
    html: [
      concept("doctype", "<!DOCTYPE html>", "declares an HTML document", "It helps the browser use modern HTML rules."),
      concept("root element", "<html>", "wraps the entire HTML document", "The html element is the outer container."),
      concept("page information", "<head>", "holds page information that is not main page content", "The head contains metadata, links, and the title."),
      concept("visible page", "<body>", "holds the content shown in the browser window", "Visible headings, text, and controls belong in body."),
      concept("page title", "<title>", "sets the browser tab title", "The title appears in the browser tab and helps search tools."),
      concept("main heading", "<h1>", "creates the highest level page heading", "A clear h1 identifies the page topic."),
      concept("paragraph", "<p>", "creates a paragraph of text", "Paragraphs group related sentences."),
      concept("emphasis", "<em>", "adds meaningful emphasis", "Screen readers can communicate the emphasis."),
      concept("important text", "<strong>", "marks text as strongly important", "Strong adds meaning, not only bold appearance."),
      concept("link", "<a>", "creates a link", "The href attribute tells the link where to go."),
      concept("image", "<img>", "embeds an image", "The src attribute points to the image file."),
      concept("alternate text", "alt", "describes an image when it cannot be seen", "Useful alt text supports accessibility."),
      concept("unordered list", "<ul>", "contains a bulleted list", "Each item inside uses li."),
      concept("ordered list", "<ol>", "contains a numbered list", "Use it when item order matters."),
      concept("list item", "<li>", "creates one item in a list", "List items belong inside ul or ol."),
      concept("table row", "<tr>", "creates one table row", "Cells are placed inside each row."),
      concept("table header", "<th>", "creates a table heading cell", "Header cells describe a row or column."),
      concept("form label", "<label>", "names a form control", "A connected label makes the form easier to use."),
      concept("input", "<input>", "collects a short value from the user", "Its type changes the kind of value collected."),
      concept("button", "<button>", "creates a clickable control", "The button text should explain its action."),
      concept("navigation", "<nav>", "groups major navigation links", "Nav is a meaningful page landmark."),
      concept("main content", "<main>", "contains the primary page content", "A page should usually have one main landmark."),
      concept("section", "<section>", "groups a themed section of content", "A section commonly has its own heading."),
      concept("article", "<article>", "wraps content that can stand on its own", "Examples include a post or news story."),
      concept("footer", "<footer>", "contains footer information", "It often holds credits or related links."),
      concept("audio", "<audio>", "embeds sound", "Controls can let the user play and pause it."),
      concept("video", "<video>", "embeds video", "Source and controls make video usable."),
      concept("required input", "required", "prevents an empty form control from passing browser validation", "Required gives simple built in validation."),
      concept("unique label", "id", "gives one element a unique identifier", "JavaScript and labels can use an id."),
      concept("shared label", "class", "groups elements for shared styling or behavior", "Many elements can use the same class."),
    ],
    javascript: [
      concept("constant variable", "const", "declares a variable that cannot be reassigned", "The value inside an object may still change."),
      concept("changeable variable", "let", "declares a variable that can be reassigned", "Use let when the stored value needs to change."),
      concept("string", "string", "stores text", "Strings use quote marks."),
      concept("number", "number", "stores numeric values", "JavaScript uses one common number type."),
      concept("boolean", "boolean", "stores true or false", "Booleans are useful for yes or no states."),
      concept("strict equality", "===", "compares value and type", "Strict equality avoids automatic type conversion."),
      concept("decision", "if", "runs code when a condition is true", "An if statement chooses a path."),
      concept("alternate decision", "else", "runs when the if condition is false", "Else provides the other path."),
      concept("logical and", "&&", "requires both conditions to be true", "Both sides must pass."),
      concept("logical or", "||", "requires at least one condition to be true", "Either side may pass."),
      concept("for loop", "for", "repeats code with a controlled counter", "A for loop is useful when the repeat pattern is known."),
      concept("while loop", "while", "repeats while a condition remains true", "The condition must eventually change."),
      concept("function", "function", "groups reusable instructions", "Functions help avoid repeating logic."),
      concept("parameter", "parameter", "names an input a function receives", "Parameters are placeholders inside the function."),
      concept("return", "return", "sends a value back from a function", "Return also ends that function call."),
      concept("array", "[]", "stores an ordered collection", "Array positions begin at index zero."),
      concept("array length", ".length", "reports how many items are in an array", "Length is a count, while the last index is one less."),
      concept("add array item", ".push()", "adds an item to the end of an array", "Push changes the original array."),
      concept("array filter", ".filter()", "creates an array of items that pass a test", "Filter does not need to change the original array."),
      concept("object", "{}", "stores related values by property name", "Objects model one thing with several details."),
      concept("document", "document", "represents the current web page", "JavaScript uses document to find and change page elements."),
      concept("find by id", "getElementById", "finds one element by its id", "The requested id must match exactly."),
      concept("query selector", "querySelector", "finds the first element matching a CSS selector", "It accepts selectors such as .card or #menu."),
      concept("visible text", "textContent", "reads or changes visible text", "Assigning textContent updates what the user sees."),
      concept("CSS classes", "classList", "adds, removes, or toggles classes", "Classes let JavaScript trigger existing CSS styles."),
      concept("event listener", "addEventListener", "runs a function after an event", "Common events include click and submit."),
      concept("input value", ".value", "reads the current value of a form control", "The element itself and its value are different things."),
      concept("prevent form reload", "preventDefault", "stops a form's normal submit behavior", "JavaScript can then handle the data on the same page."),
      concept("saved browser data", "localStorage", "stores string data in the current browser", "JSON can convert arrays and objects to strings."),
      concept("JSON conversion", "JSON.stringify", "converts a value into JSON text", "The text can be saved in localStorage."),
    ],
  };

  function concept(topic, answer, meaning, explanation) {
    return { topic: topic, answer: answer, meaning: meaning, explanation: explanation };
  }

  function makeQuestion(conceptItem, form, language) {
    const wrongAnswers = banks[language]
      .filter(function (item) {
        return item.answer !== conceptItem.answer;
      })
      .slice(0, 3)
      .map(function (item) {
        return item.answer;
      });

    const base = {
      topic: conceptItem.topic,
      explanation: conceptItem.explanation,
      cardPrompt:
        "In " + displayLanguage(language) + ", {{" + conceptItem.answer + "}} " + conceptItem.meaning + ".",
      cardAnswer: conceptItem.answer,
    };

    if (form === 0) {
      return Object.assign(base, {
        type: "choice",
        prompt: "Which answer " + conceptItem.meaning + "?",
        options: shuffle([conceptItem.answer].concat(wrongAnswers)),
        answer: conceptItem.answer,
      });
    }

    if (form === 1) {
      return Object.assign(base, {
        type: "fill",
        prompt: "Fill in the blank: _____ " + conceptItem.meaning + ".",
        answer: conceptItem.answer,
      });
    }

    if (form === 2) {
      return Object.assign(base, {
        type: "choice",
        prompt: "True or false: " + conceptItem.answer + " " + conceptItem.meaning + ".",
        options: ["True", "False"],
        answer: "True",
      });
    }

    return Object.assign(base, {
      type: "choice",
      prompt: "Choose the best meaning of " + conceptItem.answer + ".",
      options: shuffle([
        conceptItem.meaning,
        "changes the browser theme automatically",
        "publishes the project to GitHub Pages",
        "deletes the current file",
      ]),
      answer: conceptItem.meaning,
    });
  }

  function getExam(language, examNumber) {
    const topics = language === "html" ? htmlTopics : javascriptTopics;
    const bank = banks[language];
    const start = ((examNumber - 1) * 3) % bank.length;
    const selected = [];

    for (let index = 0; index < 10; index += 1) {
      selected.push(bank[(start + index) % bank.length]);
    }

    const questions = [];
    selected.forEach(function (item, index) {
      questions.push(makeQuestion(item, (index + examNumber) % 4, language));
      questions.push(makeQuestion(item, (index + examNumber + 1) % 4, language));
    });

    return {
      language: language,
      languageName: displayLanguage(language),
      examNumber: examNumber,
      title: topics[examNumber - 1][0],
      description: topics[examNumber - 1][1],
      questions: questions,
      passingPercent: 80,
    };
  }

  function displayLanguage(language) {
    return language === "html" ? "HTML" : "JavaScript";
  }

  function shuffle(items) {
    return items
      .map(function (value, index) {
        return { value: value, sort: (index * 17 + value.length * 7) % 31 };
      })
      .sort(function (a, b) {
        return a.sort - b.sort;
      })
      .map(function (item) {
        return item.value;
      });
  }

  window.CodingHubExamData = {
    languages: {
      html: htmlTopics,
      javascript: javascriptTopics,
    },
    getExam: getExam,
  };
})();
