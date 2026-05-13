import { useState } from "react";

const labs = [
  {
    id: 7,
    title: "PL/pgSQL Basics",
    emoji: "🧱",
    color: "#FF6B35",
    tagline: "Block Processing, Conditional Statements (IF/ELSE, CASE), and Loops",
    sections: [
      {
        title: "Overview of PL/pgSQL",
        type: "concept",
        content: `**PL/pgSQL** is a procedural programming language for the PostgreSQL database system. It allows you to extend the functionality of the database server by creating complex logic like functions, stored procedures, and triggers.

Advantages:
• Wrap multiple SQL statements into a single block/object on the server.
• Reduce network round trips between the application and database.
• Add control structures like IF, CASE, and LOOPs which standard SQL lacks.`
      },
      {
        title: "Block Structure",
        type: "syntax",
        content: `PL/pgSQL is a block-structured language. Every block has an optional declaration section and a required body section.`,
        commands: [
          {
            label: "Anonymous Block Example",
            code: `do $$
<<first_block>>
declare
  film_count integer := 0;
begin
  -- get the number of films
  select count(*)
  into film_count
  from film;
  
  -- display a message
  raise notice 'The number of films is %', film_count;
end first_block $$;`,
            note: "Use 'do $$' to execute an anonymous block. The 'raise notice' is used to output messages. Variables are declared in the 'declare' section."
          }
        ]
      },
      {
        title: "Conditional Statements (IF/ELSE)",
        type: "syntax",
        content: `PL/pgSQL supports standard IF-THEN, IF-THEN-ELSE, and IF-THEN-ELSIF structures.`,
        commands: [
          {
            label: "IF-THEN Example",
            code: `if not found then
  raise notice 'The film % could not be found', input_film_id;
end if;`,
            note: "Executes statements only if a boolean condition evaluates to true."
          },
          {
            label: "IF-THEN-ELSE Example",
            code: `if not found then
  raise notice 'The film % could not be found', input_film_id;
else
  raise notice 'The film title is %', selected_film.title;
end if;`,
            note: "The 'found' variable is a global boolean that is true if the last SELECT INTO statement returned a row."
          },
          {
            label: "IF-THEN-ELSIF Example",
            code: `if v_film.length > 0 and v_film.length <= 50 then
  len_description := 'Short';
elsif v_film.length > 50 and v_film.length < 120 then
  len_description := 'Medium';
else
  len_description := 'Long';
end if;`,
            note: "Notice it's spelled 'elsif' (no second 'e')."
          }
        ]
      },
      {
        title: "CASE Statements",
        type: "syntax",
        content: `Like IF statements, CASE allows executing a block of code based on conditions. There are two forms: Simple CASE and Searched CASE.`,
        commands: [
          {
            label: "Simple CASE",
            code: `case rate
  when 0.99 then
    price_segment = 'Mass';
  when 2.99 then
    price_segment = 'Mainstream';
  else
    price_segment = 'Unspecified';
end case;`,
            note: "Compares a single expression (rate) against various values."
          },
          {
            label: "Searched CASE",
            code: `case
  when total_payment > 200 then
    service_level = 'Platinum';
  when total_payment > 100 then
    service_level = 'Gold';
  else
    service_level = 'Silver';
end case;`,
            note: "Evaluates boolean expressions directly in each WHEN clause."
          }
        ]
      },
      {
        title: "Loops (WHILE, LOOP, FOR)",
        type: "syntax",
        content: `PL/pgSQL supports multiple loop types, including unconditional LOOP, WHILE loops, and FOR loops (for iterating over ranges or query results).`,
        commands: [
          {
            label: "WHILE Loop",
            code: `do $$
declare
  counter integer := 0;
begin
  while counter < 5 loop
    raise notice 'Counter %', counter;
    counter := counter + 1;
  end loop;
end $$;`,
            note: "The loop continues as long as the condition evaluates to true."
          },
          {
            label: "FOR Loop (Integer Range)",
            code: `do $$
begin
  for counter in 1..5 loop
    raise notice 'Counter %', counter;
  end loop;
  
  -- Reverse loop example:
  for counter in reverse 5..1 loop
    raise notice 'Countdown %', counter;
  end loop;
end $$;`,
            note: "Automatically declares the integer variable and iterates over the specified range."
          },
          {
            label: "FOR Loop (Iterating Query Results)",
            code: `do $$
declare
  rec record;
begin
  for rec in select title, length from film where length > 180 loop
    raise notice 'Epic Film: % (Length: % min)', rec.title, rec.length;
  end loop;
end $$;`,
            note: "Fetches each row from the query directly into the 'rec' variable. Very useful for processing result sets without explicit cursors!"
          },
          {
            label: "Unconditional LOOP",
            code: `loop
  fib := i;
  exit when counter = n;
  counter := counter + 1;
  SELECT j, i+j INTO i, j;
end loop;`,
            note: "An unconditional loop that requires an 'exit' or 'return' statement to terminate."
          }
        ]
      },
      {
        title: "Exception Handling",
        type: "syntax",
        content: `PL/pgSQL allows you to catch and handle errors gracefully using the EXCEPTION block, preventing the entire transaction from aborting unnecessarily.`,
        commands: [
          {
            label: "Catching Exceptions",
            code: `do $$
declare
  v_film_id integer := -1;
begin
  -- This will intentionally fail (assuming film_id must be > 0)
  insert into film (film_id, title) values (v_film_id, 'Test Film');
exception
  when unique_violation then
    raise notice 'A film with this ID already exists!';
  when others then
    raise notice 'An unexpected error occurred: %', SQLERRM;
end $$;`,
            note: "The EXCEPTION block catches errors. 'when others' is the catch-all. SQLERRM holds the error message."
          }
        ]
      }
    ],
    quiz: [
      { q: "What is the difference between PL/pgSQL and standard SQL?", a: "SQL is declarative (querying data), while PL/pgSQL is procedural (adds IF/ELSE, loops, variables, and block processing to SQL)." },
      { q: "What does the 'FOUND' variable do?", a: "It's a special boolean variable in PL/pgSQL that returns TRUE if the last SELECT INTO or DML statement affected/returned at least one row." },
      { q: "How do you output a message to the console in PL/pgSQL?", a: "Using the RAISE NOTICE 'message here', variables; statement." },
      { q: "What keyword is used to break out of an unconditional LOOP?", a: "The EXIT keyword." },
      { q: "How can you loop through the results of a SELECT query directly without declaring a cursor?", a: "Using a FOR loop: FOR rec IN SELECT ... LOOP." },
      { q: "How do you declare a variable with the exact same type as a column in a table?", a: "Using %TYPE. For example: my_var film.film_id%TYPE;" },
      { q: "How do you handle errors in PL/pgSQL without aborting the transaction?", a: "By using an EXCEPTION block (e.g., EXCEPTION WHEN others THEN ...)." }
    ]
  },
  {
    id: 8,
    title: "Cursors, Functions, Procedures",
    emoji: "⚙️",
    color: "#3498DB",
    tagline: "Handling large result sets and encapsulating reusable logic",
    sections: [
      {
        title: "Cursors",
        type: "concept",
        content: `A **Cursor** is a pointer to a result set of a query. Instead of executing a whole query at once and loading everything into memory, a cursor allows you to fetch rows one by one (or in batches). This is highly efficient for processing large datasets in PL/pgSQL.

Steps to use a cursor:
1. Declare the cursor
2. Open the cursor
3. Fetch rows from the cursor into variables
4. Close the cursor`
      },
      {
        title: "Working with Cursors",
        type: "syntax",
        commands: [
          {
            label: "Declaring Cursors",
            code: `declare
  -- Unbound cursor
  cur_films cursor for select * from film;
  
  -- Bound cursor (takes arguments)
  cur_films2 cursor (year integer) for 
    select * from film where release_year = year;`,
            note: "Declared in the DECLARE section. Can be unbound (static) or bound (accepts parameters)."
          },
          {
            label: "Opening, Fetching, and Closing",
            code: `open cur_films;
fetch cur_films into row_film;
close cur_films;`,
            note: "Always close your cursors to free up memory! Fetching is done into a variable representing the row."
          }
        ]
      },
      {
        title: "Functions",
        type: "syntax",
        content: `Functions encapsulate logic and **must return a value**. They are typically used for computations or formatting data and can be called directly within SQL SELECT statements.`,
        commands: [
          {
            label: "CREATE FUNCTION",
            code: `create function get_film_count(len_from int, len_to int)
returns int
language plpgsql
as
$$
declare
  film_count integer;
begin
  select count(*) into film_count
  from film
  where length between len_from and len_to;
  
  return film_count;
end;
$$;`,
            note: "Must specify RETURNS type and RETURN a value. Can be used like: SELECT get_film_count(90, 120);"
          }
        ]
      },
      {
        title: "Stored Procedures",
        type: "syntax",
        content: `Stored Procedures are similar to functions but with key differences:
• They **do not return a value** (cannot use the RETURN expression statement).
• They can manage transactions (you can use COMMIT and ROLLBACK inside them).
• You execute them using the CALL statement, not SELECT.`,
        commands: [
          {
            label: "CREATE PROCEDURE",
            code: `create or replace procedure transfer(sender int, receiver int, amount dec)
language plpgsql
as $$
begin
  update accounts set balance = balance - amount where id = sender;
  update accounts set balance = balance + amount where id = receiver;
  commit;
end; $$`,
            note: "To run this: CALL transfer(1, 2, 1000);"
          }
        ]
      },
      {
        title: "Functions vs Procedures",
        type: "comparison",
        items: [
          { label: "Functions", desc: "MUST return a value. Used in SELECT statements. Cannot contain COMMIT or ROLLBACK.", color: "#3498DB" },
          { label: "Procedures", desc: "DO NOT return a value. Called using CALL. Can manage transactions (COMMIT/ROLLBACK).", color: "#E67E22" }
        ]
      }
    ],
    quiz: [
      { q: "Why use a cursor instead of a normal SELECT?", a: "Cursors fetch rows one by one instead of loading the entire result set into memory at once, preventing memory overflow on massive tables." },
      { q: "What is the primary difference between a Function and a Procedure?", a: "Functions MUST return a value and cannot manage transactions. Procedures do not return a value but can execute COMMIT and ROLLBACK." },
      { q: "How do you execute a stored procedure?", a: "Using the CALL statement (e.g., CALL my_procedure();)" },
      { q: "How do you execute a function?", a: "Using a SELECT statement (e.g., SELECT my_function();)" },
      { q: "What are the 4 steps of using a cursor?", a: "1) Declare, 2) Open, 3) Fetch, 4) Close." }
    ]
  },
  {
    id: 9,
    title: "Triggers, Views, Indexes",
    emoji: "⚡",
    color: "#9B59B6",
    tagline: "Automated actions, virtual tables, and query optimization",
    sections: [
      {
        title: "Triggers",
        type: "concept",
        content: `A **Trigger** is a special user-defined function that is invoked automatically whenever a specific event (INSERT, UPDATE, DELETE, or TRUNCATE) occurs on a table or view.

They are useful for:
• Enforcing complex business rules
• Logging changes (auditing)
• Automatically updating related tables

You define a trigger in two steps:
1. Create a trigger function (must return 'trigger')
2. Bind the function to a table using CREATE TRIGGER.`
      },
      {
        title: "Creating Triggers",
        type: "syntax",
        commands: [
          {
            label: "1. Create Trigger Function",
            code: `CREATE OR REPLACE FUNCTION log_last_name_changes()
RETURNS TRIGGER
LANGUAGE PLPGSQL
AS $$
BEGIN
  IF NEW.last_name <> OLD.last_name THEN
    INSERT INTO employee_audits(employee_id, last_name, changed_on)
    VALUES(OLD.id, OLD.last_name, now());
  END IF;
  RETURN NEW;
END;
$$;`,
            note: "NEW and OLD are special variables representing the row state after and before the event."
          },
          {
            label: "2. Create the Trigger",
            code: `CREATE TRIGGER last_name_changes
  BEFORE UPDATE
  ON employees
  FOR EACH ROW
  EXECUTE PROCEDURE log_last_name_changes();`,
            note: "Fires BEFORE the update on 'employees' table, executing the function for each modified row."
          }
        ]
      },
      {
        title: "Views",
        type: "concept",
        content: `A **View** is a virtual table representing the result of a stored query. It does not store data physically (unless it's a materialized view).

Use cases:
• Simplify complex queries (hide joins)
• Security: restrict access to specific columns or rows
• Provide a consistent interface even if underlying tables change.`
      },
      {
        title: "Working with Views",
        type: "syntax",
        commands: [
          {
            label: "CREATE VIEW",
            code: `CREATE VIEW usa_cities AS 
SELECT city, country_id FROM city WHERE country_id = 103;`,
            note: "Now you can query this just like a table: SELECT * FROM usa_cities;"
          },
          {
            label: "DROP VIEW",
            code: `DROP VIEW IF EXISTS customer_master;`,
            note: "Removes the view without affecting the underlying tables."
          }
        ]
      },
      {
        title: "Indexes",
        type: "concept",
        content: `An **Index** is a data structure (like a book's index) that improves the speed of data retrieval operations on a table at the cost of additional storage space and slower writes (INSERT/UPDATE/DELETE).

PostgreSQL Index Types:
• **B-Tree**: Default. Great for equality and range queries (<, <=, =, >=, >).
• **Hash**: Only handles simple equality (=).
• **GIN**: Generalized Inverted Index. Good for arrays, JSONB, full-text search.
• **GiST**: Good for geometric/spatial data (GIS).
• **BRIN**: Block Range Index. Very small, used for massive tables with naturally ordered data.`
      },
      {
        title: "Creating Indexes",
        type: "syntax",
        commands: [
          {
            label: "CREATE INDEX",
            code: `CREATE INDEX idx_address_phone ON address(phone);

-- Unique Index Example:
CREATE UNIQUE INDEX idx_employees_mobile_phone ON employees (mobile_phone);`,
            note: "If USING is omitted, PostgreSQL defaults to B-Tree. Unique indexes enforce uniqueness."
          }
        ]
      },
      {
        title: "Advanced Indexes & Materialized Views",
        type: "syntax",
        content: `PostgreSQL supports advanced optimizations like Materialized Views (which cache view results) and Partial/Expression Indexes.`,
        commands: [
          {
            label: "Materialized Views",
            code: `CREATE MATERIALIZED VIEW monthly_sales AS
SELECT date_trunc('month', payment_date) as month, sum(amount) as total
FROM payment GROUP BY 1;

-- To update the data later:
REFRESH MATERIALIZED VIEW monthly_sales;`,
            note: "Unlike regular views, materialized views actually store the data on disk, making reads extremely fast at the cost of needing manual refreshes."
          },
          {
            label: "Partial & Expression Indexes",
            code: `-- Expression Index (indexes the lowercase version of email)
CREATE INDEX idx_lower_email ON customers (LOWER(email));

-- Partial Index (only indexes active customers, saving space)
CREATE INDEX idx_active_customers ON customers (status)
WHERE status = 'Active';`,
            note: "Partial indexes save disk space and improve performance for specific query patterns."
          }
        ]
      }
    ],
    quiz: [
      { q: "What two steps are required to implement a trigger in PostgreSQL?", a: "1) Create a function that returns a TRIGGER, and 2) Create the trigger itself attached to a table and event." },
      { q: "What do the 'NEW' and 'OLD' variables represent in a trigger function?", a: "OLD represents the row data before the operation (available in UPDATE/DELETE). NEW represents the row data after the operation (available in INSERT/UPDATE)." },
      { q: "What is a View?", a: "A stored SQL query that acts as a virtual table. It simplifies complex queries and can enforce security." },
      { q: "What is the default Index type in PostgreSQL and what is it good for?", a: "B-Tree. It is excellent for sorting, equality matches (=), and range queries (<, >, BETWEEN)." },
      { q: "What is the downside of creating too many indexes?", a: "While they speed up SELECT queries (reads), they consume disk space and slow down INSERT, UPDATE, and DELETE operations (writes) because the index must be updated every time data changes." },
      { q: "What is the difference between a standard View and a Materialized View?", a: "A standard view runs the underlying query every time it is accessed. A materialized view saves the query result to disk, requiring a REFRESH to update the data, but offering much faster reads." },
      { q: "What is a Partial Index?", a: "An index built with a WHERE clause, indexing only a subset of rows in a table to save space and improve performance for specific queries." }
    ]
  },
  {
    id: 10,
    title: "PostgreSQL vs MongoDB",
    emoji: "🍃",
    color: "#27AE60",
    tagline: "Comparing Relational (SQL) and NoSQL Document Databases",
    sections: [
      {
        title: "What is MongoDB?",
        type: "concept",
        content: `MongoDB is a **NoSQL Document Database**. It stores data in flexible, JSON-like documents (BSON) rather than rigid rows and columns.

Key characteristics:
• **Schema-free**: Documents in the same collection don't need to have identical structures.
• **Distributed architecture**: Built to scale out natively (sharding) across multiple servers.
• Great for unstructured data, rapid prototyping, and high-volume data.`
      },
      {
        title: "PostgreSQL vs MongoDB",
        type: "table",
        rows: [
          ["Database Type", "Relational Database (RDBMS)", "Document Database (NoSQL)"],
          ["Data Structure", "Tables, Rows, Columns (Strict Schema)", "Collections, Documents, Fields (Schema-free)"],
          ["Query Language", "SQL (Structured Query Language)", "MQL (MongoDB Query Language - JSON based)"],
          ["Relationships", "Foreign Keys, JOINs", "Embedded Documents, References ($lookup)"],
          ["Architecture", "Monolithic (Scales Vertically)", "Distributed (Scales Horizontally natively)"]
        ]
      },
      {
        title: "SQL to MongoDB Mapping",
        type: "table",
        rows: [
          ["Table", "Collection"],
          ["Row", "Document"],
          ["Column", "Field"],
          ["Primary Key", "_id field (Object ID)"],
          ["Index", "Index"],
          ["View", "View"]
        ]
      },
      {
        title: "CRUD Operations Comparison",
        type: "syntax",
        commands: [
          {
            label: "INSERT Data",
            code: `-- PostgreSQL
CREATE TABLE users (user_id VARCHAR(20)...);
INSERT INTO users (user_id, age, status) VALUES ('bcd001', 45, 'A');

// MongoDB
db.createCollection("users");
db.users.insertOne({user_id: "bcd001", age: 45, status: "A"})`,
            note: "MongoDB automatically creates an '_id' field if not provided. Also implicitly creates the collection if it doesn't exist."
          },
          {
            label: "SELECT / FIND Data",
            code: `-- PostgreSQL
SELECT * FROM users;
SELECT * FROM people WHERE status = 'A';

// MongoDB
db.users.find()
db.people.find({ status: "A"})`,
            note: "MongoDB's find() method takes a JSON object specifying the filter."
          },
          {
            label: "UPDATE Data",
            code: `-- PostgreSQL
UPDATE users SET status = 'C' WHERE age > 25;

// MongoDB
db.users.updateOne({age: { $gt: 25 } }, {$set: { status: "C" } }, { multi: true })`,
            note: "$gt is the MongoDB operator for 'Greater Than'."
          },
          {
            label: "DELETE Data",
            code: `-- PostgreSQL
DELETE FROM people WHERE status = 'D';

// MongoDB
db.people.deleteMany({ status: "D"})`,
            note: "deleteMany removes all matching documents."
          }
        ]
      },
      {
        title: "Aggregation Pipeline Mapping",
        type: "syntax",
        content: `MongoDB handles complex queries (GROUP BY, joins) using the **Aggregation Pipeline**. Data passes through multiple stages, being transformed at each stage.`,
        commands: [
          {
            label: "SQL vs Mongo Aggregation Terms",
            code: `WHERE      =>  $match
GROUP BY   =>  $group
HAVING     =>  $match (after group)
ORDER BY   =>  $sort
SUM()      =>  $sum
COUNT()    =>  $sum: 1 / $sortByCount
JOIN       =>  $lookup`,
            note: "The pipeline consists of an array of objects: db.collection.aggregate([ {stage1}, {stage2} ])"
          },
          {
            label: "GROUP BY Example",
            code: `-- PostgreSQL
SELECT COUNT(*) AS count FROM orders;

// MongoDB
db.orders.aggregate([ { $group: { _id: null, count: { $sum: 1} } } ])`,
            note: "Notice how the operations flow sequentially in Mongo using the aggregation pipeline."
          }
        ]
      },
      {
        title: "JSONB in PostgreSQL",
        type: "syntax",
        content: `PostgreSQL actually has robust NoSQL capabilities through the **JSONB** data type, blurring the lines between relational and document databases.`,
        commands: [
          {
            label: "Using JSONB",
            code: `-- Creating a table with a JSONB column
CREATE TABLE user_profiles (
  id serial PRIMARY KEY,
  profile_data jsonb
);

-- Inserting JSON data
INSERT INTO user_profiles (profile_data) 
VALUES ('{"name": "Alice", "tags": ["premium", "beta"], "age": 28}');

-- Querying inside JSONB!
SELECT profile_data->>'name' AS name 
FROM user_profiles 
WHERE profile_data @> '{"tags": ["premium"]}';`,
            note: "The ->> operator extracts text. The @> operator checks if the JSON on the left contains the JSON on the right. You can even index JSONB columns using GIN indexes!"
          }
        ]
      }
    ],
    quiz: [
      { q: "What does MongoDB use instead of Tables and Rows?", a: "Collections and Documents." },
      { q: "What does it mean that MongoDB is 'Schema-free'?", a: "Documents in the same collection do not need to have the exact same fields or data types. It allows flexible and dynamic data structures." },
      { q: "How do you map the SQL 'WHERE' clause in MongoDB's aggregation pipeline?", a: "Using the $match operator." },
      { q: "How do you map the SQL 'JOIN' clause in MongoDB?", a: "Using the $lookup operator in the aggregation pipeline." },
      { q: "What operator is used in MongoDB to represent '>' (Greater Than)?", a: "The $gt operator (e.g., { age: { $gt: 25 } })." },
      { q: "What data type in PostgreSQL allows it to store and query document-style data similar to MongoDB?", a: "The JSONB data type." },
      { q: "What does the @> operator do when working with JSONB in PostgreSQL?", a: "It is the 'contains' operator. It checks if the left JSON value contains the top-level key/value pairs or array elements of the right JSON value." }
    ]
  }
];

const SyntaxBlock = ({ code, label, note }) => {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard?.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div style={{ marginBottom: 20, borderRadius: 10, overflow: "hidden", border: "1px solid #2a2a3a" }}>
      <div style={{ background: "#1a1a2e", padding: "8px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ color: "#7ecfff", fontSize: 12, fontFamily: "monospace", fontWeight: 600 }}>{label}</span>
        <button onClick={copy} style={{ background: "none", border: "1px solid #444", color: "#aaa", borderRadius: 4, padding: "2px 8px", cursor: "pointer", fontSize: 11 }}>
          {copied ? "✓ copied" : "copy"}
        </button>
      </div>
      <pre style={{ background: "#0d0d1a", color: "#e8e8ff", padding: "14px 16px", margin: 0, fontSize: 13, overflowX: "auto", lineHeight: 1.7, fontFamily: "'Courier New', monospace" }}>
        {code}
      </pre>
      {note && <div style={{ background: "#131325", borderTop: "1px solid #2a2a3a", padding: "8px 14px", color: "#ffd580", fontSize: 12, lineHeight: 1.5 }}>
        💡 {note}
      </div>}
    </div>
  );
};

const renderContent = (text) => {
  if (!text) return null;
  return text.split('\n').map((line, i) => {
    const formatted = line
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/`(.*?)`/g, '<code style="background:#1a1a2e;padding:1px 5px;border-radius:3px;font-size:12px;color:#7ecfff">$1</code>');
    return <p key={i} style={{ margin: "4px 0", lineHeight: 1.7 }} dangerouslySetInnerHTML={{ __html: formatted }} />;
  });
};

export default function PostMidStudyGuide() {
  const [activeLab, setActiveLab] = useState(0);
  const [activeSection, setActiveSection] = useState(0);
  const [mode, setMode] = useState("learn"); // "learn" | "quiz"
  const [quizIndex, setQuizIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [quizDone, setQuizDone] = useState(false);

  const lab = labs[activeLab];
  const section = lab.sections[activeSection];

  const startQuiz = () => {
    setMode("quiz");
    setQuizIndex(0);
    setShowAnswer(false);
    setQuizDone(false);
  };

  const nextQuestion = () => {
    if (quizIndex < lab.quiz.length - 1) {
      setQuizIndex(quizIndex + 1);
      setShowAnswer(false);
    } else {
      setQuizDone(true);
    }
  };

  return (
    <div style={{ fontFamily: "'Georgia', serif", background: "#0a0a12", color: "#e8e8f0", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      
      {/* Header */}
      <div style={{ background: "#0f0f1e", borderBottom: "1px solid #2a2a3a", padding: "14px 20px", display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
        <div>
          <div style={{ fontSize: 18, fontWeight: 700, color: "#fff", letterSpacing: 0.5 }}>CS232L Post-Mid Study Guide</div>
          <div style={{ fontSize: 11, color: "#888", fontFamily: "monospace" }}>GIKI · Database Management System Lab</div>
        </div>
        <div style={{ flex: 1 }} />
        <div style={{ fontSize: 12, color: "#aaa", background: "#1a1a2e", padding: "4px 12px", borderRadius: 20, border: "1px solid #333" }}>
          Labs 7–10 • Final Revision
        </div>
      </div>

      {/* Lab Tabs */}
      <div style={{ display: "flex", overflowX: "auto", background: "#0d0d1a", borderBottom: "1px solid #2a2a3a", padding: "8px 12px", gap: 6 }}>
        {labs.map((l, i) => (
          <button key={i} onClick={() => { setActiveLab(i); setActiveSection(0); setMode("learn"); }}
            style={{
              background: activeLab === i ? l.color : "transparent",
              border: `1px solid ${activeLab === i ? l.color : "#333"}`,
              color: activeLab === i ? "#fff" : "#aaa",
              borderRadius: 8, padding: "6px 14px", cursor: "pointer", whiteSpace: "nowrap",
              fontSize: 12, fontWeight: 600, transition: "all 0.15s"
            }}>
            {l.emoji} Lab {l.id}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        
        {/* Sidebar */}
        <div style={{ width: 220, background: "#0d0d1a", borderRight: "1px solid #2a2a3a", padding: 12, overflowY: "auto", flexShrink: 0 }}>
          <div style={{ color: lab.color, fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>
            {lab.emoji} {lab.title}
          </div>
          <div style={{ fontSize: 11, color: "#666", marginBottom: 14, lineHeight: 1.5, fontStyle: "italic" }}>
            {lab.tagline}
          </div>
          
          {mode === "learn" && lab.sections.map((s, i) => (
            <button key={i} onClick={() => setActiveSection(i)}
              style={{
                display: "block", width: "100%", textAlign: "left",
                background: activeSection === i ? `${lab.color}22` : "transparent",
                border: `1px solid ${activeSection === i ? lab.color : "transparent"}`,
                borderRadius: 6, padding: "7px 10px", cursor: "pointer",
                color: activeSection === i ? lab.color : "#888",
                fontSize: 11, marginBottom: 4, fontWeight: activeSection === i ? 600 : 400,
                lineHeight: 1.4
              }}>
              {s.title}
            </button>
          ))}

          <button onClick={startQuiz}
            style={{
              display: "block", width: "100%", marginTop: 12,
              background: mode === "quiz" ? lab.color : "transparent",
              border: `1px solid ${lab.color}`,
              color: mode === "quiz" ? "#fff" : lab.color,
              borderRadius: 8, padding: "8px", cursor: "pointer",
              fontSize: 12, fontWeight: 700
            }}>
            📝 Quick Quiz
          </button>
        </div>

        {/* Main Content */}
        <div style={{ flex: 1, overflowY: "auto", padding: "24px 28px", maxWidth: 780 }}>
          
          {mode === "learn" && (
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                <div style={{ width: 4, height: 28, background: lab.color, borderRadius: 2 }} />
                <h2 style={{ margin: 0, fontSize: 20, color: "#fff" }}>{section.title}</h2>
              </div>
              
              {section.type === "concept" && (
                <div style={{ background: "#111122", border: `1px solid ${lab.color}44`, borderRadius: 10, padding: 18, marginBottom: 20, fontSize: 14, lineHeight: 1.9 }}>
                  {renderContent(section.content)}
                </div>
              )}

              {section.type === "syntax" && (
                <div>
                  {section.content && (
                    <div style={{ background: "#111122", border: `1px solid ${lab.color}33`, borderRadius: 10, padding: 14, marginBottom: 16, fontSize: 13, lineHeight: 1.8, color: "#ccc" }}>
                      {renderContent(section.content)}
                    </div>
                  )}
                  {section.commands?.map((cmd, i) => (
                    <SyntaxBlock key={i} label={cmd.label} code={cmd.code} note={cmd.note} />
                  ))}
                </div>
              )}

              {section.type === "table" && (
                <div style={{ background: "#0d0d1a", borderRadius: 10, overflow: "hidden", border: "1px solid #2a2a3a", marginBottom: 20 }}>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <tbody>
                      {section.rows.map((row, i) => (
                        <tr key={i} style={{ background: i % 2 === 0 ? "#111122" : "#0d0d1a", borderBottom: "1px solid #1a1a2e" }}>
                          <td style={{ padding: "10px 14px", fontFamily: "monospace", color: lab.color, fontSize: 13, fontWeight: 700, minWidth: 130, whiteSpace: "nowrap" }}>{row[0]}</td>
                          <td style={{ padding: "10px 14px", color: "#ccc", fontSize: 13 }}>{row[1]}</td>
                          {row[2] && <td style={{ padding: "10px 14px", fontFamily: "monospace", color: "#888", fontSize: 12 }}>{row[2]}</td>}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {section.type === "comparison" && (
                <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 20 }}>
                  {section.items.map((item, i) => (
                    <div key={i} style={{ flex: "1 1 180px", background: "#111122", border: `1px solid ${item.color}55`, borderRadius: 10, padding: 16, borderTop: `3px solid ${item.color}` }}>
                      <div style={{ color: item.color, fontWeight: 700, fontFamily: "monospace", fontSize: 14, marginBottom: 8 }}>{item.label}</div>
                      <div style={{ color: "#bbb", fontSize: 13, lineHeight: 1.6 }}>{item.desc}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Navigation */}
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 28, paddingTop: 16, borderTop: "1px solid #1a1a2e" }}>
                <button onClick={() => setActiveSection(Math.max(0, activeSection - 1))}
                  disabled={activeSection === 0}
                  style={{ background: "transparent", border: "1px solid #333", color: activeSection === 0 ? "#444" : "#aaa", borderRadius: 8, padding: "8px 16px", cursor: activeSection === 0 ? "default" : "pointer", fontSize: 13 }}>
                  ← Prev
                </button>
                <span style={{ color: "#555", fontSize: 12, alignSelf: "center" }}>{activeSection + 1} / {lab.sections.length}</span>
                <button
                  onClick={() => activeSection < lab.sections.length - 1 ? setActiveSection(activeSection + 1) : startQuiz()}
                  style={{ background: lab.color, border: "none", color: "#fff", borderRadius: 8, padding: "8px 16px", cursor: "pointer", fontSize: 13, fontWeight: 600 }}>
                  {activeSection < lab.sections.length - 1 ? "Next →" : "Take Quiz →"}
                </button>
              </div>
            </div>
          )}

          {mode === "quiz" && !quizDone && (
            <div>
              <div style={{ color: lab.color, fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 20 }}>
                📝 Quiz — Lab {lab.id}: {lab.title}
              </div>
              
              <div style={{ background: "#111122", border: `1px solid ${lab.color}44`, borderRadius: 12, padding: 24, marginBottom: 20 }}>
                <div style={{ color: "#666", fontSize: 11, marginBottom: 10 }}>Question {quizIndex + 1} of {lab.quiz.length}</div>
                <div style={{ fontSize: 17, color: "#fff", lineHeight: 1.7, fontWeight: 500 }}>
                  {lab.quiz[quizIndex].q}
                </div>
              </div>

              {!showAnswer ? (
                <button onClick={() => setShowAnswer(true)}
                  style={{ background: lab.color, border: "none", color: "#fff", borderRadius: 8, padding: "12px 24px", cursor: "pointer", fontSize: 14, fontWeight: 700 }}>
                  Show Answer
                </button>
              ) : (
                <div>
                  <div style={{ background: "#0d1a12", border: "1px solid #27AE6066", borderRadius: 12, padding: 20, marginBottom: 16 }}>
                    <div style={{ color: "#27AE60", fontSize: 11, fontWeight: 700, marginBottom: 8 }}>✓ ANSWER</div>
                    <div style={{ color: "#d4f0d4", fontSize: 14, lineHeight: 1.8 }}>
                      {lab.quiz[quizIndex].a}
                    </div>
                  </div>
                  <button onClick={nextQuestion}
                    style={{ background: lab.color, border: "none", color: "#fff", borderRadius: 8, padding: "12px 24px", cursor: "pointer", fontSize: 14, fontWeight: 700 }}>
                    {quizIndex < lab.quiz.length - 1 ? "Next Question →" : "Finish Quiz ✓"}
                  </button>
                </div>
              )}

              {/* Progress bar */}
              <div style={{ marginTop: 24, background: "#1a1a2e", borderRadius: 4, height: 4, overflow: "hidden" }}>
                <div style={{ background: lab.color, height: "100%", width: `${((quizIndex + (showAnswer ? 1 : 0)) / lab.quiz.length) * 100}%`, transition: "width 0.3s" }} />
              </div>
            </div>
          )}

          {mode === "quiz" && quizDone && (
            <div style={{ textAlign: "center", padding: "40px 20px" }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🎉</div>
              <h2 style={{ color: lab.color, margin: "0 0 8px" }}>Lab {lab.id} Complete!</h2>
              <p style={{ color: "#888", marginBottom: 28 }}>You've reviewed all {lab.quiz.length} questions for this lab.</p>
              <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                <button onClick={() => { setMode("learn"); setActiveSection(0); }}
                  style={{ background: "transparent", border: `1px solid ${lab.color}`, color: lab.color, borderRadius: 8, padding: "10px 20px", cursor: "pointer", fontSize: 13 }}>
                  Review Lab Again
                </button>
                {activeLab < labs.length - 1 && (
                  <button onClick={() => { setActiveLab(activeLab + 1); setActiveSection(0); setMode("learn"); }}
                    style={{ background: labs[activeLab + 1].color, border: "none", color: "#fff", borderRadius: 8, padding: "10px 20px", cursor: "pointer", fontSize: 13, fontWeight: 700 }}>
                    Next Lab: {labs[activeLab + 1].emoji} {labs[activeLab + 1].title} →
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
