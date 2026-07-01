(function () {
  /* ── Topic lists (10 exams per language) ── */
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

  const cssTopics = [
    ["Selectors", "element, class, id selectors, specificity"],
    ["Box model", "margin, padding, border, content width, box-sizing"],
    ["Typography and color", "font-family, font-size, color, background-color"],
    ["Display and flow", "block, inline, inline-block, display none"],
    ["Flexbox", "flex container, justify-content, align-items, flex-wrap"],
    ["Grid", "grid-template-columns, gap, grid-column, grid-row"],
    ["Positioning", "static, relative, absolute, fixed, sticky, z-index"],
    ["Responsive design", "media queries, viewport, rem, mobile-first"],
    ["Comprehensive review", "all beginner CSS topics"],
    ["Beginner final", "cascade, specificity, layout, pseudo-classes"],
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

  const pythonTopics = [
    ["Variables and data types", "int, float, str, bool, variable assignment"],
    ["Strings and methods", "concatenation, len, upper, lower, f-strings"],
    ["Lists", "indexing, append, remove, slicing, list length"],
    ["Dictionaries", "key-value pairs, get, keys, values, update"],
    ["Control flow", "if, elif, else, comparison operators"],
    ["Loops", "for, while, range, break, continue"],
    ["Functions", "def, parameters, return, default arguments"],
    ["Modules and imports", "import, from-import, standard library"],
    ["Comprehensive review", "all beginner Python topics"],
    ["Beginner final", "debugging, logic, data structures, scope"],
  ];

  const sqlTopics = [
    ["SELECT basics", "SELECT, FROM, column aliases, DISTINCT"],
    ["Filtering with WHERE", "WHERE, AND, OR, LIKE, IS NULL, IN"],
    ["Sorting and limiting", "ORDER BY, ASC, DESC, LIMIT"],
    ["Aggregate functions", "COUNT, SUM, AVG, MIN, MAX"],
    ["GROUP BY and HAVING", "GROUP BY, HAVING, grouped aggregates"],
    ["JOINs", "INNER JOIN, LEFT JOIN, ON, table aliases"],
    ["Modifying data", "INSERT INTO, UPDATE, DELETE, WHERE safety"],
    ["Subqueries", "nested SELECT, IN with subquery, scalar subquery"],
    ["Comprehensive review", "all beginner SQL topics"],
    ["Beginner final", "debugging queries, join logic, aggregation review"],
  ];

  const typescriptTopics = [
    ["Type annotations", "string, number, boolean, type annotation syntax"],
    ["Interfaces and type aliases", "interface, type, optional properties, readonly"],
    ["Functions with types", "parameter types, return types, void"],
    ["Arrays and tuples", "typed arrays, tuple types, readonly arrays"],
    ["Union and intersection types", "union |, intersection &, type narrowing"],
    ["Generics", "generic functions, generic interfaces, type parameters"],
    ["Classes and access modifiers", "class, public, private, protected, constructor"],
    ["Enums and utility types", "enum, Partial, Required, Pick, Omit"],
    ["Comprehensive review", "all beginner TypeScript topics"],
    ["Beginner final", "type safety, strict mode, type assertions, refactoring"],
  ];

  const javaTopics = [
    ["Variables and primitives", "int, double, boolean, char, variable declaration"],
    ["Strings and methods", "String, length, charAt, equals, toUpperCase"],
    ["Control flow", "if, else if, else, switch, comparison operators"],
    ["Loops", "for, while, do-while, enhanced for"],
    ["Arrays", "array declaration, length, indexing, iteration"],
    ["Methods", "return type, parameters, overloading, static"],
    ["Classes and objects", "class, constructor, new, this, fields"],
    ["Inheritance", "extends, super, @Override, polymorphism"],
    ["Comprehensive review", "all beginner Java topics"],
    ["Beginner final", "debugging, OOP concepts, collections preview"],
  ];

  const csharpTopics = [
    ["Variables and types", "int, double, bool, string, var, const"],
    ["Strings and formatting", "string interpolation, Length, ToUpper, Trim"],
    ["Control flow", "if, else if, else, switch expression"],
    ["Loops", "for, foreach, while, break, continue"],
    ["Arrays and lists", "array declaration, List<T>, Add, Count"],
    ["Methods", "return type, parameters, void, static, overloading"],
    ["Classes and properties", "class, constructor, auto-property, get, set"],
    ["LINQ basics", "Where, Select, FirstOrDefault, OrderBy, ToList"],
    ["Comprehensive review", "all beginner C# topics"],
    ["Beginner final", "debugging, OOP patterns, null handling, async preview"],
  ];

  const goTopics = [
    ["Variables and types", "var, :=, int, string, bool, zero values"],
    ["Functions", "func, parameters, return types, multiple return values"],
    ["Control flow", "if, else, switch, no parentheses style"],
    ["Slices", "slice literals, append, len, cap, range"],
    ["Maps", "map declaration, get, set, delete, ok idiom"],
    ["Structs", "struct definition, field access, value vs pointer receiver"],
    ["Goroutines and channels", "go keyword, chan, send, receive, WaitGroup"],
    ["Error handling", "error type, nil error, defer, panic, recover"],
    ["Comprehensive review", "all beginner Go topics"],
    ["Beginner final", "idiomatic Go, interfaces, packages, exported names"],
  ];

  const swiftTopics = [
    ["Constants and variables", "let, var, type inference, explicit types"],
    ["Data types and optionals", "Int, Double, String, Bool, Optional, nil"],
    ["Control flow", "if, guard, switch, ternary, exhaustive switch"],
    ["Collections", "Array, Dictionary, Set, append, subscript"],
    ["Functions and closures", "func, argument labels, default values, closures"],
    ["Classes and structs", "class vs struct, properties, methods, initializers"],
    ["Protocols and extensions", "protocol, extension, conformance, computed properties"],
    ["Error handling", "throws, try, do-catch, Result type"],
    ["Comprehensive review", "all beginner Swift topics"],
    ["Beginner final", "ARC memory, optionals deep-dive, protocol-oriented design"],
  ];

  /* ── Question banks ── */
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
    css: [
      concept("element selector", "element", "targets HTML elements by their tag name", "Element selectors apply to every matching tag on the page."),
      concept("class selector", ".classname", "targets elements sharing a class attribute", "A dot precedes class names in CSS selectors."),
      concept("id selector", "#id", "targets a single element with a matching id", "Each id should be unique within a page."),
      concept("margin", "margin", "adds space outside an element's border", "Margins collapse between adjacent block elements."),
      concept("padding", "padding", "adds space between content and border", "Padding adds to the clickable or visible size."),
      concept("border", "border", "draws a line around an element", "Borders have a width, style, and color."),
      concept("background color", "background-color", "sets the background fill of an element", "Use a color name, hex value, or rgb value."),
      concept("text color", "color", "sets the foreground color of text", "Color applies to text and text decoration."),
      concept("font family", "font-family", "sets the typeface", "List fallback fonts separated by commas."),
      concept("font size", "font-size", "controls the size of text", "Use rem for sizes relative to the root font."),
      concept("display block", "block", "makes an element occupy a full line", "Block elements start on a new line by default."),
      concept("display inline", "inline", "lets elements sit side by side in text flow", "Inline elements do not start a new line."),
      concept("display flex", "flex", "turns an element into a flex container", "Children of the container become flex items."),
      concept("justify content", "justify-content", "aligns flex children along the main axis", "Values include flex-start, center, and space-between."),
      concept("align items", "align-items", "aligns flex children across the cross axis", "Center vertically in a flex row using align-items center."),
      concept("display grid", "grid", "turns an element into a grid container", "Grid allows two-dimensional layout control."),
      concept("grid columns", "grid-template-columns", "defines the number and size of columns", "Use fr units to create flexible-width columns."),
      concept("grid gap", "gap", "sets spacing between grid or flex children", "Gap replaces the older grid-gap property."),
      concept("position relative", "relative", "offsets an element from its normal position", "The element still occupies its original space."),
      concept("position absolute", "absolute", "removes an element from normal flow", "It positions relative to the nearest positioned ancestor."),
      concept("z-index", "z-index", "controls stacking order of positioned elements", "Higher values appear in front of lower ones."),
      concept("media query", "@media", "applies styles at specific viewport conditions", "Use min-width for mobile-first breakpoints."),
      concept("rem unit", "rem", "sets sizes relative to the root font size", "Rem scales predictably as the base font changes."),
      concept("border box sizing", "border-box", "includes padding and border in an element's width", "Border-box prevents layout surprises from added padding."),
      concept("hover pseudo-class", ":hover", "applies styles when the user's pointer is over an element", "Pseudo-classes target element states."),
      concept("flex wrap", "flex-wrap", "allows flex children to wrap to new lines", "Without wrap, flex items shrink to fit one line."),
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
    python: [
      concept("assignment", "=", "assigns a value to a variable name", "Python creates variables on first assignment."),
      concept("integer", "int", "stores whole numbers", "Python integers have no fixed size limit."),
      concept("float", "float", "stores decimal numbers", "Floats follow IEEE 754 double precision."),
      concept("string", "str", "stores text data", "Strings are immutable sequences of characters."),
      concept("boolean", "bool", "stores True or False", "Python booleans are a subtype of int."),
      concept("none value", "None", "represents the absence of a value", "None is Python's equivalent of null."),
      concept("string length", "len()", "returns the number of characters in a string", "len also works on lists, tuples, and dictionaries."),
      concept("uppercase", ".upper()", "converts a string to uppercase", "Upper returns a new string without modifying the original."),
      concept("f-string", "f-string", "embeds expressions directly inside a string literal", "Prefix the string with f and wrap expressions in braces."),
      concept("list", "list", "stores an ordered mutable collection", "Lists use square brackets and allow duplicates."),
      concept("list append", ".append()", "adds an item to the end of a list", "Append modifies the list in place."),
      concept("index access", "[0]", "accesses an item by its position", "Python list indexes start at zero."),
      concept("slice", "[start:stop]", "extracts a portion of a list or string", "The stop index is not included in the result."),
      concept("dictionary", "dict", "stores key-value pairs", "Dictionary keys must be unique and hashable."),
      concept("dict get", ".get()", "retrieves a value by key without raising an error", "Get returns None when the key is not found."),
      concept("conditional", "if", "runs a block only when a condition is true", "Python uses indentation instead of braces."),
      concept("additional condition", "elif", "checks another condition when the previous one is false", "Elif is short for else if."),
      concept("fallback", "else", "runs when no earlier condition matched", "An else block has no condition of its own."),
      concept("for loop", "for", "iterates over a sequence", "For loops work with any iterable object."),
      concept("range", "range()", "generates a sequence of numbers", "Range is commonly used to repeat code a set number of times."),
      concept("while loop", "while", "repeats a block while a condition is true", "The condition is checked before each iteration."),
      concept("function definition", "def", "defines a named function", "Functions group reusable code under one name."),
      concept("return value", "return", "sends a value back to the caller", "A function without return implicitly returns None."),
      concept("default parameter", "default argument", "gives a parameter a fallback value", "Default arguments must come after required parameters."),
      concept("import module", "import", "brings a module into the current file", "Use from to import specific names from a module."),
      concept("print", "print()", "outputs text to the console", "Print accepts multiple arguments separated by commas."),
      concept("type conversion", "int()", "converts a value to an integer", "Conversion raises an error if the value is not compatible."),
    ],
    sql: [
      concept("retrieve columns", "SELECT", "specifies which columns to return", "Use SELECT * to retrieve every column."),
      concept("source table", "FROM", "specifies the table to query", "Every SELECT statement needs a FROM clause."),
      concept("column alias", "AS", "renames a column or table in the output", "Aliases make output headers more readable."),
      concept("filter rows", "WHERE", "limits rows to those matching a condition", "WHERE is evaluated before GROUP BY."),
      concept("pattern match", "LIKE", "matches text using wildcard characters", "Use percent to match any sequence of characters."),
      concept("null check", "IS NULL", "tests whether a value is null", "Null cannot be compared with an equals sign."),
      concept("sort results", "ORDER BY", "sorts result rows by one or more columns", "Add DESC to reverse the sort direction."),
      concept("limit rows", "LIMIT", "restricts the number of returned rows", "Use LIMIT to page through large result sets."),
      concept("count rows", "COUNT()", "returns the number of matching rows", "COUNT(*) includes null values; COUNT(column) does not."),
      concept("sum values", "SUM()", "adds up numeric values in a column", "Sum ignores null values."),
      concept("average value", "AVG()", "calculates the mean of a numeric column", "AVG also ignores null values."),
      concept("group rows", "GROUP BY", "groups rows sharing a column value", "Aggregate functions apply to each group separately."),
      concept("filter groups", "HAVING", "filters groups produced by GROUP BY", "HAVING is like WHERE but applies after grouping."),
      concept("inner join", "INNER JOIN", "returns rows that have matches in both tables", "Rows without a match are excluded from the result."),
      concept("left join", "LEFT JOIN", "returns all rows from the left table", "Unmatched right-table columns are filled with null."),
      concept("join condition", "ON", "specifies how two tables are related in a join", "ON connects matching columns from each table."),
      concept("insert row", "INSERT INTO", "adds a new row to a table", "Provide column names and matching values."),
      concept("update row", "UPDATE", "modifies existing rows in a table", "Always use WHERE with UPDATE to avoid changing all rows."),
      concept("delete row", "DELETE FROM", "removes rows from a table", "Always use WHERE with DELETE to avoid removing all rows."),
      concept("unique values", "DISTINCT", "removes duplicate rows from the result", "Distinct applies across the whole selected row."),
      concept("in list", "IN", "checks whether a value matches any item in a list", "IN also works with a subquery result."),
      concept("between range", "BETWEEN", "tests whether a value falls within a range", "Between is inclusive of both boundary values."),
      concept("primary key", "PRIMARY KEY", "uniquely identifies each row in a table", "Primary keys cannot be null or duplicate."),
      concept("logical and", "AND", "requires all conditions to be true", "All AND conditions must pass for the row to match."),
      concept("logical or", "OR", "requires at least one condition to be true", "Any OR condition passing includes the row."),
      concept("subquery", "subquery", "nests one SELECT query inside another", "Subqueries can appear in SELECT, FROM, or WHERE."),
    ],
    typescript: [
      concept("type annotation", ": string", "declares the expected type of a variable", "Type annotations catch mismatches at compile time."),
      concept("number type", "number", "represents all numeric values", "TypeScript uses one number type for integers and decimals."),
      concept("string type", "string", "represents text values", "String variables hold immutable character sequences."),
      concept("boolean type", "boolean", "represents true or false values", "Boolean types prevent accidental truthy comparisons."),
      concept("any type", "any", "disables type checking for a variable", "Avoid any because it removes TypeScript's safety benefits."),
      concept("void type", "void", "indicates a function returns no value", "Void functions are used for side effects."),
      concept("unknown type", "unknown", "requires a type check before use", "Unknown is a safer alternative to any."),
      concept("interface", "interface", "defines the shape of an object", "Interfaces describe required properties and methods."),
      concept("type alias", "type", "creates a named shorthand for a type", "Type aliases work well for union and intersection types."),
      concept("optional property", "?", "marks a property as not required", "Optional properties may be undefined."),
      concept("readonly property", "readonly", "prevents reassignment after initialization", "Readonly works on properties and array types."),
      concept("union type", "|", "allows a value to be one of several types", "Union types narrow with type guards."),
      concept("intersection type", "&", "combines multiple types into one", "An intersection requires all combined types to be satisfied."),
      concept("generic type parameter", "<T>", "defines a type filled in at the point of use", "Generics let functions work with any type safely."),
      concept("typed array", "string[]", "annotates an array with a specific item type", "Write string[] for an array of strings."),
      concept("tuple type", "tuple", "defines an array with fixed types at each position", "Tuples enforce position-specific types."),
      concept("enum", "enum", "defines a named set of constant values", "Enums improve readability over raw numbers or strings."),
      concept("class", "class", "defines a blueprint for objects", "TypeScript classes support types on all members."),
      concept("private modifier", "private", "restricts a class member to the class itself", "Public is the default when no modifier is given."),
      concept("type assertion", "as", "tells TypeScript to treat a value as a specific type", "Assertions do not change the runtime value."),
      concept("non-null assertion", "!", "tells TypeScript a value is not null or undefined", "Use only when you are certain the value exists."),
      concept("extends keyword", "extends", "inherits properties from another interface or class", "Extends allows type reuse and specialization."),
      concept("typeof guard", "typeof", "checks the type of a value at runtime", "TypeScript uses typeof to narrow types in branches."),
      concept("strict mode", "strict", "enables a set of recommended type checks", "Strict mode is on by default in most TypeScript setups."),
      concept("return type annotation", ": void", "annotates what a function returns", "The return type appears after the parameter list."),
      concept("Partial utility", "Partial<T>", "makes every property of a type optional", "Utility types transform existing types."),
    ],
    java: [
      concept("integer type", "int", "stores whole numbers up to about two billion", "Use long when larger values are needed."),
      concept("decimal type", "double", "stores decimal numbers", "Double is the default floating-point type in Java."),
      concept("text type", "String", "stores a sequence of characters", "Strings are objects in Java, not primitives."),
      concept("boolean type", "boolean", "stores true or false", "Booleans are used in conditions and loops."),
      concept("constant", "final", "prevents a variable from being reassigned", "Final on a method prevents overriding in subclasses."),
      concept("class definition", "class", "defines a new type with fields and methods", "All Java code lives inside a class."),
      concept("main method", "main", "is the entry point of a Java application", "The JVM calls main to start execution."),
      concept("print output", "System.out.println", "prints a line to the console", "The ln suffix adds a newline at the end."),
      concept("if statement", "if", "runs a block only when a condition is true", "Curly braces group the conditional block."),
      concept("else branch", "else", "runs when the if condition is false", "Else must immediately follow the if block."),
      concept("for loop", "for", "repeats with an initializer, condition, and update", "For loops are common when the count is known."),
      concept("while loop", "while", "repeats while a condition is true", "The condition is checked before each iteration."),
      concept("array declaration", "[]", "stores a fixed-size sequence of values", "Java array length is set at creation and cannot change."),
      concept("array length", ".length", "returns the number of elements in an array", "Length is a field, not a method, on arrays."),
      concept("enhanced for", "for-each", "iterates over every element in an array or collection", "For-each is cleaner when the index is not needed."),
      concept("method", "method", "defines reusable behavior inside a class", "Methods have a return type, name, and parameters."),
      concept("return statement", "return", "exits a method and optionally sends back a value", "The returned type must match the method declaration."),
      concept("constructor", "constructor", "initializes a new object when it is created", "Constructors share the class name and have no return type."),
      concept("object creation", "new", "creates an instance of a class", "New calls the constructor and allocates memory."),
      concept("inheritance", "extends", "creates a subclass that inherits a parent class", "Subclasses add or override behavior."),
      concept("override annotation", "@Override", "marks that a method replaces a parent method", "The annotation helps catch naming errors at compile time."),
      concept("interface implementation", "implements", "pledges to fulfill an interface contract", "A class can implement multiple interfaces."),
      concept("public visibility", "public", "makes a member accessible from any class", "Private restricts access to the same class."),
      concept("resizable list", "ArrayList", "stores a resizable ordered collection", "ArrayLists grow automatically as items are added."),
      concept("null value", "null", "represents the absence of an object reference", "Dereferencing null throws a NullPointerException."),
      concept("equality check", ".equals()", "compares the content of two String objects", "Use equals instead of == to compare String values."),
    ],
    csharp: [
      concept("integer type", "int", "stores whole numbers", "Int is an alias for System.Int32."),
      concept("decimal type", "double", "stores double-precision decimal numbers", "Use decimal for financial calculations to avoid rounding."),
      concept("text type", "string", "stores a sequence of characters", "C# strings are immutable reference types."),
      concept("boolean type", "bool", "stores true or false", "Bool is an alias for System.Boolean."),
      concept("compile-time constant", "const", "declares a value that cannot change", "Const values are substituted at compile time."),
      concept("runtime readonly", "readonly", "prevents reassignment after the constructor", "Readonly is useful for fields set once at runtime."),
      concept("type inference", "var", "infers the type from the assigned value", "Var requires initialization at declaration."),
      concept("class", "class", "defines a reference type with fields and methods", "Classes support inheritance and polymorphism."),
      concept("value type", "struct", "defines a value type with fields and methods", "Structs are copied on assignment."),
      concept("auto property", "{ get; set; }", "exposes a field with controlled access", "Auto-properties generate a backing field automatically."),
      concept("if statement", "if", "runs code when a condition is true", "Curly braces group the conditional block."),
      concept("switch", "switch", "selects between multiple cases", "C# switch expressions can return values directly."),
      concept("for loop", "for", "repeats with a counter variable", "For is common when the number of iterations is known."),
      concept("foreach loop", "foreach", "iterates over each element in a collection", "Foreach works with any IEnumerable."),
      concept("while loop", "while", "repeats while a condition is true", "The condition is checked before each iteration."),
      concept("method", "method", "groups reusable statements under a name", "Methods belong to a class or struct."),
      concept("return", "return", "exits a method and sends back a value", "Void methods can use return with no value."),
      concept("constructor", "constructor", "initializes a new object", "Constructors match the class name and have no return type."),
      concept("inheritance", ":", "makes a class inherit from a base class", "Use the colon to declare a base class in C#."),
      concept("method override", "override", "replaces a virtual parent method", "The parent method must be marked virtual or abstract."),
      concept("interface", "interface", "defines a contract of methods and properties", "Interfaces enable polymorphism without shared code."),
      concept("generic list", "List<T>", "stores a resizable typed collection", "Lists grow automatically as items are added."),
      concept("LINQ filter", ".Where()", "filters a collection using a predicate", "LINQ works on any IEnumerable source."),
      concept("LINQ transform", ".Select()", "transforms each item in a collection", "Select returns an IEnumerable of the transformed values."),
      concept("string interpolation", "$\"\"", "embeds expressions directly in a string", "Prefix a string with a dollar sign to use interpolation."),
      concept("null coalescing", "??", "returns the right value when the left is null", "Null coalescing avoids verbose null checks."),
    ],
    go: [
      concept("variable declaration", "var", "declares a variable with an explicit type", "Go requires all declared variables to be used."),
      concept("short variable declaration", ":=", "declares and initializes a variable in one step", "Short declarations infer the type from the value."),
      concept("integer type", "int", "stores whole numbers", "Go's int size matches the platform word size."),
      concept("string type", "string", "stores immutable text", "Go strings are byte slices encoded in UTF-8."),
      concept("boolean type", "bool", "stores true or false", "Go uses the words true and false."),
      concept("function keyword", "func", "defines a named function", "Go functions can return multiple values."),
      concept("multiple return values", "multiple return values", "allows a function to return more than one value", "A common pattern returns a result and an error together."),
      concept("error type", "error", "represents a problem a function encountered", "Return error as the last value by convention."),
      concept("nil", "nil", "represents the zero value for pointers, slices, and maps", "A nil error means no error occurred."),
      concept("if statement", "if", "runs code when a condition is true", "Go if statements do not require parentheses."),
      concept("for loop", "for", "is the only loop keyword in Go", "For can behave like a while loop with just a condition."),
      concept("range", "range", "iterates over elements in a slice, map, or channel", "Range returns an index and value on each iteration."),
      concept("slice", "slice", "stores a variable-length sequence of typed values", "Slices are backed by an underlying array."),
      concept("append", "append()", "adds elements to a slice", "Append may allocate a new backing array when needed."),
      concept("map", "map", "stores key-value pairs with typed keys and values", "Maps are reference types in Go."),
      concept("struct", "struct", "groups related fields under one type", "Structs are value types and do not support inheritance."),
      concept("method receiver", "method receiver", "associates a function with a struct type", "Use a pointer receiver to modify the struct."),
      concept("pointer", "*", "holds the memory address of a value", "Pass a pointer to let a function modify the original value."),
      concept("goroutine", "go", "launches a function concurrently", "Goroutines are lightweight managed threads."),
      concept("channel", "chan", "passes values between goroutines safely", "Channels synchronize goroutine communication."),
      concept("defer", "defer", "schedules a function call when the surrounding function returns", "Defer is often used to close resources cleanly."),
      concept("package declaration", "package", "declares which package a file belongs to", "Code in the same package can access unexported names."),
      concept("import", "import", "brings external packages into scope", "Use double quotes around the package path."),
      concept("interface", "interface", "defines a set of method signatures", "Go interfaces are satisfied implicitly."),
      concept("exported name", "capital letter", "makes an identifier visible outside its package", "Names starting with a lowercase letter are unexported."),
      concept("blank identifier", "_", "discards an unwanted value from a function return", "Using _ avoids the unused variable compiler error."),
    ],
    swift: [
      concept("constant", "let", "declares an immutable value", "Prefer let over var whenever the value will not change."),
      concept("variable", "var", "declares a mutable variable", "Use var when the value needs to be reassigned."),
      concept("integer type", "Int", "stores whole numbers", "Swift's Int size matches the current platform."),
      concept("decimal type", "Double", "stores double-precision decimals", "Double is the default floating-point type in Swift."),
      concept("string type", "String", "stores a sequence of Unicode characters", "Swift strings are value types."),
      concept("boolean type", "Bool", "stores true or false", "Swift enforces that conditions must be Bool."),
      concept("optional type", "Optional", "wraps a value that may be absent", "Declare an optional with a question mark after the type."),
      concept("optional binding", "if let", "safely unwraps an optional value", "The body only runs when the optional contains a value."),
      concept("force unwrap", "!", "unwraps an optional without a safety check", "Force unwrapping crashes if the value is nil."),
      concept("nil", "nil", "represents the absence of an optional value", "Nil can only be assigned to optional types."),
      concept("string interpolation", "\\()", "embeds an expression inside a string literal", "Wrap the expression in backslash and parentheses."),
      concept("if statement", "if", "runs code when a condition is true", "Swift if statements do not require parentheses."),
      concept("guard statement", "guard", "exits early when a condition is not met", "Guard keeps the happy path at the top level."),
      concept("switch statement", "switch", "evaluates a value against multiple patterns", "Swift switch must cover every case."),
      concept("for-in loop", "for-in", "iterates over a sequence or range", "For-in works on arrays, ranges, and dictionaries."),
      concept("while loop", "while", "repeats while a condition is true", "The condition is checked before each iteration."),
      concept("function keyword", "func", "defines a named function", "Swift functions can have labeled arguments."),
      concept("argument label", "argument label", "provides an external name for a parameter", "Labels make call sites read like natural language."),
      concept("closure", "closure", "captures and stores a block of code", "Closures can capture values from their surrounding scope."),
      concept("array", "Array", "stores an ordered collection of typed values", "Swift arrays are value types."),
      concept("dictionary", "Dictionary", "stores key-value pairs", "Keys must be hashable in Swift dictionaries."),
      concept("class keyword", "class", "defines a reference type with methods and properties", "Classes support inheritance in Swift."),
      concept("struct keyword", "struct", "defines a value type with methods and properties", "Structs are copied on assignment and cannot inherit."),
      concept("protocol", "protocol", "defines required properties and methods", "Types conform to protocols to gain a capability."),
      concept("extension", "extension", "adds methods and properties to an existing type", "Extensions can conform a type to a protocol."),
      concept("throws keyword", "throws", "marks a function that can produce an error", "Call throwing functions with try inside do-catch."),
    ],
  };

  /* ── Language display names ── */
  const displayNames = {
    html: "HTML",
    css: "CSS",
    javascript: "JavaScript",
    python: "Python",
    sql: "SQL",
    typescript: "TypeScript",
    java: "Java",
    csharp: "C#",
    go: "Go",
    swift: "Swift",
  };

  /* ── Topics lookup ── */
  const allTopics = {
    html: htmlTopics,
    css: cssTopics,
    javascript: javascriptTopics,
    python: pythonTopics,
    sql: sqlTopics,
    typescript: typescriptTopics,
    java: javaTopics,
    csharp: csharpTopics,
    go: goTopics,
    swift: swiftTopics,
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
    const topics = allTopics[language];
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
    return displayNames[language] || language;
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
    languages: allTopics,
    getExam: getExam,
    getLanguageName: displayLanguage,
  };
})();
