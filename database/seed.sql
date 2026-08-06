-- ================================================================
-- NGO Donation & Impact Tracking Dashboard - Seed Data Script
-- ================================================================

USE ngo_impact_db;

-- 1. Insert Initial Users
INSERT INTO users (full_name, email, password_hash, phone_number, role) VALUES
('System Administrator', 'admin@ngohub.org', '$2a$10$e7W...adminHashPass', '9876543210', 'SYSTEM_ADMIN'),
('Hope Foundation Admin', 'contact@hopefoundation.org', '$2a$10$f8X...ngoHashPass', '9876543211', 'NGO_ADMIN'),
('Green Earth Admin', 'info@greenearth.org', '$2a$10$g9Y...ngoHashPass', '9876543212', 'NGO_ADMIN'),
('Surya Donor', 'surya.donor@gmail.com', '$2a$10$h0Z...donorHashPass', '9876543213', 'DONOR');

-- 2. Insert NGOs
INSERT INTO ngos (ngo_name, registration_number, user_id, description, website_url, is_verified) VALUES
('Hope Education Foundation', 'REG-TN-2021-0091', 2, 'Dedicated to supporting education for underprivileged children in rural Tamil Nadu.', 'https://hopefoundation.org', TRUE),
('Green Earth Alliance', 'REG-TN-2022-0145', 3, 'Environmental conservation, tree planting drives, and clean ocean initiatives.', 'https://greenearth.org', TRUE);

-- 3. Insert Campaigns
INSERT INTO campaigns (ngo_id, title, category, target_amount, raised_amount, start_date, end_date, status, banner_image_url) VALUES
(1, 'Digital Classrooms for Rural School Children', 'Education', 500000.00, 320000.00, '2026-01-01', '2026-12-31', 'ACTIVE', 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6'),
(1, 'Midday Meals & Nutrition Drive', 'Healthcare', 250000.00, 185000.00, '2026-02-01', '2026-08-31', 'ACTIVE', 'https://images.unsplash.com/photo-1593113598332-cd288d649433'),
(2, 'Afforestation Drive: 50,000 Trees in Western Ghats', 'Environment', 1000000.00, 450000.00, '2026-03-01', '2026-11-30', 'ACTIVE', 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09');

-- 4. Insert Sample Donations
INSERT INTO donations (campaign_id, donor_id, amount, razorpay_payment_id, razorpay_order_id, payment_status) VALUES
(1, 4, 15000.00, 'pay_RzpTest100001', 'order_RzpOrder100001', 'SUCCESS'),
(2, 4, 5000.00, 'pay_RzpTest100002', 'order_RzpOrder100002', 'SUCCESS'),
(3, 4, 10000.00, 'pay_RzpTest100003', 'order_RzpOrder100003', 'SUCCESS');

-- 5. Insert Impact Reports
INSERT INTO impact_reports (campaign_id, title, description, beneficiaries_impacted, proof_document_url) VALUES
(1, 'Phase 1 Classroom Setup Completed', 'Successfully installed 10 Smart TVs and Internet routers in 5 village government schools near Salem.', 450, 'https://ngo-impact-bucket.s3.amazonaws.com/reports/phase1_report.pdf'),
(3, '15,000 Tree Saplings Planted', 'Planted indigenous trees in degraded forest fringe areas with community support.', 1200, 'https://ngo-impact-bucket.s3.amazonaws.com/reports/tree_drive_phase1.pdf');

-- 6. Insert Receipts
INSERT INTO receipts (donation_id, receipt_number, pdf_download_url) VALUES
(1, 'RCP-2026-0001', 'https://ngo-impact-bucket.s3.amazonaws.com/receipts/RCP-2026-0001.pdf'),
(2, 'RCP-2026-0002', 'https://ngo-impact-bucket.s3.amazonaws.com/receipts/RCP-2026-0002.pdf'),
(3, 'RCP-2026-0003', 'https://ngo-impact-bucket.s3.amazonaws.com/receipts/RCP-2026-0003.pdf');
