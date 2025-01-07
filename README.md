
# **Secret Vault App**

## **1. Introduction**
The **Secret Vault App** is a secure platform where users can register, log in, and manage their secrets privately. This app provides both manual registration and login, as well as Google OAuth authentication for ease of access. Built with modern web technologies, it ensures data security and user privacy.

### **Access the Deployed App**
Click [here](https://secret-vault-3-production.up.railway.app/) to access the live application.

---

## **2. Features**
- **Manual Registration and Login**: Users can create accounts with a username and password.
- **Google OAuth Authentication**: Allows users to log in securely using their Google accounts.
- **Secret Submission**: Users can submit personal secrets anonymously.
- **Data Encryption**: Sensitive data like passwords is securely encrypted using advanced algorithms.
- **Session Management**: Keeps users logged in across sessions for a seamless experience.

---

## **3. Technology Stack**
The app is built using the following technologies:
- **Frontend**: EJS, HTML5, CSS3
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Atlas)
- **Authentication**: Passport.js, Google OAuth2.0
- **Environment Management**: dotenv

---

## **4. How to Use**

### **I. Access the App**
- For production: Use the deployed URL [here](https://secret-vault-3-production.up.railway.app/).
- For development: Open `http://localhost:3000` in your browser.


### **II. Features Overview**
- **Home Page**: View the welcome screen.
- **Register**: Create an account by providing a username and password.
- **Login**: Log in using your credentials or Google OAuth.
- **Secrets**: View secrets submitted by other users.
- **Submit**: Add your secret (requires authentication).

---

## **5. API Endpoints**

### **Public Endpoints**
| Method | Endpoint          | Description                       |
|--------|--------------------|-----------------------------------|
| `GET`  | `/`                | Render the home page.            |
| `GET`  | `/login`           | Render the login page.           |
| `GET`  | `/register`        | Render the registration page.    |

### **Protected Endpoints**
| Method | Endpoint           | Description                              |
|--------|--------------------|------------------------------------------|
| `GET`  | `/secrets`         | View all secrets (requires authentication). |
| `GET`  | `/submit`          | Render the secret submission page.      |
| `POST` | `/submit`          | Submit a new secret.                    |

---

## **6. Contributing**
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch (`feature/your-feature`).
3. Commit your changes and submit a pull request.

---

## **7. Contact**
For any queries or feedback, feel free to reach out:
- **Email**: `umar040903@gmail.com`
- **LinkedIn**: [Mohammad Umar Shaikh](https://www.linkedin.com/in/mohammad-umar-b914a3227/)

---
