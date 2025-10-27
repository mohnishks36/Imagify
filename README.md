# Imagify — Text to Image Generator

### [View Live Demo 🚀](https://imagify-alpha-hazel.vercel.app)

![Imagify Banner](https://user-images.githubusercontent.com/80063071/263539126-17e9903b-b27b-402b-8a8b-1e58f0a0d674.png)

## Overview

Imagify is a full-stack AI SaaS application that allows users to generate images from text prompts using the ClipDrop API. The app features secure authentication, a credit-based image generation system, payment gateway integration with Razorpay, and a modern, maintainable architecture for scalability.

---

## ✨ Features

* **AI Image Generation:** Generate high-quality images from text prompts using the ClipDrop API.
* **Secure Authentication:** JWT-based authentication with MongoDB for secure user registration, login, and session management.
* **Credit-Based System:** Users have a credit balance that is deducted for each image generation.
* **Payment Integration:** Built-in Razorpay payment gateway for users to purchase more credits.
* **Responsive Design:** Clean and responsive UI built with React.js and Tailwind CSS.
* **Scalable Backend:** Follows a clean service-controller-model architecture for maintainability.
* **Protected Routes:** Role-based authorization and protected API routes.

---

## 🛠️ Tech Stack

* **Frontend:** React.js, Tailwind CSS
* **Backend:** Node.js, Express.js
* **Database:** MongoDB
* **AI Service:** ClipDrop API
* **Payments:** Razorpay
* **Authentication:** JWT (JSON Web Tokens)
* **Hosting (Frontend):** Vercel
* **Hosting (Backend):** Render

---

## 🚀 Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

* Node.js (v18 or later recommended)
* npm (or yarn)
* MongoDB Account (for `MONGO_URI`)
* ClipDrop API Key
* Razorpay Account (for `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET`)

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/mohnishks36/Imagify](https://github.com/mohnishks36/Imagify)
    cd Imagify
    ```

2.  **Install frontend dependencies:**
    ```bash
    cd client
    npm install
    cd ..
    ```

3.  **Install backend dependencies:**
    ```bash
    cd server
    npm install
    ```

4.  **Configure environment variables:**
    Inside the `server` directory, create a `.env` file by copying the `.env.example`.
    ```bash
    cp .env.example .env
    ```
    Now, fill in the required values in your new `.env` file:
    ```ini
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_super_secret_jwt_key
    CLIPDROP_API_KEY=your_clipdrop_api_key
    RAZORPAY_KEY_ID=your_razorpay_key_id
    RAZORPAY_KEY_SECRET=your_razorpay_key_secret
    ```

5.  **Start the backend server:**
    (While still in the `server` directory)
    ```bash
    npm run start
    ```
    The backend will be running on `http://localhost:5000` (or your specified port).

6.  **Start the frontend client:**
    Open a *new terminal* and navigate to the `client` directory:
    ```bash
    cd client
    npm run dev
    ```
    The frontend will be running on `http://localhost:5173`.

---

## 📁 Folder Structure

Here is the file structure for the Imagify project:

```bash
imagify/
├── client/
│   ├── package.json
│   └── src/
│       ├── assets/
│       ├── components/
│       ├── context/
│       ├── pages/
│       ├── App.jsx
│       ├── index.css
│       └── main.jsx
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── package.json
│   ├── package-lock.json
│   ├── server.js    # Server entry point
│   └── vercel.json
└── README.md
