# Bonkers Corner — E-Commerce Streetwear Website

A modern, responsive e-commerce web application inspired by **Bonkers Corner** (unisex luxury streetwear brand). Features high-impact visuals, dynamic product carousels, mega-menu navigation, and an interactive slide-out cart.

---

## 🚀 Features

- **Announcement Marquee**: Dynamic promo ticker with code announcements.
- **Sticky Navigation**: Header with mega-menu dropdowns, brand search, wishlist, and slide-out cart triggers.
- **Hero Slider**: Full-width interactive banner carousel showcasing major campaign drops.
- **Category Grid Showcase**: Quick visual access to Men's, Women's, and Unisex collections.
- **Product Grids & Carousels**:
  - **New In**: Latest streetwear drops.
  - **Best Sellers**: Top-selling products.
  - Product Cards featuring image zoom, price badges (e.g., *Save 15%*), original vs discounted prices, size selectors, and quick **Add to Cart**.
- **Product Filtering**: Filter by category (Women, Men, Unisex, Accessories) and search by name.
- **Mobile Menu**: Slide-out responsive navigation for mobile devices.
- **Mobile Filter Bar**: Touch-friendly category filter on mobile.
- **Side Slide-out Cart**: Live cart preview, item quantity modifier, order note field, free-shipping threshold indicator, and checkout button.
- **Blog Page**: Dedicated blog with category filters, load-more pagination, and stylish card layout.
- **Responsive Layout**: Pixel-perfect layout for mobile, tablet, and desktop.
- **Brand Highlights & USPs**: Shipping terms, 100% Made in India badges, quality guarantees.
- **Customer Testimonials**: Reviews section showcasing feedback.
- **Newsletter Signup**: Email capture form in footer and blog page.

---

## 📂 Project Structure

```
.
├── index.html              # Main homepage
├── blog.html               # Blog page
├── css/
│   ├── style.css           # Complete site stylesheet & responsive design
│   └── blog.css            # Blog-specific styles
├── js/
│   ├── data.js             # Product catalog, blog posts, hero banners, reviews
│   ├── app.js              # Homepage interactivity (slider, cart, filters, mobile menu)
│   └── blog.js             # Blog page interactivity (filters, load-more)
├── assets/
│   └── images/             # Product images and banner visual assets
└── README.md               # Project documentation
```

---

## 💻 Quick Start

### Run via Local Server
```bash
# Using Python
python3 -m http.server 8000

# Open in browser: http://localhost:8000
```

Or simply open `index.html` directly in your browser.

---

## 🛠 Tech Stack

- **HTML5**: Semantic tags & accessible structure.
- **CSS3**: Custom CSS variables, Flexbox, Grid, keyframe animations, backdrop-filter.
- **JavaScript (ES6+)**: Vanilla JS DOM manipulation, LocalStorage persistence, state management.

---

## 🔧 Customization Guide

### Adding Products
Edit `js/data.js` and add new entries to the `PRODUCTS` array:
```javascript
{
  id: 'prod-X',
  name: 'Product Name',
  category: 'women | men | unisex | accessories',
  subCategory: 'category-slug',
  price: 1499,
  originalPrice: 1999,
  discount: '25% OFF',
  rating: 4.8,
  reviewsCount: 150,
  badge: 'NEW DROP',
  sizes: ['S', 'M', 'L', 'XL'],
  image: 'path/to/image.jpg',
  hoverImage: 'path/to/hover-image.jpg',
  isNew: true
}
```

### Adding Blog Posts
Edit `js/blog.js` and add new entries to the `BLOG_POSTS` array:
```javascript
{
  id: 1,
  title: 'Blog Post Title',
  excerpt: 'Short description of the post...',
  category: 'trending | style-guide | news | culture',
  date: 'Oct 20, 2026',
  readTime: '5 min read',
  image: 'path/to/image.jpg'
}
```

### Changing Colors
Edit `css/style.css` and modify the CSS variables at the top:
```css
:root {
  --accent-yellow: #ffeb3b; /* Change this */
  --accent-red: #ff3333;
  --bg-primary: #0a0a0a;
  /* etc. */
}
```

---

## 📝 License

MIT License — free to extend and modify.
# firstwebsite
