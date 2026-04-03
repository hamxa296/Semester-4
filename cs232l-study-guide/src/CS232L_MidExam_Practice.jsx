import { useState, useEffect, useRef } from "react";

const EXAM_DURATION = 90 * 60; // 90 minutes in seconds

const exam = {
  title: "CS232L — Database Management System Lab",
  subtitle: "Mid Semester Examination",
  totalMarks: 30,
  duration: "1.5 Hours",
  instructions: [
    "Attempt ALL questions.",
    "Write clean, properly formatted SQL.",
    "Read each question carefully before answering.",
    "Partial marks are awarded for correct logic even if syntax is slightly off.",
  ],
  questions: [
    {
      id: "Q1",
      topic: "DDL, DML & Constraints",
      marks: 10,
      parts: [
        {
          label: "a",
          marks: 4,
          text: `You are designing a database for a university. Create a table called \`courses\` with the following columns:
          
  • course_id — auto-incrementing primary key
  • course_name — text, max 150 characters, cannot be empty
  • credit_hours — integer, must be between 1 and 4 (inclusive)
  • department — text, max 50 characters
  • is_active — boolean, defaults to true`,
          hint: "Think: which constraint enforces 'between 1 and 4'? Which enforces 'cannot be empty'?",
          answer: `CREATE TABLE courses (
  course_id   SERIAL PRIMARY KEY,
  course_name VARCHAR(150) NOT NULL,
  credit_hours INT CHECK (credit_hours BETWEEN 1 AND 4),
  department  VARCHAR(50),
  is_active   BOOLEAN DEFAULT TRUE
);`
        },
        {
          label: "b",
          marks: 3,
          text: `After the table is created, do the following in sequence:
          
  (i)  Add a column called \`max_students\` of type integer.
  (ii) Rename the column \`department\` to \`dept_code\`.
  (iii) Add a UNIQUE constraint on \`course_name\`.`,
          hint: "Three separate ALTER TABLE statements.",
          answer: `-- (i)
ALTER TABLE courses ADD COLUMN max_students INT;

-- (ii)
ALTER TABLE courses RENAME COLUMN department TO dept_code;

-- (iii)
ALTER TABLE courses ADD CONSTRAINT unique_course_name UNIQUE (course_name);`
        },
        {
          label: "c",
          marks: 3,
          text: `A student named 'Zara Ahmed' with course_id = 201 tries to insert a course with credit_hours = 6. 

  (i)  Write the INSERT statement she attempted.
  (ii) Will it succeed? Explain WHY or WHY NOT in one sentence.
  (iii) Write a correct INSERT that WILL succeed (use your own valid values).`,
          hint: "Refer back to the CHECK constraint you defined in part (a).",
          answer: `-- (i) Her attempted INSERT:
INSERT INTO courses (course_name, credit_hours, dept_code)
VALUES ('Advanced Algorithms', 6, 'CS');

-- (ii) It will FAIL because the CHECK constraint requires
-- credit_hours to be BETWEEN 1 AND 4, and 6 violates this.

-- (iii) A valid INSERT:
INSERT INTO courses (course_name, credit_hours, dept_code)
VALUES ('Advanced Algorithms', 3, 'CS');`
        }
      ]
    },
    {
      id: "Q2",
      topic: "JOIN Queries",
      marks: 12,
      scenario: `You are given the following three tables for an online bookstore:

  authors(author_id, author_name, country)
  books(book_id, title, author_id, genre, price)
  orders(order_id, book_id, customer_name, quantity, order_date)

  Assume authors and books are linked via author_id.
  Assume books and orders are linked via book_id.`,
      parts: [
        {
          label: "a",
          marks: 3,
          text: `List the title of every book along with its author's name and country. Only include books that have a known author (i.e., the author exists in the authors table).`,
          hint: "Which JOIN type only returns rows when there's a match on BOTH sides?",
          answer: `SELECT b.title, a.author_name, a.country
FROM books b
INNER JOIN authors a ON b.author_id = a.author_id;`
        },
        {
          label: "b",
          marks: 3,
          text: `List ALL books, showing their title, price, and — if the book has been ordered — the customer name and order date. Books that have never been ordered should still appear in the result, with NULL in the customer and date columns.`,
          hint: "Which JOIN keeps ALL rows from the LEFT table regardless of match?",
          answer: `SELECT b.title, b.price, o.customer_name, o.order_date
FROM books b
LEFT JOIN orders o ON b.book_id = o.book_id;`
        },
        {
          label: "c",
          marks: 3,
          text: `Find the names of all books that have NEVER been ordered. Display only the book title and genre.`,
          hint: "LEFT JOIN + WHERE [right side] IS NULL is the classic pattern here.",
          answer: `SELECT b.title, b.genre
FROM books b
LEFT JOIN orders o ON b.book_id = o.book_id
WHERE o.book_id IS NULL;`
        },
        {
          label: "d",
          marks: 3,
          text: `Write a single query that shows: the customer name, book title, author name, quantity ordered, and order date — for all orders placed after '2024-01-01'. Sort by order_date newest first.`,
          hint: "This needs 3 tables joined together. Use aliases to keep it clean.",
          answer: `SELECT 
  o.customer_name,
  b.title,
  a.author_name,
  o.quantity,
  o.order_date
FROM orders o
INNER JOIN books b ON o.book_id = b.book_id
INNER JOIN authors a ON b.author_id = a.author_id
WHERE o.order_date > '2024-01-01'
ORDER BY o.order_date DESC;`
        }
      ]
    },
    {
      id: "Q3",
      topic: "Aggregate Functions, GROUP BY & Subqueries",
      marks: 8,
      scenario: `Using the same bookstore tables from Q2:
  authors(author_id, author_name, country)
  books(book_id, title, author_id, genre, price)
  orders(order_id, book_id, customer_name, quantity, order_date)`,
      parts: [
        {
          label: "a",
          marks: 3,
          text: `For each genre, show the genre name, number of books in that genre, and the average price. Only show genres where the average price is greater than 500 (PKR). Sort by average price descending.`,
          hint: "GROUP BY genre. Filter on groups using HAVING, not WHERE.",
          answer: `SELECT 
  genre,
  COUNT(*) AS total_books,
  AVG(price) AS avg_price
FROM books
GROUP BY genre
HAVING AVG(price) > 500
ORDER BY avg_price DESC;`
        },
        {
          label: "b",
          marks: 2,
          text: `Using a subquery, find all books whose price is higher than the average price of ALL books in the store.`,
          hint: "The subquery returns a single value — the overall average price.",
          answer: `SELECT title, price
FROM books
WHERE price > (SELECT AVG(price) FROM books);`
        },
        {
          label: "c",
          marks: 3,
          text: `Find each author's name and the total number of orders placed for their books combined. Only include authors whose books have received at least 3 orders total. 

  (This requires joining all 3 tables.)`,
          hint: "Join all 3 tables → GROUP BY author → HAVING COUNT >= 3.",
          answer: `SELECT 
  a.author_name,
  COUNT(o.order_id) AS total_orders
FROM authors a
INNER JOIN books b ON a.author_id = b.author_id
INNER JOIN orders o ON b.book_id = o.book_id
GROUP BY a.author_name
HAVING COUNT(o.order_id) >= 3;`
        }
      ]
    }
  ]
};

function Timer({ running, onTimeUp }) {
  const [seconds, setSeconds] = useState(EXAM_DURATION);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSeconds(s => {
          if (s <= 1) { clearInterval(intervalRef.current); onTimeUp(); return 0; }
          return s - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [running]);

  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  const pct = seconds / EXAM_DURATION;
  const color = pct > 0.5 ? "#27AE60" : pct > 0.25 ? "#F39C12" : "#E74C3C";

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div style={{ width: 44, height: 44, borderRadius: "50%", background: `conic-gradient(${color} ${pct * 360}deg, #2a2a3a ${pct * 360}deg)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 34, height: 34, borderRadius: "50%", background: "#0a0a12", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ color, fontSize: 10, fontWeight: 700, fontFamily: "monospace" }}>{m}:{String(s).padStart(2,"0")}</span>
        </div>
      </div>
      <div>
        <div style={{ color, fontSize: 13, fontWeight: 700 }}>{m}m {String(s).padStart(2,"0")}s</div>
        <div style={{ color: "#555", fontSize: 10 }}>remaining</div>
      </div>
    </div>
  );
}

export default function MidExam() {
  const [phase, setPhase] = useState("cover"); // cover | exam | review
  const [revealed, setRevealed] = useState({});
  const [timeUp, setTimeUp] = useState(false);
  const [timerRunning, setTimerRunning] = useState(false);

  const toggleReveal = (key) => setRevealed(r => ({ ...r, [key]: !r[key] }));

  const startExam = () => { setPhase("exam"); setTimerRunning(true); };
  const handleTimeUp = () => { setTimeUp(true); setTimerRunning(false); };

  const totalParts = exam.questions.reduce((acc, q) => acc + q.parts.length, 0);

  return (
    <div style={{ fontFamily: "'Georgia', serif", background: "#0a0a12", color: "#e8e8f0", minHeight: "100vh" }}>

      {/* Cover Page */}
      {phase === "cover" && (
        <div style={{ maxWidth: 680, margin: "0 auto", padding: "60px 24px", textAlign: "center" }}>
          <div style={{ fontSize: 11, letterSpacing: 3, color: "#555", textTransform: "uppercase", marginBottom: 24 }}>
            Ghulam Ishaq Khan Institute of Engineering Sciences
          </div>
          <div style={{ width: 1, height: 60, background: "linear-gradient(transparent, #444, transparent)", margin: "0 auto 24px" }} />
          <h1 style={{ fontSize: 26, color: "#fff", margin: "0 0 8px", fontWeight: 700 }}>{exam.title}</h1>
          <h2 style={{ fontSize: 16, color: "#888", margin: "0 0 40px", fontWeight: 400, fontStyle: "italic" }}>{exam.subtitle}</h2>

          <div style={{ display: "flex", justifyContent: "center", gap: 40, marginBottom: 40 }}>
            {[["Total Marks", exam.totalMarks], ["Duration", exam.duration], ["Questions", "3"]].map(([label, val]) => (
              <div key={label}>
                <div style={{ fontSize: 28, fontWeight: 700, color: "#7ecfff" }}>{val}</div>
                <div style={{ fontSize: 11, color: "#555", textTransform: "uppercase", letterSpacing: 1 }}>{label}</div>
              </div>
            ))}
          </div>

          <div style={{ background: "#111122", border: "1px solid #2a2a3a", borderRadius: 12, padding: 20, marginBottom: 40, textAlign: "left" }}>
            <div style={{ color: "#7ecfff", fontSize: 12, fontWeight: 700, marginBottom: 12, textTransform: "uppercase", letterSpacing: 1 }}>Instructions</div>
            {exam.instructions.map((inst, i) => (
              <div key={i} style={{ color: "#bbb", fontSize: 13, marginBottom: 6, paddingLeft: 16, borderLeft: "2px solid #2a2a3a" }}>
                {inst}
              </div>
            ))}
          </div>

          <div style={{ background: "#0d1a12", border: "1px solid #27AE6033", borderRadius: 12, padding: 16, marginBottom: 36, textAlign: "left" }}>
            <div style={{ color: "#27AE60", fontSize: 12, fontWeight: 700, marginBottom: 8 }}>📋 Question Breakdown</div>
            {exam.questions.map(q => (
              <div key={q.id} style={{ display: "flex", justifyContent: "space-between", color: "#aaa", fontSize: 13, marginBottom: 4, padding: "4px 0", borderBottom: "1px solid #1a2a1a" }}>
                <span>{q.id} — {q.topic}</span>
                <span style={{ color: "#27AE60", fontWeight: 700 }}>{q.marks} marks</span>
              </div>
            ))}
          </div>

          <button onClick={startExam} style={{ background: "#7ecfff", color: "#0a0a12", border: "none", borderRadius: 10, padding: "14px 40px", fontSize: 15, fontWeight: 700, cursor: "pointer", letterSpacing: 0.5 }}>
            Start Exam — Timer Begins Now ⏱
          </button>
          <div style={{ color: "#444", fontSize: 11, marginTop: 12 }}>The 90-minute countdown starts when you click</div>
        </div>
      )}

      {/* Exam Phase */}
      {phase === "exam" && (
        <div>
          {/* Sticky header */}
          <div style={{ position: "sticky", top: 0, background: "#0d0d1a", borderBottom: "1px solid #2a2a3a", padding: "10px 20px", display: "flex", alignItems: "center", gap: 20, zIndex: 100 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>CS232L Mid Exam</div>
              <div style={{ fontSize: 11, color: "#555" }}>Total: {exam.totalMarks} marks • 3 questions</div>
            </div>
            <Timer running={timerRunning} onTimeUp={handleTimeUp} />
            <button onClick={() => { setTimerRunning(false); setPhase("review"); }}
              style={{ background: "#27AE60", border: "none", color: "#fff", borderRadius: 8, padding: "8px 16px", cursor: "pointer", fontSize: 12, fontWeight: 700 }}>
              Submit & Review →
            </button>
          </div>

          {timeUp && (
            <div style={{ background: "#2a0a0a", border: "1px solid #E74C3C", padding: 14, textAlign: "center", color: "#E74C3C", fontWeight: 700 }}>
              ⏰ Time's Up! Scroll down to submit or keep reviewing.
            </div>
          )}

          <div style={{ maxWidth: 820, margin: "0 auto", padding: "28px 20px" }}>
            {exam.questions.map((q, qi) => (
              <div key={q.id} style={{ marginBottom: 48 }}>
                {/* Question header */}
                <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 16, padding: 18, background: "#111122", borderRadius: 12, border: "1px solid #2a2a3a", borderLeft: "4px solid #7ecfff" }}>
                  <div style={{ background: "#7ecfff22", color: "#7ecfff", fontWeight: 700, fontSize: 15, padding: "6px 14px", borderRadius: 6, whiteSpace: "nowrap" }}>
                    {q.id}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ color: "#fff", fontWeight: 700, fontSize: 15 }}>{q.topic}</div>
                    {q.scenario && (
                      <div style={{ marginTop: 10, background: "#0d0d1a", borderRadius: 8, padding: 14, borderLeft: "3px solid #444" }}>
                        <div style={{ color: "#888", fontSize: 11, fontWeight: 700, textTransform: "uppercase", marginBottom: 6 }}>Scenario</div>
                        <pre style={{ margin: 0, color: "#bbb", fontSize: 12, fontFamily: "monospace", whiteSpace: "pre-wrap", lineHeight: 1.7 }}>{q.scenario}</pre>
                      </div>
                    )}
                  </div>
                  <div style={{ color: "#7ecfff", fontWeight: 700, fontSize: 14, whiteSpace: "nowrap" }}>[{q.marks} marks]</div>
                </div>

                {q.parts.map((part, pi) => (
                  <div key={pi} style={{ marginBottom: 20, padding: 18, background: "#0d0d1a", borderRadius: 10, border: "1px solid #1e1e30" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                      <span style={{ color: "#7ecfff", fontWeight: 700, fontSize: 13 }}>({part.label})</span>
                      <span style={{ color: "#555", fontSize: 12 }}>[{part.marks} marks]</span>
                    </div>
                    <div style={{ color: "#ddd", fontSize: 14, lineHeight: 1.9, marginBottom: 14, whiteSpace: "pre-wrap" }}>{part.text}</div>

                    {/* Answer space */}
                    <div style={{ background: "#111", border: "1px dashed #333", borderRadius: 8, padding: 14, minHeight: 80, marginBottom: 12 }}>
                      <div style={{ color: "#333", fontSize: 11, fontStyle: "italic" }}>Your answer space — write on paper or type mentally here</div>
                    </div>

                    {/* Hint toggle */}
                    <button onClick={() => toggleReveal(`hint-${qi}-${pi}`)}
                      style={{ background: "transparent", border: "1px solid #333", color: "#666", borderRadius: 6, padding: "4px 12px", cursor: "pointer", fontSize: 11, marginRight: 8 }}>
                      {revealed[`hint-${qi}-${pi}`] ? "Hide Hint" : "💭 Show Hint"}
                    </button>
                    <button onClick={() => toggleReveal(`ans-${qi}-${pi}`)}
                      style={{ background: "transparent", border: "1px solid #27AE6055", color: "#27AE60", borderRadius: 6, padding: "4px 12px", cursor: "pointer", fontSize: 11 }}>
                      {revealed[`ans-${qi}-${pi}`] ? "Hide Answer" : "✓ Show Answer"}
                    </button>

                    {revealed[`hint-${qi}-${pi}`] && (
                      <div style={{ background: "#1a1500", border: "1px solid #F39C1233", borderRadius: 6, padding: 10, marginTop: 10, color: "#F39C12", fontSize: 12 }}>
                        💭 {part.hint}
                      </div>
                    )}
                    {revealed[`ans-${qi}-${pi}`] && (
                      <div style={{ marginTop: 10 }}>
                        <pre style={{ background: "#0d1a0d", border: "1px solid #27AE6033", borderRadius: 6, padding: 14, color: "#a8e6a8", fontSize: 12, fontFamily: "monospace", overflowX: "auto", whiteSpace: "pre", lineHeight: 1.7, margin: 0 }}>
                          {part.answer}
                        </pre>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}

            <div style={{ textAlign: "center", padding: "20px 0 40px" }}>
              <button onClick={() => { setTimerRunning(false); setPhase("review"); }}
                style={{ background: "#27AE60", border: "none", color: "#fff", borderRadius: 10, padding: "14px 40px", fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
                Submit Exam & See Full Review →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Review Phase */}
      {phase === "review" && (
        <div style={{ maxWidth: 820, margin: "0 auto", padding: "36px 20px" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>📋</div>
            <h1 style={{ color: "#fff", margin: "0 0 6px" }}>Full Answer Key</h1>
            <p style={{ color: "#888", margin: 0 }}>Review every question and model answer below</p>
          </div>

          {exam.questions.map((q, qi) => (
            <div key={q.id} style={{ marginBottom: 44 }}>
              <div style={{ background: "#111122", borderRadius: 12, padding: 18, marginBottom: 16, borderLeft: "4px solid #7ecfff" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div style={{ color: "#7ecfff", fontWeight: 700, fontSize: 16 }}>{q.id} — {q.topic}</div>
                  <div style={{ color: "#7ecfff", fontWeight: 700 }}>{q.marks} marks</div>
                </div>
                {q.scenario && <pre style={{ margin: "12px 0 0", color: "#888", fontSize: 12, fontFamily: "monospace", whiteSpace: "pre-wrap", lineHeight: 1.7 }}>{q.scenario}</pre>}
              </div>

              {q.parts.map((part, pi) => (
                <div key={pi} style={{ marginBottom: 16, background: "#0d0d1a", border: "1px solid #1e1e30", borderRadius: 10, overflow: "hidden" }}>
                  <div style={{ padding: "12px 18px", borderBottom: "1px solid #1e1e30", display: "flex", justifyContent: "space-between" }}>
                    <div>
                      <span style={{ color: "#7ecfff", fontWeight: 700, marginRight: 10 }}>({part.label})</span>
                      <span style={{ color: "#ccc", fontSize: 13 }}>{part.text.split('\n')[0].trim()}</span>
                    </div>
                    <span style={{ color: "#555", fontSize: 12 }}>[{part.marks}]</span>
                  </div>
                  <div style={{ padding: 14 }}>
                    <div style={{ color: "#F39C12", fontSize: 11, marginBottom: 6 }}>💭 {part.hint}</div>
                    <pre style={{ background: "#0a1a0a", border: "1px solid #27AE6033", borderRadius: 6, padding: 14, color: "#a8e6a8", fontSize: 12, fontFamily: "monospace", overflowX: "auto", whiteSpace: "pre", lineHeight: 1.7, margin: 0 }}>
                      {part.answer}
                    </pre>
                  </div>
                </div>
              ))}
            </div>
          ))}

          <div style={{ textAlign: "center", paddingBottom: 40 }}>
            <button onClick={() => { setPhase("cover"); setRevealed({}); setTimeUp(false); setTimerRunning(false); }}
              style={{ background: "#7ecfff", color: "#0a0a12", border: "none", borderRadius: 10, padding: "12px 32px", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
              ↩ Retake Exam
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
