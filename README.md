# NGO Donation & Impact Tracking Dashboard (ImpactHub)
> **B.Tech Information Technology Capstone Project**  
> *A 3-Tier Enterprise Web Application for Transparent NGO Fundraising, Real-time Donation Analytics, and Verified Photographic Impact Tracking.*

---

## 🚀 Key Highlights & Features
- **Donor Portal**: Browse verified campaigns, donate seamlessly via Razorpay Sandbox, download automated Section 80G tax exemption PDF receipts.
- **NGO Console**: Create fundraising campaigns, upload photographic audit proof & milestone impact reports.
- **Admin Command Center**: Verify NGO applications, approve pending campaigns, view platform-wide fundraising analytics via Chart.js.
- **Role Switcher**: Integrated multi-role switcher for live Capstone project evaluation & viva demonstration.

---

## 🛠️ Technology Stack
- **Frontend**: HTML5, CSS3 Glassmorphism, JavaScript (ES6+), Bootstrap 5, Chart.js.
- **Backend**: Java 17, Spring Boot 3.1, Spring Security, JWT (JSON Web Tokens), Spring Data JPA.
- **Database**: MySQL 8.0 (3NF Normalized Relational Schema).
- **Payment Gateway**: Razorpay Test Sandbox SDK.
- **Hosting / Infra**: AWS EC2 Ubuntu 22.04 LTS, Nginx Reverse Proxy, Let's Encrypt SSL.

---

## 📂 Project Folder Structure
```
NGO-Donation-Dashboard/
├── frontend/             # HTML5, CSS3 Glassmorphic UI, app.js logic
├── backend/              # Java Spring Boot REST API application
├── database/             # schema.sql and seed.sql MySQL scripts
├── diagrams/             # System diagrams (Mermaid format)
├── docs/                 # Project Report, Viva Q&A, Deployment Guide
├── .gitignore
└── README.md
```

---

## ⚡ Quick Start Guide (Local Setup)

### 1. Database Setup
```bash
mysql -u root -p < database/schema.sql
mysql -u root -p < database/seed.sql
```

### 2. Backend Setup
```bash
cd backend
./mvnw spring-boot:run
# Server runs on http://localhost:8080
```

### 3. Frontend Setup
Open `frontend/index.html` directly in your browser or run a simple local web server:
```bash
npx serve frontend
# Web application available on http://localhost:3000
```
