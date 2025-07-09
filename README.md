# Fashion E-commerce Project

A full-stack fashion web application built with:

* **Frontend**: [Next.js 14 (App Router)](https://nextjs.org)
* **Backend**: [Django REST Framework](https://www.django-rest-framework.org)
* **Database**: PostgreSQL (via Django ORM)
* **Styling**: SCSS / CSS Modules
* **Authentication**: Custom popup login/register with localStorage
* **Hosting**: Render (frontend + backend)

---

## Features

* Browse & filter fashion products by category, size, color, and price
* Detailed product page with add to cart
* Cart management with context API and localStorage
* User authentication (popup login/register)
* Admin panel via Django admin
* Modular folder structure for scalability

---

## Project Structure

```
NextJS-Train-Group-1/
├── BackEnd/              # Django backend (DRF)
│   ├── cart/             # Cart app
│   ├── products/         # Product app
│   ├── users/            # User auth app
│   └── core/             # Settings, urls, etc.
├── FrontEnd/             # Next.js frontend
│   ├── src/
│   │   ├── app/          # Pages (App Router)
│   │   ├── components/   # UI components
│   │   ├── context/      # React context (Cart, Auth)
│   │   └── hooks/        # Custom hooks
├── .gitignore
├── README.md
```

---

## Setup Instructions

### Backend (Django)

1. **Install dependencies:**

```bash
cd BackEnd
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
```

2. **Setup PostgreSQL** (or use SQLite for dev)

3. **Run migrations:**

```bash
python manage.py makemigrations
python manage.py migrate
```

4. **Create superuser:**

```bash
python manage.py createsuperuser
```

5. **Start server:**

```bash
python manage.py runserver
```

---

### Frontend (Next.js)

1. **Install dependencies:**

```bash
cd FrontEnd
npm install
```

2. **Run development server:**

```bash
npm run dev
```

3. **Environment Variables:**

Create `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

---

## Deployment

* Frontend and backend are deployed on [Render](https://render.com)
* Update API URLs accordingly before deploy.

---

## Notes

* Ensure CORS is enabled in Django settings.
* All forms use `POST` method.
* Static files (fonts, images) are loaded locally.

---

## Contributors

* [TrangNPD](https://github.com/Light1015/NextJS-Train-Group-1.git)
* \[TienT]
* \[MinhNG]

---

## 📄 License

This project is licensed under the MIT License.
