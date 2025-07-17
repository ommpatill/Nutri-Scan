# 🧬 Nutri-Scan: Vitamin Deficiency Detection System

Nutri-Scan is an AI-powered real-time **Vitamin Deficiency Detection System** that leverages **deep learning (MobileNetV2)** to predict deficiencies from tongue images. The platform is designed with a modern, responsive web interface and includes features such as OTP-based authentication, user profiles, history tracking, result recommendations, and PDF report generation.

> 🏆 This project is published in a peer-reviewed **Institute For Engineers and Research Publication World (IFEARP World)** as part of our research on AI-based nutritional diagnostics.

---

## 📌 Features

- 🔍 **Image-Based Detection**: Predict vitamin deficiencies using deep learning (MobileNetV2).
- 🌐 **Cross-Platform Web App**: Fully responsive UI (React.js + TailwindCSS).
- 🔐 **Authentication**: Email OTP-based signup and login.
- 👤 **User Profiles**: Manage user info and health history.
- 📊 **Scan History**: View previous prediction records.
- 💡 **Health Recommendations**: Based on predicted deficiencies.

---

## 📚 Technologies Used

### 💻 Frontend
- React.js
- Tailwind CSS
- ShadCN UI

### 🔙 Backend
- Node.js / Express.js
- Flask (for prediction API)
- MongoDB Atlas
- JWT Authentication
- Nodemailer (for OTP)

### 🤖 Machine Learning
- TensorFlow / Keras
- MobileNetV2 (custom-trained)
- OpenCV & Pillow (image preprocessing)

---

## 🧪 How to Run Locally

### 1. Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/Nutri-Scan.git
cd Nutri-Scan
```

### 2. Install Frontend Dependencies
```bash
cd frontend
npm install
npm start
```
### 3. Set Up Backend
```bash
cd ../backend
npm install
npm run dev
```
### 4. Run ML Model API (Flask)
```bash
cd ../ml-api
pip install -r requirements.txt
python app.py
```
### 📄 Research Publication
#### This project is based on our published paper:
#### VITAMIN DEFICIENCY DETECTION USING MACHINE LEARNING
#### 📚 Published in: IFEARP World
#### 📅 Date: May 2025

## 👨‍💻 Author
### [Om Patil](https://github.com/ommpatill)
B.E. Information Technology ([VIIT, Pune](https://viit.ac.in))

[GitHub](https://github.com/ommpatill) | [LinkedIn](https://linkedin.com/in/ompatill) | [Instagram](https://instagram.com/ommpatil.__)


## 📜 License

This repository is licensed for personal, academic, and demonstrative use only.

You are free to:
- View, use, and learn from the code
- Fork the repository for educational purposes
- Modify the code for private or academic use

You are **not allowed to**:
- Sell, sublicense, or distribute this code as-is
- Use it in commercial or production systems without permission

© 2025 Om Patil. All rights reserved.

