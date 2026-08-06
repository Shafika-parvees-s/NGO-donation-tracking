-- ================================================================
-- NGO Donation & Impact Tracking Dashboard - MySQL Schema Definition
-- Standard: 3NF Normalized Schema with Foreign Keys & Constraints
-- ================================================================

CREATE DATABASE IF NOT EXISTS ngo_impact_db;
USE ngo_impact_db;

-- 1. Users Table (Stores Donors, NGO Admins, System Admins)
CREATE TABLE IF NOT EXISTS users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(120) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    phone_number VARCHAR(15),
    role ENUM('DONOR', 'NGO_ADMIN', 'SYSTEM_ADMIN') NOT NULL DEFAULT 'DONOR',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 2. NGOs Table (Verified Non-Profit Organizations)
CREATE TABLE IF NOT EXISTS ngos (
    ngo_id INT PRIMARY KEY AUTO_INCREMENT,
    ngo_name VARCHAR(150) NOT NULL,
    registration_number VARCHAR(50) NOT NULL UNIQUE,
    user_id INT NOT NULL,
    description TEXT,
    website_url VARCHAR(255),
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- 3. Campaigns Table (Fundraising initiatives created by NGOs)
CREATE TABLE IF NOT EXISTS campaigns (
    campaign_id INT PRIMARY KEY AUTO_INCREMENT,
    ngo_id INT NOT NULL,
    title VARCHAR(200) NOT NULL,
    category VARCHAR(50) NOT NULL,
    target_amount DECIMAL(12, 2) NOT NULL,
    raised_amount DECIMAL(12, 2) DEFAULT 0.00,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    status ENUM('PENDING', 'ACTIVE', 'COMPLETED', 'REJECTED') DEFAULT 'PENDING',
    banner_image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (ngo_id) REFERENCES ngos(ngo_id) ON DELETE CASCADE
);

-- 4. Donations Table (Payment records linked to campaigns and donors)
CREATE TABLE IF NOT EXISTS donations (
    donation_id INT PRIMARY KEY AUTO_INCREMENT,
    campaign_id INT NOT NULL,
    donor_id INT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    razorpay_payment_id VARCHAR(100) NOT NULL UNIQUE,
    razorpay_order_id VARCHAR(100) NOT NULL,
    payment_status ENUM('SUCCESS', 'FAILED', 'PENDING') DEFAULT 'SUCCESS',
    donated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (campaign_id) REFERENCES campaigns(campaign_id) ON DELETE CASCADE,
    FOREIGN KEY (donor_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- 5. Impact Reports Table (Proof of fund usage uploaded by NGOs)
CREATE TABLE IF NOT EXISTS impact_reports (
    report_id INT PRIMARY KEY AUTO_INCREMENT,
    campaign_id INT NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    beneficiaries_impacted INT DEFAULT 0,
    proof_document_url VARCHAR(255),
    published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (campaign_id) REFERENCES campaigns(campaign_id) ON DELETE CASCADE
);

-- 6. Receipts Table (Automated tax receipts generated post-donation)
CREATE TABLE IF NOT EXISTS receipts (
    receipt_id INT PRIMARY KEY AUTO_INCREMENT,
    donation_id INT NOT NULL UNIQUE,
    receipt_number VARCHAR(50) NOT NULL UNIQUE,
    issued_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    pdf_download_url VARCHAR(255),
    FOREIGN KEY (donation_id) REFERENCES donations(donation_id) ON DELETE CASCADE
);

-- 7. Notifications Table (System notifications for donors and NGOs)
CREATE TABLE IF NOT EXISTS notifications (
    notification_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    message VARCHAR(255) NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Indexes for Query Performance Optimization
CREATE INDEX idx_campaign_status ON campaigns(status);
CREATE INDEX idx_donation_donor ON donations(donor_id);
CREATE INDEX idx_donation_campaign ON donations(campaign_id);
