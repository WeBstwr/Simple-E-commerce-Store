# Simple E-commerce Store

A full-stack e-commerce web application built with React, Zustand, Formik, Node.js, Express, Prisma, PostgreSQL, and Multer. Features user and admin roles, product management, image uploads, cart, and persistent authentication.

---

## 🚀 Features
- User registration, login, and persistent authentication (JWT + cookies)
- Admin and user roles with protected routes
- Product management (add, edit, delete) for admins
- Product image upload (Multer, Express static serving)
- Dynamic shop with category filtering (Apparels, T-shirts, Sunglasses)
- Shopping cart with backend persistence
- Profile management (edit info, change password, delete account)
- Admin user management (view, add, edit, delete users)
- Toast notifications for user feedback
- Responsive design

---

## 🛠️ Tech Stack
- **Frontend:** React, Zustand, Formik, react-simple-toasts
- **Backend:** Node.js, Express, Prisma ORM, PostgreSQL, Multer
- **Authentication:** JWT, cookies
- **Styling:** CSS modules, custom CSS

---

## 📁 Project Structure
```
Simple E-commerce Store/
├── client/      # React frontend
├── server/      # Node.js/Express backend
├── README.md    # Project documentation
```

---

## ⚙️ Setup Instructions

### 1. Clone the repository
```
git clone <https://github.com/WeBstwr/Simple-E-commerce-Store>
cd Simple-E-commerce-Store
```

### 2. Backend Setup
```
cd server
npm install
# Set up your .env file with DATABASE_URL and JWT_SECRET
npx prisma migrate deploy
npm run dev
```

### 3. Frontend Setup
```
cd ../client
npm install
npm run dev
```

- Frontend runs on `http://localhost:5173`
- Backend runs on `http://localhost:3000`

---

## 📝 Usage
- Register as a user or admin
- Browse products, add to cart, and checkout
- Admins can add/edit/delete products and users
- Profile management for all users
- Product images are uploaded and served from the backend

---

## 🔒 Environment Variables
Create a `.env` file in the `server/` directory with:
```
DATABASE_URL=postgresql://<user>:<password>@localhost:5432/<dbname>
JWT_SECRET=your_jwt_secret
```

---

---

## 🤝 Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## 📄 License
This project is for educational purposes as part of the CodeAlpha internship.

---

## 🙏 Credits
- Built by Webster Ifedha

---

## 📬 Contact
- [https://www.linkedin.com/in/webster-safala-9147a2245/] 