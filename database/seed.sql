-- ================================================================
-- NGO Donation & Impact Tracking Dashboard
-- Seed Data
-- ================================================================
USE ngo_impact_db;
-- ================================================================
-- 1. USERS
-- ================================================================
INSERT INTO users
(full_name, email, password_hash, phone_number, role)
VALUES
-- System Admin
(
    'System Administrator',
    'admin@ngohub.org',
    '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
    '9876543210',
    'SYSTEM_ADMIN'
),
-- NGO Admin 1
(
    'Hope Foundation Admin',
    'contact@hopefoundation.org',
    '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
    '9876543211',
    'NGO_ADMIN'
),
-- NGO Admin 2
(
    'Green Earth Admin',
    'info@greenearth.org',
    '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
    '9876543212',
    'NGO_ADMIN'
),
-- Donor
(
    'Demo Donor',
    'donor@example.com',
    '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
    '9876543213',
    'DONOR'
);
-- ================================================================
-- 2. NGOs
-- ================================================================
INSERT INTO ngos
(
    ngo_name,
    registration_number,
    user_id,
    description,
    website_url,
    is_verified
)
VALUES
(
    'Hope Education Foundation',
    'REG-TN-2021-0091',
    2,
    'Supporting education for underprivileged children in rural communities.',
    'https://example.org/hope-education',
    TRUE
),
(
    'Green Earth Alliance',
    'REG-TN-2022-0145',
    3,
    'Working on environmental conservation, tree planting and community awareness.',
    'https://example.org/green-earth',
    TRUE
);
-- ================================================================
-- 3. CAMPAIGNS
-- ================================================================
INSERT INTO campaigns
(
    ngo_id,
    title,
    category,
    target_amount,
    raised_amount,
    start_date,
    end_date,
    status,
    banner_image_url
)
VALUES
(
    1,
    'Digital Classrooms for Rural School Children',
    'Education',
    500000.00,
    15000.00,
    '2026-01-01',
    '2026-12-31',
    'ACTIVE',
    'https://images.unsplash.com/photo-1497633762265-9d179a990aa6'
),
(
    1,
    'Midday Meals and Nutrition Drive',
    'Healthcare',
    250000.00,
    5000.00,
    '2026-02-01',
    '2026-12-31',
    'ACTIVE',
    'https://images.unsplash.com/photo-1593113598332-cd288d649433'
),
(
    2,
    'Afforestation Drive - 50,000 Trees',
    'Environment',
    1000000.00,
    10000.00,
    '2026-03-01',
    '2026-11-30',
    'ACTIVE',
    'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09'
);
-- ================================================================
-- 4. SAMPLE DONATIONS
-- ================================================================
INSERT INTO donations
(
    campaign_id,
    donor_id,
    amount,
    razorpay_payment_id,
    razorpay_order_id,
    payment_status
)
VALUES
(
    1,
    4,
    15000.00,
    'pay_TEST_100001',
    'order_TEST_100001',
    'SUCCESS'
),
(
    2,
    4,
    5000.00,
    'pay_TEST_100002',
    'order_TEST_100002',
    'SUCCESS'
),
(
    3,
    4,
    10000.00,
    'pay_TEST_100003',
    'order_TEST_100003',
    'SUCCESS'
);
-- ================================================================
-- 5. IMPACT REPORTS
-- ================================================================
INSERT INTO impact_reports
(
    campaign_id,
    title,
    description,
    beneficiaries_impacted,
    proof_document_url
)
VALUES
(
    1,
    'Digital Classroom Phase 1 Completed',
    'Initial digital classroom equipment was provided to rural schools as part of the education campaign.',
    450,
    'https://example.org/reports/classroom-phase1.pdf'
),
(
    3,
    'Tree Plantation Phase 1 Completed',
    'The first phase of the tree plantation campaign was completed with community participation.',
    1200,
    'https://example.org/reports/tree-plantation-phase1.pdf'
);
-- ================================================================
-- 6. RECEIPTS
-- ================================================================
INSERT INTO receipts
(
    donation_id,
    receipt_number,
    pdf_download_url
)
VALUES
(
    1,
    'RCP-2026-0001',
    'https://example.org/receipts/RCP-2026-0001.pdf'
),
(
    2,
    'RCP-2026-0002',
    'https://example.org/receipts/RCP-2026-0002.pdf'
),
(
    3,
    'RCP-2026-0003',
    'https://example.org/receipts/RCP-2026-0003.pdf'
);
-- ================================================================
-- 7. NOTIFICATIONS
-- ================================================================
INSERT INTO notifications
(
    user_id,
    message,
    is_read
)
VALUES
(
    4,
    'Welcome to NGO Impact Tracking Dashboard.',
    FALSE
),
(
    2,
    'Your NGO account has been verified.',
    FALSE
),
(
    3,
    'Your NGO account has been verified.',
    FALSE
);