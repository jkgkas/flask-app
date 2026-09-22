# Signup/Login App (Flask + SQLite)

## Structure

    flask-app/
    ├── app.py              Flask backend (routes, SQLite, password hashing, sessions)
    ├── requirements.txt    Python dependencies
    ├── Procfile            Tells Render/Heroku-style platforms how to start the app
    ├── .gitignore          Keeps venv/, users.db, __pycache__ out of git
    ├── index.html          Signup page
    ├── login.html          Login page
    ├── welcome.html        Post-login landing page
    ├── style.css           Shared styling
    └── validation.js       Client-side validation + calls to the Flask API

## Run locally

    python -m venv venv
    source venv/bin/activate        (Windows: venv\Scripts\activate)
    pip install -r requirements.txt
    python app.py

Open http://localhost:5000 — `users.db` is created automatically on first run.

## Deploy on Render

1. Push this folder to a GitHub repo (root of the repo = this folder).
2. On render.com: New → Web Service → connect the repo.
3. Build command: `pip install -r requirements.txt`
4. Start command: `gunicorn app:app`
5. Instance type: Free
6. After it deploys, add your custom domain under Settings → Custom Domains,
   then set the DNS records Render shows you in GoDaddy's DNS management page.

## Note on data persistence

Render's free tier has an ephemeral filesystem — `users.db` resets whenever the
service redeploys or spins down from inactivity. Fine for testing/demoing, but
don't rely on it for real user data. If you outgrow this, swap the `sqlite3`
calls in `app.py` for Render's free PostgreSQL add-on, or move to a paid
instance with a persistent disk.

## Security note

Before pointing real users at this, replace the hardcoded fallback in
`app.secret_key` with a real `SECRET_KEY` environment variable, and serve only
over HTTPS (Render does this automatically once your domain is verified).
