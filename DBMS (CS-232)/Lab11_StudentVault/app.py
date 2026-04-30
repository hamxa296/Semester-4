from flask import Flask, render_template, request, redirect, url_for, flash
from werkzeug.utils import secure_filename
import psycopg2
import os

app = Flask(__name__)
app.secret_key = "student_vault_secret" # Needed for flashing
app.config['UPLOAD_FOLDER'] = 'static/uploads'

# Admin password (lab-level)
ADMIN_PASSWORD = "Pgadmin4"

# DB connection
def get_db_connection():
    return psycopg2.connect(
        host="localhost",
        database="lab11(student vault)",
        user="postgres",
        password="16yearsnow"
    )

# ---------------- ROUTES ----------------

# Home (landing page)
@app.route('/')
def index():
    return render_template('index.html')

# About Us page
@app.route('/about')
def about():
    return render_template('about.html')

# Add student
@app.route('/add', methods=['GET', 'POST'])
def add():
    if request.method == 'POST':
        name = request.form.get('name')
        major = request.form.get('major')
        age = request.form.get('age')
        file = request.files.get('profile_image')

        if not name or not major or not age or not file:
            flash("All fields are required!", "error")
            return redirect(url_for('add'))

        if file and file.filename != '':
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

            try:
                conn = get_db_connection()
                cur = conn.cursor()
                cur.execute(
                    "INSERT INTO profiles (name, major, age, image_filename) VALUES (%s, %s, %s, %s)",
                    (name, major, age, filename)
                )
                conn.commit()
                cur.close()
                conn.close()
                flash("Student profile registered successfully!", "success")
                return redirect(url_for('students'))
            except Exception as e:
                flash(f"Database error: {e}", "error")
                return redirect(url_for('add'))

    return render_template('add_profile.html')

# View students (NO age) with Search functionality
@app.route('/students')
def students():
    search_query = request.args.get('search', '')
    conn = get_db_connection()
    cur = conn.cursor()
    
    if search_query:
        # Search by name or major (case-insensitive)
        cur.execute(
            "SELECT id, name, major, image_filename FROM profiles WHERE name ILIKE %s OR major ILIKE %s",
            (f'%{search_query}%', f'%{search_query}%')
        )
    else:
        cur.execute("SELECT id, name, major, image_filename FROM profiles")
        
    data = cur.fetchall()
    cur.close()
    conn.close()

    return render_template('students.html', students=data)

# Admin login
@app.route('/admin', methods=['GET', 'POST'])
def admin():
    if request.method == 'POST':
        password = request.form.get('password')
        if password == ADMIN_PASSWORD:
            try:
                conn = get_db_connection()
                cur = conn.cursor()
                cur.execute("SELECT * FROM profiles ORDER BY created_at DESC")
                data = cur.fetchall()
                cur.close()
                conn.close()
                return render_template('admin.html', students=data)
            except Exception as e:
                return render_template('admin_login.html', error=f"Database error: {e}")
        else:
            return render_template('admin_login.html', error="Invalid Master Password")

    return render_template('admin_login.html')

# Run
if __name__ == "__main__":
    os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
    app.run(debug=True)
