
# 🔐 Password Management System

## 🚀 Overview

* The **Password Management System** is a secure and responsive web application that allows users to **store, manage, and audit** their passwords efficiently.
* Users can **add, edit, save, and delete** passwords along with the associated website names.
* It includes a **Security Audit** feature that shows **weak password alerts**, **reused password detection**, and **secure password storage checks**.
* The **Settings Page** allows users to **change the master password**, **toggle dark mode**, **adjust password strength settings**, and **delete their account**.
* Built with a sleek, modern interface and optimized for a smooth user experience on all devices.

---

## 👤 **Team Member**

| Name                | Role      | ID      |
| ------------------- | --------- | ------- |
| *Umme Habiba Anha*  | Developer | C231441 |
| *Meharunnasa Mukta* | Developer | C231446 |

---

## 🎯 Features

### 🔑 Home Page

* Enter **website name** and **password**.
* Save new credentials.
* Edit or delete existing credentials.

### 🛡 Security Audit Page

* Detects **weak passwords** and shows alerts.
* Flags **reused passwords** across different websites.
* Confirms if passwords are **securely stored** (e.g., hashed).

### ⚙ Settings Page

* **Change master password**.
* **Toggle dark mode** for better visibility.
* **Adjust password strength settings** (e.g., length, special characters).
* **Delete account** permanently and securely.

### 📝 Secure Notes Page
* Allows users to **store sensitive notes** securely (e.g., personal info, software keys, private thoughts).
* Supports **adding, editing, and deleting** notes easily.
* Displays all saved notes in a **clean, organized layout**.
* Each note is tied to a **unique ID** for efficient management.

### 📱 General

* **Responsive Design**: Fully optimized for both desktop and mobile devices.
* **User-Friendly UI**: Built with Tailwind CSS and React.js for a seamless experience.

---

## 🛠 Tech Stack

* **Frontend**: React.js
* **Styling**: Tailwind CSS
* **Backend**: Node.js, Express.js
* **Database**: MongoDB

---

## 🔧 Installation & Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/password-management-system.git
   cd password-management-system
   ```

2. **Install frontend dependencies**

   ```bash
   cd client
   npm install
   ```

3. **Install backend dependencies**

   ```bash
   cd ../server
   npm install
   ```

4. **Create a `.env` file** in the server folder and add your environment variables:

   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   ```

5. **Run the backend**

   ```bash
   npm start
   ```

6. **Run the frontend**

   ```bash
   cd ../client
   npm start
   ```

7. **Open in browser**
   Navigate to `http://localhost:3000/`

---

## 📌 Future Enhancements

* Add authentication with JWT and session timeout.
* Add password generation and autofill functionality.
* Enable cloud sync and backup for stored data.
* Improve Security Audit with AI-based recommendations.
* Integrate biometric or 2FA authentication.
* Add export/import feature for saved passwords.

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch.
3. Make your changes and commit them.
4. Submit a pull request.

---

Happy coding! 🔐🚀
