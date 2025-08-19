# Ecommerce-fullS: MERN Stack E-commerce Application

## 📝 Project Overview

This is a robust and scalable full-stack e-commerce platform built with the MERN stack (MongoDB, Express.js, React, Node.js). The application is designed to handle online transactions securely and efficiently, offering a seamless shopping experience for users and a powerful management dashboard for administrators.

## ✨ Key Features

* **Secure User Authentication**: Implements JWT (JSON Web Token) for secure, role-based access control, ensuring that user data is protected and only authorized users can access certain features.
* **Payment Gateway Integration**: Seamlessly integrates with the Stripe API to handle transactions, processing over $10K in test payments. This includes secure webhooks to manage payment events.
* **Admin Dashboard**: A comprehensive admin panel with analytics powered by Recharts, allowing business owners to monitor sales, manage products, and gain valuable insights.
* **Product Management**: Admins can easily add, update, and remove products. The system supports detailed product listings with descriptions, images, and inventory tracking.
* **Efficient Performance**: The frontend is optimized with Redux Toolkit for efficient state management, and the backend is backed by MongoDB Atlas with optimized queries, ensuring quick response times (under 250ms).
* **Responsive UI**: The entire application is built with a responsive design, ensuring a great user experience on any device, from desktop to mobile.

## 🛠️ Tech Stack

### Frontend
* **React.js**: A JavaScript library for building the user interface.
* **Redux Toolkit**: For predictable state management and performance optimization.
* **Stripe.js**: The official Stripe library for secure payment form rendering.
* **Recharts**: A charting library used to create the data visualizations on the admin dashboard.

### Backend
* **Node.js**: A JavaScript runtime for the server-side logic.
* **Express.js**: A fast, unopinionated, minimalist web framework for Node.js.
* **MongoDB Atlas**: A cloud-based NoSQL database for storing product, user, and order data.
* **Mongoose**: An elegant MongoDB object modeling tool for Node.js.
* **JWT (JSON Web Token)**: For secure authentication and authorization.

### Other Tools & Technologies
* **Git**: For version control.
* **Postman**: For API testing and development.

## 🚀 Getting Started

Follow these steps to get a local copy of the project up and running.

### Prerequisites

* Node.js (LTS version)
* MongoDB Atlas account
* Stripe account

### Installation

1.  **Clone the repository**:
    ```bash
    git clone [https://github.com/ahmadali3009/Ecommerce-fullS.git](https://github.com/ahmadali3009/Ecommerce-fullS.git)
    cd Ecommerce-fullS
    ```

2.  **Install dependencies for both the frontend and backend**:
    ```bash
    # Install backend dependencies
    cd server
    npm install

    # Install frontend dependencies
    cd ../client
    npm install
    ```

3.  **Set up environment variables**:
    * Create a `.env` file in the `server` directory.
    * Add your MongoDB connection string and JWT secret.
    * Add your Stripe API keys.

    ```
    MONGO_URI=<Your MongoDB Atlas Connection String>
    JWT_SECRET=<Your JWT Secret>
    STRIPE_SECRET_KEY=<Your Stripe Secret Key>
    ```

4.  **Run the application**:
    ```bash
    # Start the backend server
    cd server
    npm run dev

    # In a new terminal, start the frontend
    cd ../client
    npm start
    ```

The application will now be running on `http://localhost:3000` (frontend) and `http://localhost:5000` (backend).

## 🤝 Contribution

Contributions are welcome! If you have suggestions for improvements or find any bugs, feel free to open an issue or submit a pull request.

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## 📧 Contact

**Ahmed Ali Butt**
* **Email**: `abutt3009@gmail.com`
* **LinkedIn**: https://www.linkedin.com/in/ahmedali3009/
* **Portfolio**: https://ahmedaliporfolio3009.netlify.app

Feel free to connect with me for any questions or collaborations!
