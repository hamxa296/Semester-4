import { useState, useEffect, useRef } from "react";

const EXAM_DURATION = 120 * 60; // 2 hours

const exam = {
  title: "CS232L — Database Management System Lab",
  subtitle: "Final Examination — Comprehensive Practice",
  totalMarks: 50,
  duration: "2 Hours",
  instructions: [
    "Attempt ALL five questions.",
    "Section A covers Pre-Mid concepts (30%).",
    "Section B covers Post-Mid concepts (70%).",
    "Write clean, properly indented SQL and PL/pgSQL.",
    "Marks are awarded for correct logic even with minor syntax slips.",
  ],
  questions: [
    {
      id: "Q1",
      topic: "Pre-Mid: DDL, Joins, Aggregation & Subqueries (30%)",
      marks: 15,
      scenario: `You are working with an E-commerce database with the following tables:
users(user_id, username, email)
products(product_id, name, price, stock)
orders(order_id, user_id, order_date, status)
order_items(order_id, product_id, quantity, price_at_purchase)

Assume all primary keys are appropriately named (e.g., user_id for users).`,
      parts: [
        {
          label: "a",
          marks: 4,
          text: `Create the \`order_items\` table. Requirements:
• \`order_id\` and \`product_id\` should act as a COMPOSITE PRIMARY KEY.
• \`order_id\` is a FOREIGN KEY referencing \`orders\`, with ON DELETE CASCADE.
• \`product_id\` is a FOREIGN KEY referencing \`products\`.
• \`quantity\` must be greater than 0 (use a CHECK constraint).`,
          hint: "For composite PK, use PRIMARY KEY (col1, col2) at the end of the table definition. Don't forget the CHECK constraint.",
          answer: `CREATE TABLE order_items (
  order_id INT,
  product_id INT,
  quantity INT CHECK (quantity > 0),
  price_at_purchase DECIMAL(10, 2),
  PRIMARY KEY (order_id, product_id),
  CONSTRAINT fk_order FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE,
  CONSTRAINT fk_product FOREIGN KEY (product_id) REFERENCES products(product_id)
);`
        },
        {
          label: "b",
          marks: 4,
          text: `Write a query to find the names of users who have ordered a product that is currently out of stock (stock = 0).
Make sure to only list each user once.`,
          hint: "JOIN users to orders to order_items to products. Add WHERE stock = 0. Use DISTINCT to avoid duplicates.",
          answer: `SELECT DISTINCT u.username
FROM users u
INNER JOIN orders o ON u.user_id = o.user_id
INNER JOIN order_items oi ON o.order_id = oi.order_id
INNER JOIN products p ON oi.product_id = p.product_id
WHERE p.stock = 0;`
        },
        {
          label: "c",
          marks: 4,
          text: `For each user who has placed AT LEAST 3 orders, show their \`username\` and the total number of orders they've placed.
Sort the result by the number of orders descending.`,
          hint: "GROUP BY user_id and username. Use HAVING to filter groups with COUNT(order_id) >= 3.",
          answer: `SELECT u.username, COUNT(o.order_id) AS total_orders
FROM users u
INNER JOIN orders o ON u.user_id = o.user_id
GROUP BY u.user_id, u.username
HAVING COUNT(o.order_id) >= 3
ORDER BY total_orders DESC;`
        },
        {
          label: "d",
          marks: 3,
          text: `Using a subquery, find the name and price of the product(s) with the HIGHEST price in the database.
(Do not use LIMIT.)`,
          hint: "WHERE price = (SELECT MAX(price) FROM products)",
          answer: `SELECT name, price
FROM products
WHERE price = (
  SELECT MAX(price)
  FROM products
);`
        }
      ]
    },
    {
      id: "Q2",
      topic: "Post-Mid: PL/pgSQL Blocks, Exceptions & CASE",
      marks: 10,
      scenario: `We continue with the E-commerce database. We need to implement robust business logic for purchasing products.`,
      parts: [
        {
          label: "a",
          marks: 6,
          text: `Write an anonymous PL/pgSQL block (using \`do $$\`) that attempts to purchase a product (assume product_id = 1).
• Declare a variable to hold the current stock.
• Fetch the stock of product 1 into the variable.
• If the stock is 0, explicitly raise an exception with the message 'Product is out of stock!'.
• If the stock > 0, update the table to decrement stock by 1, and RAISE NOTICE 'Purchase successful.'
• In the EXCEPTION block, catch ALL errors and output a NOTICE saying: "Purchase failed: <error_message>" using SQLERRM.`,
          hint: "Use `SELECT stock INTO v_stock FROM products WHERE product_id = 1;`. Use `IF v_stock = 0 THEN RAISE EXCEPTION '...'; END IF;`.",
          answer: `DO $$
DECLARE
  v_stock INT;
BEGIN
  SELECT stock INTO v_stock
  FROM products
  WHERE product_id = 1;

  IF v_stock = 0 THEN
    RAISE EXCEPTION 'Product is out of stock!';
  ELSE
    UPDATE products SET stock = stock - 1 WHERE product_id = 1;
    RAISE NOTICE 'Purchase successful.';
  END IF;

EXCEPTION
  WHEN OTHERS THEN
    RAISE NOTICE 'Purchase failed: %', SQLERRM;
END $$;`
        },
        {
          label: "b",
          marks: 4,
          text: `Write a PL/pgSQL function \`get_order_category(total_amount DECIMAL)\` that returns a VARCHAR.
Use a **Searched CASE statement** to return:
• 'Platinum' if total_amount > 1000
• 'Gold' if total_amount > 500
• 'Silver' otherwise.`,
          hint: "CREATE FUNCTION ... RETURNS varchar AS $$ DECLARE ... BEGIN CASE WHEN ... THEN ... ELSE ... END CASE; RETURN ... END; $$ LANGUAGE plpgsql;",
          answer: `CREATE OR REPLACE FUNCTION get_order_category(total_amount DECIMAL)
RETURNS VARCHAR
LANGUAGE plpgsql
AS $$
DECLARE
  category VARCHAR;
BEGIN
  CASE
    WHEN total_amount > 1000 THEN
      category := 'Platinum';
    WHEN total_amount > 500 THEN
      category := 'Gold';
    ELSE
      category := 'Silver';
  END CASE;
  
  RETURN category;
END; $$;`
        }
      ]
    },
    {
      id: "Q3",
      topic: "Post-Mid: Cursors & Stored Procedures",
      marks: 10,
      scenario: `Complex operations require row-by-row processing and transaction control.`,
      parts: [
        {
          label: "a",
          marks: 5,
          text: `Write a Stored Procedure \`refund_order(p_order_id INT, p_refund_amount DECIMAL)\`.
Inside the procedure:
1. Find the user associated with the order.
2. Update the \`orders\` table, setting status = 'Refunded' for the given order.
3. Update the \`users\` table, adding \`p_refund_amount\` to their \`wallet_balance\`. (Assume a wallet_balance column exists).
4. COMMIT the transaction.`,
          hint: "Procedures use CALL and can manage transactions. Use a SELECT INTO to fetch the user_id into a variable first.",
          answer: `CREATE OR REPLACE PROCEDURE refund_order(p_order_id INT, p_refund_amount DECIMAL)
LANGUAGE plpgsql
AS $$
DECLARE
  v_user_id INT;
BEGIN
  -- Find the user associated with the order
  SELECT user_id INTO v_user_id
  FROM orders
  WHERE order_id = p_order_id;

  -- Update order status
  UPDATE orders 
  SET status = 'Refunded' 
  WHERE order_id = p_order_id;

  -- Refund to user wallet
  UPDATE users 
  SET wallet_balance = wallet_balance + p_refund_amount 
  WHERE user_id = v_user_id;

  COMMIT;
END; $$;`
        },
        {
          label: "b",
          marks: 5,
          text: `Write an anonymous block that declares a **Cursor** to fetch all \`order_id\`s from the \`orders\` table where status = 'Pending'.
Loop through the cursor, fetch each row into a record variable, and output a notice: "Processing order: <order_id>".
Ensure you properly open, fetch, check for exit, and close the cursor.`,
          hint: "DECLARE cur_pending CURSOR FOR ...; OPEN cur; LOOP FETCH cur INTO rec; EXIT WHEN NOT FOUND; ... END LOOP; CLOSE cur;",
          answer: `DO $$
DECLARE
  cur_pending CURSOR FOR SELECT order_id FROM orders WHERE status = 'Pending';
  rec_order RECORD;
BEGIN
  OPEN cur_pending;
  
  LOOP
    FETCH cur_pending INTO rec_order;
    EXIT WHEN NOT FOUND;
    
    RAISE NOTICE 'Processing order: %', rec_order.order_id;
  END LOOP;
  
  CLOSE cur_pending;
END $$;`
        }
      ]
    },
    {
      id: "Q4",
      topic: "Post-Mid: Triggers, Views & Indexes",
      marks: 10,
      scenario: `You need to add auditing, performance tuning, and access control to the E-commerce database.`,
      parts: [
        {
          label: "a",
          marks: 6,
          text: `Write a Trigger Function \`log_price_change()\` and bind it to a trigger \`trg_price_update\`.
The trigger should fire BEFORE UPDATE on the \`products\` table.
If the \`price\` changes (i.e., NEW.price <> OLD.price), insert a record into \`price_audit(product_id, old_price, new_price, changed_at)\`.`,
          hint: "Function returns TRIGGER. Inside: IF NEW.price <> OLD.price THEN INSERT ... END IF; RETURN NEW; Create trigger BEFORE UPDATE FOR EACH ROW.",
          answer: `-- 1. Create the Trigger Function
CREATE OR REPLACE FUNCTION log_price_change()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  IF NEW.price <> OLD.price THEN
    INSERT INTO price_audit(product_id, old_price, new_price, changed_at)
    VALUES (OLD.product_id, OLD.price, NEW.price, NOW());
  END IF;
  RETURN NEW;
END;
$$;

-- 2. Bind the Trigger
CREATE TRIGGER trg_price_update
BEFORE UPDATE ON products
FOR EACH ROW
EXECUTE PROCEDURE log_price_change();`
        },
        {
          label: "b",
          marks: 2,
          text: `Create a **Materialized View** named \`active_users\` that selects all columns from \`users\` who have placed at least one order.
(You can use a simple JOIN or IN subquery).`,
          hint: "CREATE MATERIALIZED VIEW name AS SELECT ...",
          answer: `CREATE MATERIALIZED VIEW active_users AS
SELECT DISTINCT u.*
FROM users u
INNER JOIN orders o ON u.user_id = o.user_id;`
        },
        {
          label: "c",
          marks: 2,
          text: `Your app frequently queries orders that have status = 'Pending'. 
Create a **Partial Index** named \`idx_pending_orders\` on the \`orders\` table to optimize this specific query pattern and save disk space.`,
          hint: "CREATE INDEX name ON table(column) WHERE condition;",
          answer: `CREATE INDEX idx_pending_orders 
ON orders(status) 
WHERE status = 'Pending';`
        }
      ]
    },
    {
      id: "Q5",
      topic: "Post-Mid: MongoDB & JSONB",
      marks: 5,
      scenario: `Modern databases often deal with unstructured or NoSQL data.`,
      parts: [
        {
          label: "a",
          marks: 3,
          text: `Translate this PostgreSQL query into MongoDB's Aggregation Pipeline syntax:
\`SELECT status, COUNT(*) AS total FROM orders GROUP BY status;\``,
          hint: "Use db.collection.aggregate(). The stage you need is $group. Map _id to the status field, and use $sum for the count.",
          answer: `db.orders.aggregate([
  { 
    $group: { 
      _id: "$status", 
      total: { $sum: 1 } 
    } 
  }
]);`
        },
        {
          label: "b",
          marks: 2,
          text: `In PostgreSQL, the \`users\` table has a JSONB column named \`preferences\` which looks like this:
\`{"theme": "dark", "notifications": {"email": true, "sms": false}}\`

Write a PostgreSQL SELECT query to extract the value of the "theme" key as text from the \`preferences\` column for user_id = 1.`,
          hint: "Use the ->> operator to extract JSONB values as text.",
          answer: `SELECT preferences->>'theme' AS theme_preference
FROM users
WHERE user_id = 1;`
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
export default function ExamFinal() {
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
          Final Examination — Comprehensive Practice
        </h2>
        <div style={{ color: "#7ecfff", fontSize: 12, letterSpacing: 2, marginBottom: 36 }}>PRACTICE SET</div>

        <div style={{ display: "flex", justifyContent: "center", gap: 44, marginBottom: 36 }}>
          {[["50", "Total Marks"], ["120 min", "Duration"], ["5", "Questions"]].map(([v, l]) => (
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
        <div style={{ color: "#333", fontSize: 11, marginTop: 10 }}>120-minute timer starts immediately</div>
      </div>
    </div>
  );

  // ── Exam ───────────────────────────────────────────────────────────────────
  if (phase === "exam") return (
    <div style={{ fontFamily: "'Georgia', serif", background: "#080810", color: "#e0e0f0", minHeight: "100vh" }}>

      {/* Sticky bar */}
      <div style={{ position: "sticky", top: 0, zIndex: 50, background: "#0d0d1a", borderBottom: "1px solid #1e1e30", padding: "10px 20px", display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>CS232L Final Exam Practice</div>
          <div style={{ fontSize: 10, color: "#444" }}>50 marks · 5 questions · E-commerce DB scenario</div>
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
          <h1 style={{ color: "#fff", fontSize: 22, margin: "0 0 6px" }}>Full Answer Key — Final Exam Practice</h1>
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
            📌 Key Takeaways From This Final
          </div>
          {[
            ["PL/pgSQL Basics", "DO $$ blocks execute without storing. Variables in DECLARE, logic in BEGIN/END."],
            ["Exceptions", "Catch errors with EXCEPTION WHEN OTHERS THEN. Use RAISE EXCEPTION to manually trigger."],
            ["Procedures", "Use CREATE PROCEDURE and CALL. Procedures can COMMIT transactions unlike Functions."],
            ["Triggers", "Function returns TRIGGER, uses OLD/NEW. Bound with CREATE TRIGGER ... FOR EACH ROW EXECUTE PROCEDURE."],
            ["Materialized Views", "CREATE MATERIALIZED VIEW stores the query result physically, speeding up reads."],
            ["MongoDB Aggregation", "$match = WHERE, $group = GROUP BY, $sum = COUNT()/SUM(). Syntax is JSON-based pipeline."],
            ["JSONB", "Use ->> to extract JSON values as text in PostgreSQL queries."],
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
            ↩ Retake Final Practice
          </button>
        </div>
        <div style={{ height: 40 }} />
      </div>
    </div>
  );
}
