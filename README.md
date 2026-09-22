# PeopleDesk

PeopleDesk is an employee management system for managing users, employee forms, personal details, and service details. The project is organized as a single repository containing a Django REST API and a Next.js web application.

## Project Structure

```text
PeopleDesk/
├── api/       # Django REST API
└── web/       # Next.js frontend
```

The API and web application have separate dependency files and should be run from their own directories.

## Requirements

- Python 3.10 or newer
- Node.js 20 or newer
- npm
- PostgreSQL for the default API database configuration

## API Setup

From the repository root:

```bash
cd api
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
python manage.py migrate
python manage.py runserver
```

The API is available at `http://127.0.0.1:8000/`.

On Windows, activate the virtual environment with:

```powershell
venv\Scripts\Activate.ps1
```

### API Configuration

Edit `api/.env` with the local database credentials and application settings. The template includes:

- Django secret key and debug mode
- Allowed hosts
- PostgreSQL connection settings
- CORS and CSRF origins for the frontend

Never commit `api/.env` or production secrets.

## Web Setup

In a second terminal, from the repository root:

```bash
cd web
npm install
```

Create `web/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api/
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in a browser.

## Available Commands

Run these commands from `web/`:

```bash
npm run dev      # Start the development server
npm run lint     # Run ESLint
npm run build    # Create a production build
npm run start    # Serve the production build
```

Run these commands from `api/` with the virtual environment activated:

```bash
python manage.py check       # Check the Django configuration
python manage.py test        # Run backend tests
python manage.py makemigrations
python manage.py migrate
```

## API Routes

The main API groups are available below the `/api/` prefix:

- `/api/user/` - User management and authentication
- `/api/form/` - Employee form, personal details, and service details
- `/admin/` - Django administration

## Production Notes

Before deployment:

1. Set `DEBUG=0` and use a strong, unique `SECRET_KEY`.
2. Configure production `ALLOWED_HOSTS`, database, CORS, and CSRF origins.
3. Set the web application's `NEXT_PUBLIC_API_URL` to the deployed API URL.
4. Run `python manage.py collectstatic` from `api/`.
5. Build the web application with `npm run build` from `web/`.

## Security

Environment files, database files, media uploads, virtual environments, dependency directories, and build output are excluded by the repository `.gitignore`. Review environment variables and deployment settings before exposing the application publicly.
