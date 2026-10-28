// Bonkers Corner — Profile Page Script

document.addEventListener('DOMContentLoaded', () => {
  const userName = document.getElementById('userName');
  const userEmail = document.getElementById('userEmail');
  const joinDate = document.getElementById('joinDate');
  const totalOrders = document.getElementById('totalOrders');
  const totalSpent = document.getElementById('totalSpent');
  const pointsEarned = document.getElementById('pointsEarned');
  const ordersList = document.getElementById('ordersList');
  const logoutBtn = document.getElementById('logoutBtn');

  // Check authentication
  if (!apiAuth.isAuthenticated()) {
    window.location.href = 'login.html';
    return;
  }

  // Load user profile
  loadUserProfile();
  loadOrderHistory();
  updateStats();

  // Mobile menu
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const mobileMenuBackdrop = document.getElementById('mobileMenuBackdrop');
  const closeMobileMenu = document.getElementById('closeMobileMenu');

  mobileMenuToggle?.addEventListener('click', () => {
    mobileMenuBackdrop?.classList.add('active');
    document.body.style.overflow = 'hidden';
  });

  closeMobileMenu?.addEventListener('click', closeMobileMenuFn);
  mobileMenuBackdrop?.addEventListener('click', (e) => {
    if (e.target === mobileMenuBackdrop) closeMobileMenuFn();
  });

  function closeMobileMenuFn() {
    mobileMenuBackdrop?.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Load user profile from API
  async function loadUserProfile() {
    const user = apiAuth.getCurrentUser();
    if (user) {
      userName.textContent = user.name || 'User';
      userEmail.textContent = user.email || '';

      // Simulate join date (in production, get from API)
      const createdAt = new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000);
      joinDate.textContent = createdAt.toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short'
      });
    }
  }

  // Load order history
  async function loadOrderHistory() {
    ordersList.innerHTML = `
      <div class="loading-state">
        <i class="fas fa-spinner fa-spin"></i>
        <p>Loading your orders...</p>
      </div>
    `;

    const orders = await apiOrders.getOrders();

    if (orders.length === 0) {
      ordersList.innerHTML = `
        <div class="empty-orders">
          <i class="fas fa-box-open"></i>
          <p>No orders yet. Start shopping to see your orders here!</p>
          <a href="index.html" class="btn-primary" style="margin-top: 20px; display: inline-block;">
            SHOP NOW
          </a>
        </div>
      `;
      return;
    }

    ordersList.innerHTML = orders.map(order => `
      <div class="order-card">
        <div class="order-header">
          <div>
            <div class="order-id"><strong>Order #${order.id.slice(-8).toUpperCase()}</strong></div>
            <div class="order-date">${new Date(order.created_at).toLocaleDateString('en-IN', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })}</div>
          </div>
          <span class="order-status status-${order.status}">${order.status}</span>
        </div>
        <div class="order-items">
          ${(order.items || []).map(item => `
            <span class="order-item">${item.name} x${item.qty}</span>
          `).join('')}
        </div>
        <div class="order-total">
          Total: ₹${order.total?.toLocaleString() || '0'}
        </div>
      </div>
    `).join('');
  }

  // Update stats
  async function updateStats() {
    const orders = await apiOrders.getOrders();
    const totalSpentAmount = orders.reduce((sum, order) => sum + (order.total || 0), 0);

    totalOrders.textContent = orders.length;
    totalSpent.textContent = `₹${totalSpentAmount.toLocaleString()}`;
    pointsEarned.textContent = Math.floor(totalSpentAmount / 100); // 1 point per ₹100
  }

  // Logout handler
  logoutBtn?.addEventListener('click', () => {
    if (confirm('Are you sure you want to logout?')) {
      apiAuth.logout();
    }
  });
});
