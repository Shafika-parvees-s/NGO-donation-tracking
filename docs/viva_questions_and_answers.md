# Capstone Viva Questions & Answers (Tanglish Guide)

This guide contains 25 high-frequency Capstone Project Viva questions with simple Tanglish (Tamil + English) answers to score top grades in your college project evaluation.

---

### Q1: What is the main objective of your Capstone Project?
**Tanglish Answer**:
"Sir, namma project title **NGO Donation & Impact Tracking Dashboard**. Namma main objective ennanu paatha, NGOs collect panra donations intha portal moolama **100% transparent** aah irukanum. Donors panra ovvoru rupee enna aachu, enna impact create pannichu nu **photographic proof & verified audit reports** moolama track panna mudiyum."

---

### Q2: Why did you choose Java Spring Boot for the backend?
**Tanglish Answer**:
"Spring Boot vandhu enterprise-grade Java framework, Sir. Idhu **Dependency Injection (DI)**, **Inversion of Control (IoC)**, and **Spring Security** support pannudhu. Node.js ah vida Java Spring Boot la multithreading, strict type checking, and production reliability high ah irukkum. Adhanaala financial transactions handling ku Spring Boot best choice."

---

### Q3: Why did you choose MySQL instead of MongoDB?
**Tanglish Answer**:
"Namma app la **donations, user accounts, Receipts, and campaign progress** lam highly structured financial data. Entity relationship (ACID properties - Atomicity, Consistency, Isolation, Durability) strictly follow pannanum. MongoDB document-based, set aagaadhu. Foreign keys & relational constraints maintain panna **MySQL 3NF normalized schema** use pannom."

---

### Q4: How does the payment gateway integration work in your app?
**Tanglish Answer**:
"Namma project la **Razorpay Test Mode (Sandbox)** integration pannirukom.
1. Frontend la donor amount enter panni 'Donate Now' click pannuvaanga.
2. Spring Boot backend REST API (`/create-order`) Razorpay SDK call panni `order_id` generate pannum.
3. Frontend Client la Razorpay Checkout popup open aagum.
4. Payment success aanadhum Razorpay `payment_id` and `signature` tharum.
5. Signature Spring Boot backend `HMAC-SHA256` hashing la verify aagi success aana, Database status 'SUCCESS' aagi, auto **80G Tax Receipt PDF** generate aagum."

---

### Q5: What is JWT Authentication and how is it used in your project?
**Tanglish Answer**:
"JWT naa **JSON Web Token**. Idhu stateless authentication mechanism.
User login pannum podhu, backend credentials verify panni encrypted JWT token sign panni tharum. Next ovvoru REST API request-ukum client intha token ah HTTP Header (`Authorization: Bearer <Token>`) la anuppuvanga. Backend Server Session state maintain panna thevai illai."

---

### Q6: How do you prevent SQL Injection attacks?
**Tanglish Answer**:
"Namma Spring Boot la **Spring Data JPA (Hibernate ORM)** use panrom. JPA query execution podhu raw SQL concatenation use pannaama **Parameterized Prepared Statements** generate pannum. So malicious SQL scripts execute aagadhungra nala SQL Injection fully prevented."

---

### Q7: What is Section 80G tax exemption in your receipt module?
**Tanglish Answer**:
"Indian Income Tax Act Section 80G padhi, registered NGOs ku donate panra donors ku 50% or 100% tax reduction kidaikkum. Donor donate pannadhum namma system **automated PDF receipt with 80G registration number** generate panni tharum."

---

### Q8: Explain 3NF Normalization in your Database.
**Tanglish Answer**:
"1NF la duplicate records eliminate pannom. 2NF la partial dependency remove pannom. 3NF la transitive dependencies remove pannom. Example: NGO details ah separate `ngos` table la potom, user details `users` table la potom. Foreign Key (`user_id`, `ngo_id`) moolam connect pannirukom."

---

### Q9: How does role-based access control (RBAC) work in your project?
**Tanglish Answer**:
"Namma system la 3 Roles irukku: **DONOR**, **NGO_ADMIN**, **SYSTEM_ADMIN**. Spring Security `@PreAuthorize("hasRole('ADMIN')")` annotation moolama admin APIs restricted aairukum. User role token la embedded ah irukum."

---

### Q10: What is CORS and how did you handle it?
**Tanglish Answer**:
"CORS naa **Cross-Origin Resource Sharing**. Frontend (port 3000 / static HTML) Backend (port 8080) connect pannum podhu browser block pannum. Spring Boot Controller la `@CrossOrigin(origins = "*")` set panni hand-shake allow pannom."

---

### Q11 to Q25: Quick Viva Key Technical Terms Summary
* **REST API**: Representational State Transfer protocol using HTTP verbs (GET, POST, PUT, DELETE).
* **DTO Pattern**: Data Transfer Object - prevents exposing raw Database Entities directly to UI.
* **ORM**: Object Relational Mapping - maps Java Classes directly to MySQL tables.
* **Bootstrap 5 & Glassmorphism**: Modern responsive CSS UI components for rich aesthetic presentation.
* **Chart.js**: JavaScript dynamic chart library for real-time NGO fundraising data visualization.
