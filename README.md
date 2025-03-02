# 🛒 Eshop-Team

## 🌟 Unique Features

- 🎨 **Solid Design**: The design strikes a balance between clean aesthetics and functionality, ensuring an easy-to-use experience for both users and admins.
- 🔑 **Comprehensive User and Admin Features**: Users can register, rate products, manage wish lists, view purchase histories, and more. Admins have control over product listings and user data.

## 👤 How It Works (from a user's perspective)

### Users can:

- 🔐 Register and manage accounts
- 🔍 Browse products, filter by price or rating
- 🛍️ Add products to their cart or wish list
- 💳 Proceed with simulated purchases
- ⚙️ View and edit personal information

### Admins can:

- 🛠️ Add, edit, or delete products
- 👥 View and manage user accounts

## 🛠️ Technologies Used

### ⚙️ Backend

- 🖥️ **Express.js** for the server-side application
- 🗄️ **MySQL** with Sequelize for database management
- 🔍 **Zod** for input validation
- 🛎️ **Express Session** with MySQL store for authentication
- 📂 **Multer** for product image uploads

### 🎨 Frontend

- ⚛️ **React (with Vite)** for building the user interface
- 🏗️ **Material UI** for components
- 🎨 **Tailwind CSS** for styling
- 🎭 **Framer Motion** for animations
- 🚦 **React Router** for navigation

## 🔑 Key Features

### 👤 User Features:

- 🔐 User registration and login
- 📊 Product filtering and sorting
- 🛍️ Shopping cart functionality
- 📜 Purchase history
- ⚙️ Profile management

### 🛠️ Admin Features:

- 🏷️ Product management
- 👥 User management
- 🖼️ Product image handling

## 🚀 Setup and Installation

### 📌 Prerequisites

- ⚙️ Node.js and npm
- 🗄️ MySQL database
- 📂 Git for cloning the repository

### 🛠️ Installation Steps

1. 📥 Clone the repository:

   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. 📦 Install dependencies for both frontend and backend:

   ```bash
   # Install backend dependencies
   cd backEnd
   npm install

   # Install frontend dependencies
   cd ../frontEnd
   npm install
   ```

3. 📝 Create a `.env` file in the `backEnd` folder with the following structure:

   ```
   DB_NAME=your_database_name
   DB_USERNAME=your_database_user
   DB_PASSWORD=your_database_password
   DB_HOST=localhost
   PORT=3000
   SESSION_SECRET=your_session_secret
   ```

4. ▶️ Start the backend and frontend services:

   ```bash
   # Start backend (from backEnd directory)
   npm run dev

   # Start frontend (from frontEnd directory)
   npm run dev
   ```

5. 🌍 Access the application:
   - Frontend: http://localhost:5173
   - Backend: http://localhost:3000

## ⚠️ Usage Note

To test the admin functionality, use the following credentials:

- Email: admin@admin.com
- Password: admin123

## 🚀 Future Features & Improvements

We plan to add:

- 📦 **Order Tracking**: Allow admins to track pending and completed orders
- 🔧 **Advanced Admin Features**: Enhance product and user management
- 💳 **Payment Gateway Integration**: Implement real payments
- 🌐 **Deployment**: Host the application on a production server

## 🙌 Acknowledgments

This project provided valuable learning experiences, allowing us to explore new technologies and develop skills that will benefit us in our future careers.
