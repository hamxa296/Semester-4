import { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #0f0f13;
    --surface: #16161c;
    --surface2: #1e1e27;
    --surface3: #252530;
    --border: rgba(255,255,255,0.07);
    --border2: rgba(255,255,255,0.12);
    --text: #e8e6f0;
    --text2: #9a98a8;
    --text3: #5e5c6e;
    --accent: #7c6af7;
    --accent2: #a594fa;
    --teal: #34d4b0;
    --amber: #f5b24a;
    --coral: #f07060;
    --green: #4ec994;
    --pink: #e87aaa;
    --blue: #5cb8f5;
    --radius: 10px;
    --radius-lg: 16px;
  }

  body { background: var(--bg); color: var(--text); font-family: 'DM Sans', sans-serif; }

  .app { display: flex; min-height: 100vh; }

  .sidebar {
    width: 280px; min-width: 280px; background: var(--surface);
    border-right: 1px solid var(--border); padding: 0;
    position: sticky; top: 0; height: 100vh; overflow-y: auto;
    scrollbar-width: thin; scrollbar-color: var(--surface3) transparent;
  }

  .sidebar-header {
    padding: 24px 20px 16px;
    border-bottom: 1px solid var(--border);
    position: sticky; top: 0; background: var(--surface); z-index: 10;
  }
  .sidebar-header h1 { font-size: 13px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: var(--text3); }
  .sidebar-header p { font-size: 17px; font-weight: 600; color: var(--text); margin-top: 4px; line-height: 1.3; }

  .nav-section { padding: 8px 0; border-bottom: 1px solid var(--border); }
  .nav-section-label {
    padding: 10px 20px 4px;
    font-size: 10px; font-weight: 600; letter-spacing: 0.1em;
    text-transform: uppercase; color: var(--text3);
  }
  .nav-item {
    display: flex; align-items: center; gap: 10px;
    padding: 8px 20px; cursor: pointer; transition: all 0.15s;
    font-size: 13.5px; color: var(--text2); border: none; background: none;
    width: 100%; text-align: left;
  }
  .nav-item:hover { background: var(--surface2); color: var(--text); }
  .nav-item.active { background: rgba(124,106,247,0.12); color: var(--accent2); }
  .nav-item .dot { width: 6px; height: 6px; border-radius: 50%; background: var(--surface3); flex-shrink: 0; }
  .nav-item.active .dot { background: var(--accent); }

  .main { flex: 1; overflow-y: auto; }
  .content { max-width: 860px; margin: 0 auto; padding: 48px 40px; }

  .page-header { margin-bottom: 40px; padding-bottom: 28px; border-bottom: 1px solid var(--border); }
  .page-tag { display: inline-block; font-size: 11px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; padding: 4px 10px; border-radius: 20px; margin-bottom: 12px; }
  .page-header h2 { font-size: 32px; font-weight: 600; color: var(--text); line-height: 1.2; margin-bottom: 10px; }
  .page-header p { font-size: 16px; color: var(--text2); line-height: 1.7; }

  .section { margin-bottom: 44px; }
  .section-title { font-size: 20px; font-weight: 600; color: var(--text); margin-bottom: 6px; }
  .section-sub { font-size: 14px; color: var(--text3); margin-bottom: 20px; font-family: 'IBM Plex Mono', monospace; }

  .card {
    background: var(--surface2); border: 1px solid var(--border);
    border-radius: var(--radius-lg); padding: 20px 24px; margin-bottom: 14px;
  }
  .card-title { font-size: 15px; font-weight: 600; color: var(--text); margin-bottom: 8px; }
  .card-body { font-size: 14px; color: var(--text2); line-height: 1.75; }
  .card-body strong { color: var(--text); font-weight: 500; }

  .def-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .def-card {
    background: var(--surface2); border: 1px solid var(--border);
    border-radius: var(--radius); padding: 16px 18px;
  }
  .def-card .term { font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 6px; }
  .def-card p { font-size: 13.5px; color: var(--text2); line-height: 1.65; }

  .example-box {
    background: var(--surface); border: 1px solid var(--border2);
    border-left: 3px solid var(--teal); border-radius: var(--radius);
    padding: 16px 20px; margin-top: 14px;
  }
  .example-box .ex-label { font-size: 10px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--teal); margin-bottom: 8px; }
  .example-box p, .example-box li { font-size: 13.5px; color: var(--text2); line-height: 1.7; }

  .code-block {
    background: #0a0a0e; border: 1px solid var(--border);
    border-radius: var(--radius); padding: 16px 20px; margin-top: 14px;
    font-family: 'IBM Plex Mono', monospace; font-size: 13px;
    color: #c9d1d9; line-height: 1.8; overflow-x: auto;
  }
  .code-block .kw { color: #7c6af7; }
  .code-block .tbl { color: #5cb8f5; }
  .code-block .val { color: #4ec994; }
  .code-block .cmt { color: #484860; }
  .code-block .fn { color: #f5b24a; }

  .table-wrap { overflow-x: auto; margin-top: 14px; }
  table { width: 100%; border-collapse: collapse; font-size: 13.5px; }
  th { background: var(--surface3); color: var(--text2); font-weight: 600; font-size: 11px; text-transform: uppercase; letter-spacing: 0.06em; padding: 10px 14px; text-align: left; border-bottom: 1px solid var(--border2); }
  td { padding: 10px 14px; color: var(--text2); border-bottom: 1px solid var(--border); }
  tr:last-child td { border-bottom: none; }
  tr:hover td { background: rgba(255,255,255,0.02); }
  td strong { color: var(--text); font-weight: 500; }

  .tag { display: inline-block; font-size: 11px; font-weight: 600; padding: 3px 8px; border-radius: 6px; margin: 2px; }

  .highlight-row { background: rgba(124,106,247,0.06); }

  .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
  .three-col { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; }

  .pill-list { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px; }
  .pill { padding: 6px 12px; border-radius: 20px; font-size: 12.5px; font-weight: 500; border: 1px solid; }

  .math-box {
    background: var(--surface); border: 1px solid var(--border2);
    border-left: 3px solid var(--accent); border-radius: var(--radius);
    padding: 16px 20px; margin: 14px 0;
    font-family: 'IBM Plex Mono', monospace; font-size: 14px; color: var(--accent2);
    text-align: center; letter-spacing: 0.04em;
  }
  .math-box .math-label { font-size: 11px; color: var(--text3); text-align: left; margin-bottom: 8px; font-family: 'DM Sans', sans-serif; letter-spacing: 0; }

  .callout {
    border-radius: var(--radius); padding: 14px 18px; margin: 14px 0;
    font-size: 13.5px; line-height: 1.7; border: 1px solid;
  }

  .divider { height: 1px; background: var(--border); margin: 32px 0; }

  .arch-diagram {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: var(--radius-lg); padding: 24px; margin: 16px 0;
  }
  .arch-level {
    border-radius: var(--radius); padding: 12px 16px; margin: 8px 0;
    border: 1px solid; text-align: center;
  }
  .arch-arrow { text-align: center; font-size: 18px; color: var(--text3); margin: 4px 0; }

  .ra-op {
    background: var(--surface2); border: 1px solid var(--border);
    border-radius: var(--radius-lg); padding: 20px 24px; margin-bottom: 20px;
  }
  .ra-op-header { display: flex; align-items: center; gap: 14px; margin-bottom: 12px; }
  .ra-symbol { font-size: 22px; font-family: 'IBM Plex Mono', monospace; font-weight: 500; min-width: 36px; }
  .ra-name { font-size: 16px; font-weight: 600; color: var(--text); }
  .ra-category { font-size: 11px; color: var(--text3); margin-top: 2px; text-transform: uppercase; letter-spacing: 0.06em; }

  @media (max-width: 900px) {
    .app { flex-direction: column; }
    .sidebar { width: 100%; min-width: auto; height: auto; position: relative; }
    .content { padding: 28px 20px; }
    .def-grid, .two-col, .three-col { grid-template-columns: 1fr; }
  }
`;

const navItems = [
  { id: "intro", label: "Intro to Databases", section: "Unit 1", color: "var(--accent)" },
  { id: "architecture", label: "DB Architecture", section: "Unit 1", color: "var(--accent)" },
  { id: "design", label: "DB Design & ER Modeling", section: "Unit 2", color: "var(--teal)" },
  { id: "relational", label: "Relational Model & Keys", section: "Unit 3", color: "var(--amber)" },
  { id: "relationships", label: "Relationships & Constraints", section: "Unit 3", color: "var(--amber)" },
  { id: "ra-basic", label: "Relational Algebra — Basic", section: "Unit 4", color: "var(--coral)" },
  { id: "ra-derived", label: "Relational Algebra — Derived", section: "Unit 4", color: "var(--coral)" },
  { id: "ra-outer", label: "Outer Joins", section: "Unit 4", color: "var(--coral)" },
];

// ─────────────────────────────────────────────
// PAGE COMPONENTS
// ─────────────────────────────────────────────

function IntroPage() {
  return (
    <div>
      <div className="page-header">
        <span className="page-tag" style={{ background: "rgba(124,106,247,0.12)", color: "var(--accent2)" }}>Unit 1</span>
        <h2>Introduction to Databases & DBMS</h2>
        <p>Foundational concepts: data, information, database systems, users, SQL categories, and metadata.</p>
      </div>

      <div className="section">
        <div className="section-title">Core Definitions</div>
        <div className="section-sub">// the vocabulary every DB engineer must know</div>
        <div className="def-grid">
          {[
            { term: "Data", color: "var(--accent)", def: "Raw, unprocessed facts without context. On their own, they carry no meaning.", ex: "42, 'Alice', '2024-01-15'" },
            { term: "Information", color: "var(--teal)", def: "Processed, organized data that has meaning and is useful for decision-making.", ex: "Alice scored 42/50 on her exam on Jan 15, 2024." },
            { term: "Database (DB)", color: "var(--amber)", def: "An organized, structured collection of related data stored electronically for easy access, management, and update.", ex: "A university's database storing students, courses, and grades." },
            { term: "Database System", color: "var(--coral)", def: "The complete environment: the database itself, the DBMS software, the application programs, and the users interacting with all of them.", ex: "MySQL + student app + university staff + student records = a database system." },
          ].map(({ term, color, def, ex }) => (
            <div className="def-card" key={term} style={{ borderTop: `3px solid ${color}` }}>
              <div className="term" style={{ color }}>{term}</div>
              <p>{def}</p>
              <div style={{ marginTop: 8, fontSize: 12, color: "var(--text3)", fontFamily: "IBM Plex Mono" }}>e.g. {ex}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="section">
        <div className="section-title">Database vs. Data Structure</div>
        <div className="section-sub">// two different things often confused</div>
        <div className="two-col">
          <div className="card" style={{ borderTop: "3px solid var(--accent)" }}>
            <div className="card-title" style={{ color: "var(--accent2)" }}>Database</div>
            <div className="card-body">
              <ul style={{ paddingLeft: 18, lineHeight: 2 }}>
                <li>Stores <strong>persistent</strong> data on disk</li>
                <li>Managed by DBMS software</li>
                <li>Multi-user concurrent access</li>
                <li>Supports query languages (SQL)</li>
                <li>Designed for large-scale, long-term storage</li>
              </ul>
            </div>
          </div>
          <div className="card" style={{ borderTop: "3px solid var(--teal)" }}>
            <div className="card-title" style={{ color: "var(--teal)" }}>Data Structure</div>
            <div className="card-body">
              <ul style={{ paddingLeft: 18, lineHeight: 2 }}>
                <li>Organizes data <strong>in memory (RAM)</strong></li>
                <li>Part of a program's runtime</li>
                <li>Single process access</li>
                <li>Accessed via code (arrays, trees, etc.)</li>
                <li>Temporary — lost when program ends</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="section">
        <div className="section-title">DBMS vs. File System</div>
        <div className="section-sub">// why not just use folders and files?</div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Feature</th><th>File System</th><th>DBMS</th></tr></thead>
            <tbody>
              {[
                ["Data Redundancy", "High — same data duplicated in many files", "Low — controlled via normalization"],
                ["Data Inconsistency", "Likely when redundancy exists", "Prevented through constraints"],
                ["Data Access", "Manual — write custom programs", "SQL queries — standardized language"],
                ["Concurrent Access", "No built-in mechanisms", "Transaction management & locking"],
                ["Security", "OS-level only", "Fine-grained access control"],
                ["Data Independence", "None — changing file format breaks apps", "Physical & logical independence"],
                ["Backup & Recovery", "Manual", "Automated crash recovery"],
                ["Data Integrity", "Enforced by application code", "Enforced by DBMS constraints"],
              ].map(([f, fs, db]) => (
                <tr key={f}><td><strong>{f}</strong></td><td>{fs}</td><td style={{ color: "var(--green)" }}>{db}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="example-box">
          <div className="ex-label">Real-World Example</div>
          <p><strong>File System problem:</strong> A hospital stores patient records in Word docs. Dr. Smith updates a patient's address in file A. The billing team has the old address in file B. Now the records are inconsistent — a dangerous problem.</p>
          <p style={{ marginTop: 8 }}><strong>DBMS solution:</strong> All departments query the same database. Update once → everyone sees the change instantly. Constraints prevent invalid data entry.</p>
        </div>
      </div>

      <div className="section">
        <div className="section-title">Database Users</div>
        <div className="section-sub">// who interacts with a database and how</div>
        <div className="three-col">
          {[
            { role: "End Users", icon: "👤", color: "var(--teal)", desc: "People who query and update data using applications or simple query tools. They may not know SQL.", types: ["Naive users (use prebuilt apps)", "Sophisticated users (write SQL)", "Standalone users (personal DBs)"] },
            { role: "Application Developers", icon: "💻", color: "var(--accent2)", desc: "Programmers who write applications that interact with the database. They use APIs, ORMs, and embedded SQL.", types: ["Design DB schemas", "Write CRUD operations", "Optimize queries"] },
            { role: "DBA", icon: "🔧", color: "var(--amber)", desc: "Database Administrator — manages the entire DBMS environment, ensures performance, security, and availability.", types: ["Define DB schema", "Grant user privileges", "Backup & recovery", "Performance tuning"] },
          ].map(({ role, icon, color, desc, types }) => (
            <div className="card" key={role} style={{ borderTop: `3px solid ${color}` }}>
              <div style={{ fontSize: 24, marginBottom: 10 }}>{icon}</div>
              <div className="card-title" style={{ color }}>{role}</div>
              <div className="card-body" style={{ marginBottom: 10 }}>{desc}</div>
              <ul style={{ paddingLeft: 16, fontSize: 12.5, color: "var(--text3)", lineHeight: 2 }}>
                {types.map(t => <li key={t}>{t}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="section">
        <div className="section-title">DBMS Functions</div>
        <div className="section-sub">// what a DBMS does for you</div>
        <div className="two-col">
          {[
            ["Data Definition", "var(--accent)", "Define database structure (schema) using DDL. Specify data types, constraints, relationships."],
            ["Data Manipulation", "var(--teal)", "Insert, update, delete, and retrieve data using DML (SELECT, INSERT, UPDATE, DELETE)."],
            ["Data Security", "var(--coral)", "Authenticate users, enforce access control. Prevent unauthorized read/write operations."],
            ["Data Integrity", "var(--green)", "Enforce constraints (primary key, foreign key, NOT NULL) to maintain correctness."],
            ["Concurrency Control", "var(--amber)", "Manage simultaneous access from multiple users without corruption using locks and transactions."],
            ["Backup & Recovery", "var(--pink)", "Automatically recover data after crashes using transaction logs and checkpoints."],
          ].map(([fn, color, desc]) => (
            <div key={fn} style={{ display: "flex", gap: 12, alignItems: "flex-start", background: "var(--surface2)", borderRadius: "var(--radius)", padding: "14px 16px", border: "1px solid var(--border)" }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: color, marginTop: 5, flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text)", marginBottom: 4 }}>{fn}</div>
                <div style={{ fontSize: 13, color: "var(--text2)", lineHeight: 1.6 }}>{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="section">
        <div className="section-title">SQL Command Categories</div>
        <div className="section-sub">// DDL · DML · DCL · TCL</div>
        {[
          {
            cat: "DDL — Data Definition Language", color: "var(--accent)", colorBg: "rgba(124,106,247,0.1)",
            desc: "Defines and modifies the structure of database objects (tables, indexes, views).",
            commands: [
              { cmd: "CREATE", use: "Create a new table, view, or index" },
              { cmd: "ALTER", use: "Modify existing table structure" },
              { cmd: "DROP", use: "Delete a table or database" },
              { cmd: "TRUNCATE", use: "Remove all rows but keep structure" },
            ],
            code: `<span class="kw">CREATE TABLE</span> <span class="tbl">Students</span> (
  student_id  <span class="fn">INT</span>          <span class="kw">PRIMARY KEY</span>,
  name        <span class="fn">VARCHAR</span>(<span class="val">100</span>) <span class="kw">NOT NULL</span>,
  email       <span class="fn">VARCHAR</span>(<span class="val">150</span>) <span class="kw">UNIQUE</span>,
  dob         <span class="fn">DATE</span>
);`
          },
          {
            cat: "DML — Data Manipulation Language", color: "var(--teal)", colorBg: "rgba(52,212,176,0.08)",
            desc: "Manipulate the actual data stored in tables.",
            commands: [
              { cmd: "SELECT", use: "Retrieve data from tables" },
              { cmd: "INSERT", use: "Add new rows to a table" },
              { cmd: "UPDATE", use: "Modify existing rows" },
              { cmd: "DELETE", use: "Remove rows from a table" },
            ],
            code: `<span class="kw">SELECT</span> name, email <span class="kw">FROM</span> <span class="tbl">Students</span>
<span class="kw">WHERE</span> dob > <span class="val">'2000-01-01'</span>;

<span class="kw">INSERT INTO</span> <span class="tbl">Students</span> <span class="kw">VALUES</span>
  (<span class="val">1</span>, <span class="val">'Alice'</span>, <span class="val">'alice@uni.edu'</span>, <span class="val">'2001-03-15'</span>);

<span class="kw">UPDATE</span> <span class="tbl">Students</span> <span class="kw">SET</span> email = <span class="val">'new@uni.edu'</span>
<span class="kw">WHERE</span> student_id = <span class="val">1</span>;`
          },
          {
            cat: "DCL — Data Control Language", color: "var(--amber)", colorBg: "rgba(245,178,74,0.08)",
            desc: "Control access rights and permissions to database objects.",
            commands: [
              { cmd: "GRANT", use: "Give user specific permissions" },
              { cmd: "REVOKE", use: "Remove previously granted permissions" },
            ],
            code: `<span class="kw">GRANT</span> SELECT, INSERT <span class="kw">ON</span> <span class="tbl">Students</span>
<span class="kw">TO</span> <span class="val">'app_user'</span>@<span class="val">'localhost'</span>;

<span class="kw">REVOKE</span> INSERT <span class="kw">ON</span> <span class="tbl">Students</span>
<span class="kw">FROM</span> <span class="val">'app_user'</span>@<span class="val">'localhost'</span>;`
          },
          {
            cat: "TCL — Transaction Control Language", color: "var(--coral)", colorBg: "rgba(240,112,96,0.08)",
            desc: "Manage transactions to ensure data integrity (ACID properties).",
            commands: [
              { cmd: "COMMIT", use: "Save all changes made in the transaction" },
              { cmd: "ROLLBACK", use: "Undo changes since the last commit" },
              { cmd: "SAVEPOINT", use: "Set a rollback point within a transaction" },
            ],
            code: `<span class="kw">BEGIN TRANSACTION</span>;

<span class="kw">UPDATE</span> <span class="tbl">Accounts</span> <span class="kw">SET</span> balance = balance - <span class="val">500</span>
  <span class="kw">WHERE</span> id = <span class="val">1</span>;  <span class="cmt">-- deduct from sender</span>

<span class="kw">UPDATE</span> <span class="tbl">Accounts</span> <span class="kw">SET</span> balance = balance + <span class="val">500</span>
  <span class="kw">WHERE</span> id = <span class="val">2</span>;  <span class="cmt">-- add to receiver</span>

<span class="kw">COMMIT</span>;  <span class="cmt">-- both succeed or neither does</span>`
          },
        ].map(({ cat, color, colorBg, desc, commands, code }) => (
          <div key={cat} style={{ background: colorBg, border: `1px solid ${color}33`, borderRadius: "var(--radius-lg)", padding: "20px 24px", marginBottom: 16 }}>
            <div style={{ fontSize: 16, fontWeight: 600, color, marginBottom: 6 }}>{cat}</div>
            <div style={{ fontSize: 13.5, color: "var(--text2)", marginBottom: 14, lineHeight: 1.6 }}>{desc}</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 14 }}>
              {commands.map(({ cmd, use }) => (
                <div key={cmd} style={{ background: "var(--surface)", borderRadius: 8, padding: "6px 12px", border: `1px solid ${color}44` }}>
                  <span style={{ fontFamily: "IBM Plex Mono", fontSize: 12, color, fontWeight: 600 }}>{cmd}</span>
                  <span style={{ fontSize: 12, color: "var(--text3)", marginLeft: 8 }}>{use}</span>
                </div>
              ))}
            </div>
            <div className="code-block" dangerouslySetInnerHTML={{ __html: code }} />
          </div>
        ))}
      </div>

      <div className="section">
        <div className="section-title">Data Dictionary & Metadata</div>
        <div className="section-sub">// the database about the database</div>
        <div className="card">
          <div className="card-title">Data Dictionary (System Catalog)</div>
          <div className="card-body">
            A <strong>Data Dictionary</strong> (also called the <strong>System Catalog</strong>) is a repository that stores <strong>metadata</strong> — data about data. It describes the structure and properties of all database objects.
          </div>
        </div>
        <div className="two-col" style={{ marginTop: 14 }}>
          <div className="card">
            <div className="card-title" style={{ color: "var(--teal)" }}>What Metadata Includes</div>
            <div className="card-body">
              <ul style={{ paddingLeft: 18, lineHeight: 2, fontSize: 13.5 }}>
                <li>Table names and column names</li>
                <li>Data types and sizes</li>
                <li>Constraints (PK, FK, NOT NULL)</li>
                <li>User access rights</li>
                <li>Indexes and views</li>
                <li>Statistics (row counts, sizes)</li>
              </ul>
            </div>
          </div>
          <div>
            <div className="code-block" style={{ marginTop: 0 }}>
              <span style={{ color: "var(--text3)", fontSize: 11 }}>-- Query the data dictionary in MySQL</span>{"\n"}
              <span className="kw">SELECT</span> TABLE_NAME, COLUMN_NAME,{"\n"}
              {"       "}DATA_TYPE, IS_NULLABLE{"\n"}
              <span className="kw">FROM</span> <span className="tbl">INFORMATION_SCHEMA.COLUMNS</span>{"\n"}
              <span className="kw">WHERE</span> TABLE_SCHEMA = <span className="val">'university_db'</span>;
            </div>
            <div className="example-box" style={{ marginTop: 12 }}>
              <div className="ex-label">Why it matters</div>
              <p>The DBMS uses the data dictionary to validate queries, enforce constraints, and optimize execution plans — before touching actual data.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ArchitecturePage() {
  return (
    <div>
      <div className="page-header">
        <span className="page-tag" style={{ background: "rgba(124,106,247,0.12)", color: "var(--accent2)" }}>Unit 1</span>
        <h2>Database Architecture & Data Models</h2>
        <p>Three-level ANSI/SPARC architecture, data independence, and the major types of data models.</p>
      </div>

      <div className="section">
        <div className="section-title">Three-Level Architecture (ANSI/SPARC)</div>
        <div className="section-sub">// separating what users see from how data is stored</div>
        <div className="card-body" style={{ marginBottom: 16, fontSize: 14 }}>
          The three-level architecture separates the database into three abstraction levels, enabling <strong>data independence</strong> — changing one level doesn't affect the others.
        </div>
        <div className="arch-diagram">
          {[
            { level: "External Level (View Level)", color: "var(--teal)", bg: "rgba(52,212,176,0.08)", border: "rgba(52,212,176,0.3)", desc: "What each individual user or application group sees. Multiple different views of the same data.", ex: "Student view: sees only name, GPA, enrolled courses. Billing view: sees fees, payment status." },
            { level: "Conceptual Level (Logical Level)", color: "var(--accent2)", bg: "rgba(124,106,247,0.08)", border: "rgba(124,106,247,0.3)", desc: "The overall logical structure of the entire database. Defines what data exists and relationships — without storage details.", ex: "All tables, columns, relationships, and constraints. E.g. Students(id, name, dob), Enrollments(student_id, course_id)." },
            { level: "Internal Level (Physical Level)", color: "var(--amber)", bg: "rgba(245,178,74,0.08)", border: "rgba(245,178,74,0.3)", desc: "How data is physically stored on disk. Describes file organization, indexes, storage allocation, compression.", ex: "Data stored as B+ tree index on student_id. Clustered on disk by department." },
          ].map(({ level, color, bg, border, desc, ex }, i) => (
            <div key={level}>
              {i > 0 && (
                <div style={{ textAlign: "center", padding: "6px 0", color: "var(--text3)", fontSize: 20 }}>↕</div>
              )}
              <div style={{ background: bg, border: `1px solid ${border}`, borderRadius: "var(--radius)", padding: "16px 20px" }}>
                <div style={{ fontSize: 14, fontWeight: 600, color, marginBottom: 6 }}>Level {i + 1}: {level}</div>
                <div style={{ fontSize: 13.5, color: "var(--text2)", marginBottom: 8, lineHeight: 1.65 }}>{desc}</div>
                <div style={{ fontSize: 12, color: "var(--text3)", fontStyle: "italic" }}>Example: {ex}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="section">
        <div className="section-title">Data Independence</div>
        <div className="section-sub">// the key benefit of three-level architecture</div>
        <div className="two-col">
          <div className="card" style={{ borderLeft: "3px solid var(--teal)" }}>
            <div className="card-title" style={{ color: "var(--teal)" }}>Logical Data Independence</div>
            <div className="card-body">
              The ability to change the <strong>conceptual schema</strong> without changing the <strong>external schemas</strong> (user views) or application programs.
            </div>
            <div className="example-box" style={{ marginTop: 12 }}>
              <div className="ex-label">Example</div>
              <p>You add a new column "phone" to the Students table (conceptual change). Existing student view apps that don't need phone still work — they are unaffected.</p>
            </div>
          </div>
          <div className="card" style={{ borderLeft: "3px solid var(--amber)" }}>
            <div className="card-title" style={{ color: "var(--amber)" }}>Physical Data Independence</div>
            <div className="card-body">
              The ability to change the <strong>internal/physical schema</strong> without changing the <strong>conceptual schema</strong> or applications.
            </div>
            <div className="example-box" style={{ marginTop: 12 }}>
              <div className="ex-label">Example</div>
              <p>The DBA moves the database from HDD to SSD and changes indexing from hash to B+ tree. All SQL queries and applications continue working unchanged.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="section">
        <div className="section-title">Types of Data Models</div>
        <div className="section-sub">// how we conceptually represent data</div>

        <div className="card" style={{ marginBottom: 14 }}>
          <div className="card-title" style={{ color: "var(--accent2)" }}>1. Object-Based Data Models</div>
          <div className="card-body" style={{ marginBottom: 12 }}>Represent data as objects with attributes and relationships. Closely match object-oriented programming concepts.</div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {[
              { name: "Entity-Relationship (ER) Model", desc: "Most widely used for conceptual design. Entities, attributes, and relationships. Drawn as ER diagrams." },
              { name: "Object-Oriented Model", desc: "Data as objects with methods. Supports inheritance, encapsulation. Used in OODBs." },
              { name: "Semantic Model", desc: "Captures meaning and context of data, not just structure." },
            ].map(({ name, desc }) => (
              <div key={name} style={{ flex: "1 1 220px", background: "var(--surface3)", borderRadius: 8, padding: "12px 14px" }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "var(--accent2)", marginBottom: 6 }}>{name}</div>
                <div style={{ fontSize: 12.5, color: "var(--text3)", lineHeight: 1.6 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="card" style={{ marginBottom: 14 }}>
          <div className="card-title" style={{ color: "var(--teal)" }}>2. Record-Based Data Models</div>
          <div className="card-body" style={{ marginBottom: 12 }}>Represent data as collections of fixed-format records. Most widely deployed in real systems.</div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {[
              { name: "Relational Model", desc: "Data in 2D tables (relations). Based on set theory. Uses SQL. The dominant model — MySQL, PostgreSQL, Oracle." },
              { name: "Network Model", desc: "Records linked as nodes in a graph. One-to-many relationships. Predecessor to relational model." },
              { name: "Hierarchical Model", desc: "Tree structure — one parent, many children. IBM IMS. Fast but inflexible." },
            ].map(({ name, desc }) => (
              <div key={name} style={{ flex: "1 1 220px", background: "var(--surface3)", borderRadius: 8, padding: "12px 14px" }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "var(--teal)", marginBottom: 6 }}>{name}</div>
                <div style={{ fontSize: 12.5, color: "var(--text3)", lineHeight: 1.6 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-title" style={{ color: "var(--amber)" }}>3. Physical Data Models</div>
          <div className="card-body">
            Describe <strong>how</strong> data is actually stored on hardware — file organization, record formats, access paths, storage structures. Used internally by the DBMS.
          </div>
          <div style={{ marginTop: 12, display: "flex", gap: 10, flexWrap: "wrap" }}>
            {["Heap files (unordered)", "Sequential files (ordered)", "Hash files", "B+ Tree index files", "Clustered storage"].map(m => (
              <span key={m} className="tag" style={{ background: "rgba(245,178,74,0.1)", color: "var(--amber)", border: "1px solid rgba(245,178,74,0.25)" }}>{m}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function DesignPage() {
  return (
    <div>
      <div className="page-header">
        <span className="page-tag" style={{ background: "rgba(52,212,176,0.1)", color: "var(--teal)" }}>Unit 2</span>
        <h2>Database Design & ER Modeling</h2>
        <p>From requirements to ER diagrams — the full design process, entities, attributes, and notations.</p>
      </div>

      <div className="section">
        <div className="section-title">Database Development Process</div>
        <div className="section-sub">// top-down vs bottom-up, SDLC</div>
        <div className="two-col">
          <div className="card" style={{ borderTop: "3px solid var(--accent2)" }}>
            <div className="card-title" style={{ color: "var(--accent2)" }}>Top-Down Approach</div>
            <div className="card-body">Start with <strong>high-level requirements</strong>, break into components progressively. Good for new systems.</div>
            <div style={{ marginTop: 12 }}>
              {["Define overall goals", "Identify major entities", "Break down to attributes", "Define relationships", "Normalize and implement"].map((s, i) => (
                <div key={s} style={{ display: "flex", gap: 10, alignItems: "center", padding: "6px 0", borderBottom: "1px solid var(--border)" }}>
                  <div style={{ width: 22, height: 22, borderRadius: "50%", background: "rgba(124,106,247,0.15)", color: "var(--accent2)", fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>{i + 1}</div>
                  <span style={{ fontSize: 13, color: "var(--text2)" }}>{s}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="card" style={{ borderTop: "3px solid var(--teal)" }}>
            <div className="card-title" style={{ color: "var(--teal)" }}>Bottom-Up Approach</div>
            <div className="card-body">Start with <strong>individual data elements</strong> (attributes), group into entities. Good for legacy migrations.</div>
            <div style={{ marginTop: 12 }}>
              {["Collect all data items", "Group related attributes", "Identify entities from groups", "Define relationships between entities", "Build the overall schema"].map((s, i) => (
                <div key={s} style={{ display: "flex", gap: 10, alignItems: "center", padding: "6px 0", borderBottom: "1px solid var(--border)" }}>
                  <div style={{ width: 22, height: 22, borderRadius: "50%", background: "rgba(52,212,176,0.12)", color: "var(--teal)", fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>{i + 1}</div>
                  <span style={{ fontSize: 13, color: "var(--text2)" }}>{s}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="section">
        <div className="section-title">Phases of Database Design</div>
        <div className="section-sub">// the four-phase lifecycle</div>
        {[
          { phase: "Phase 1: Requirement Analysis", color: "var(--blue)", desc: "Gather and analyze user requirements. Interview stakeholders. Produce requirements specification document.", outputs: ["Functional requirements", "Data requirements", "Use cases & user stories"] },
          { phase: "Phase 2: Conceptual Design", color: "var(--accent2)", desc: "Create a high-level conceptual model using ER diagrams. Technology-independent — no DBMSes yet.", outputs: ["ER Diagram (ERD)", "Entity list", "Relationship definitions"] },
          { phase: "Phase 3: Logical Design", color: "var(--teal)", desc: "Convert the ER model to a specific data model (usually relational). Normalize the schema.", outputs: ["Relational schema (tables)", "Normal form analysis (1NF→3NF)", "Constraint definitions"] },
          { phase: "Phase 4: Physical Design", color: "var(--amber)", desc: "Implement on a specific DBMS. Choose storage structures, indexes, partitioning for performance.", outputs: ["SQL CREATE statements", "Index definitions", "Partitioning strategy"] },
        ].map(({ phase, color, desc, outputs }) => (
          <div key={phase} style={{ display: "flex", gap: 16, marginBottom: 12 }}>
            <div style={{ width: 4, background: color, borderRadius: 4, flexShrink: 0 }} />
            <div style={{ flex: 1, background: "var(--surface2)", borderRadius: "var(--radius)", padding: "14px 18px", border: "1px solid var(--border)" }}>
              <div style={{ fontSize: 14, fontWeight: 600, color, marginBottom: 6 }}>{phase}</div>
              <div style={{ fontSize: 13.5, color: "var(--text2)", marginBottom: 10, lineHeight: 1.65 }}>{desc}</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {outputs.map(o => <span key={o} className="tag" style={{ background: "var(--surface3)", color: "var(--text3)", border: "1px solid var(--border)" }}>{o}</span>)}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="section">
        <div className="section-title">Database Schema vs. Instance</div>
        <div className="section-sub">// structure vs. content</div>
        <div className="two-col">
          <div className="card" style={{ borderLeft: "3px solid var(--accent)" }}>
            <div className="card-title" style={{ color: "var(--accent2)" }}>Schema (Intension)</div>
            <div className="card-body">The <strong>structure/blueprint</strong> of the database. Defines tables, columns, data types, and constraints. Changes rarely. Like the blueprint of a building.</div>
            <div className="code-block" style={{ marginTop: 12, fontSize: 12 }}>
              Students(<u>student_id</u>, name, email, dob){"\n"}
              Courses(<u>course_id</u>, title, credits){"\n"}
              Enrollments(<u>student_id, course_id</u>, grade)
            </div>
          </div>
          <div className="card" style={{ borderLeft: "3px solid var(--teal)" }}>
            <div className="card-title" style={{ color: "var(--teal)" }}>Instance (Extension / State)</div>
            <div className="card-body">The <strong>actual data</strong> stored at a specific point in time. Changes constantly with INSERT/UPDATE/DELETE. Like the occupants in the building.</div>
            <div className="table-wrap" style={{ marginTop: 12 }}>
              <table style={{ fontSize: 12 }}>
                <thead><tr><th>student_id</th><th>name</th><th>email</th></tr></thead>
                <tbody>
                  <tr><td>1</td><td>Alice</td><td>alice@uni.edu</td></tr>
                  <tr><td>2</td><td>Bob</td><td>bob@uni.edu</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="section">
        <div className="section-title">Data Flow Diagrams (DFDs)</div>
        <div className="section-sub">// modeling how data moves through a system</div>
        <div className="card">
          <div className="card-body" style={{ marginBottom: 12 }}>DFDs model the <strong>flow of information</strong> through a system. They use four symbols: External Entity (rectangle), Process (circle/rounded box), Data Store (two parallel lines), and Data Flow (arrow).</div>
        </div>
        {[
          { level: "Context Diagram (Level 0)", color: "var(--accent2)", desc: "Highest abstraction. Shows the entire system as ONE process. Only shows external entities and data flows in/out of the system.", ex: "University Registration System as one circle. External entities: Student, Registrar. Flows: Application forms in, Confirmation emails out." },
          { level: "Level 0 DFD", color: "var(--teal)", desc: "Expands the single system bubble into major sub-processes. Shows main data stores. Still high-level.", ex: "Sub-processes: 'Process Application', 'Assign Courses', 'Generate Transcripts'. Data stores: Student DB, Course DB." },
          { level: "Level 1 DFD", color: "var(--amber)", desc: "Further breaks down each Level 0 process into more detailed sub-processes. Shows more data flows and stores.", ex: "'Process Application' expands to: 'Validate Student Info', 'Check Prerequisites', 'Confirm Enrollment'." },
        ].map(({ level, color, desc, ex }) => (
          <div key={level} style={{ background: "var(--surface2)", borderRadius: "var(--radius)", padding: "16px 20px", marginBottom: 12, borderLeft: `3px solid ${color}` }}>
            <div style={{ fontSize: 14, fontWeight: 600, color, marginBottom: 6 }}>{level}</div>
            <div style={{ fontSize: 13.5, color: "var(--text2)", marginBottom: 8, lineHeight: 1.65 }}>{desc}</div>
            <div style={{ fontSize: 12.5, color: "var(--text3)", fontStyle: "italic" }}>Example: {ex}</div>
          </div>
        ))}
      </div>

      <div className="section">
        <div className="section-title">Entities & Entity Types</div>
        <div className="section-sub">// the "things" in your database</div>
        <div className="two-col">
          <div>
            <div className="card" style={{ borderTop: "3px solid var(--teal)", marginBottom: 14 }}>
              <div className="card-title" style={{ color: "var(--teal)" }}>Strong Entity</div>
              <div className="card-body">
                Has its own <strong>primary key</strong>. Exists independently — doesn't depend on any other entity for its identity. Drawn as a <strong>single rectangle</strong> in ER diagrams.
              </div>
              <div className="example-box" style={{ marginTop: 12 }}>
                <div className="ex-label">Examples</div>
                <p>Student (identified by student_id), Course (by course_id), Employee (by emp_id)</p>
              </div>
            </div>
          </div>
          <div>
            <div className="card" style={{ borderTop: "3px solid var(--coral)", marginBottom: 14 }}>
              <div className="card-title" style={{ color: "var(--coral)" }}>Weak Entity</div>
              <div className="card-body">
                Has <strong>no primary key</strong> of its own. Depends on a <strong>strong (owner) entity</strong> for identification. Identified by a <strong>partial key</strong> + the owner's key. Drawn as a <strong>double rectangle</strong>.
              </div>
              <div className="example-box" style={{ marginTop: 12 }}>
                <div className="ex-label">Example</div>
                <p>OrderItem depends on Order. An item with ItemNumber=3 only makes sense within Order #101. Partial key: ItemNumber. Full key: (order_id, ItemNumber).</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="section">
        <div className="section-title">Attribute Types</div>
        <div className="section-sub">// properties of entities</div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Type</th><th>Description</th><th>ER Notation</th><th>Example</th></tr></thead>
            <tbody>
              {[
                ["Simple (Atomic)", "Cannot be divided further", "Oval", "age, salary"],
                ["Composite", "Can be broken into sub-attributes", "Oval with child ovals", "Full Name → (First, Middle, Last)"],
                ["Single-valued", "One value per entity", "Single oval", "student_id"],
                ["Multi-valued", "Multiple values per entity", "Double oval", "phone_numbers (can have many)"],
                ["Derived", "Calculated from other attributes", "Dashed oval", "age derived from dob + current date"],
                ["Key Attribute", "Uniquely identifies each entity", "Underlined in oval", "student_id, emp_id"],
                ["Descriptive", "Describes a relationship (not an entity)", "Oval on relationship diamond", "grade on Enrolls-in relationship"],
              ].map(([type, desc, notation, ex]) => (
                <tr key={type}>
                  <td><strong>{type}</strong></td>
                  <td>{desc}</td>
                  <td style={{ fontFamily: "IBM Plex Mono", fontSize: 12, color: "var(--text3)" }}>{notation}</td>
                  <td style={{ color: "var(--teal)", fontFamily: "IBM Plex Mono", fontSize: 12 }}>{ex}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function RelationalPage() {
  return (
    <div>
      <div className="page-header">
        <span className="page-tag" style={{ background: "rgba(245,178,74,0.1)", color: "var(--amber)" }}>Unit 3</span>
        <h2>Relational Model & Keys</h2>
        <p>Tables, tuples, attributes, and all the key types that enforce data integrity.</p>
      </div>

      <div className="section">
        <div className="section-title">Relational Model Core Concepts</div>
        <div className="section-sub">// everything is a table (relation)</div>
        <div className="example-box" style={{ marginBottom: 20 }}>
          <div className="ex-label">Sample Relation: Students</div>
          <div className="table-wrap">
            <table style={{ fontSize: 13 }}>
              <thead>
                <tr>
                  <th style={{ color: "var(--teal)" }}>student_id</th>
                  <th>name</th>
                  <th>major</th>
                  <th>gpa</th>
                </tr>
              </thead>
              <tbody>
                <tr className="highlight-row"><td>1001</td><td>Alice</td><td>CS</td><td>3.8</td></tr>
                <tr><td>1002</td><td>Bob</td><td>Math</td><td>3.5</td></tr>
                <tr><td>1003</td><td>Carol</td><td>CS</td><td>3.9</td></tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Term</th><th>Relational Equivalent</th><th>Explanation</th></tr></thead>
            <tbody>
              {[
                ["Relation", "Table", "A set of tuples (rows) sharing the same attributes"],
                ["Tuple", "Row / Record", "One instance of data — represents one entity"],
                ["Attribute", "Column / Field", "A property of the entity. Has a name and domain."],
                ["Degree", "Number of columns", "Students table has 4 attributes → Degree = 4"],
                ["Cardinality", "Number of rows", "3 students in table → Cardinality = 3"],
                ["Domain", "Set of allowed values", "Domain of gpa: decimal 0.0–4.0"],
                ["Relation Schema", "Table definition", "Students(student_id, name, major, gpa)"],
                ["Relation Instance", "Current data in table", "The 3 rows above at this moment in time"],
              ].map(([t, r, e]) => (
                <tr key={t}><td><strong>{t}</strong></td><td style={{ color: "var(--teal)", fontFamily: "IBM Plex Mono", fontSize: 12 }}>{r}</td><td>{e}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="section">
        <div className="section-title">Database Keys</div>
        <div className="section-sub">// the glue that holds relational data together</div>

        {[
          {
            key: "Super Key", color: "var(--text3)", colorBg: "var(--surface2)",
            def: "Any set of attributes that uniquely identifies each tuple in a relation. Can include unnecessary attributes.",
            ex: "For Students: {student_id}, {student_id, name}, {name, dob, major} — all are super keys if they uniquely identify each student.",
            note: "Super key is the broadest category. All other keys are subsets of super keys."
          },
          {
            key: "Candidate Key", color: "var(--blue)", colorBg: "rgba(92,184,245,0.06)",
            def: "A minimal super key — no attribute can be removed and still have uniqueness. A relation can have multiple candidate keys.",
            ex: "Students: {student_id} and {email} are both candidate keys (assuming emails are unique). Neither can be reduced further.",
            note: "Minimal = irreducible. Remove any attribute → no longer unique."
          },
          {
            key: "Primary Key (PK)", color: "var(--teal)", colorBg: "rgba(52,212,176,0.06)",
            def: "The candidate key chosen by the DBA as the main identifier. Must be unique, NOT NULL. Only one per table. Underlined in schema notation.",
            ex: "We choose student_id as PK (not email, since email could change). Students(<u>student_id</u>, name, email, major, gpa)",
            note: "Rule: PK ≠ NULL, PK values must be unique across all rows."
          },
          {
            key: "Alternate Key", color: "var(--accent2)", colorBg: "rgba(124,106,247,0.06)",
            def: "Candidate keys that were NOT chosen as the primary key. Still unique — often enforced with a UNIQUE constraint.",
            ex: "If student_id is PK, then email is an alternate key. Both uniquely identify students.",
            note: "Also called 'secondary keys'."
          },
          {
            key: "Foreign Key (FK)", color: "var(--coral)", colorBg: "rgba(240,112,96,0.06)",
            def: "An attribute in one table that references the primary key of another table. Enforces referential integrity — the referenced value must exist.",
            ex: "Enrollments(student_id, course_id, grade). student_id is a FK referencing Students.student_id. You can't enroll a student that doesn't exist.",
            note: "FK can be NULL (student not yet assigned). FK value must exist in the referenced PK or be NULL."
          },
          {
            key: "Composite Key", color: "var(--amber)", colorBg: "rgba(245,178,74,0.06)",
            def: "A primary key made up of two or more attributes. Used when no single attribute uniquely identifies tuples.",
            ex: "Enrollments(<u>student_id, course_id</u>, grade). Neither student_id nor course_id alone is unique — together they are.",
            note: "Each part is individually non-unique, but the combination is unique."
          },
          {
            key: "Surrogate Key", color: "var(--green)", colorBg: "rgba(78,201,148,0.06)",
            def: "An artificial, system-generated key with no business meaning. Auto-incremented integers or UUIDs. Used when no natural key exists or natural keys are complex.",
            ex: "AUTO_INCREMENT id in MySQL. Instead of using (first_name, last_name, dob) as composite PK, use id INT AUTO_INCREMENT.",
            note: "Advantage: never changes, no business logic. Disadvantage: carries no meaning."
          },
        ].map(({ key, color, colorBg, def, ex, note }) => (
          <div key={key} style={{ background: colorBg, border: `1px solid ${color}33`, borderRadius: "var(--radius-lg)", padding: "18px 22px", marginBottom: 14 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: color, flexShrink: 0 }} />
              <span style={{ fontSize: 16, fontWeight: 600, color }}>{key}</span>
            </div>
            <div style={{ fontSize: 13.5, color: "var(--text2)", marginBottom: 8, lineHeight: 1.65 }}>{def}</div>
            <div style={{ background: "var(--surface)", borderRadius: 8, padding: "10px 14px", marginBottom: 8, border: "1px solid var(--border)" }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: color, marginBottom: 4 }}>Example</div>
              <div style={{ fontSize: 13, color: "var(--text2)", lineHeight: 1.6 }}>{ex}</div>
            </div>
            <div style={{ fontSize: 12, color: "var(--text3)", fontStyle: "italic" }}>💡 {note}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RelationshipsPage() {
  return (
    <div>
      <div className="page-header">
        <span className="page-tag" style={{ background: "rgba(245,178,74,0.1)", color: "var(--amber)" }}>Unit 3</span>
        <h2>Relationships & Constraints</h2>
        <p>Relationship types, cardinalities, participation constraints, and ER diagram notations.</p>
      </div>

      <div className="section">
        <div className="section-title">Relationship Basics</div>
        <div className="section-sub">// types, sets, and instances</div>
        <div className="three-col">
          <div className="card">
            <div className="card-title" style={{ color: "var(--accent2)" }}>Relationship Type</div>
            <div className="card-body">The schema definition — the name and participating entity types.</div>
            <div className="example-box" style={{ marginTop: 10 }}>
              <div className="ex-label">Example</div>
              <p>"Enrolls-in" between Student and Course</p>
            </div>
          </div>
          <div className="card">
            <div className="card-title" style={{ color: "var(--teal)" }}>Relationship Set</div>
            <div className="card-body">The collection of all relationship instances at a point in time — like a table of pairs.</div>
            <div className="example-box" style={{ marginTop: 10 }}>
              <div className="ex-label">Example</div>
              <p>{"{"}(Alice, DB), (Alice, OS), (Bob, DB){"}"}</p>
            </div>
          </div>
          <div className="card">
            <div className="card-title" style={{ color: "var(--amber)" }}>Relationship Instance</div>
            <div className="card-body">One specific association between entity instances.</div>
            <div className="example-box" style={{ marginTop: 10 }}>
              <div className="ex-label">Example</div>
              <p>(Student: Alice, Course: Database Systems)</p>
            </div>
          </div>
        </div>
      </div>

      <div className="section">
        <div className="section-title">Degree of Relationships</div>
        <div className="section-sub">// how many entity types participate</div>
        {[
          { deg: "Unary / Recursive (Degree 1)", color: "var(--accent2)", desc: "A relationship between instances of the SAME entity type. One entity participates twice in different roles.", ex: "Employee MANAGES Employee. An employee manages other employees. Or: Person MARRIED-TO Person." },
          { deg: "Binary (Degree 2)", color: "var(--teal)", desc: "A relationship between TWO different entity types. The most common degree in ER modeling.", ex: "Student ENROLLS-IN Course. Employee WORKS-FOR Department. Customer PLACES Order." },
          { deg: "Ternary (Degree 3)", color: "var(--amber)", desc: "A relationship involving THREE entity types simultaneously. Cannot be decomposed into two binary relationships without loss of information.", ex: "Doctor PRESCRIBES Drug FOR Patient. All three must participate together — knowing doctor+drug doesn't tell you which patient." },
        ].map(({ deg, color, desc, ex }) => (
          <div key={deg} style={{ background: "var(--surface2)", borderRadius: "var(--radius)", padding: "16px 20px", marginBottom: 12, borderLeft: `3px solid ${color}` }}>
            <div style={{ fontSize: 14, fontWeight: 600, color, marginBottom: 6 }}>{deg}</div>
            <div style={{ fontSize: 13.5, color: "var(--text2)", marginBottom: 8, lineHeight: 1.65 }}>{desc}</div>
            <div style={{ fontSize: 12.5, color: "var(--text3)", fontStyle: "italic" }}>Example: {ex}</div>
          </div>
        ))}
      </div>

      <div className="section">
        <div className="section-title">Mapping Cardinalities</div>
        <div className="section-sub">// how many instances of A relate to how many of B</div>
        {[
          {
            card: "One-to-One (1:1)", color: "var(--blue)", sym: "1 ─── 1",
            desc: "Each instance of A is associated with at most ONE instance of B, and vice versa.",
            ex: "Person has exactly one Passport. Passport belongs to exactly one Person.",
            impl: "Store FK in either table (or merge tables). E.g., Person(passport_number) or Passport(person_id)."
          },
          {
            card: "One-to-Many (1:N)", color: "var(--teal)", sym: "1 ─── ∞",
            desc: "Each instance of A is associated with MANY instances of B. Each instance of B is associated with AT MOST ONE instance of A.",
            ex: "Department has many Employees. Each Employee belongs to one Department.",
            impl: "FK goes on the 'many' side: Employee(dept_id) references Department(dept_id)."
          },
          {
            card: "Many-to-One (N:1)", color: "var(--accent2)", sym: "∞ ─── 1",
            desc: "The reverse perspective of 1:N. Many instances of A relate to one instance of B.",
            ex: "Many Employees work for one Department. (Same as above, just stated from Employee's perspective.)",
            impl: "Same as 1:N — FK on the 'many' side."
          },
          {
            card: "Many-to-Many (M:N)", color: "var(--amber)", sym: "∞ ─── ∞",
            desc: "Each instance of A can relate to MANY instances of B, and vice versa. Requires a junction (bridge) table.",
            ex: "Student enrolls in many Courses. Course has many Students. One student → many courses; one course → many students.",
            impl: "Create junction table: Enrollment(student_id, course_id, grade). Both FKs form the composite PK."
          },
        ].map(({ card, color, sym, desc, ex, impl }) => (
          <div key={card} style={{ background: "var(--surface2)", border: `1px solid ${color}33`, borderRadius: "var(--radius-lg)", padding: "18px 22px", marginBottom: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <span style={{ fontSize: 15, fontWeight: 600, color }}>{card}</span>
              <span style={{ fontFamily: "IBM Plex Mono", fontSize: 16, color: "var(--text3)" }}>{sym}</span>
            </div>
            <div style={{ fontSize: 13.5, color: "var(--text2)", marginBottom: 8, lineHeight: 1.65 }}>{desc}</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <div style={{ background: "var(--surface)", borderRadius: 8, padding: "10px 12px", border: "1px solid var(--border)" }}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: color, marginBottom: 4 }}>Example</div>
                <div style={{ fontSize: 12.5, color: "var(--text2)", lineHeight: 1.6 }}>{ex}</div>
              </div>
              <div style={{ background: "var(--surface)", borderRadius: 8, padding: "10px 12px", border: "1px solid var(--border)" }}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text3)", marginBottom: 4 }}>Implementation</div>
                <div style={{ fontSize: 12.5, color: "var(--text3)", lineHeight: 1.6, fontFamily: "IBM Plex Mono" }}>{impl}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="section">
        <div className="section-title">Participation Constraints</div>
        <div className="section-sub">// must every entity participate in a relationship?</div>
        <div className="two-col">
          <div className="card" style={{ borderTop: "3px solid var(--coral)" }}>
            <div className="card-title" style={{ color: "var(--coral)" }}>Total Participation (Mandatory)</div>
            <div className="card-body">
              <strong>Every</strong> entity in the set must participate in at least one relationship instance. Drawn as a <strong>double line</strong> in ER diagrams. Implemented with NOT NULL constraint on FK.
            </div>
            <div className="example-box" style={{ marginTop: 12 }}>
              <div className="ex-label">Example</div>
              <p>Every Employee MUST work for a Department. No employee can exist without a department. dept_id FK is NOT NULL.</p>
            </div>
          </div>
          <div className="card" style={{ borderTop: "3px solid var(--text3)" }}>
            <div className="card-title" style={{ color: "var(--text2)" }}>Partial Participation (Optional)</div>
            <div className="card-body">
              Some entities may <strong>not participate</strong> in any relationship instance. Drawn as a <strong>single line</strong>. FK can be NULL.
            </div>
            <div className="example-box" style={{ marginTop: 12 }}>
              <div className="ex-label">Example</div>
              <p>Not every Employee manages a Department. Some employees are just staff. manager_id in Department is NULLable.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="section">
        <div className="section-title">ER Diagram Notations</div>
        <div className="section-sub">// different ways to draw the same ER model</div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Concept</th><th>Chen's Model</th><th>Crow's Foot</th><th>Min/Max Notation</th></tr></thead>
            <tbody>
              {[
                ["Entity", "Rectangle", "Rectangle", "Rectangle"],
                ["Weak Entity", "Double Rectangle", "Rectangle (labeled)", "Rectangle (labeled)"],
                ["Relationship", "Diamond shape", "Line between entities", "Line between entities"],
                ["Attribute", "Oval", "Listed inside entity box", "Listed inside entity box"],
                ["Primary Key", "Underlined attribute in oval", "Attribute in bold/underline", "Attribute marked as PK"],
                ["One side (1)", "1 on the line", "Single vertical bar |", "(1,1) or (0,1)"],
                ["Many side (N)", "N or M on the line", "Crow's foot (three prongs ≪)", "(1,N) or (0,N)"],
                ["Total Participation", "Double line", "Mandatory mark |", "Min value = 1, e.g. (1,N)"],
                ["Partial Participation", "Single line", "Optional mark ○", "Min value = 0, e.g. (0,N)"],
              ].map(([c, ch, cf, mm]) => (
                <tr key={c}>
                  <td><strong>{c}</strong></td>
                  <td style={{ color: "var(--accent2)", fontSize: 12.5 }}>{ch}</td>
                  <td style={{ color: "var(--teal)", fontSize: 12.5 }}>{cf}</td>
                  <td style={{ color: "var(--amber)", fontSize: 12.5, fontFamily: "IBM Plex Mono" }}>{mm}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="example-box" style={{ marginTop: 14 }}>
          <div className="ex-label">Min/Max Notation Explained</div>
          <p>Format: <strong>(min, max)</strong> placed on each side of the relationship line.</p>
          <p style={{ marginTop: 6 }}><strong>Student (1,N) — Enrolls-in — (1,1) Course</strong></p>
          <p style={{ marginTop: 4 }}>Student side (1,N): A student enrolls in at least 1, at most N courses. Course side (1,1): A course instance has exactly 1 enrolled student... actually read as: a course has at least 1 enrollment. Min=0 means optional participation; Min=1 means mandatory.</p>
        </div>
      </div>
    </div>
  );
}

function RABasicPage() {
  const ops = [
    {
      symbol: "σ", name: "Selection", category: "Fundamental Operation", color: "var(--accent2)", colorBg: "rgba(124,106,247,0.07)",
      def: "Returns a subset of tuples (rows) from a relation that satisfy a given condition (predicate). Like the WHERE clause in SQL.",
      syntax: "σ_condition(Relation)",
      sql: "SELECT * FROM R WHERE condition;",
      example: {
        desc: "Given table Students(id, name, major, gpa), find all CS students with GPA > 3.5:",
        ra: "σ_(major='CS' ∧ gpa>3.5)(Students)",
        input: [["1001", "Alice", "CS", "3.8"], ["1002", "Bob", "Math", "3.5"], ["1003", "Carol", "CS", "3.9"], ["1004", "Dave", "CS", "3.2"]],
        output: [["1001", "Alice", "CS", "3.8"], ["1003", "Carol", "CS", "3.9"]],
        headers: ["id", "name", "major", "gpa"]
      },
      rules: ["Condition uses: =, ≠, <, >, ≤, ≥, ∧ (AND), ∨ (OR), ¬ (NOT)", "Result has same schema as input relation", "Result cardinality ≤ input cardinality"]
    },
    {
      symbol: "π", name: "Projection", category: "Fundamental Operation", color: "var(--teal)", colorBg: "rgba(52,212,176,0.07)",
      def: "Returns a subset of columns (attributes) from a relation. Eliminates duplicate tuples in the result. Like SELECT column_list in SQL.",
      syntax: "π_attribute_list(Relation)",
      sql: "SELECT DISTINCT attr1, attr2 FROM R;",
      example: {
        desc: "Get only the name and major from Students:",
        ra: "π_(name, major)(Students)",
        input: [["1001", "Alice", "CS", "3.8"], ["1002", "Bob", "Math", "3.5"], ["1003", "Carol", "CS", "3.9"]],
        output: [["Alice", "CS"], ["Bob", "Math"], ["Carol", "CS"]],
        headers: ["id", "name", "major", "gpa"], outHeaders: ["name", "major"]
      },
      rules: ["Result has fewer columns than input (or same)", "Duplicate rows automatically eliminated", "Can combine with selection: π_name(σ_major='CS'(Students))"]
    },
    {
      symbol: "∪", name: "Union", category: "Fundamental Operation", color: "var(--amber)", colorBg: "rgba(245,178,74,0.07)",
      def: "Combines all tuples from two union-compatible relations, removing duplicates. Both relations must have the same degree and compatible domains.",
      syntax: "R ∪ S",
      sql: "SELECT * FROM R UNION SELECT * FROM S;",
      example: {
        desc: "CSStudents ∪ MathStudents — all students in either department:",
        note: "CSStudents = {Alice, Carol}, MathStudents = {Bob, Carol (double major)}, Result = {Alice, Carol, Bob} — Carol appears once."
      },
      rules: ["R and S must be union-compatible (same # of columns, matching domains)", "Duplicates are eliminated", "Result degree = degree of R (or S)"]
    },
    {
      symbol: "−", name: "Set Difference", category: "Fundamental Operation", color: "var(--coral)", colorBg: "rgba(240,112,96,0.07)",
      def: "Returns tuples that are in the first relation but NOT in the second relation. Must be union-compatible.",
      syntax: "R − S",
      sql: "SELECT * FROM R EXCEPT SELECT * FROM S; -- or MINUS in Oracle",
      example: {
        desc: "AllStudents − EnrolledStudents = Students who have NOT enrolled in any course:",
        note: "If AllStudents = {1001,1002,1003,1004} and EnrolledStudents = {1001,1003}, then Result = {1002, 1004}. Bob and Dave are not enrolled."
      },
      rules: ["Order matters: R − S ≠ S − R", "Must be union-compatible", "Result ⊆ R"]
    },
    {
      symbol: "×", name: "Cartesian Product", category: "Fundamental Operation", color: "var(--pink)", colorBg: "rgba(232,122,170,0.07)",
      def: "Combines every tuple of relation R with every tuple of relation S. Produces all possible pairs. Result can be huge — use with caution.",
      syntax: "R × S",
      sql: "SELECT * FROM R CROSS JOIN S;",
      example: {
        desc: "R(A,B) has 2 rows, S(C,D) has 3 rows → R × S has 2×3 = 6 rows:",
        note: "R = {(a1,b1),(a2,b2)}, S = {(c1,d1),(c2,d2),(c3,d3)}\nResult: {(a1,b1,c1,d1), (a1,b1,c2,d2), (a1,b1,c3,d3), (a2,b2,c1,d1), (a2,b2,c2,d2), (a2,b2,c3,d3)}"
      },
      rules: ["Degree = degree(R) + degree(S)", "Cardinality = |R| × |S|", "Rarely used alone — typically followed by selection to form a Join"]
    },
    {
      symbol: "ρ", name: "Rename", category: "Fundamental Operation", color: "var(--blue)", colorBg: "rgba(92,184,245,0.07)",
      def: "Assigns a new name to a relation and/or its attributes. Essential when joining a table with itself (self-join) or when combining relations with conflicting attribute names.",
      syntax: "ρ_new_name(old_name)  OR  ρ_new_name(a1,a2,...)(Relation)",
      sql: "SELECT ... AS alias FROM table AS t;",
      example: {
        desc: "Rename Employee table to E with columns renamed to (eid, ename, did):",
        ra: "ρ_E(eid, ename, did)(Employee)",
        note: "Self-join: Find managers. ρ_Emp(Employee) JOIN ρ_Mgr(Employee) WHERE Emp.manager_id = Mgr.eid"
      },
      rules: ["Creates a new named copy — doesn't modify original", "Can rename both the relation and its attributes", "Required for self-joins to disambiguate"]
    },
  ];

  return (
    <div>
      <div className="page-header">
        <span className="page-tag" style={{ background: "rgba(240,112,96,0.1)", color: "var(--coral)" }}>Unit 4</span>
        <h2>Relational Algebra — Fundamental Operations</h2>
        <p>The six basic operations: σ Selection, π Projection, ∪ Union, − Set Difference, × Cartesian Product, ρ Rename.</p>
      </div>
      <div className="callout" style={{ background: "rgba(124,106,247,0.06)", borderColor: "rgba(124,106,247,0.2)", color: "var(--text2)", marginBottom: 32 }}>
        <strong style={{ color: "var(--accent2)" }}>What is Relational Algebra?</strong> A procedural query language that operates on relations (tables) and produces new relations. Every query is expressed as a sequence of operations. It forms the mathematical foundation of SQL. Operations can be composed — the result of one operation becomes the input to the next.
      </div>
      {ops.map(({ symbol, name, category, color, colorBg, def, syntax, sql, example, rules }) => (
        <div key={name} className="ra-op" style={{ background: colorBg, borderColor: `${color}33` }}>
          <div className="ra-op-header">
            <div className="ra-symbol" style={{ color }}>{symbol}</div>
            <div>
              <div className="ra-name">{name}</div>
              <div className="ra-category">{category}</div>
            </div>
          </div>
          <div style={{ fontSize: 14, color: "var(--text2)", marginBottom: 12, lineHeight: 1.7 }}>{def}</div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 }}>
            <div style={{ background: "var(--surface)", borderRadius: 8, padding: "10px 14px", border: "1px solid var(--border)" }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color, marginBottom: 6 }}>RA Syntax</div>
              <div style={{ fontFamily: "IBM Plex Mono", fontSize: 13, color: "var(--text)", lineHeight: 1.7 }}>{syntax}</div>
            </div>
            <div style={{ background: "var(--surface)", borderRadius: 8, padding: "10px 14px", border: "1px solid var(--border)" }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text3)", marginBottom: 6 }}>SQL Equivalent</div>
              <div style={{ fontFamily: "IBM Plex Mono", fontSize: 13, color: "var(--text3)", lineHeight: 1.7 }}>{sql}</div>
            </div>
          </div>

          <div style={{ background: "var(--surface)", border: `1px solid ${color}22`, borderLeft: `3px solid ${color}`, borderRadius: 8, padding: "12px 16px", marginBottom: 12 }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color, marginBottom: 8 }}>Worked Example</div>
            <div style={{ fontSize: 13, color: "var(--text2)", marginBottom: 8, lineHeight: 1.6 }}>{example.desc}</div>
            {example.ra && <div style={{ fontFamily: "IBM Plex Mono", fontSize: 14, color, marginBottom: 8 }}>{example.ra}</div>}
            {example.note && <div style={{ fontSize: 12.5, color: "var(--text3)", fontFamily: "IBM Plex Mono", whiteSpace: "pre-wrap", lineHeight: 1.7 }}>{example.note}</div>}
            {example.input && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 12, alignItems: "center", marginTop: 10 }}>
                <div>
                  <div style={{ fontSize: 10, color: "var(--text3)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em" }}>Input</div>
                  <table style={{ fontSize: 12 }}>
                    <thead><tr>{example.headers.map(h => <th key={h}>{h}</th>)}</tr></thead>
                    <tbody>{example.input.map((row, i) => <tr key={i}>{row.map((c, j) => <td key={j}>{c}</td>)}</tr>)}</tbody>
                  </table>
                </div>
                <div style={{ fontSize: 24, color: "var(--text3)" }}>→</div>
                <div>
                  <div style={{ fontSize: 10, color, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 700 }}>Result</div>
                  <table style={{ fontSize: 12 }}>
                    <thead><tr>{(example.outHeaders || example.headers).map(h => <th key={h} style={{ color }}>{h}</th>)}</tr></thead>
                    <tbody>{example.output.map((row, i) => <tr key={i}>{row.map((c, j) => <td key={j} style={{ color: "var(--text)" }}>{c}</td>)}</tr>)}</tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {rules.map(r => <span key={r} style={{ fontSize: 12, color: "var(--text3)", background: "var(--surface)", padding: "4px 10px", borderRadius: 6, border: "1px solid var(--border)" }}>• {r}</span>)}
          </div>
        </div>
      ))}
    </div>
  );
}

function RADerivedPage() {
  return (
    <div>
      <div className="page-header">
        <span className="page-tag" style={{ background: "rgba(240,112,96,0.1)", color: "var(--coral)" }}>Unit 4</span>
        <h2>Relational Algebra — Derived Operations</h2>
        <p>Operations built from the fundamentals: ∩ Intersection, ⋈ Natural Join, Theta Join, Equi Join, and ÷ Division.</p>
      </div>

      <div className="section">
        <div className="section-title">Set Intersection (∩)</div>
        <div className="section-sub">// tuples that appear in BOTH relations</div>
        <div className="ra-op" style={{ background: "rgba(52,212,176,0.07)", borderColor: "rgba(52,212,176,0.3)" }}>
          <div className="ra-op-header">
            <div className="ra-symbol" style={{ color: "var(--teal)" }}>∩</div>
            <div><div className="ra-name">Set Intersection</div><div className="ra-category">Derived from: R ∩ S = R − (R − S)</div></div>
          </div>
          <div style={{ fontSize: 14, color: "var(--text2)", marginBottom: 12, lineHeight: 1.7 }}>Returns only the tuples that appear in <strong>both</strong> R and S. Both relations must be union-compatible.</div>
          <div className="math-box">
            <div className="math-label">Definition via set difference:</div>
            R ∩ S ≡ R − (R − S)
          </div>
          <div className="example-box">
            <div className="ex-label">Example</div>
            <p>ScienceStudents = {"{"} Alice, Bob, Carol {"}"},  MathStudents = {"{"} Bob, Carol, Dave {"}"}</p>
            <p style={{ marginTop: 6 }}>ScienceStudents ∩ MathStudents = {"{"} <strong style={{ color: "var(--teal)" }}>Bob, Carol</strong> {"}"} — students in both departments</p>
            <p style={{ marginTop: 8, fontFamily: "IBM Plex Mono", fontSize: 13, color: "var(--text3)" }}>SQL: SELECT * FROM ScienceStudents INTERSECT SELECT * FROM MathStudents;</p>
          </div>
        </div>
      </div>

      <div className="section">
        <div className="section-title">Joins</div>
        <div className="section-sub">// combining related tuples from two tables</div>

        <div className="callout" style={{ background: "rgba(124,106,247,0.06)", borderColor: "rgba(124,106,247,0.2)", color: "var(--text2)", marginBottom: 20 }}>
          <strong style={{ color: "var(--accent2)" }}>Join = Cartesian Product + Selection</strong><br />
          All joins are fundamentally R × S followed by σ_(condition). Joins are the most important operation for querying multi-table databases.
        </div>

        {[
          {
            symbol: "⋈", name: "Natural Join", color: "var(--accent2)", colorBg: "rgba(124,106,247,0.07)",
            def: "Automatically joins on ALL attributes with the SAME NAME in both relations. Eliminates duplicate columns. The condition is implicit (equality on common attributes).",
            syntax: "R ⋈ S",
            sql: "SELECT * FROM R NATURAL JOIN S; -- or explicit: JOIN R ON R.id = S.id",
            example: `Employees(emp_id, name, dept_id) ⋈ Departments(dept_id, dept_name)
Joins on dept_id (common column):

emp_id | name  | dept_id | dept_name
-------|-------|---------|----------
1      | Alice | D1      | CS
2      | Bob   | D2      | Math
3      | Carol | D1      | CS

Note: dept_id appears only ONCE in result (not twice).`,
            rules: ["Joins on ALL matching attribute names", "If no common attributes → result = Cartesian Product", "Duplicate column removed from result", "Order of attributes: R's attrs + S's remaining attrs"]
          },
          {
            symbol: "⋈_θ", name: "Theta Join", color: "var(--amber)", colorBg: "rgba(245,178,74,0.07)",
            def: "A join with a general condition θ (theta) that can use any comparison operators (=, ≠, <, >, ≤, ≥). The condition can involve different attribute names from R and S.",
            syntax: "R ⋈_(θ) S  ≡  σ_θ(R × S)",
            sql: "SELECT * FROM R JOIN S ON condition;",
            example: `Find all employees whose salary > their manager's salary:

Emp ⋈_(Emp.salary > Mgr.salary) Mgr
Where Mgr = ρ_Mgr(Employee)

This returns pairs (employee, manager) where the employee earns more.
Theta join allows non-equality conditions unlike equi join.`,
            rules: ["θ can be any comparison: <, >, ≠, ≤, ≥, =", "Preserves ALL attributes from both tables", "If θ uses only '=' → called an Equi Join", "Generalization: all other joins are special cases of theta join"]
          },
          {
            symbol: "⋈_=", name: "Equi Join", color: "var(--green)", colorBg: "rgba(78,201,148,0.07)",
            def: "A theta join where the condition uses ONLY equality (=). The join attribute appears TWICE in the result (unlike Natural Join which removes duplicates).",
            syntax: "R ⋈_(R.A = S.B) S",
            sql: "SELECT * FROM R JOIN S ON R.A = S.B;",
            example: `Employees ⋈_(Employees.dept_id = Departments.dept_id) Departments

emp_id | name  | dept_id | dept_id | dept_name
-------|-------|---------|---------|----------
1      | Alice | D1      | D1      | CS
2      | Bob   | D2      | D2      | Math

Notice dept_id appears TWICE — this is the key difference
from Natural Join where it appears only once.`,
            rules: ["Condition uses only equality operator (=)", "Duplicate join column retained (both columns present)", "Natural Join = Equi Join + remove duplicate column", "Most common join in practice"]
          },
        ].map(({ symbol, name, color, colorBg, def, syntax, sql, example, rules }) => (
          <div key={name} className="ra-op" style={{ background: colorBg, borderColor: `${color}33` }}>
            <div className="ra-op-header">
              <div className="ra-symbol" style={{ color }}>{symbol}</div>
              <div><div className="ra-name">{name}</div><div className="ra-category">Derived Operation — Join Family</div></div>
            </div>
            <div style={{ fontSize: 14, color: "var(--text2)", marginBottom: 12, lineHeight: 1.7 }}>{def}</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 }}>
              <div style={{ background: "var(--surface)", borderRadius: 8, padding: "10px 14px", border: "1px solid var(--border)" }}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color, marginBottom: 6 }}>Syntax</div>
                <div style={{ fontFamily: "IBM Plex Mono", fontSize: 12, color: "var(--text)", lineHeight: 1.8 }}>{syntax}</div>
              </div>
              <div style={{ background: "var(--surface)", borderRadius: 8, padding: "10px 14px", border: "1px solid var(--border)" }}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text3)", marginBottom: 6 }}>SQL</div>
                <div style={{ fontFamily: "IBM Plex Mono", fontSize: 12, color: "var(--text3)", lineHeight: 1.8 }}>{sql}</div>
              </div>
            </div>
            <div style={{ background: "var(--surface)", border: `1px solid ${color}22`, borderLeft: `3px solid ${color}`, borderRadius: 8, padding: "12px 16px", marginBottom: 12 }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color, marginBottom: 8 }}>Worked Example</div>
              <div style={{ fontFamily: "IBM Plex Mono", fontSize: 12.5, color: "var(--text2)", whiteSpace: "pre-wrap", lineHeight: 1.8 }}>{example}</div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {rules.map(r => <span key={r} style={{ fontSize: 12, color: "var(--text3)", background: "var(--surface)", padding: "4px 10px", borderRadius: 6, border: "1px solid var(--border)" }}>• {r}</span>)}
            </div>
          </div>
        ))}
      </div>

      <div className="section">
        <div className="section-title">Division (÷)</div>
        <div className="section-sub">// "find tuples in R that match ALL tuples in S"</div>
        <div className="ra-op" style={{ background: "rgba(232,122,170,0.07)", borderColor: "rgba(232,122,170,0.3)" }}>
          <div className="ra-op-header">
            <div className="ra-symbol" style={{ color: "var(--pink)" }}>÷</div>
            <div><div className="ra-name">Division</div><div className="ra-category">Derived — most complex operation</div></div>
          </div>
          <div style={{ fontSize: 14, color: "var(--text2)", marginBottom: 12, lineHeight: 1.7 }}>
            Given R(X, Y) ÷ S(Y): Returns those X values from R such that for <strong>every</strong> Y value in S, the pair (X, Y) exists in R. Answers "find X that is related to ALL Y in S."
          </div>
          <div className="math-box">
            <div className="math-label">Formal definition using fundamentals:</div>
            {"R ÷ S  ≡  π_X(R) − π_X( π_X(R) × S − R )"}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, margin: "14px 0" }}>
            <div>
              <div style={{ fontSize: 11, color: "var(--text3)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em" }}>R: Enrollment</div>
              <table style={{ fontSize: 12 }}>
                <thead><tr><th>student</th><th>course</th></tr></thead>
                <tbody>
                  {[["Alice","Math"],["Alice","CS"],["Alice","Physics"],["Bob","Math"],["Bob","CS"],["Carol","Math"]].map(([s,c]) => (
                    <tr key={s+c}><td>{s}</td><td>{c}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div>
              <div style={{ fontSize: 11, color: "var(--text3)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em" }}>S: Required Courses</div>
              <table style={{ fontSize: 12 }}>
                <thead><tr><th>course</th></tr></thead>
                <tbody>
                  {["Math","CS"].map(c => <tr key={c}><td>{c}</td></tr>)}
                </tbody>
              </table>
            </div>
            <div>
              <div style={{ fontSize: 11, color: "var(--pink)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 700 }}>R ÷ S (Result)</div>
              <table style={{ fontSize: 12 }}>
                <thead><tr><th style={{ color: "var(--pink)" }}>student</th></tr></thead>
                <tbody>
                  {["Alice", "Bob"].map(s => <tr key={s}><td style={{ color: "var(--text)" }}>{s}</td></tr>)}
                </tbody>
              </table>
            </div>
          </div>
          <div className="example-box">
            <div className="ex-label">Explanation</div>
            <p>Query: "Find students enrolled in ALL required courses (Math AND CS)."</p>
            <p style={{ marginTop: 6 }}>Alice: enrolled in Math ✓ and CS ✓ → included</p>
            <p>Bob: enrolled in Math ✓ and CS ✓ → included</p>
            <p>Carol: enrolled in Math ✓ but NOT CS ✗ → excluded</p>
            <p style={{ marginTop: 8 }}>SQL equivalent: <span style={{ fontFamily: "IBM Plex Mono", fontSize: 12 }}>SELECT student FROM Enrollment WHERE course IN ('Math','CS') GROUP BY student HAVING COUNT(DISTINCT course) = 2</span></p>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 12 }}>
            {["R must have schema (X, Y) and S must have schema (Y) — Y is a subset of R's attributes",
              "Result contains only X attributes",
              "Used for 'for all' type queries (universal quantification)",
              "Less common in SQL — typically implemented with double negation or GROUP BY+HAVING"
            ].map(r => <span key={r} style={{ fontSize: 12, color: "var(--text3)", background: "var(--surface)", padding: "4px 10px", borderRadius: 6, border: "1px solid var(--border)" }}>• {r}</span>)}
          </div>
        </div>
      </div>

      <div className="section">
        <div className="section-title">Join Comparison Summary</div>
        <div className="section-sub">// when to use which join</div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Join Type</th><th>Condition</th><th>Duplicate columns?</th><th>Use when...</th></tr></thead>
            <tbody>
              <tr><td><strong>Natural Join ⋈</strong></td><td>Implicit — all matching names</td><td>No — removed</td><td>Tables share column names by design</td></tr>
              <tr><td><strong>Equi Join</strong></td><td>Explicit — equality only</td><td>Yes — kept</td><td>Join on specific columns, need both</td></tr>
              <tr><td><strong>Theta Join ⋈_θ</strong></td><td>Any comparison (=,&lt;,&gt;,≠)</td><td>Yes — kept</td><td>Non-equality conditions needed</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function OuterJoinsPage() {
  return (
    <div>
      <div className="page-header">
        <span className="page-tag" style={{ background: "rgba(240,112,96,0.1)", color: "var(--coral)" }}>Unit 4</span>
        <h2>Outer Joins</h2>
        <p>Left ⟕, Right ⟖, and Full ⟗ outer joins — preserving unmatched tuples with NULLs.</p>
      </div>

      <div className="callout" style={{ background: "rgba(92,184,245,0.06)", borderColor: "rgba(92,184,245,0.2)", color: "var(--text2)", marginBottom: 28 }}>
        <strong style={{ color: "var(--blue)" }}>Why Outer Joins?</strong> Regular (inner) joins only return tuples with matches in both tables. Outer joins also include tuples that have <strong>no match</strong> in the other table — filling missing values with <strong>NULL</strong>. Essential when you need to preserve all records from one or both sides.
      </div>

      <div className="section">
        <div className="section-title">Sample Tables for All Examples</div>
        <div className="two-col">
          <div>
            <div style={{ fontSize: 12, color: "var(--text3)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.06em" }}>Employees (E)</div>
            <table style={{ fontSize: 13 }}>
              <thead><tr><th>emp_id</th><th>name</th><th>dept_id</th></tr></thead>
              <tbody>
                {[["E1","Alice","D1"],["E2","Bob","D2"],["E3","Carol","D3"],["E4","Dave","D4"]].map(([id,n,d]) => (
                  <tr key={id}><td>{id}</td><td>{n}</td><td>{d}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <div style={{ fontSize: 12, color: "var(--text3)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.06em" }}>Departments (D)</div>
            <table style={{ fontSize: 13 }}>
              <thead><tr><th>dept_id</th><th>dept_name</th></tr></thead>
              <tbody>
                {[["D1","CS"],["D2","Math"],["D5","Physics"],["D6","Chemistry"]].map(([id,n]) => (
                  <tr key={id}><td>{id}</td><td>{n}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="callout" style={{ background: "rgba(245,178,74,0.06)", borderColor: "rgba(245,178,74,0.2)", color: "var(--text2)", marginTop: 14 }}>
          Notice: Carol (D3) and Dave (D4) have no matching department. Departments D5 (Physics) and D6 (Chemistry) have no employees.
        </div>
      </div>

      {[
        {
          symbol: "⟕", name: "Left Outer Join", color: "var(--teal)", colorBg: "rgba(52,212,176,0.07)",
          def: "Returns ALL tuples from the LEFT relation (R), plus matching tuples from the right (S). Where no match exists in S, the S attributes are filled with NULL.",
          syntax: "R ⟕ S",
          sql: "SELECT * FROM R LEFT OUTER JOIN S ON R.dept_id = S.dept_id;",
          visual: "[ R ✓ ] ∪ [ R ∩ S ]   ← preserves all of left table",
          result: [
            ["E1","Alice","D1","D1","CS"],
            ["E2","Bob","D2","D2","Math"],
            ["E3","Carol","D3","NULL","NULL"],
            ["E4","Dave","D4","NULL","NULL"],
          ],
          headers: ["emp_id","name","dept_id","dept_id","dept_name"],
          highlight: [2,3],
          explanation: "Carol and Dave have no matching department → their D.dept_id and D.dept_name are NULL. D5 and D6 (Physics, Chemistry) are NOT included.",
          use: "When you want ALL records from the left table regardless of whether they have a match. E.g., 'list all employees and their department, even if unassigned.'"
        },
        {
          symbol: "⟖", name: "Right Outer Join", color: "var(--amber)", colorBg: "rgba(245,178,74,0.07)",
          def: "Returns ALL tuples from the RIGHT relation (S), plus matching tuples from the left (R). Where no match in R, the R attributes are filled with NULL.",
          syntax: "R ⟖ S",
          sql: "SELECT * FROM R RIGHT OUTER JOIN S ON R.dept_id = S.dept_id;",
          visual: "[ R ∩ S ] ∪ [ S ✓ ]   ← preserves all of right table",
          result: [
            ["E1","Alice","D1","D1","CS"],
            ["E2","Bob","D2","D2","Math"],
            ["NULL","NULL","NULL","D5","Physics"],
            ["NULL","NULL","NULL","D6","Chemistry"],
          ],
          headers: ["emp_id","name","E.dept_id","D.dept_id","dept_name"],
          highlight: [2,3],
          explanation: "D5 (Physics) and D6 (Chemistry) have no employees → E.emp_id, E.name, E.dept_id are NULL. Carol (D3) and Dave (D4) are NOT included.",
          use: "When you want ALL records from the right table. E.g., 'list all departments and their employees, even empty departments.'"
        },
        {
          symbol: "⟗", name: "Full Outer Join", color: "var(--pink)", colorBg: "rgba(232,122,170,0.07)",
          def: "Returns ALL tuples from BOTH relations. Matched tuples are combined. Unmatched tuples from either side get NULL for the other side's attributes.",
          syntax: "R ⟗ S",
          sql: "SELECT * FROM R FULL OUTER JOIN S ON R.dept_id = S.dept_id;\n-- (MySQL: use LEFT JOIN UNION RIGHT JOIN)",
          visual: "[ R ✓ ] ∪ [ R ∩ S ] ∪ [ S ✓ ]  ← preserves everything",
          result: [
            ["E1","Alice","D1","D1","CS"],
            ["E2","Bob","D2","D2","Math"],
            ["E3","Carol","D3","NULL","NULL"],
            ["E4","Dave","D4","NULL","NULL"],
            ["NULL","NULL","NULL","D5","Physics"],
            ["NULL","NULL","NULL","D6","Chemistry"],
          ],
          headers: ["emp_id","name","E.dept_id","D.dept_id","dept_name"],
          highlight: [2,3,4,5],
          explanation: "ALL employees appear (Carol and Dave with NULLs). ALL departments appear (Physics and Chemistry with NULLs). No data is lost.",
          use: "When you want a complete picture of both tables — no data discarded. E.g., 'list all employees and all departments, showing connections where they exist.'"
        },
      ].map(({ symbol, name, color, colorBg, def, syntax, sql, visual, result, headers, highlight, explanation, use }) => (
        <div key={name} className="ra-op" style={{ background: colorBg, borderColor: `${color}33` }}>
          <div className="ra-op-header">
            <div className="ra-symbol" style={{ color, fontSize: 26 }}>{symbol}</div>
            <div><div className="ra-name">{name}</div><div className="ra-category">Outer Join — preserves unmatched tuples with NULL</div></div>
          </div>

          <div style={{ fontSize: 14, color: "var(--text2)", marginBottom: 14, lineHeight: 1.7 }}>{def}</div>

          <div style={{ background: "var(--surface)", borderRadius: 8, padding: "10px 14px", marginBottom: 12, textAlign: "center" }}>
            <div style={{ fontFamily: "IBM Plex Mono", fontSize: 15, color }}>R {symbol} S</div>
            <div style={{ fontSize: 12, color: "var(--text3)", marginTop: 4 }}>{visual}</div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
            <div style={{ background: "var(--surface)", borderRadius: 8, padding: "10px 14px", border: "1px solid var(--border)" }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color, marginBottom: 6 }}>RA Syntax</div>
              <div style={{ fontFamily: "IBM Plex Mono", fontSize: 12, color: "var(--text)" }}>{syntax}</div>
            </div>
            <div style={{ background: "var(--surface)", borderRadius: 8, padding: "10px 14px", border: "1px solid var(--border)" }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text3)", marginBottom: 6 }}>SQL</div>
              <div style={{ fontFamily: "IBM Plex Mono", fontSize: 11.5, color: "var(--text3)", whiteSpace: "pre-wrap" }}>{sql}</div>
            </div>
          </div>

          <div style={{ background: "var(--surface)", borderRadius: 8, padding: "14px 16px", border: `1px solid ${color}22`, borderLeft: `3px solid ${color}`, marginBottom: 12 }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color, marginBottom: 10 }}>Result: E {symbol} D (on dept_id)</div>
            <div className="table-wrap">
              <table style={{ fontSize: 12.5 }}>
                <thead><tr>{headers.map((h,i) => <th key={i} style={i >= 3 ? { color: "var(--text3)" } : {}}>{h}</th>)}</tr></thead>
                <tbody>
                  {result.map((row, ri) => (
                    <tr key={ri} style={highlight.includes(ri) ? { background: `${color}11` } : {}}>
                      {row.map((cell, ci) => (
                        <td key={ci} style={cell === "NULL" ? { color: color, fontFamily: "IBM Plex Mono", fontStyle: "italic" } : {}}>
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{ marginTop: 10, fontSize: 12.5, color: "var(--text3)", lineHeight: 1.65 }}>{explanation}</div>
          </div>

          <div style={{ background: "var(--surface)", borderRadius: 8, padding: "10px 14px", border: "1px solid var(--border)", fontSize: 13, color: "var(--text2)", lineHeight: 1.6 }}>
            <strong style={{ color }}>Use when: </strong>{use}
          </div>
        </div>
      ))}

      <div className="section" style={{ marginTop: 40 }}>
        <div className="section-title">All Joins at a Glance</div>
        <div className="section-sub">// inner vs outer comparison</div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Join Type</th><th>Symbol</th><th>Rows from R (left)?</th><th>Rows from S (right)?</th><th>NULLs?</th></tr></thead>
            <tbody>
              <tr><td><strong>Inner / Natural / Equi / Theta</strong></td><td style={{ fontFamily: "IBM Plex Mono" }}>⋈</td><td>Only matched</td><td>Only matched</td><td>No</td></tr>
              <tr style={{ background: "rgba(52,212,176,0.05)" }}><td><strong style={{ color: "var(--teal)" }}>Left Outer Join</strong></td><td style={{ fontFamily: "IBM Plex Mono", color: "var(--teal)" }}>⟕</td><td style={{ color: "var(--teal)" }}>ALL rows</td><td>Only matched</td><td>Yes — right side</td></tr>
              <tr style={{ background: "rgba(245,178,74,0.05)" }}><td><strong style={{ color: "var(--amber)" }}>Right Outer Join</strong></td><td style={{ fontFamily: "IBM Plex Mono", color: "var(--amber)" }}>⟖</td><td>Only matched</td><td style={{ color: "var(--amber)" }}>ALL rows</td><td>Yes — left side</td></tr>
              <tr style={{ background: "rgba(232,122,170,0.05)" }}><td><strong style={{ color: "var(--pink)" }}>Full Outer Join</strong></td><td style={{ fontFamily: "IBM Plex Mono", color: "var(--pink)" }}>⟗</td><td style={{ color: "var(--pink)" }}>ALL rows</td><td style={{ color: "var(--pink)" }}>ALL rows</td><td>Yes — both sides</td></tr>
            </tbody>
          </table>
        </div>

        <div className="example-box" style={{ marginTop: 20 }}>
          <div className="ex-label">Key Insight: Full Outer Join as Union of Lefts and Rights</div>
          <div style={{ fontFamily: "IBM Plex Mono", fontSize: 13, color: "var(--text2)", lineHeight: 1.8 }}>
            {"R ⟗ S  ≡  (R ⟕ S) ∪ (R ⟖ S)"}<br />
            {"\n"}<br />
            {"-- In MySQL (no FULL OUTER JOIN syntax):"}{"  "}<br />
            {"SELECT * FROM R LEFT JOIN S ON R.id=S.id"}<br />
            {"UNION"}<br />
            {"SELECT * FROM R RIGHT JOIN S ON R.id=S.id;"}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// MAIN APP
// ─────────────────────────────────────────────

export default function App() {
  const [active, setActive] = useState("intro");

  const pages = {
    intro: <IntroPage />,
    architecture: <ArchitecturePage />,
    design: <DesignPage />,
    relational: <RelationalPage />,
    relationships: <RelationshipsPage />,
    "ra-basic": <RABasicPage />,
    "ra-derived": <RADerivedPage />,
    "ra-outer": <OuterJoinsPage />,
  };

  const sections = ["Unit 1", "Unit 2", "Unit 3", "Unit 4"];

  return (
    <>
      <style>{styles}</style>
      <div className="app">
        <nav className="sidebar">
          <div className="sidebar-header">
            <h1>Study Guide</h1>
            <p>Database Systems & DBMS</p>
          </div>
          {sections.map(sec => {
            const items = navItems.filter(n => n.section === sec);
            return (
              <div className="nav-section" key={sec}>
                <div className="nav-section-label">{sec}</div>
                {items.map(({ id, label, color }) => (
                  <button
                    key={id}
                    className={`nav-item ${active === id ? "active" : ""}`}
                    onClick={() => setActive(id)}
                  >
                    <div className="dot" style={active === id ? { background: color } : {}} />
                    {label}
                  </button>
                ))}
              </div>
            );
          })}
        </nav>
        <main className="main">
          <div className="content">
            {pages[active]}
          </div>
        </main>
      </div>
    </>
  );
}
