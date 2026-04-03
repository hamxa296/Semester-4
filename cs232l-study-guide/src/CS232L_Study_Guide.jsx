import { useState } from "react";

const labs = [
  {
    id: 1,
    title: "Intro to DBMS & PostgreSQL",
    emoji: "🗄️",
    color: "#FF6B35",
    tagline: "The foundation — what is a database and how do we talk to it?",
    sections: [
      {
        title: "What is a DBMS?",
        type: "concept",
        content: `A **Database Management System (DBMS)** is software that lets you create, store, update and retrieve data in an organized way. Think of it as the middleman between your data and your application.

It manages 3 things:
• The **data** itself
• The **database engine** (how data is accessed/locked/modified)
• The **schema** (logical structure of the database)

Examples: MySQL, PostgreSQL, Oracle, SQL Server`
      },
      {
        title: "What is PostgreSQL?",
        type: "concept",
        content: `PostgreSQL is an open-source, enterprise-grade relational database. It supports both SQL (relational) and JSON (non-relational) queries.

Started in 1986 at UC Berkeley as "POSTGRES", renamed to PostgreSQL in 1996 to reflect SQL support.

Who uses it? Apple, Cisco, Instagram, Red Hat, Fujitsu...`
      },
      {
        title: "DDL — Data Definition Language",
        type: "syntax",
        content: `DDL commands **define the structure** of your database (tables, schemas). They don't touch the actual data.`,
        commands: [
          {
            label: "CREATE TABLE",
            code: `CREATE TABLE students (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  age INT,
  gpa FLOAT
);`,
            note: "SERIAL = auto-incrementing integer. VARCHAR(n) = text up to n chars."
          },
          {
            label: "ALTER TABLE — Add Column",
            code: `ALTER TABLE students
ADD COLUMN email VARCHAR(200);`,
            note: "Adds a new column to an existing table."
          },
          {
            label: "ALTER TABLE — Rename Column",
            code: `ALTER TABLE students
RENAME COLUMN name TO full_name;`,
            note: "Renames an existing column."
          },
          {
            label: "ALTER TABLE — Change Data Type",
            code: `ALTER TABLE students
ALTER COLUMN age TYPE BIGINT;`,
            note: "Changes the data type of a column."
          },
          {
            label: "DROP TABLE",
            code: `DROP TABLE students;`,
            note: "⚠️ Permanently deletes the table AND all its data. No undo!"
          },
          {
            label: "TRUNCATE TABLE",
            code: `TRUNCATE TABLE students;`,
            note: "Deletes all rows but keeps the table structure. Faster than DELETE."
          }
        ]
      },
      {
        title: "DML — Data Manipulation Language",
        type: "syntax",
        content: `DML commands **work with the actual data** inside tables.`,
        commands: [
          {
            label: "INSERT — Add rows",
            code: `INSERT INTO students (name, age, gpa)
VALUES ('Ali Hassan', 20, 3.5);

-- Insert multiple rows at once:
INSERT INTO students (name, age, gpa)
VALUES ('Sara Khan', 21, 3.8),
       ('Ahmed Raza', 22, 3.2);`,
            note: "Column names must match the values in order. If you skip a column, it gets NULL (or default)."
          },
          {
            label: "SELECT — Read data",
            code: `-- All columns, all rows:
SELECT * FROM students;

-- Specific columns:
SELECT name, gpa FROM students;`,
            note: "SELECT is the most used command. * means 'all columns'."
          },
          {
            label: "UPDATE — Change existing data",
            code: `UPDATE students
SET gpa = 3.9
WHERE name = 'Ali Hassan';`,
            note: "⚠️ Without WHERE, this updates EVERY row! Always double-check your WHERE clause."
          },
          {
            label: "DELETE — Remove rows",
            code: `DELETE FROM students
WHERE age < 18;`,
            note: "⚠️ Without WHERE, this deletes ALL rows! Different from DROP — the table still exists."
          }
        ]
      },
      {
        title: "PostgreSQL Data Types",
        type: "table",
        rows: [
          ["INT / INTEGER", "Whole numbers: 1, 42, -100"],
          ["BIGINT", "Very large whole numbers"],
          ["SERIAL", "Auto-incrementing integer (for IDs)"],
          ["VARCHAR(n)", "Text up to n characters"],
          ["TEXT", "Unlimited length text"],
          ["FLOAT / REAL", "Decimal numbers: 3.14, 2.5"],
          ["BOOLEAN", "true / false"],
          ["DATE", "Date only: '2024-01-15'"],
          ["TIMESTAMP", "Date + Time: '2024-01-15 10:30:00'"],
          ["CHAR(n)", "Fixed-length text, always n characters"],
        ]
      },
      {
        title: "DROP vs TRUNCATE vs DELETE",
        type: "comparison",
        items: [
          { label: "DELETE", desc: "Removes specific rows (use WHERE). Table + structure remain. Can be rolled back.", color: "#FFA500" },
          { label: "TRUNCATE", desc: "Removes ALL rows instantly. Table structure remains. Faster than DELETE for clearing a table.", color: "#FF6B35" },
          { label: "DROP", desc: "Destroys the entire table (structure + data). Gone forever. No recovery!", color: "#E74C3C" },
        ]
      }
    ],
    quiz: [
      { q: "What does DDL stand for and what does it do?", a: "Data Definition Language — it defines the STRUCTURE of the database (tables, schemas). It does NOT touch the actual data inside." },
      { q: "What's the difference between DELETE and DROP?", a: "DELETE removes rows from a table (the table still exists). DROP removes the entire table including its structure — everything is gone." },
      { q: "What does SERIAL mean in PostgreSQL?", a: "It's an auto-incrementing integer. Every time you insert a row without specifying that column, PostgreSQL automatically assigns the next number (1, 2, 3...)" },
      { q: "Why is WHERE important in UPDATE and DELETE?", a: "Without WHERE, the command affects EVERY row in the table. UPDATE without WHERE changes all rows. DELETE without WHERE deletes all rows. Always use WHERE unless you really mean to affect everything!" },
      { q: "What are the 3 things a DBMS manages?", a: "1) The data itself, 2) The database engine (how data is accessed/modified), 3) The schema (logical structure)" },
    ]
  },
  {
    id: 2,
    title: "Clauses & Basic Operations",
    emoji: "🔍",
    color: "#3498DB",
    tagline: "Filtering, operators, aliases, and modifying data",
    sections: [
      {
        title: "WHERE Clause",
        type: "syntax",
        content: `WHERE filters rows based on a condition. It goes AFTER FROM, BEFORE SELECT in execution order (even though you write SELECT first).`,
        commands: [
          {
            label: "Basic WHERE",
            code: `SELECT * FROM students
WHERE gpa > 3.5;`,
            note: "Returns only rows where gpa is greater than 3.5"
          },
          {
            label: "WHERE with multiple conditions",
            code: `SELECT name, gpa FROM students
WHERE gpa > 3.0 AND age < 22;

SELECT name FROM students
WHERE gpa > 3.8 OR age = 20;`,
            note: "AND = both conditions must be true. OR = at least one must be true."
          },
          {
            label: "WHERE with text",
            code: `SELECT * FROM students
WHERE name = 'Ali Hassan';`,
            note: "Text values go in single quotes. Case-sensitive in PostgreSQL!"
          }
        ]
      },
      {
        title: "Comparison & Logical Operators",
        type: "table",
        rows: [
          ["=", "Equal to", "WHERE age = 20"],
          ["!= or <>", "Not equal to", "WHERE grade != 'F'"],
          [">", "Greater than", "WHERE gpa > 3.5"],
          ["<", "Less than", "WHERE age < 25"],
          [">=", "Greater than or equal", "WHERE score >= 60"],
          ["<=", "Less than or equal", "WHERE score <= 100"],
          ["BETWEEN", "Within a range (inclusive)", "WHERE age BETWEEN 18 AND 25"],
          ["IN", "Matches any in a list", "WHERE city IN ('Lahore', 'Karachi')"],
          ["LIKE", "Pattern matching", "WHERE name LIKE 'A%'"],
          ["IS NULL", "Value is null/empty", "WHERE email IS NULL"],
          ["IS NOT NULL", "Value exists", "WHERE email IS NOT NULL"],
          ["AND", "Both conditions true", "WHERE a > 1 AND b < 10"],
          ["OR", "At least one true", "WHERE a = 1 OR b = 2"],
          ["NOT", "Negates condition", "WHERE NOT gpa < 2.0"],
        ]
      },
      {
        title: "LIKE Pattern Matching",
        type: "syntax",
        content: `LIKE is used for partial text matching. Two wildcards:
• **%** = zero or more characters (any)
• **_** = exactly one character`,
        commands: [
          {
            label: "LIKE examples",
            code: `-- Names starting with 'A':
WHERE name LIKE 'A%'

-- Names ending with 'n':
WHERE name LIKE '%n'

-- Names containing 'ali':
WHERE name LIKE '%ali%'

-- 4-letter names starting with 'A':
WHERE name LIKE 'A___'`,
            note: "Use ILIKE for case-insensitive matching in PostgreSQL"
          }
        ]
      },
      {
        title: "Arithmetic Operations",
        type: "syntax",
        content: `You can do math directly inside SQL queries on column values.`,
        commands: [
          {
            label: "Arithmetic in SELECT",
            code: `-- Calculate 10% bonus on salary:
SELECT name, salary, salary * 0.10 AS bonus
FROM employees;

-- Annual salary from monthly:
SELECT name, salary * 12 AS annual_salary
FROM employees;`,
            note: "Operators: + (add), - (subtract), * (multiply), / (divide). Order follows BODMAS!"
          }
        ]
      },
      {
        title: "Column Aliases (AS)",
        type: "syntax",
        content: `Aliases give a temporary name to a column in the output. They only exist in the result — the actual table is unchanged.`,
        commands: [
          {
            label: "Column Alias",
            code: `SELECT name AS student_name, gpa AS grade_point
FROM students;

-- Alias with spaces (use double quotes):
SELECT name AS "Student Full Name"
FROM students;`,
            note: "AS is optional — SELECT name student_name also works, but AS is clearer. You CANNOT use aliases in WHERE clause!"
          }
        ]
      },
      {
        title: "DISTINCT — Remove Duplicates",
        type: "syntax",
        commands: [
          {
            label: "DISTINCT",
            code: `-- Get unique departments only:
SELECT DISTINCT department FROM employees;

-- Unique combo of city + department:
SELECT DISTINCT city, department FROM employees;`,
            note: "DISTINCT applies to ALL selected columns together, not just the first one."
          }
        ]
      },
      {
        title: "NULL Values",
        type: "concept",
        content: `NULL means "no value" or "unknown". It's NOT zero, NOT empty string — it's the ABSENCE of a value.

Key rules:
• You can't use = NULL — use IS NULL instead
• Any arithmetic with NULL returns NULL (5 + NULL = NULL)
• NULL is not equal to anything, even another NULL`
      },
      {
        title: "UPDATE & DELETE with WHERE",
        type: "syntax",
        commands: [
          {
            label: "UPDATE specific rows",
            code: `UPDATE students
SET gpa = 4.0, age = 21
WHERE id = 5;`,
            note: "Update multiple columns at once using commas. WHERE limits which rows get changed."
          },
          {
            label: "DELETE specific rows",
            code: `DELETE FROM students
WHERE gpa < 2.0;

-- Delete using BETWEEN:
DELETE FROM orders
WHERE order_date BETWEEN '2023-01-01' AND '2023-12-31';`,
            note: "Always write the WHERE clause first, then double-check before running!"
          }
        ]
      }
    ],
    quiz: [
      { q: "What's the difference between WHERE name = NULL and WHERE name IS NULL?", a: "WHERE name = NULL will NEVER work — = doesn't work with NULL in SQL. You must use IS NULL. This is a classic mistake!" },
      { q: "In what order does PostgreSQL actually execute: SELECT, FROM, WHERE?", a: "Execution order: FROM → WHERE → SELECT. Even though you write SELECT first, PostgreSQL processes FROM first (gets the table), then WHERE (filters rows), then SELECT (picks columns). That's why you can't use SELECT aliases in WHERE!" },
      { q: "What does % mean in LIKE?", a: "% is a wildcard that matches zero or more of ANY characters. 'A%' matches anything starting with A. '%a%' matches anything containing 'a' anywhere." },
      { q: "Write a query to find all students with GPA between 3.0 and 3.5 (inclusive)", a: "SELECT * FROM students WHERE gpa BETWEEN 3.0 AND 3.5;   OR   WHERE gpa >= 3.0 AND gpa <= 3.5;" },
      { q: "What happens if you UPDATE without a WHERE clause?", a: "Every single row in the table gets updated with the new value. This is a very common and dangerous mistake!" },
    ]
  },
  {
    id: 3,
    title: "ORDER BY, GROUP BY, HAVING",
    emoji: "📊",
    color: "#9B59B6",
    tagline: "Sorting, grouping, and summarizing your data",
    sections: [
      {
        title: "ORDER BY — Sorting Results",
        type: "syntax",
        content: `ORDER BY sorts the final result set. Default is ascending (ASC). Use DESC for descending.`,
        commands: [
          {
            label: "Basic ORDER BY",
            code: `-- Alphabetical A to Z:
SELECT name, gpa FROM students
ORDER BY name ASC;

-- Highest GPA first:
SELECT name, gpa FROM students
ORDER BY gpa DESC;`,
            note: "ASC = ascending (A→Z, 0→9, oldest→newest). DESC = descending (Z→A, 9→0, newest→oldest)"
          },
          {
            label: "ORDER BY multiple columns",
            code: `-- Sort by department, then by salary within each dept:
SELECT name, department, salary
FROM employees
ORDER BY department ASC, salary DESC;`,
            note: "First sorts by department alphabetically. Within same department, sorts by salary highest first."
          },
          {
            label: "ORDER BY with column number",
            code: `-- Using column position (1 = first column selected):
SELECT name, gpa FROM students
ORDER BY 2 DESC;`,
            note: "Position 2 means the 2nd column in your SELECT (gpa). Not recommended — hard to read."
          }
        ]
      },
      {
        title: "GROUP BY — Grouping Rows",
        type: "syntax",
        content: `GROUP BY combines rows that have the same value in the specified column(s) into one summary row. You must use aggregate functions (COUNT, SUM, AVG, etc.) with GROUP BY.

**Rule:** Every column in SELECT must either be in GROUP BY or be inside an aggregate function.`,
        commands: [
          {
            label: "Count rows per group",
            code: `-- Count students per department:
SELECT department, COUNT(*) AS total_students
FROM students
GROUP BY department;`,
            note: "COUNT(*) counts all rows in each group."
          },
          {
            label: "Average per group",
            code: `-- Average GPA per department:
SELECT department, AVG(gpa) AS avg_gpa
FROM students
GROUP BY department;`,
            note: "AVG() calculates the average of the column within each group."
          },
          {
            label: "Multiple GROUP BY columns",
            code: `-- Count per city AND department combination:
SELECT city, department, COUNT(*) AS count
FROM employees
GROUP BY city, department;`,
            note: "Groups by the unique combination of city + department."
          }
        ]
      },
      {
        title: "HAVING — Filter Groups",
        type: "syntax",
        content: `HAVING filters GROUPS (after grouping). WHERE filters ROWS (before grouping).

Think of it this way:
• WHERE → filters individual rows BEFORE grouping
• HAVING → filters groups AFTER grouping`,
        commands: [
          {
            label: "HAVING with aggregate",
            code: `-- Only departments with more than 5 students:
SELECT department, COUNT(*) AS total
FROM students
GROUP BY department
HAVING COUNT(*) > 5;`,
            note: "You cannot use WHERE COUNT(*) > 5 — WHERE doesn't work with aggregate functions!"
          },
          {
            label: "WHERE + GROUP BY + HAVING together",
            code: `-- Among active employees, find departments
-- where average salary > 50000:
SELECT department, AVG(salary) AS avg_sal
FROM employees
WHERE status = 'active'
GROUP BY department
HAVING AVG(salary) > 50000
ORDER BY avg_sal DESC;`,
            note: "Execution order: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY"
          }
        ]
      },
      {
        title: "SQL Execution Order (CRITICAL!)",
        type: "concept",
        content: `This is the order PostgreSQL actually processes your query — NOT the order you write it:

1. **FROM** — which table(s) are we looking at?
2. **WHERE** — filter individual rows
3. **GROUP BY** — group the filtered rows
4. **HAVING** — filter the groups
5. **SELECT** — choose which columns to show
6. **ORDER BY** — sort the final result
7. **LIMIT** — take only N rows

Writing order vs execution order is different! This explains why you can't use SELECT aliases in WHERE or HAVING.`
      },
      {
        title: "LIMIT & OFFSET",
        type: "syntax",
        commands: [
          {
            label: "LIMIT",
            code: `-- Get only top 5 students by GPA:
SELECT name, gpa FROM students
ORDER BY gpa DESC
LIMIT 5;`,
            note: "LIMIT is usually used with ORDER BY, otherwise you get a random 5 rows."
          },
          {
            label: "OFFSET for pagination",
            code: `-- Skip first 10 rows, get next 5:
SELECT name FROM students
ORDER BY id
LIMIT 5 OFFSET 10;`,
            note: "OFFSET skips N rows before starting. Page 1 = OFFSET 0, Page 2 = OFFSET 5, etc."
          }
        ]
      }
    ],
    quiz: [
      { q: "What is the difference between WHERE and HAVING?", a: "WHERE filters individual rows BEFORE grouping. HAVING filters groups AFTER grouping. You can't use aggregate functions in WHERE — use HAVING for that." },
      { q: "Write a query to find the average GPA per department, but only show departments with avg GPA > 3.0", a: "SELECT department, AVG(gpa) AS avg_gpa FROM students GROUP BY department HAVING AVG(gpa) > 3.0;" },
      { q: "Can you use a SELECT alias in the HAVING clause?", a: "No! HAVING is evaluated BEFORE SELECT in execution order. So the alias doesn't exist yet when HAVING runs. You must repeat the aggregate function in HAVING." },
      { q: "What's the SQL execution order?", a: "FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT. Remember this order — it explains why aliases work in ORDER BY but not WHERE/HAVING." },
      { q: "If you GROUP BY department and SELECT name, department — will it work?", a: "No! 'name' is not in GROUP BY and not inside an aggregate function. Every column in SELECT must either be in GROUP BY or wrapped in an aggregate like COUNT(), MAX(), etc." },
    ]
  },
  {
    id: 4,
    title: "PostgreSQL Constraints",
    emoji: "🔒",
    color: "#27AE60",
    tagline: "Rules that protect your data from being wrong",
    sections: [
      {
        title: "What are Constraints?",
        type: "concept",
        content: `Constraints are **rules enforced on table columns**. They prevent invalid data from entering the database.

If a constraint is violated, the operation fails — the row is not inserted/updated. Constraints can be set at:
• **Column level** — applies to one column
• **Table level** — applies to multiple columns together`
      },
      {
        title: "NOT NULL",
        type: "syntax",
        content: `Ensures a column cannot be empty/null. Every row MUST have a value for this column.`,
        commands: [
          {
            label: "NOT NULL at creation",
            code: `CREATE TABLE students (
  id SERIAL,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(200) NOT NULL,
  gpa FLOAT
);`,
            note: "name and email are required. gpa can be NULL (optional)."
          },
          {
            label: "Add NOT NULL to existing column",
            code: `ALTER TABLE students
ALTER COLUMN gpa SET NOT NULL;`,
            note: "Will fail if the column already has NULL values!"
          },
          {
            label: "Drop NOT NULL constraint",
            code: `ALTER TABLE students
ALTER COLUMN gpa DROP NOT NULL;`,
            note: "Makes the column optional again."
          }
        ]
      },
      {
        title: "UNIQUE",
        type: "syntax",
        content: `Ensures all values in a column (or combination of columns) are different. NULLs are allowed (multiple NULLs are permitted).`,
        commands: [
          {
            label: "UNIQUE at creation",
            code: `CREATE TABLE students (
  id SERIAL,
  email VARCHAR(200) UNIQUE,
  roll_no VARCHAR(20) UNIQUE
);`,
            note: "No two rows can have the same email OR the same roll_no."
          },
          {
            label: "Add UNIQUE to existing table",
            code: `ALTER TABLE students
ADD CONSTRAINT unique_email UNIQUE (email);`,
            note: "Naming the constraint (unique_email) lets you drop it later by name."
          },
          {
            label: "Multi-column UNIQUE",
            code: `ALTER TABLE enrollments
ADD CONSTRAINT unique_enrollment UNIQUE (student_id, course_id);`,
            note: "The COMBINATION must be unique — same student can't enroll in same course twice."
          }
        ]
      },
      {
        title: "PRIMARY KEY",
        type: "syntax",
        content: `Uniquely identifies each row. It's NOT NULL + UNIQUE combined. Every table should have one primary key.`,
        commands: [
          {
            label: "PRIMARY KEY at creation",
            code: `CREATE TABLE students (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

-- Composite primary key (table level):
CREATE TABLE enrollment (
  student_id INT,
  course_id INT,
  PRIMARY KEY (student_id, course_id)
);`,
            note: "SERIAL PRIMARY KEY is the most common pattern — auto-number, unique, required."
          },
          {
            label: "Add PRIMARY KEY to existing table",
            code: `ALTER TABLE students
ADD PRIMARY KEY (id);`,
            note: "Table can only have ONE primary key."
          }
        ]
      },
      {
        title: "FOREIGN KEY",
        type: "syntax",
        content: `Links two tables together. A foreign key in one table references the primary key of another table. This enforces **referential integrity** — you can't add a foreign key value that doesn't exist in the referenced table.`,
        commands: [
          {
            label: "FOREIGN KEY at creation",
            code: `CREATE TABLE courses (
  course_id SERIAL PRIMARY KEY,
  course_name VARCHAR(100) NOT NULL
);

CREATE TABLE enrollments (
  id SERIAL PRIMARY KEY,
  student_id INT,
  course_id INT,
  FOREIGN KEY (course_id) REFERENCES courses(course_id)
);`,
            note: "You can't insert an enrollment with a course_id that doesn't exist in the courses table."
          },
          {
            label: "Add FOREIGN KEY to existing table",
            code: `ALTER TABLE enrollments
ADD CONSTRAINT fk_course
FOREIGN KEY (course_id) REFERENCES courses(course_id);`,
            note: "Good practice to name your constraints — easier to drop/manage later."
          }
        ]
      },
      {
        title: "CHECK Constraint",
        type: "syntax",
        content: `Ensures values in a column satisfy a specific condition.`,
        commands: [
          {
            label: "CHECK at creation",
            code: `CREATE TABLE students (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  age INT CHECK (age >= 16 AND age <= 50),
  gpa FLOAT CHECK (gpa >= 0.0 AND gpa <= 4.0)
);`,
            note: "If age = 10 is inserted, it will fail with a CHECK violation error."
          },
          {
            label: "Add CHECK to existing table",
            code: `ALTER TABLE students
ADD CONSTRAINT valid_gpa CHECK (gpa BETWEEN 0.0 AND 4.0);`,
          }
        ]
      },
      {
        title: "Dropping & Viewing Constraints",
        type: "syntax",
        commands: [
          {
            label: "Drop a named constraint",
            code: `ALTER TABLE students
DROP CONSTRAINT unique_email;

ALTER TABLE students
DROP CONSTRAINT valid_gpa;`,
            note: "You need the constraint name. Always name your constraints when creating them!"
          },
          {
            label: "View all constraints",
            code: `-- View constraints on a table:
SELECT constraint_name, constraint_type
FROM information_schema.table_constraints
WHERE table_name = 'students';`,
            note: "information_schema is a built-in PostgreSQL schema with metadata about your database."
          }
        ]
      }
    ],
    quiz: [
      { q: "What is the difference between UNIQUE and PRIMARY KEY?", a: "Both enforce uniqueness. But: PRIMARY KEY = NOT NULL + UNIQUE. A table can have only ONE primary key but MULTIPLE unique constraints. NULL is not allowed in PRIMARY KEY." },
      { q: "What does a FOREIGN KEY constraint do?", a: "It ensures referential integrity — values in the foreign key column MUST exist in the referenced primary key column. You can't insert an order for a customer_id that doesn't exist." },
      { q: "If you have FOREIGN KEY from orders.customer_id referencing customers.id, can you delete a customer who has orders?", a: "No! By default, PostgreSQL will reject the DELETE to prevent orphaned orders. You'd need ON DELETE CASCADE to automatically delete related orders, or ON DELETE SET NULL to set customer_id to NULL." },
      { q: "Write a CHECK constraint to ensure salary is positive", a: "ALTER TABLE employees ADD CONSTRAINT positive_salary CHECK (salary > 0);" },
      { q: "Why should you NAME your constraints?", a: "Named constraints are easier to manage. You can DROP CONSTRAINT by name. If unnamed, PostgreSQL auto-generates a cryptic name that's hard to find and reference." },
    ]
  },
  {
    id: 5,
    title: "Aggregate Functions & Subqueries",
    emoji: "🧮",
    color: "#E67E22",
    tagline: "Calculate summaries and nest queries inside queries",
    sections: [
      {
        title: "Aggregate Functions Overview",
        type: "concept",
        content: `Aggregate functions **perform a calculation on multiple rows** and return a single result. They collapse many rows into one summary value.

The 5 main aggregate functions:
• **COUNT()** — how many rows
• **SUM()** — total of values
• **AVG()** — average of values
• **MAX()** — highest value
• **MIN()** — lowest value`
      },
      {
        title: "COUNT()",
        type: "syntax",
        commands: [
          {
            label: "COUNT variations",
            code: `-- Count all rows (including NULLs):
SELECT COUNT(*) FROM students;

-- Count non-NULL values only:
SELECT COUNT(gpa) FROM students;

-- Count unique values:
SELECT COUNT(DISTINCT department) FROM employees;`,
            note: "COUNT(*) vs COUNT(column): COUNT(*) includes NULL rows, COUNT(column) skips NULLs in that column."
          }
        ]
      },
      {
        title: "SUM, AVG, MAX, MIN",
        type: "syntax",
        commands: [
          {
            label: "All aggregate functions",
            code: `SELECT 
  SUM(salary) AS total_payroll,
  AVG(salary) AS average_salary,
  MAX(salary) AS highest_salary,
  MIN(salary) AS lowest_salary,
  COUNT(*) AS total_employees
FROM employees;`,
            note: "All of these ignore NULL values (except COUNT(*))."
          },
          {
            label: "Aggregates with GROUP BY",
            code: `SELECT 
  department,
  COUNT(*) AS headcount,
  AVG(salary) AS avg_salary,
  MAX(salary) AS top_salary
FROM employees
GROUP BY department
ORDER BY avg_salary DESC;`,
            note: "This is the most common pattern — aggregate per group."
          }
        ]
      },
      {
        title: "Subqueries — Queries Inside Queries",
        type: "concept",
        content: `A subquery is a SELECT statement **nested inside another query**. The inner query runs first, then the outer query uses its result.

Three places you can use subqueries:
1. **In WHERE** — filter based on a calculated value
2. **In SELECT** — as a computed column  
3. **In FROM** — treat the result as a table`
      },
      {
        title: "Subqueries in WHERE",
        type: "syntax",
        commands: [
          {
            label: "Single-value subquery",
            code: `-- Find students with GPA above the average:
SELECT name, gpa
FROM students
WHERE gpa > (SELECT AVG(gpa) FROM students);`,
            note: "The inner query (SELECT AVG...) returns ONE number. The outer WHERE compares each row's gpa to that number."
          },
          {
            label: "Subquery with IN",
            code: `-- Find employees who work in offices located in 'Lahore':
SELECT name FROM employees
WHERE office_id IN (
  SELECT office_id 
  FROM offices 
  WHERE city = 'Lahore'
);`,
            note: "The subquery returns a LIST of values. IN checks if the column matches any of them."
          },
          {
            label: "Subquery with EXISTS",
            code: `-- Find customers who have placed at least one order:
SELECT name FROM customers c
WHERE EXISTS (
  SELECT 1 FROM orders o
  WHERE o.customer_id = c.id
);`,
            note: "EXISTS returns true if the subquery returns ANY rows. SELECT 1 is a convention — you don't need actual data, just existence."
          }
        ]
      },
      {
        title: "Subqueries in FROM (Derived Tables)",
        type: "syntax",
        commands: [
          {
            label: "Subquery as table",
            code: `-- Find departments where the average salary 
-- is higher than the company average:
SELECT dept_name, avg_sal
FROM (
  SELECT department AS dept_name, 
         AVG(salary) AS avg_sal
  FROM employees
  GROUP BY department
) AS dept_averages
WHERE avg_sal > (SELECT AVG(salary) FROM employees);`,
            note: "The subquery in FROM must be given an alias (here: dept_averages). This result is treated like a regular table."
          }
        ]
      },
      {
        title: "Subqueries in SELECT",
        type: "syntax",
        commands: [
          {
            label: "Correlated subquery in SELECT",
            code: `-- Show each employee's salary vs department average:
SELECT 
  name,
  salary,
  (SELECT AVG(salary) FROM employees e2 
   WHERE e2.department = e1.department) AS dept_avg
FROM employees e1;`,
            note: "This is a correlated subquery — the inner query references the outer query (e1). Runs once per row, so can be slow on large tables."
          }
        ]
      }
    ],
    quiz: [
      { q: "What does COUNT(*) vs COUNT(email) do differently?", a: "COUNT(*) counts ALL rows including those where email is NULL. COUNT(email) only counts rows where email is NOT NULL. The difference matters when you have nullable columns." },
      { q: "Write a query to find the product with the highest price", a: "SELECT name, price FROM products WHERE price = (SELECT MAX(price) FROM products);" },
      { q: "What's the difference between WHERE and HAVING with aggregates?", a: "Use HAVING to filter on aggregate results (after grouping). WHERE filters rows BEFORE grouping — you can't use COUNT(), AVG() etc. in WHERE." },
      { q: "When would you use IN vs EXISTS in a subquery?", a: "IN is simpler and good when the subquery returns a small list of values. EXISTS is better for large datasets and correlated subqueries — it stops as soon as it finds the first match, which is faster." },
      { q: "What must you always do when using a subquery in FROM?", a: "Give it an alias! Every derived table (subquery in FROM) MUST have an alias in PostgreSQL. Example: FROM (SELECT ...) AS my_alias" },
    ]
  },
  {
    id: 6,
    title: "PostgreSQL JOIN Queries",
    emoji: "🔗",
    color: "#E74C3C",
    tagline: "Combining data from multiple tables",
    sections: [
      {
        title: "Why Joins?",
        type: "concept",
        content: `In a relational database, data is split across multiple tables to avoid repetition (normalization). JOINs let you **combine rows from two or more tables** based on a related column (usually a foreign key relationship).

Example: You have a customers table and an orders table. A JOIN lets you see each order WITH the customer's name — without storing the customer name in every order row.`
      },
      {
        title: "INNER JOIN",
        type: "syntax",
        content: `Returns ONLY rows where there's a match in BOTH tables. Non-matching rows from either table are excluded.`,
        commands: [
          {
            label: "INNER JOIN syntax",
            code: `SELECT customers.name, orders.order_date, orders.total
FROM customers
INNER JOIN orders ON customers.id = orders.customer_id;`,
            note: "ON specifies the matching condition. Only customers who HAVE orders appear. Customers with no orders are excluded."
          },
          {
            label: "INNER JOIN with aliases",
            code: `SELECT c.name, o.order_date, o.total
FROM customers c
INNER JOIN orders o ON c.id = o.customer_id
WHERE o.total > 1000
ORDER BY o.order_date DESC;`,
            note: "Table aliases (c, o) make long queries much cleaner. You can combine JOINs with WHERE, ORDER BY, GROUP BY!"
          }
        ]
      },
      {
        title: "LEFT JOIN (Left Outer Join)",
        type: "syntax",
        content: `Returns ALL rows from the LEFT table, and matching rows from the RIGHT table. Where there's no match, right side columns are NULL.`,
        commands: [
          {
            label: "LEFT JOIN syntax",
            code: `-- All customers, even those with no orders:
SELECT c.name, o.order_date
FROM customers c
LEFT JOIN orders o ON c.id = o.customer_id;`,
            note: "Customers without any orders will appear with o.order_date = NULL."
          },
          {
            label: "Find rows with NO match (Anti-join pattern)",
            code: `-- Find customers who have NEVER placed an order:
SELECT c.name
FROM customers c
LEFT JOIN orders o ON c.id = o.customer_id
WHERE o.customer_id IS NULL;`,
            note: "This is a very useful pattern: LEFT JOIN + WHERE right_side IS NULL = find unmatched rows."
          }
        ]
      },
      {
        title: "RIGHT JOIN (Right Outer Join)",
        type: "syntax",
        content: `Returns ALL rows from the RIGHT table, and matching rows from the LEFT table. The opposite of LEFT JOIN.`,
        commands: [
          {
            label: "RIGHT JOIN syntax",
            code: `-- All orders, even if customer was deleted:
SELECT c.name, o.order_date, o.total
FROM customers c
RIGHT JOIN orders o ON c.id = o.customer_id;`,
            note: "Every order appears. If the customer was deleted, c.name = NULL. In practice, LEFT JOIN is more commonly used — you can always swap table order."
          }
        ]
      },
      {
        title: "FULL OUTER JOIN",
        type: "syntax",
        content: `Returns ALL rows from BOTH tables. Rows with no match on either side get NULL for the other table's columns.`,
        commands: [
          {
            label: "FULL OUTER JOIN",
            code: `SELECT c.name, o.order_id
FROM customers c
FULL OUTER JOIN orders o ON c.id = o.customer_id;`,
            note: "Shows everything — customers without orders AND orders without customers. Useful for finding all mismatches."
          }
        ]
      },
      {
        title: "SELF JOIN",
        type: "syntax",
        content: `A table joined with ITSELF. Useful for hierarchical data (employees and their managers).`,
        commands: [
          {
            label: "SELF JOIN example",
            code: `-- Find each employee and their manager's name:
SELECT 
  e.name AS employee,
  m.name AS manager
FROM employees e
INNER JOIN employees m ON e.manager_id = m.id;`,
            note: "You MUST use aliases when self-joining — otherwise SQL doesn't know which 'employees' is which."
          }
        ]
      },
      {
        title: "CROSS JOIN",
        type: "syntax",
        content: `Returns the Cartesian product — every row from table1 combined with every row from table2. If table1 has 5 rows and table2 has 4 rows, result has 20 rows.`,
        commands: [
          {
            label: "CROSS JOIN",
            code: `-- All possible size-color combinations:
SELECT sizes.name, colors.name
FROM sizes
CROSS JOIN colors;`,
            note: "CROSS JOIN has no ON clause. Can produce huge result sets! Use carefully."
          }
        ]
      },
      {
        title: "JOIN Visual Reference",
        type: "concept",
        content: `**INNER JOIN** → Only matching rows (intersection)
**LEFT JOIN** → All left rows + matching right rows  
**RIGHT JOIN** → All right rows + matching left rows
**FULL OUTER JOIN** → All rows from both tables
**CROSS JOIN** → Every combination (Cartesian product)
**SELF JOIN** → Table joined to itself

💡 Tip: LEFT JOIN + WHERE right.id IS NULL → rows in LEFT but NOT in RIGHT
💡 Tip: FULL JOIN + WHERE one side IS NULL → rows unique to each table`
      },
      {
        title: "Joining 3+ Tables",
        type: "syntax",
        commands: [
          {
            label: "Multiple JOINs",
            code: `-- Orders with customer name AND product name:
SELECT 
  c.name AS customer,
  p.name AS product,
  o.quantity,
  o.order_date
FROM orders o
INNER JOIN customers c ON o.customer_id = c.id
INNER JOIN products p ON o.product_id = p.id
ORDER BY o.order_date DESC;`,
            note: "Chain as many JOINs as needed. Each JOIN adds one more table. Always use table aliases with multiple joins!"
          }
        ]
      }
    ],
    quiz: [
      { q: "What's the difference between INNER JOIN and LEFT JOIN?", a: "INNER JOIN returns only rows with matches in BOTH tables. LEFT JOIN returns ALL rows from the left table, plus matching rows from right — unmatched right-side columns are NULL." },
      { q: "How do you find customers who have NEVER placed an order using a JOIN?", a: "SELECT c.name FROM customers c LEFT JOIN orders o ON c.id = o.customer_id WHERE o.customer_id IS NULL; — The WHERE filters to only rows where the join found no match." },
      { q: "Why do you need aliases when writing a SELF JOIN?", a: "Because you're using the SAME table twice. Without aliases, SQL can't tell which reference is the 'employee' version and which is the 'manager' version. You MUST give each reference a different alias." },
      { q: "A CROSS JOIN of a 10-row table with a 20-row table gives how many rows?", a: "10 × 20 = 200 rows. CROSS JOIN produces the Cartesian product — every row from table1 paired with every row from table2." },
      { q: "Write a query to get all employees and their department names (employee has department_id)", a: "SELECT e.name, d.department_name FROM employees e INNER JOIN departments d ON e.department_id = d.id;" },
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

export default function StudyGuide() {
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
          <div style={{ fontSize: 18, fontWeight: 700, color: "#fff", letterSpacing: 0.5 }}>CS232L Study Guide</div>
          <div style={{ fontSize: 11, color: "#888", fontFamily: "monospace" }}>GIKI · Database Management System Lab</div>
        </div>
        <div style={{ flex: 1 }} />
        <div style={{ fontSize: 12, color: "#aaa", background: "#1a1a2e", padding: "4px 12px", borderRadius: 20, border: "1px solid #333" }}>
          Labs 1–6 • Quick Revision
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
                <div style={{ background: "#0d0d1a", borderRadius: 10, overflow: "hidden", border: "1px solid #2a2a3a" }}>
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
                <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
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
