// KAYA Clone — Main Interactivity Script

document.addEventListener('DOMContentLoaded', () => {
  // App State
  let cart = JSON.parse(localStorage.getItem('kaya_cart')) || [];
  let wishlist = JSON.parse(localStorage.getItem('kaya_wishlist')) || [];
  let currentSlide = 0;
  const selectedSizes = {};

  // DOM Elements
  const heroSlider = document.getElementById('heroSlider');
  const newInGrid = document.getElementById('newInGrid');
  const bestsellersGrid = document.getElementById('bestsellersGrid');
  const testimonialsGrid = document.getElementById('testimonialsGrid');

  const cartDrawerBackdrop = document.getElementById('cartDrawerBackdrop');
  const cartToggleBtn = document.getElementById('cartToggleBtn');
  const closeCartBtn = document.getElementById('closeCartBtn');
  const cartBody = document.getElementById('cartBody');
  const cartSubtotalEl = document.getElementById('cartSubtotal');
  const cartBadge = document.getElementById('cartBadge');
  const wishlistBadge = document.getElementById('wishlistBadge');
  const progressBarFill = document.getElementById('progressBarFill');
  const shippingText = document.getElementById('shippingText');

  // Mobile Menu Elements
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const mobileMenuBackdrop = document.getElementById('mobileMenuBackdrop');
  const closeMobileMenu = document.getElementById('closeMobileMenu');

  // Filter Elements
  const filterTabs = document.querySelectorAll('.filter-tab');
  const searchInput = document.getElementById('searchInput');
  const mobileFilterToggle = document.getElementById('mobileFilterToggle');
  const mobileFilterContent = document.getElementById('mobileFilterContent');
  const mobileFilterOptions = document.querySelectorAll('.filter-option');

  // Initial Setup
  initHeroSlider();
  renderProducts();
  renderTestimonials();
  updateCartUI();
  updateWishlistUI();
  setupEventListeners();

  // --- Hero Slider Logic ---
  function initHeroSlider() {
    if (!heroSlider) return;

    heroSlider.innerHTML = HERO_SLIDES.map((slide, index) => `
      <div class="slide ${index === 0 ? 'active' : ''}" style="background-image: url('${slide.bgImage}');">
        <div class="slide-overlay"></div>
        <div class="slide-content">
          <span class="slide-tag">${slide.tag}</span>
          <h1 class="slide-title">${slide.title}</h1>
          <p class="slide-subtitle">${slide.subtitle}</p>
          <a href="${slide.ctaLink}" class="btn-primary">${slide.ctaText}</a>
        </div>
      </div>
    `).join('');

    // Slider controls
    document.getElementById('prevSlide')?.addEventListener('click', () => changeSlide(-1));
    document.getElementById('nextSlide')?.addEventListener('click', () => changeSlide(1));

    // Auto Advance
    setInterval(() => changeSlide(1), 5000);
  }

  function changeSlide(direction) {
    const slides = document.querySelectorAll('.slide');
    if (!slides.length) return;

    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + direction + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
  }

  // --- Render Products ---
  function renderProducts(filter = 'all', searchQuery = '') {
    const newInProds = PRODUCTS.filter(p => p.isNew);
    const bestsellerProds = PRODUCTS.filter(p => p.badge === 'BESTSELLER' || p.rating >= 4.8);

    // Apply filter
    let filteredNewIn = filter === 'all'
      ? newInProds
      : newInProds.filter(p => p.category === filter);

    let filteredBestsellers = filter === 'all'
      ? bestsellerProds
      : bestsellerProds.filter(p => p.category === filter);

    // Apply search
    if (searchQuery) {
      filteredNewIn = filteredNewIn.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      filteredBestsellers = filteredBestsellers.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (newInGrid) newInGrid.innerHTML = filteredNewIn.length > 0
      ? filteredNewIn.map(createProductCardHTML).join('')
      : '<p style="grid-column: 1/-1; text-align: center; color: var(--text-secondary);">No products found</p>';

    if (bestsellersGrid) bestsellersGrid.innerHTML = filteredBestsellers.length > 0
      ? filteredBestsellers.map(createProductCardHTML).join('')
      : '<p style="grid-column: 1/-1; text-align: center; color: var(--text-secondary);">No products found</p>';

    attachProductCardEvents();
  }

  function createProductCardHTML(p) {
    const isWishlisted = wishlist.includes(p.id);
    const selectedSize = selectedSizes[p.id] || p.sizes[0];

    return `
      <div class="product-card" data-id="${p.id}" data-category="${p.category}">
        <div class="product-image-wrap">
          ${p.discount ? `<span class="badge-discount">SAVE ${p.discount}</span>` : ''}
          ${p.badge ? `<span class="badge-status">${p.badge}</span>` : ''}
          <img src="${p.image}" alt="${p.name}" class="img-main" loading="lazy">
          <img src="${p.hoverImage}" alt="${p.name}" class="img-hover" loading="lazy">
          <button class="btn-wishlist" data-id="${p.id}">
            <i class="${isWishlisted ? 'fas' : 'far'} fa-heart"></i>
          </button>
        </div>
        <div class="product-info">
          <h3 class="product-title">${p.name}</h3>
          <div class="product-pricing">
            <span class="price-current">₹${p.price.toLocaleString()}</span>
            <span class="price-original">₹${p.originalPrice.toLocaleString()}</span>
          </div>
          <div class="size-selector">
            ${p.sizes.map(size => `
              <button class="size-btn ${size === selectedSize ? 'selected' : ''}" data-id="${p.id}" data-size="${size}">${size}</button>
            `).join('')}
          </div>
          <button class="btn-add-cart" data-id="${p.id}">ADD TO CART</button>
        </div>
      </div>
    `;
  }

  // --- Product Card Event Handlers ---
  function attachProductCardEvents() {
    // Size selection
    document.querySelectorAll('.size-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const prodId = e.target.dataset.id;
        const size = e.target.dataset.size;
        selectedSizes[prodId] = size;

        // Re-render sizes in this card
        const card = e.target.closest('.product-card');
        card.querySelectorAll('.size-btn').forEach(b => b.classList.remove('selected'));
        e.target.classList.add('selected');
      });
    });

    // Wishlist Toggle
    document.querySelectorAll('.btn-wishlist').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const prodId = e.currentTarget.dataset.id;
        toggleWishlist(prodId);
      });
    });

    // Add to Cart
    document.querySelectorAll('.btn-add-cart').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const prodId = e.target.dataset.id;
        const size = selectedSizes[prodId] || PRODUCTS.find(p => p.id === prodId).sizes[0];
        addToCart(prodId, size);
      });
    });
  }

  // --- Wishlist Logic ---
  function toggleWishlist(id) {
    if (wishlist.includes(id)) {
      wishlist = wishlist.filter(item => item !== id);
    } else {
      wishlist.push(id);
    }
    localStorage.setItem('kaya_wishlist', JSON.stringify(wishlist));
    updateWishlistUI();
    renderProducts();
  }

  function updateWishlistUI() {
    if (wishlistBadge) wishlistBadge.textContent = wishlist.length;
  }

  // --- Cart Drawer Logic ---
  function addToCart(productId, size) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const existingIndex = cart.findIndex(item => item.id === productId && item.size === size);

    if (existingIndex > -1) {
      cart[existingIndex].qty += 1;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        size: size,
        qty: 1
      });
    }

    saveCart();
    openCart();
  }

  function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
  }

  function changeQty(index, delta) {
    cart[index].qty += delta;
    if (cart[index].qty <= 0) {
      cart.splice(index, 1);
    }
    saveCart();
  }

  function saveCart() {
    localStorage.setItem('kaya_cart', JSON.stringify(cart));
    updateCartUI();
  }

  function updateCartUI() {
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

    if (cartBadge) cartBadge.textContent = totalItems;
    if (cartSubtotalEl) cartSubtotalEl.textContent = `₹${totalPrice.toLocaleString()}`;

    // Free Shipping Progress (Threshold: ₹1999)
    const threshold = 1999;
    const progress = Math.min((totalPrice / threshold) * 100, 100);
    if (progressBarFill) progressBarFill.style.width = `${progress}%`;

    if (shippingText) {
      if (totalPrice >= threshold) {
        shippingText.textContent = "🎉 You have unlocked FREE Shipping!";
      } else {
        const remaining = threshold - totalPrice;
        shippingText.textContent = `Add ₹${remaining.toLocaleString()} more to unlock FREE Shipping`;
      }
    }

    // Render Items
    if (!cartBody) return;

    if (cart.length === 0) {
      cartBody.innerHTML = `<div class="empty-cart-msg"><p>Your cart is empty.</p></div>`;
      return;
    }

    cartBody.innerHTML = cart.map((item, idx) => `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}">
        <div class="cart-item-details">
          <h4 class="cart-item-title">${item.name}</h4>
          <div class="cart-item-meta">Size: ${item.size} | ₹${item.price.toLocaleString()}</div>
          <div class="cart-item-qty">
            <button class="qty-btn" onclick="window.cartChangeQty(${idx}, -1)">-</button>
            <span>${item.qty}</span>
            <button class="qty-btn" onclick="window.cartChangeQty(${idx}, 1)">+</button>
            <button class="icon-btn" onclick="window.cartRemove(${idx})" style="margin-left:auto; color:var(--accent-red); font-size:0.9rem;">
              <i class="far fa-trash-alt"></i>
            </button>
          </div>
        </div>
      </div>
    `).join('');
  }

  // Expose cart actions globally for inline event attributes
  window.cartChangeQty = (idx, delta) => changeQty(idx, delta);
  window.cartRemove = (idx) => removeFromCart(idx);

  function openCart() {
    cartDrawerBackdrop?.classList.add('active');
  }

  function closeCart() {
    cartDrawerBackdrop?.classList.remove('active');
  }

  // --- Mobile Menu Logic ---
  function openMobileMenu() {
    mobileMenuBackdrop?.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenuFunc() {
    mobileMenuBackdrop?.classList.remove('active');
    document.body.style.overflow = '';
  }

  // --- Mobile Filter Toggle ---
  function toggleMobileFilter() {
    mobileFilterContent?.classList.toggle('active');
  }

  // --- Testimonials Render ---
  function renderTestimonials() {
    if (!testimonialsGrid) return;
    testimonialsGrid.innerHTML = REVIEWS.map(r => `
      <div class="testimonial-card">
        <div class="stars">★★★★★</div>
        <p class="testimonial-text">"${r.text}"</p>
        <div class="testimonial-author">${r.author} <span class="verified-badge">✓ Verified Buyer</span></div>
      </div>
    `).join('');
  }

  // --- General Event Listeners ---
  function setupEventListeners() {
    // Cart
    cartToggleBtn?.addEventListener('click', openCart);
    closeCartBtn?.addEventListener('click', closeCart);
    cartDrawerBackdrop?.addEventListener('click', (e) => {
      if (e.target === cartDrawerBackdrop) closeCart();
    });

    // Mobile Menu
    mobileMenuToggle?.addEventListener('click', openMobileMenu);
    closeMobileMenu?.addEventListener('click', closeMobileMenuFunc);
    mobileMenuBackdrop?.addEventListener('click', (e) => {
      if (e.target === mobileMenuBackdrop) closeMobileMenuFunc();
    });

    // Filter Tabs
    filterTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        filterTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        renderProducts(tab.dataset.filter, searchInput?.value || '');
      });
    });

    // Search Input
    searchInput?.addEventListener('input', (e) => {
      const activeFilter = document.querySelector('.filter-tab.active');
      const filter = activeFilter?.dataset.filter || 'all';
      renderProducts(filter, e.target.value);
    });

    // Mobile Filter
    mobileFilterToggle?.addEventListener('click', toggleMobileFilter);
    mobileFilterOptions.forEach(option => {
      option.addEventListener('click', () => {
        mobileFilterOptions.forEach(o => o.classList.remove('active'));
        option.classList.add('active');
        const filter = option.dataset.filter;
        renderProducts(filter, searchInput?.value || '');
        if (mobileFilterContent) mobileFilterContent.classList.remove('active');
      });
    });
  }
});
