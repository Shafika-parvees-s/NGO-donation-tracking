# CAPSTONE PROJECT REPORT

## Title: NGO Donation & Impact Tracking Dashboard
**Degree**: Bachelor of Technology (B.Tech) - Information Technology  
**Academic Year**: 2025 - 2026  

---

### ABSTRACT
Non-Governmental Organizations (NGOs) play a pivotal role in societal development; however, public donor skepticism due to lack of financial transparency remains a major barrier to fundraising. This Capstone Project presents **ImpactHub**, a full-stack, enterprise-grade web platform designed to bridge the trust gap between donors and NGOs. The platform integrates a 3-Tier architecture comprising an HTML5/CSS3 Glassmorphism responsive frontend, a Java Spring Boot REST API application tier, and a 3NF normalized MySQL database tier. Key capabilities include real-time campaign fundraising analytics powered by Chart.js, Razorpay test mode payment gateway integration, automated Section 80G tax receipt generation, role-based access control (RBAC with JWT), and verifiable photographic impact report auditing.

---

### 1. INTRODUCTION
In traditional charitable giving models, donors rarely receive updates on how their funds are deployed. ImpactHub addresses this problem by enforcing photographic and documentary proof uploads for every phase of campaign expenditure before funds are released.

### 2. PROBLEM STATEMENT
Existing NGO fundraising portals lack granular post-donation tracking. Donors cannot verify whether funds were used for designated causes or absorbed in administrative overheads.

### 3. PROPOSED SYSTEM
The proposed system introduces:
- **Direct Verification**: Admin verification for registered NGOs.
- **Transparent Impact Feeds**: Real-time impact report uploads by NGOs containing audited metrics and beneficiary photos.
- **Automated Tax Compliance**: Instant Section 80G PDF receipt generation for donors upon successful payment completion.

### 4. SYSTEM ARCHITECTURE
- **Frontend Tier**: HTML5, CSS3, JavaScript (ES6+), Bootstrap 5, Chart.js.
- **Backend Tier**: Java 17, Spring Boot 3, Spring Security, JWT, Spring Data JPA.
- **Database Tier**: MySQL 8.0 Relational Database.
- **Integrations**: Razorpay Payment SDK (Sandbox).

### 5. IMPLEMENTATION DETAILS
- **Entity Schema**: 7 core entities (`User`, `NGO`, `Campaign`, `Donation`, `ImpactReport`, `Receipt`, `Notification`).
- **REST Endpoints**: `/api/v1/auth`, `/api/v1/campaigns`, `/api/v1/donations`, `/api/v1/reports`.

### 6. TESTING & RESULTS
- **Unit Testing**: JUnit 5 & Mockito test coverage for backend service layer.
- **Security Audit**: SQL Injection prevention verified via JPA parameterized queries.
- **UI Performance**: Responsive design validated across mobile, tablet, and desktop viewports.

### 7. CONCLUSION
ImpactHub demonstrates how modern full-stack web engineering can solve trust deficit in social non-profits, delivering an intuitive user experience backed by robust architecture.
