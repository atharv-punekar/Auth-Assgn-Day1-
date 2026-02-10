## 📌 Project Overview

This project demonstrates a full authentication flow:

### ✔ **User Registration**

* Accepts `username` + `password`
* Hashes password using **bcrypt**
* Stores user inside **in-memory DB**

### ✔ **User Login (Step 1)**

* Validates username
* Compares password with hashed password
* Generates a **6-digit OTP**
* Stores OTP temporarily
* Sends OTP (simulated in console)

### ✔ **OTP Verification (Step 2)**

* Confirms OTP correctness
* Finalizes login
* Clears OTP (one-time use)

### ✔ **Frontend UI**

* Simple HTML + Fetch API UI
* Register → Login → Verify OTP flow

---

# 🧱 Project Structure

```
minimal-auth/
 └── src/
      ├── routes/
      │     └── auth.js
      ├── utils/
      │     └── otp.js
      └── server.js
 └── public/
      └── index.html
```

### **server.js**

Main server file. Loads Express, parses JSON, serves static UI, and mounts authentication routes.

### **routes/auth.js**

Contains all authentication routes:

* POST `/auth/register`
* POST `/auth/login`
* POST `/auth/verify-otp`

### **utils/otp.js**

Generates a random 6-digit OTP.

### **public/index.html**

Minimal UI for registering, logging in, and verifying OTP.

---

# 🔐 How Authentication Works

## 1️⃣ Registration Flow

* User enters username + password.
* Password is hashed with **bcrypt** using:

  ```js
  bcrypt.hash(password, 10)
  ```
* Hashed password stored as:

  ```js
  users[username] = { hash: '...' }
  ```

## 2️⃣ Login Flow

* User enters username + password.
* Server validates username.
* Password is compared using:

  ```js
  bcrypt.compare(plain, hash)
  ```
* If correct → OTP generated.
* OTP saved to user object.
* OTP printed in backend console (simulated SMS).

## 3️⃣ OTP Verification

* User enters username + OTP.
* Server checks if OTP matches.
* OTP is cleared after use.
* Login successful.

---

# 🚀 Running the Project

## 📌 1. Install dependencies

```bash
npm install
```

## 📌 2. Start the server

```bash
node src/server.js
```

If successful:

```
Server running at http://localhost:3000
```

## 📌 3. Open the UI

Visit:

```
http://localhost:3000/index.html
```

---

# 💻 Testing the Authentication Flow

## 🟦 Step 1: Register

Enter username + password → click **Register**

Expected:

```
User registered
```

Backend logs:

```
Current Users DB: { yourUser: { hash: "...bcryptHash..." } }
```

---

## 🟩 Step 2: Login

Enter username + password → click **Login**

Expected:

```
OTP sent to your device
```

Backend prints something like:

```
Generated OTP: 482913
```

---

## 🟧 Step 3: Verify OTP

Enter *same username* + OTP → click **Verify**

Expected:

```
Login Successful
```


