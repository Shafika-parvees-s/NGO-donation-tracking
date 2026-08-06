/* ================================================================
   ImpactHub Core JS Application Logic
   ================================================================ */

// Mock State Data (Simulating Spring Boot REST API Responses)
const appState = {
    currentRole: 'DONOR', // DONOR, NGO, ADMIN
    campaigns: [
        {
            id: 1,
            title: "Digital Classrooms for Rural School Children",
            ngo: "Hope Education Foundation",
            category: "Education",
            target: 500000,
            raised: 320000,
            image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80",
            description: "Providing Smart TVs and internet connectivity to 10 village government schools in Salem."
        },
        {
            id: 2,
            title: "Midday Meals & Child Nutrition Drive",
            ngo: "Hope Education Foundation",
            category: "Healthcare",
            target: 250000,
            raised: 185000,
            image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=600&q=80",
            description: "Nutritious daily meals provided for 300 malnourished kids across Coimbatore slum regions."
        },
        {
            id: 3,
            title: "Afforestation Drive: 50,000 Saplings in Western Ghats",
            ngo: "Green Earth Alliance",
            category: "Environment",
            target: 1000000,
            raised: 450000,
            image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80",
            description: "Restoring native forest cover in damaged fringe areas of Western Ghats with local youth volunteers."
        }
    ],
    impactReports: [
        {
            id: 101,
            campaignTitle: "Digital Classrooms for Rural School Children",
            title: "Phase 1 Smart Classroom Setup Completed",
            impacted: "450 Students",
            proofDoc: "Phase1_Setup_Report.pdf",
            date: "2026-07-20",
            image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80",
            description: "Installed smart displays in 5 government primary schools. Attendance increased by 22%."
        },
        {
            id: 102,
            campaignTitle: "Afforestation Drive: 50,000 Saplings",
            title: "15,000 Tree Saplings Planted",
            impacted: "1,200 Acres",
            proofDoc: "Plantation_Audit_Log.pdf",
            date: "2026-06-15",
            image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80",
            description: "Phase 1 tree plantation drive completed near Nilgiris forest boundary."
        }
    ],
    donations: [
        { id: "DON-901", campaign: "Digital Classrooms for Rural School Children", amount: 15000, date: "2026-08-01", paymentId: "pay_RzpTest100001", status: "SUCCESS" },
        { id: "DON-902", campaign: "Midday Meals & Child Nutrition Drive", amount: 5000, date: "2026-07-25", paymentId: "pay_RzpTest100002", status: "SUCCESS" },
        { id: "DON-903", campaign: "Afforestation Drive: Western Ghats", amount: 10000, date: "2026-07-10", paymentId: "pay_RzpTest100003", status: "SUCCESS" }
    ]
};

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    renderCampaigns();
    renderImpactReports();
    renderDonorHistory();
    initCharts();
});

// Tab Navigation Logic
function switchTab(tabId) {
    document.querySelectorAll('.tab-pane').forEach(el => el.classList.add('d-none'));
    document.querySelectorAll('.nav-link').forEach(el => el.classList.remove('active'));

    const targetTab = document.getElementById(`tab-${tabId}`);
    if (targetTab) {
        targetTab.classList.remove('d-none');
        targetTab.classList.add('active');
    }

    const navBtn = document.getElementById(`nav-${tabId}`);
    if (navBtn) navBtn.classList.add('active');

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Multi-Role Switcher (Viva Demo Feature)
function setUserRole(role) {
    appState.currentRole = role;
    const roleDisplay = document.getElementById('current-role-display');
    const donorView = document.getElementById('view-donor-dashboard');
    const ngoView = document.getElementById('view-ngo-dashboard');
    const adminView = document.getElementById('view-admin-dashboard');

    donorView.classList.add('d-none');
    ngoView.classList.add('d-none');
    adminView.classList.add('d-none');

    if (role === 'DONOR') {
        roleDisplay.innerText = 'Donor View';
        roleDisplay.className = 'fw-bold text-accent';
        donorView.classList.remove('d-none');
    } else if (role === 'NGO') {
        roleDisplay.innerText = 'NGO Partner View';
        roleDisplay.className = 'fw-bold text-warning';
        ngoView.classList.remove('d-none');
    } else if (role === 'ADMIN') {
        roleDisplay.innerText = 'System Admin View';
        roleDisplay.className = 'fw-bold text-danger';
        adminView.classList.remove('d-none');
    }

    alert(`Role switched to ${role}. Dashboard view updated.`);
}

// Render Campaigns dynamically
function renderCampaigns() {
    const featuredContainer = document.getElementById('featured-campaigns-container');
    const allContainer = document.getElementById('all-campaigns-container');

    if (!featuredContainer || !allContainer) return;

    let html = '';
    appState.campaigns.forEach(c => {
        const percent = Math.min(100, Math.round((c.raised / c.target) * 100));
        html += `
            <div class="col-md-4">
                <div class="glass-card rounded-4 overflow-hidden h-100 campaign-card">
                    <img src="${c.image}" class="w-100" alt="${c.title}">
                    <div class="p-4 d-flex flex-column justify-content-between h-auto">
                        <div>
                            <div class="d-flex justify-content-between mb-2">
                                <span class="badge bg-accent-soft text-accent rounded-pill px-3">${c.category}</span>
                                <small class="text-muted"><i class="fa-solid fa-building-ngo me-1"></i>${c.ngo}</small>
                            </div>
                            <h5 class="fw-bold mb-2">${c.title}</h5>
                            <p class="text-muted small mb-3">${c.description}</p>
                        </div>
                        <div>
                            <div class="mb-2">
                                <div class="d-flex justify-content-between text-muted small mb-1">
                                    <span>Raised: <strong class="text-white">₹${c.raised.toLocaleString()}</strong></span>
                                    <span>Goal: ₹${c.target.toLocaleString()}</span>
                                </div>
                                <div class="progress progress-custom">
                                    <div class="progress-bar progress-bar-accent" style="width: ${percent}%"></div>
                                </div>
                                <div class="text-end text-accent small mt-1 fw-bold">${percent}% Funded</div>
                            </div>
                            <button class="btn btn-accent w-100 rounded-pill py-2 fw-semibold" onclick="openDonateModal(${c.id}, '${c.title}')">
                                <i class="fa-solid fa-heart me-1"></i> Donate Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });

    featuredContainer.innerHTML = html;
    allContainer.innerHTML = html;
}

// Render Impact Reports
function renderImpactReports() {
    const container = document.getElementById('impact-reports-container');
    if (!container) return;

    let html = '';
    appState.impactReports.forEach(r => {
        html += `
            <div class="col-md-6">
                <div class="glass-card rounded-4 p-4 h-100">
                    <div class="row g-3 align-items-center">
                        <div class="col-md-5">
                            <img src="${r.image}" class="img-fluid rounded-3" alt="Impact proof">
                        </div>
                        <div class="col-md-7">
                            <span class="badge bg-success rounded-pill px-3 py-1 mb-2"><i class="fa-solid fa-check-double me-1"></i> Verified Audit</span>
                            <h5 class="fw-bold mb-1">${r.title}</h5>
                            <p class="text-muted small mb-2">Campaign: ${r.campaignTitle}</p>
                            <div class="mb-2 small">
                                <span class="text-accent fw-bold"><i class="fa-solid fa-people-group me-1"></i> Impact: ${r.impacted}</span>
                            </div>
                            <p class="text-light-subtle small mb-3">${r.description}</p>
                            <a href="#" onclick="alert('Downloading verified PDF audit log: ${r.proofDoc}')" class="btn btn-sm btn-outline-light rounded-pill">
                                <i class="fa-solid fa-file-pdf text-danger me-1"></i> Download Audit PDF
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
}

// Render Donor History Table
function renderDonorHistory() {
    const tableBody = document.getElementById('donor-history-table');
    if (!tableBody) return;

    let html = '';
    appState.donations.forEach(d => {
        html += `
            <tr>
                <td>${d.date}</td>
                <td class="fw-semibold">${d.campaign}</td>
                <td class="text-accent fw-bold">₹${d.amount.toLocaleString()}</td>
                <td><code>${d.paymentId}</code></td>
                <td><span class="badge bg-success">SUCCESS</span></td>
                <td>
                    <button class="btn btn-sm btn-outline-accent rounded-pill" onclick="downloadReceipt('${d.id}', ${d.amount})">
                        <i class="fa-solid fa-download me-1"></i> 80G Receipt
                    </button>
                </td>
            </tr>
        `;
    });
    tableBody.innerHTML = html;
}

// Razorpay Sandbox Donation Modal Logic
function openDonateModal(campaignId, title) {
    document.getElementById('modal-campaign-id').value = campaignId;
    document.getElementById('donationModalTitle').innerText = `Donate to: ${title}`;
    const modal = new bootstrap.Modal(document.getElementById('donationModal'));
    modal.show();
}

function setDonateAmount(amt) {
    document.getElementById('custom-donation-amount').value = amt;
}

function processRazorpayPayment() {
    const amt = parseFloat(document.getElementById('custom-donation-amount').value);
    const campaignId = parseInt(document.getElementById('modal-campaign-id').value);
    const donorName = document.getElementById('donor-name-input').value;

    if (!amt || amt < 10) {
        alert("Please enter a valid donation amount!");
        return;
    }

    // Simulate Razorpay Gateway Response
    const rzpPaymentId = `pay_RzpTest${Math.floor(100000 + Math.random() * 900000)}`;
    alert(`[Razorpay Test Gateway]\nPayment Successful!\nTransaction ID: ${rzpPaymentId}\nAmount: ₹${amt}`);

    // Update Campaign Raised Amount State
    const campaign = appState.campaigns.find(c => c.id === campaignId);
    if (campaign) {
        campaign.raised += amt;
    }

    // Add to Donor History State
    const newDonation = {
        id: `DON-${Math.floor(900 + Math.random() * 100)}`,
        campaign: campaign ? campaign.title : 'NGO Campaign',
        amount: amt,
        date: new Date().toISOString().split('T')[0],
        paymentId: rzpPaymentId,
        status: 'SUCCESS'
    };
    appState.donations.unshift(newDonation);

    // Refresh UI
    renderCampaigns();
    renderDonorHistory();

    // Close Modal
    const modalEl = document.getElementById('donationModal');
    const modal = bootstrap.Modal.getInstance(modalEl);
    modal.hide();

    // Switch to Dashboard
    switchTab('dashboard');
}

// Download Receipt Handler
function downloadReceipt(donId, amt) {
    alert(`[Tax Exemption Receipt Generator]\nReceipt ID: RCP-2026-${donId}\nDonor: Surya Donor\nAmount: ₹${amt}\n80G Tax Exemption Applied.\nDownloading PDF...`);
}

// NGO Create Campaign Modal Handler
function openCreateCampaignModal() {
    const modal = new bootstrap.Modal(document.getElementById('createCampaignModal'));
    modal.show();
}

function handleCreateCampaign(e) {
    e.preventDefault();
    const title = document.getElementById('new-campaign-title').value;
    const cat = document.getElementById('new-campaign-category').value;
    const target = parseFloat(document.getElementById('new-campaign-target').value);
    const img = document.getElementById('new-campaign-image').value;

    const newCamp = {
        id: appState.campaigns.length + 1,
        title: title,
        ngo: "Hope Education Foundation",
        category: cat,
        target: target,
        raised: 0,
        image: img,
        description: "Recently submitted campaign awaiting system admin review."
    };

    appState.campaigns.push(newCamp);
    renderCampaigns();

    alert("Campaign created successfully! Submitted for Admin verification.");
    const modalEl = document.getElementById('createCampaignModal');
    const modal = bootstrap.Modal.getInstance(modalEl);
    modal.hide();
}

// Initialize Analytics Charts using Chart.js
function initCharts() {
    const ngoCtx = document.getElementById('ngoFundsChart');
    if (ngoCtx) {
        new Chart(ngoCtx, {
            type: 'bar',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
                datasets: [{
                    label: 'Monthly Donations Raised (₹)',
                    data: [45000, 62000, 85000, 110000, 95000, 140000, 185000],
                    backgroundColor: '#06b6d4',
                    borderRadius: 6
                }]
            },
            options: {
                responsive: true,
                plugins: { legend: { labels: { color: '#94a3b8' } } },
                scales: {
                    x: { ticks: { color: '#94a3b8' } },
                    y: { ticks: { color: '#94a3b8' } }
                }
            }
        });
    }

    const adminCtx = document.getElementById('adminAnalyticsChart');
    if (adminCtx) {
        new Chart(adminCtx, {
            type: 'line',
            data: {
                labels: ['Q1 2026', 'Q2 2026', 'Q3 2026', 'Q4 2026'],
                datasets: [{
                    label: 'Platform Growth (₹)',
                    data: [250000, 520000, 780000, 955000],
                    borderColor: '#3b82f6',
                    fill: true,
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                plugins: { legend: { labels: { color: '#94a3b8' } } },
                scales: {
                    x: { ticks: { color: '#94a3b8' } },
                    y: { ticks: { color: '#94a3b8' } }
                }
            }
        });
    }
}
