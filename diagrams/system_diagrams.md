# NGO Donation & Impact Tracking Dashboard - System Diagrams

This document contains visual architectural diagrams created in GFM Mermaid format for academic Capstone Project submission.

---

## 1. Flowchart Diagram
Visualizing the user navigation and donation payment flow.

```mermaid
flowchart TD
    A[User visits ImpactHub] --> B{Choose Action}
    B -->|Browse| C[View Active Campaigns]
    B -->|Login/Register| D[User Authentication]
    C --> E[Click Donate Now]
    E --> F[Select Donation Amount]
    F --> G[Initiate Razorpay Test Gateway]
    G --> H{Payment Status}
    H -->|Success| I[Generate 80G Tax Receipt]
    H -->|Success| J[Update Campaign Raised Amount]
    H -->|Success| K[Send Email/SMS Receipt Notification]
    H -->|Failure| L[Show Payment Failed Alert]
    I --> M[View Donor Dashboard & Impact Reports]
```

---

## 2. Use Case Diagram
Mapping user roles (Donor, NGO Admin, System Admin) to system features.

```mermaid
usecaseDiagram
    actor Donor
    actor NGOAdmin as NGO Admin
    actor SystemAdmin as System Admin

    rectangle "NGO ImpactHub System" {
        usecase UC1 as "Browse & Filter Campaigns"
        usecase UC2 as "Donate via Razorpay"
        usecase UC3 as "Download 80G Tax Receipts"
        usecase UC4 as "View Verified Impact Proof"
        usecase UC5 as "Create Fundraising Campaign"
        usecase UC6 as "Upload Impact Audit Reports"
        usecase UC7 as "Approve/Reject NGO & Campaigns"
        usecase UC8 as "View Platform Analytics"
    }

    Donor --> UC1
    Donor --> UC2
    Donor --> UC3
    Donor --> UC4

    NGOAdmin --> UC5
    NGOAdmin --> UC6
    NGOAdmin --> UC1

    SystemAdmin --> UC7
    SystemAdmin --> UC8
```

---

## 3. Activity Diagram
Process workflow when an NGO uploads an impact proof report.

```mermaid
stateDiagram-v2
    [*] --> NGOLogin : Log in to NGO Dashboard
    NGOLogin --> SelectCampaign : Choose Target Campaign
    SelectCampaign --> FillDetails : Fill Title, Beneficiaries & Proof
    FillDetails --> UploadProof : Upload Audit PDF / Photos
    UploadProof --> SaveDB : Persist Report to MySQL
    SaveDB --> NotifyDonors : Trigger System Notification to Donors
    NotifyDonors --> [*] : Display Report on Public Impact Tab
```

---

## 4. Sequence Diagram
End-to-end Razorpay payment integration sequence.

```mermaid
sequenceDiagram
    autonumber
    actor Donor
    participant Frontend as Web Client (HTML/JS)
    participant Backend as Spring Boot API
    participant Razorpay as Razorpay Gateway
    participant DB as MySQL Database

    Donor->>Frontend: Click 'Donate Now' & enter ₹1,000
    Frontend->>Backend: POST /api/v1/payments/create-order
    Backend->>Razorpay: Create Order API Request
    Razorpay-->>Backend: Return Order ID (order_10001)
    Backend-->>Frontend: Return Order ID & Key
    Frontend->>Razorpay: Launch Checkout SDK Modal
    Donor->>Razorpay: Complete Payment (Test Card/UPI)
    Razorpay-->>Frontend: Return Payment ID (pay_10001) & Signature
    Frontend->>Backend: POST /api/v1/payments/verify-signature
    Backend->>DB: Save Donation Record & Increment Campaign Fund
    Backend->>DB: Auto-generate 80G Receipt Record
    Backend-->>Frontend: Payment Verified (200 OK)
    Frontend-->>Donor: Show Success Modal & Download Receipt Button
```

---

## 5. ER Diagram (Entity-Relationship)
Database relational schema showing 3NF structure.

```mermaid
erDiagram
    USERS ||--o{ NGOS : manages
    USERS ||--o{ DONATIONS : makes
    USERS ||--o{ NOTIFICATIONS : receives
    NGOS ||--o{ CAMPAIGNS : creates
    CAMPAIGNS ||--o{ DONATIONS : receives
    CAMPAIGNS ||--o{ IMPACT_REPORTS : documents
    DONATIONS ||--|| RECEIPTS : generates

    USERS {
        int user_id PK
        string full_name
        string email UK
        string password_hash
        enum role
    }

    NGOS {
        int ngo_id PK
        string ngo_name
        string registration_number UK
        int user_id FK
        boolean is_verified
    }

    CAMPAIGNS {
        int campaign_id PK
        int ngo_id FK
        string title
        decimal target_amount
        decimal raised_amount
        enum status
    }

    DONATIONS {
        int donation_id PK
        int campaign_id FK
        int donor_id FK
        decimal amount
        string razorpay_payment_id UK
    }

    IMPACT_REPORTS {
        int report_id PK
        int campaign_id FK
        string title
        int beneficiaries_impacted
        string proof_document_url
    }

    RECEIPTS {
        int receipt_id PK
        int donation_id FK
        string receipt_number UK
        string pdf_download_url
    }
```

---

## 6. Class Diagram
Object-oriented class structure of Spring Boot backend.

```mermaid
classDiagram
    class User {
        +Long userId
        +String fullName
        +String email
        +String passwordHash
        +Role role
    }

    class Campaign {
        +Long campaignId
        +String title
        +BigDecimal targetAmount
        +BigDecimal raisedAmount
        +Status status
        +addDonation(amount)
    }

    class Donation {
        +Long donationId
        +BigDecimal amount
        +String razorpayPaymentId
        +PaymentStatus status
    }

    class CampaignService {
        +List<Campaign> getActiveCampaigns()
        +Campaign createCampaign(Campaign c)
    }

    class DonationService {
        +Donation processDonation(Donation d)
        +Receipt generateReceipt(Donation d)
    }

    CampaignService --> Campaign : manages
    DonationService --> Donation : processes
    Campaign "1" -- "*" Donation : receives
```

---

## 7. Architecture Diagram
3-Tier Enterprise Web Application Architecture.

```mermaid
graph TD
    subgraph Presentation Tier
        A[Client Web Browser - Desktop/Mobile] --> B[HTML5 / CSS3 Glassmorphism / JS ES6]
        B --> C[Bootstrap 5 & Chart.js]
    end

    subgraph Application Tier - Spring Boot Backend
        B -->|HTTPS / REST API| D[Spring Security & JWT Filter]
        D --> E[REST Controllers]
        E --> F[Service Layer]
        F --> G[Spring Data JPA Repositories]
        F --> H[Razorpay Payment Integration]
    end

    subgraph Database Tier
        G -->|JDBC Connection| I[(MySQL Database)]
    end
```

---

## 8. Deployment Diagram
AWS EC2, Nginx Reverse Proxy, and Managed Cloud Infrastructure.

```mermaid
graph LR
    User[End User / Donor] -->|HTTPS Port 443| DNS[Route 53 DNS]
    DNS --> IGW[AWS Internet Gateway]
    IGW --> Nginx[Nginx Reverse Proxy & SSL Engine]

    subgraph AWS EC2 Virtual Machine
        Nginx -->|Port 8080| Spring[Spring Boot Application Server]
        Spring -->|Port 3306| MySQL[(MySQL Relational Database)]
    end

    Spring -->|AWS SDK| S3[AWS S3 Bucket - Receipts & Proof Docs]
    Spring -->|HTTPS API| Razorpay[Razorpay Payment Gateway Server]
```
