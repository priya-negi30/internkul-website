# Admin panel & API connection

The website and admin panel now run entirely on the Internkul Laravel API (`internkul-api`).
Nothing is stored in the browser except the login token and the student's display profile.

## 1. Start the API
```bash
cd internkul-api
php artisan migrate --seed     # prints the admin password once
php artisan serve              # http://localhost:8000
```

## 2. Start the website
```bash
cd internkul-page-trial-main
npm install
cp .env.example .env.local     # NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api/v1
npm run dev                    # http://localhost:3000
```
Start the API **before** `npm run build`, because the public pages are pre-rendered from API data.

## 3. Sign in
Open `/login` and use the admin email/password from the seeder (`admin@internkul.com` by default).

## What is connected
| Area | Endpoint(s) |
|---|---|
| Login / logout / session check | `POST /auth/login`, `POST /auth/logout`, `GET /auth/me` |
| Public courses, batches, domains | `GET /tracks`, `/tracks/{slug}`, `/batches`, `/domains` |
| Certificate verification | `GET /credentials/verify/{id}` |
| Student registration form | `POST /students/register` |
| Contact form | `POST /inquiries/contact` |
| College inquiry form | `POST /inquiries/college` |
| Admin dashboard | `GET /admin/dashboard` |
| Admin courses (create / edit / delete) | `/admin/tracks` |
| Admin batch schedules | `/admin/batches` |
| Admin students / inquiries / credentials | `/admin/students`, `/admin/inquiries`, `/admin/credentials` |

Frontend code: `lib/api/` (client, `http.ts`, `auth.ts`, `admin.ts`, `forms.ts`), `context/AuthContext.tsx`, `context/CourseContext.tsx`.

## Notes
* Courses with status **Draft** are only visible in the admin panel; **Active** courses appear on the website.
* An expired or invalid admin token signs the user out automatically.
* Scheduled batch ids are numeric (`"12"`), assigned by the API.
* Domains and batch time slots are managed through the API (`/admin/domains`, `/admin/batch-timings`); the admin UI lists and edits scheduled batches but does not yet have screens for those two.
* The Google sign-in button on the register form is still a mock.
