import { useState, useEffect, useRef } from "react";

const EXAM_DURATION = 90 * 60;

const exam = {
  title: "CS232L — Database Management System Lab",
  subtitle: "Mid Semester Examination — Paper II",
  totalMarks: 30,
  duration: "1.5 Hours",
  instructions: [
    "Attempt ALL three questions.",
    "Write clean, properly indented SQL.",
    "Marks are awarded for correct logic even with minor syntax slips.",
    "Read the schema carefully before each question — column names matter.",
  ],
  questions: [
    {
      id: "Q1",
      topic: "Keys & Constraints (PRIMARY, FOREIGN, COMPOSITE)",
      marks: 10,
      scenario: `You are building a hospital management database.
The hospital has departments, doctors, and patients.
A doctor belongs to one department.
A patient is assigned to exactly one doctor.
An appointment links a patient to a doctor on a specific date — 
  the same patient cannot have two appointments with the same doctor on the same day.`,
      parts: [
        {
          label: "a",
          marks: 4,
          text: `Create the \`departments\` and \`doctors\` tables using the following specifications:

departments:
  • dept_id       — auto-incrementing PRIMARY KEY
  • dept_name     — text up to 100 chars, cannot be NULL, must be UNIQUE
  • location      — text up to 100 chars

doctors:
  • doctor_id     — auto-incrementing PRIMARY KEY
  • full_name     — text up to 150 chars, cannot be NULL
  • specialization — text up to 100 chars
  • dept_id       — FOREIGN KEY referencing departments(dept_id)
                    If a department is deleted, set this column to NULL.`,
          hint: "ON DELETE SET NULL goes at the end of the FOREIGN KEY definition. SERIAL for auto-increment.",
          answer: `CREATE TABLE departments (
  dept_id   SERIAL PRIMARY KEY,
  dept_name VARCHAR(100) NOT NULL UNIQUE,
  location  VARCHAR(100)
);

CREATE TABLE doctors (
  doctor_id      SERIAL PRIMARY KEY,
  full_name      VARCHAR(150) NOT NULL,
  specialization VARCHAR(100),
  dept_id        INT,
  CONSTRAINT fk_doctor_dept
    FOREIGN KEY (dept_id)
    REFERENCES departments(dept_id)
    ON DELETE SET NULL
);`
        },
        {
          label: "b",
          marks: 3,
          text: `Create the \`appointments\` table with the following specs:

  • appointment_id  — auto-incrementing PRIMARY KEY
  • patient_name    — text up to 150 chars, NOT NULL
  • doctor_id       — FOREIGN KEY → doctors(doctor_id), ON DELETE CASCADE
  • appt_date       — DATE, cannot be NULL
  • notes           — unlimited text (optional)
  
  COMPOSITE UNIQUE constraint: the combination of (doctor_id, patient_name, appt_date) 
  must be unique — same patient cannot book the same doctor twice on the same day.`,
          hint: "Composite UNIQUE is defined at TABLE level, not column level. Use ADD CONSTRAINT ... UNIQUE (col1, col2, col3).",
          answer: `CREATE TABLE appointments (
  appointment_id SERIAL PRIMARY KEY,
  patient_name   VARCHAR(150) NOT NULL,
  doctor_id      INT NOT NULL,
  appt_date      DATE NOT NULL,
  notes          TEXT,
  CONSTRAINT fk_appt_doctor
    FOREIGN KEY (doctor_id)
    REFERENCES doctors(doctor_id)
    ON DELETE CASCADE,
  CONSTRAINT unique_appt
    UNIQUE (doctor_id, patient_name, appt_date)
);`
        },
        {
          label: "c",
          marks: 3,
          text: `Answer the following short questions based on the schema you created above:

(i)  A doctor with doctor_id = 5 is deleted from the doctors table. 
     What happens to all appointments that had doctor_id = 5? Why?

(ii) A department with dept_id = 3 is deleted. 
     What happens to doctors whose dept_id was 3? Why?

(iii) Is this INSERT valid? Explain.
     INSERT INTO appointments (patient_name, doctor_id, appt_date)
     VALUES ('Hamza Ali', 7, '2025-03-15');
     -- A row with (doctor_id=7, patient_name='Hamza Ali', appt_date='2025-03-15')
     -- already exists in the table.`,
          hint: "Trace each FK action you wrote: ON DELETE CASCADE vs ON DELETE SET NULL. For (iii) think about the UNIQUE constraint.",
          answer: `(i)  All appointments with doctor_id = 5 are AUTOMATICALLY DELETED.
     This is because the foreign key on appointments has ON DELETE CASCADE —
     when the parent row (doctor) is deleted, all child rows (appointments) 
     referencing it are deleted too.

(ii) Doctors with dept_id = 3 will have their dept_id set to NULL.
     This is because the foreign key on doctors has ON DELETE SET NULL —
     the doctor record remains, but the dept_id column becomes NULL.

(iii) The INSERT will FAIL.
     The COMPOSITE UNIQUE constraint (doctor_id, patient_name, appt_date)
     is violated — that exact combination already exists in the table.
     PostgreSQL will throw a unique constraint violation error.`
        }
      ]
    },
    {
      id: "Q2",
      topic: "JOIN Queries",
      marks: 12,
      scenario: `Using the hospital database from Q1, the tables are:

  departments(dept_id, dept_name, location)
  doctors(doctor_id, full_name, specialization, dept_id)
  appointments(appointment_id, patient_name, doctor_id, appt_date, notes)

  Sample data exists in all three tables.
  Some doctors have not been assigned any appointments yet.
  Some departments have no doctors assigned to them.`,
      parts: [
        {
          label: "a",
          marks: 3,
          text: `List every doctor's full name, their specialization, and the name of their department. 
Only include doctors who ARE assigned to a department (i.e., dept_id is not NULL and the department exists).`,
          hint: "INNER JOIN — only shows rows with a match on both sides.",
          answer: `SELECT 
  d.full_name,
  d.specialization,
  dep.dept_name
FROM doctors d
INNER JOIN departments dep ON d.dept_id = dep.dept_id;`
        },
        {
          label: "b",
          marks: 3,
          text: `List ALL doctors (every single one), showing their full name, specialization, 
and department name. If a doctor has no department assigned, show NULL for department name.`,
          hint: "LEFT JOIN keeps ALL rows from the left (doctors) table regardless of match.",
          answer: `SELECT 
  d.full_name,
  d.specialization,
  dep.dept_name
FROM doctors d
LEFT JOIN departments dep ON d.dept_id = dep.dept_id;`
        },
        {
          label: "c",
          marks: 3,
          text: `Find the names of all doctors who have NO appointments scheduled at all.
Display their full name and specialization only.`,
          hint: "LEFT JOIN doctors → appointments, then filter WHERE the right side IS NULL. Classic anti-join.",
          answer: `SELECT 
  d.full_name,
  d.specialization
FROM doctors d
LEFT JOIN appointments a ON d.doctor_id = a.doctor_id
WHERE a.doctor_id IS NULL;`
        },
        {
          label: "d",
          marks: 3,
          text: `Write a single query joining ALL THREE tables to show:
  patient_name, doctor's full_name, dept_name, and appt_date
  
  — for all appointments made in the year 2025.
  — sorted by appt_date (earliest first).
  — only include doctors who have a department assigned.`,
          hint: "3-table join: appointments → doctors → departments. Use INNER JOIN for all since we only want assigned doctors. Filter appt_date with BETWEEN or EXTRACT.",
          answer: `SELECT 
  a.patient_name,
  d.full_name      AS doctor_name,
  dep.dept_name,
  a.appt_date
FROM appointments a
INNER JOIN doctors d    ON a.doctor_id = d.doctor_id
INNER JOIN departments dep ON d.dept_id = dep.dept_id
WHERE a.appt_date BETWEEN '2025-01-01' AND '2025-12-31'
ORDER BY a.appt_date ASC;`
        }
      ]
    },
    {
      id: "Q3",
      topic: "Subqueries & Aggregate Functions",
      marks: 8,
      scenario: `Still using the hospital database:

  departments(dept_id, dept_name, location)
  doctors(doctor_id, full_name, specialization, dept_id)
  appointments(appointment_id, patient_name, doctor_id, appt_date, notes)`,
      parts: [
        {
          label: "a",
          marks: 2,
          text: `Using a subquery, find the full name of the doctor(s) who have the MOST appointments.
(Do not use LIMIT — use a subquery to find the maximum count.)`,
          hint: "Inner query: SELECT doctor_id, COUNT(*) FROM appointments GROUP BY doctor_id. Outer query: find doctor_id where count = MAX of those counts. Then join to get the name.",
          answer: `SELECT full_name
FROM doctors
WHERE doctor_id = (
  SELECT doctor_id
  FROM appointments
  GROUP BY doctor_id
  ORDER BY COUNT(*) DESC
  LIMIT 1
);

-- OR using a proper subquery without LIMIT:
SELECT full_name
FROM doctors
WHERE doctor_id IN (
  SELECT doctor_id
  FROM appointments
  GROUP BY doctor_id
  HAVING COUNT(*) = (
    SELECT MAX(appt_count)
    FROM (
      SELECT COUNT(*) AS appt_count
      FROM appointments
      GROUP BY doctor_id
    ) AS counts
  )
);`
        },
        {
          label: "b",
          marks: 2,
          text: `Using a subquery in WHERE, find the names of all patients who have an appointment with 
a doctor in the 'Cardiology' department.
(Use a subquery — do not use JOIN for this part.)`,
          hint: "Work outward: first find dept_id of Cardiology, then find doctor_ids in that dept, then find patients with those doctor_ids.",
          answer: `SELECT DISTINCT patient_name
FROM appointments
WHERE doctor_id IN (
  SELECT doctor_id
  FROM doctors
  WHERE dept_id = (
    SELECT dept_id
    FROM departments
    WHERE dept_name = 'Cardiology'
  )
);`
        },
        {
          label: "c",
          marks: 4,
          text: `For each department, show:
  • dept_name
  • number of doctors in that department  (call it: total_doctors)
  • number of total appointments across all doctors in that department  (call it: total_appointments)

Only include departments that have MORE THAN 2 doctors.
Sort by total_appointments descending.`,
          hint: "JOIN departments → doctors → appointments. GROUP BY dept_name. Use HAVING to filter groups. COUNT(DISTINCT doctor_id) for doctors, COUNT(appointment_id) for appointments.",
          answer: `SELECT 
  dep.dept_name,
  COUNT(DISTINCT d.doctor_id)      AS total_doctors,
  COUNT(a.appointment_id)          AS total_appointments
FROM departments dep
INNER JOIN doctors d      ON dep.dept_id = d.dept_id
LEFT JOIN  appointments a ON d.doctor_id = a.doctor_id
GROUP BY dep.dept_name
HAVING COUNT(DISTINCT d.doctor_id) > 2
ORDER BY total_appointments DESC;`
        }
      ]
    }
  ]
};

// ─── Timer ───────────────────────────────────────────────────────────────────
function Timer({ running, onTimeUp }) {
  const [secs, setSecs] = useState(EXAM_DURATION);
  const ref = useRef(null);
  useEffect(() => {
    if (running) {
      ref.current = setInterval(() => {
        setSecs(s => {
          if (s <= 1) { clearInterval(ref.current); onTimeUp(); return 0; }
          return s - 1;
        });
      }, 1000);
    }
    return () => clearInterval(ref.current);
  }, [running]);

  const m = Math.floor(secs / 60);
  const s = secs % 60;
  const pct = secs / EXAM_DURATION;
  const col = pct > 0.5 ? "#00C896" : pct > 0.25 ? "#F5A623" : "#E74C3C";

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <svg width="46" height="46" viewBox="0 0 46 46">
        <circle cx="23" cy="23" r="20" fill="none" stroke="#1e1e30" strokeWidth="4"/>
        <circle cx="23" cy="23" r="20" fill="none" stroke={col} strokeWidth="4"
          strokeDasharray={`${2 * Math.PI * 20}`}
          strokeDashoffset={`${2 * Math.PI * 20 * (1 - pct)}`}
          strokeLinecap="round"
          style={{ transform: "rotate(-90deg)", transformOrigin: "center", transition: "stroke-dashoffset 1s linear" }}
        />
        <text x="23" y="27" textAnchor="middle" fill={col} fontSize="9" fontFamily="monospace" fontWeight="bold">
          {m}:{String(s).padStart(2, "0")}
        </text>
      </svg>
      <div>
        <div style={{ color: col, fontSize: 13, fontWeight: 700, fontFamily: "monospace" }}>{m}m {String(s).padStart(2,"0")}s left</div>
        <div style={{ color: "#444", fontSize: 10 }}>keep going</div>
      </div>
    </div>
  );
}

// ─── Code Block ───────────────────────────────────────────────────────────────
function CodeBlock({ code }) {
  const [copied, setCopied] = useState(false);
  return (
    <div style={{ borderRadius: 8, overflow: "hidden", border: "1px solid #1e3a1e", marginTop: 8 }}>
      <div style={{ background: "#0d1f0d", padding: "6px 12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ color: "#4caf50", fontSize: 10, fontFamily: "monospace", fontWeight: 700, letterSpacing: 1 }}>MODEL ANSWER</span>
        <button onClick={() => { navigator.clipboard?.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 1500); }}
          style={{ background: "none", border: "1px solid #2a4a2a", color: "#4caf50", borderRadius: 4, padding: "2px 8px", cursor: "pointer", fontSize: 10 }}>
          {copied ? "✓" : "copy"}
        </button>
      </div>
      <pre style={{ background: "#060f06", color: "#a8d5a8", padding: "14px 16px", margin: 0, fontSize: 12.5, overflowX: "auto", lineHeight: 1.8, fontFamily: "'Courier New', monospace", whiteSpace: "pre" }}>
        {code}
      </pre>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function Exam2() {
  const [phase, setPhase] = useState("cover");
  const [revealed, setRevealed] = useState({});
  const [timerRunning, setTimerRunning] = useState(false);
  const [timeUp, setTimeUp] = useState(false);

  const toggle = (key) => setRevealed(r => ({ ...r, [key]: !r[key] }));
  const startExam = () => { setPhase("exam"); setTimerRunning(true); };
  const submit = () => { setTimerRunning(false); setPhase("review"); };

  // ── Cover ──────────────────────────────────────────────────────────────────
  if (phase === "cover") return (
    <div style={{ fontFamily: "'Georgia', serif", background: "#080810", color: "#e0e0f0", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ maxWidth: 660, width: "100%", padding: "48px 28px", textAlign: "center" }}>

        <div style={{ fontSize: 10, letterSpacing: 4, color: "#444", textTransform: "uppercase", marginBottom: 20 }}>
          Ghulam Ishaq Khan Institute · CS232L
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14, marginBottom: 28 }}>
          <div style={{ height: 1, flex: 1, background: "linear-gradient(to right, transparent, #333)" }} />
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#7ecfff" }} />
          <div style={{ height: 1, flex: 1, background: "linear-gradient(to left, transparent, #333)" }} />
        </div>

        <h1 style={{ fontSize: 24, color: "#fff", margin: "0 0 4px", fontWeight: 700, letterSpacing: 0.5 }}>
          Database Management System Lab
        </h1>
        <h2 style={{ fontSize: 15, color: "#666", margin: "0 0 8px", fontWeight: 400, fontStyle: "italic" }}>
          Mid Semester Examination — Paper II
        </h2>
        <div style={{ color: "#7ecfff", fontSize: 12, letterSpacing: 2, marginBottom: 36 }}>PRACTICE SET</div>

        <div style={{ display: "flex", justifyContent: "center", gap: 44, marginBottom: 36 }}>
          {[["30", "Total Marks"], ["90 min", "Duration"], ["3", "Questions"]].map(([v, l]) => (
            <div key={l}>
              <div style={{ fontSize: 26, fontWeight: 700, color: "#7ecfff", fontFamily: "monospace" }}>{v}</div>
              <div style={{ fontSize: 10, color: "#555", textTransform: "uppercase", letterSpacing: 1, marginTop: 2 }}>{l}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#0d0d1a", border: "1px solid #1e1e30", borderRadius: 12, padding: 18, marginBottom: 20, textAlign: "left" }}>
          <div style={{ color: "#7ecfff", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>Instructions</div>
          {exam.instructions.map((ins, i) => (
            <div key={i} style={{ color: "#aaa", fontSize: 13, marginBottom: 7, paddingLeft: 14, borderLeft: "2px solid #2a2a3a", lineHeight: 1.5 }}>{ins}</div>
          ))}
        </div>

        <div style={{ background: "#0a0a14", border: "1px solid #1e1e30", borderRadius: 12, padding: 16, marginBottom: 32, textAlign: "left" }}>
          <div style={{ color: "#7ecfff", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>Question Breakdown</div>
          {exam.questions.map(q => (
            <div key={q.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: "1px solid #14141e" }}>
              <div>
                <span style={{ color: "#7ecfff", fontWeight: 700, fontSize: 13, marginRight: 8 }}>{q.id}</span>
                <span style={{ color: "#888", fontSize: 13 }}>{q.topic}</span>
              </div>
              <span style={{ color: "#7ecfff", fontFamily: "monospace", fontWeight: 700, fontSize: 13 }}>[{q.marks}]</span>
            </div>
          ))}
        </div>

        <button onClick={startExam}
          style={{ background: "#7ecfff", color: "#080810", border: "none", borderRadius: 10, padding: "13px 44px", fontSize: 15, fontWeight: 700, cursor: "pointer", letterSpacing: 0.5 }}>
          Begin Exam ⏱
        </button>
        <div style={{ color: "#333", fontSize: 11, marginTop: 10 }}>90-minute timer starts immediately</div>
      </div>
    </div>
  );

  // ── Exam ───────────────────────────────────────────────────────────────────
  if (phase === "exam") return (
    <div style={{ fontFamily: "'Georgia', serif", background: "#080810", color: "#e0e0f0", minHeight: "100vh" }}>

      {/* Sticky bar */}
      <div style={{ position: "sticky", top: 0, zIndex: 50, background: "#0d0d1a", borderBottom: "1px solid #1e1e30", padding: "10px 20px", display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>CS232L Mid Exam — Paper II</div>
          <div style={{ fontSize: 10, color: "#444" }}>30 marks · 3 questions · Hospital DB scenario</div>
        </div>
        <Timer running={timerRunning} onTimeUp={() => { setTimeUp(true); setTimerRunning(false); }} />
        <button onClick={submit}
          style={{ background: "#7ecfff", border: "none", color: "#080810", borderRadius: 8, padding: "8px 18px", cursor: "pointer", fontSize: 12, fontWeight: 700 }}>
          Submit →
        </button>
      </div>

      {timeUp && (
        <div style={{ background: "#1a0808", borderBottom: "1px solid #E74C3C55", padding: "10px 20px", textAlign: "center", color: "#E74C3C", fontSize: 13, fontWeight: 700 }}>
          ⏰ Time's up! Click Submit to see the answers.
        </div>
      )}

      <div style={{ maxWidth: 840, margin: "0 auto", padding: "28px 20px" }}>
        {exam.questions.map((q, qi) => (
          <div key={q.id} style={{ marginBottom: 52 }}>

            {/* Q header */}
            <div style={{ background: "#0d0d1a", border: "1px solid #2a2a40", borderLeft: "4px solid #7ecfff", borderRadius: 10, padding: "16px 20px", marginBottom: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: q.scenario ? 12 : 0 }}>
                <div>
                  <span style={{ color: "#7ecfff", fontWeight: 700, fontSize: 16, marginRight: 10 }}>{q.id}</span>
                  <span style={{ color: "#ddd", fontSize: 15, fontWeight: 600 }}>{q.topic}</span>
                </div>
                <span style={{ color: "#7ecfff", fontFamily: "monospace", fontWeight: 700 }}>[{q.marks} marks]</span>
              </div>
              {q.scenario && (
                <div style={{ background: "#080810", borderRadius: 8, padding: "12px 14px", borderLeft: "3px solid #333" }}>
                  <div style={{ color: "#555", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>Scenario</div>
                  <pre style={{ margin: 0, color: "#aaa", fontSize: 12, fontFamily: "monospace", whiteSpace: "pre-wrap", lineHeight: 1.8 }}>{q.scenario}</pre>
                </div>
              )}
            </div>

            {/* Parts */}
            {q.parts.map((part, pi) => (
              <div key={pi} style={{ background: "#0a0a14", border: "1px solid #1a1a28", borderRadius: 10, padding: 18, marginBottom: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                  <span style={{ color: "#7ecfff", fontWeight: 700, fontFamily: "monospace" }}>({part.label})</span>
                  <span style={{ color: "#333", fontSize: 12 }}>[{part.marks} marks]</span>
                </div>

                <div style={{ color: "#ccc", fontSize: 14, lineHeight: 1.95, whiteSpace: "pre-wrap", marginBottom: 14 }}>{part.text}</div>

                {/* Answer box */}
                <div style={{ background: "#06060e", border: "1px dashed #2a2a3a", borderRadius: 8, padding: "14px 16px", minHeight: 70, marginBottom: 12 }}>
                  <span style={{ color: "#222", fontSize: 11, fontStyle: "italic" }}>Write your answer here (on paper or mentally)</span>
                </div>

                <div style={{ display: "flex", gap: 8 }}>
                  <button onClick={() => toggle(`h-${qi}-${pi}`)}
                    style={{ background: "none", border: "1px solid #2a2a3a", color: "#666", borderRadius: 6, padding: "4px 12px", cursor: "pointer", fontSize: 11 }}>
                    {revealed[`h-${qi}-${pi}`] ? "Hide Hint" : "💭 Hint"}
                  </button>
                  <button onClick={() => toggle(`a-${qi}-${pi}`)}
                    style={{ background: "none", border: "1px solid #1e3a1e", color: "#4caf50", borderRadius: 6, padding: "4px 12px", cursor: "pointer", fontSize: 11 }}>
                    {revealed[`a-${qi}-${pi}`] ? "Hide Answer" : "✓ Answer"}
                  </button>
                </div>

                {revealed[`h-${qi}-${pi}`] && (
                  <div style={{ background: "#1a1200", border: "1px solid #F5A62333", borderRadius: 6, padding: "10px 14px", marginTop: 10, color: "#F5A623", fontSize: 12, lineHeight: 1.6 }}>
                    💭 {part.hint}
                  </div>
                )}
                {revealed[`a-${qi}-${pi}`] && <CodeBlock code={part.answer} />}
              </div>
            ))}
          </div>
        ))}

        <div style={{ textAlign: "center", paddingBottom: 48 }}>
          <button onClick={submit}
            style={{ background: "#7ecfff", border: "none", color: "#080810", borderRadius: 10, padding: "14px 44px", fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
            Submit & Review All Answers →
          </button>
        </div>
      </div>
    </div>
  );

  // ── Review ─────────────────────────────────────────────────────────────────
  return (
    <div style={{ fontFamily: "'Georgia', serif", background: "#080810", color: "#e0e0f0", minHeight: "100vh" }}>
      <div style={{ maxWidth: 840, margin: "0 auto", padding: "40px 20px" }}>
        <div style={{ textAlign: "center", marginBottom: 44 }}>
          <div style={{ fontSize: 44, marginBottom: 12 }}>📋</div>
          <h1 style={{ color: "#fff", fontSize: 22, margin: "0 0 6px" }}>Full Answer Key — Paper II</h1>
          <p style={{ color: "#555", margin: 0, fontSize: 13 }}>Every model answer with hints explained</p>
        </div>

        {exam.questions.map((q, qi) => (
          <div key={q.id} style={{ marginBottom: 48 }}>
            <div style={{ background: "#0d0d1a", border: "1px solid #2a2a40", borderLeft: "4px solid #7ecfff", borderRadius: 10, padding: "14px 20px", marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#7ecfff", fontWeight: 700, fontSize: 15 }}>{q.id} — {q.topic}</span>
                <span style={{ color: "#7ecfff", fontFamily: "monospace", fontWeight: 700 }}>[{q.marks}]</span>
              </div>
              {q.scenario && <pre style={{ margin: "10px 0 0", color: "#666", fontSize: 11, fontFamily: "monospace", whiteSpace: "pre-wrap", lineHeight: 1.7 }}>{q.scenario}</pre>}
            </div>

            {q.parts.map((part, pi) => (
              <div key={pi} style={{ background: "#0a0a14", border: "1px solid #1a1a28", borderRadius: 10, marginBottom: 12, overflow: "hidden" }}>
                <div style={{ padding: "12px 18px", borderBottom: "1px solid #141420", display: "flex", justifyContent: "space-between" }}>
                  <div>
                    <span style={{ color: "#7ecfff", fontWeight: 700, marginRight: 8, fontFamily: "monospace" }}>({part.label})</span>
                    <span style={{ color: "#888", fontSize: 13 }}>{part.text.split('\n')[0].replace(/`/g, '').trim()}</span>
                  </div>
                  <span style={{ color: "#333", fontSize: 12 }}>[{part.marks}]</span>
                </div>
                <div style={{ padding: "14px 18px" }}>
                  <div style={{ color: "#F5A623", fontSize: 12, marginBottom: 10, lineHeight: 1.6 }}>
                    💭 {part.hint}
                  </div>
                  <CodeBlock code={part.answer} />
                </div>
              </div>
            ))}
          </div>
        ))}

        {/* Key concepts reminder */}
        <div style={{ background: "#0d0d1a", border: "1px solid #2a2a40", borderRadius: 12, padding: 20, marginBottom: 40 }}>
          <div style={{ color: "#7ecfff", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, marginBottom: 14 }}>
            📌 Key Takeaways From This Paper
          </div>
          {[
            ["PRIMARY KEY", "SERIAL + PRIMARY KEY = auto-numbered, unique, NOT NULL. Every table needs one."],
            ["FOREIGN KEY", "Links child table to parent. ON DELETE CASCADE = delete children too. ON DELETE SET NULL = keep child, nullify the FK column."],
            ["COMPOSITE UNIQUE", "UNIQUE (col1, col2, col3) at table level — the COMBINATION must be unique, not each column individually."],
            ["INNER JOIN", "Only matching rows from both sides. Non-matching rows disappear."],
            ["LEFT JOIN", "ALL rows from left table. NULL on right side if no match. Add WHERE right.col IS NULL to find unmatched rows."],
            ["Nested Subquery", "Work inside-out. Innermost query runs first, passes result up. Each level must be wrapped in ( )."],
            ["GROUP BY + HAVING", "HAVING filters groups (use aggregate functions). WHERE filters rows before grouping."],
          ].map(([term, desc]) => (
            <div key={term} style={{ display: "flex", gap: 12, marginBottom: 10, paddingBottom: 10, borderBottom: "1px solid #141420" }}>
              <div style={{ color: "#7ecfff", fontFamily: "monospace", fontSize: 12, fontWeight: 700, minWidth: 160, paddingTop: 1 }}>{term}</div>
              <div style={{ color: "#aaa", fontSize: 13, lineHeight: 1.6 }}>{desc}</div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center" }}>
          <button onClick={() => { setPhase("cover"); setRevealed({}); setTimeUp(false); setTimerRunning(false); }}
            style={{ background: "transparent", border: "1px solid #7ecfff", color: "#7ecfff", borderRadius: 10, padding: "12px 36px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
            ↩ Retake Paper II
          </button>
        </div>
        <div style={{ height: 40 }} />
      </div>
    </div>
  );
}
