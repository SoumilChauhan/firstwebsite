// Product catalog & site data for KAYA clone

const PRODUCTS = [
  {
    id: 'prod-1',
    name: 'Midnight Miles Loose Fit Joggers',
    category: 'men',
    subCategory: 'joggers',
    price: 1999,
    originalPrice: 2199,
    discount: '9% OFF',
    rating: 4.8,
    reviewsCount: 142,
    badge: 'BESTSELLER',
    sizes: ['S', 'M', 'L', 'XL'],
    image: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=600&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80',
    isNew: false
  },
  {
    id: 'prod-2',
    name: 'Culture Corner Oversized Tee',
    category: 'unisex',
    subCategory: 't-shirts',
    price: 1199,
    originalPrice: 1499,
    discount: '20% OFF',
    rating: 4.9,
    reviewsCount: 210,
    badge: 'NEW DROP',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=600&q=80',
    isNew: true
  },
  {
    id: 'prod-3',
    name: 'Urban Khaki Full Sleeve Shirt',
    category: 'men',
    subCategory: 'shirts',
    price: 1699,
    originalPrice: 1999,
    discount: '15% OFF',
    rating: 4.7,
    reviewsCount: 88,
    badge: 'POPULAR',
    sizes: ['M', 'L', 'XL'],
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=600&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80',
    isNew: true
  },
  {
    id: 'prod-4',
    name: 'Classic Loose Fit Black Joggers',
    category: 'women',
    subCategory: 'joggers',
    price: 1299,
    originalPrice: 1599,
    discount: '19% OFF',
    rating: 4.9,
    reviewsCount: 315,
    badge: 'BESTSELLER',
    sizes: ['XS', 'S', 'M', 'L'],
    image: 'https://images.unsplash.com/photo-1506629082925-23914a206ed6?auto=format&fit=crop&w=600&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80',
    isNew: false
  },
  {
    id: 'prod-5',
    name: 'Bonkers X Anushka Sen Oversized Hoodie',
    category: 'women',
    subCategory: 'hoodies',
    price: 2299,
    originalPrice: 2499,
    discount: '8% OFF',
    rating: 5.0,
    reviewsCount: 430,
    badge: 'LIMITED EDITION',
    sizes: ['S', 'M', 'L', 'XL'],
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=600&q=80',
    isNew: true
  },
  {
    id: 'prod-6',
    name: 'Shades of Winter Knit Sweater',
    category: 'unisex',
    subCategory: 'sweaters',
    price: 1499,
    originalPrice: 1799,
    discount: '17% OFF',
    rating: 4.6,
    reviewsCount: 76,
    badge: 'WINTER SPECIAL',
    sizes: ['M', 'L', 'XL'],
    image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=600&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=600&q=80',
    isNew: true
  },
  {
    id: 'prod-7',
    name: 'Vintage Wash Cargo Trousers',
    category: 'men',
    subCategory: 'cargos',
    price: 1799,
    originalPrice: 2199,
    discount: '18% OFF',
    rating: 4.8,
    reviewsCount: 198,
    badge: 'HOT',
    sizes: ['30', '32', '34', '36'],
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=600&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=600&q=80',
    isNew: false
  },
  {
    id: 'prod-8',
    name: 'Minimalist Signature Canvas Tote',
    category: 'accessories',
    subCategory: 'bags',
    price: 799,
    originalPrice: 1099,
    discount: '27% OFF',
    rating: 4.9,
    reviewsCount: 520,
    badge: 'MUST HAVE',
    sizes: ['ONE SIZE'],
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=600&q=80',
    isNew: false
  }
];

const HERO_SLIDES = [
  {
    id: 1,
    title: 'ANUSHKA SEN X KAYA',
    subtitle: 'THE EXCLUSIVE COLLAB IS HERE',
    ctaText: 'SHOP COLLECTION',
    ctaLink: '#new-in',
    bgImage: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1600&q=80',
    tag: 'LIMITED EDITION'
  },
  {
    id: 2,
    title: 'CULTURE CORNER',
    subtitle: 'INDIAN HERITAGE WITH A KAYA TWIST',
    ctaText: 'DISCOVER DROP',
    ctaLink: '#bestsellers',
    bgImage: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1600&q=80',
    tag: 'NEW ARRIVAL'
  },
  {
    id: 3,
    title: 'WINTER ESSENTIALS 2026',
    subtitle: 'OVERSIZED HOODIES & KNITWEAR',
    ctaText: 'EXPLORE NOW',
    ctaLink: '#women',
    bgImage: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1600&q=80',
    tag: 'TRENDING'
  }
];

const REVIEWS = [
  {
    id: 1,
    author: 'Tamchi Nyakum',
    text: 'It was so much worth buying than ₹1400 tees from Zara. The quality is way better and the aesthetic is on point!',
    rating: 5,
    verified: true,
    product: 'Culture Corner Oversized Tee'
  },
  {
    id: 2,
    author: 'Saumya Raj',
    text: 'I just love it. The quality is premium and XS fits perfectly. Been dying to get this oversized fit!',
    rating: 5,
    verified: true,
    product: 'Classic Loose Fit Black Joggers'
  },
  {
    id: 3,
    author: 'Ansh Jadli',
    text: 'Change your name to quality.com! I swear I loved the fabric quality so much. Thanks KAYA!',
    rating: 5,
    verified: true,
    product: 'Midnight Miles Loose Fit Joggers'
  }
];

const BLOG_POSTS = [
  {
    id: 1,
    title: 'Culture Corner: Indian Heritage Meets Streetwear',
    excerpt: 'Discover how traditional motifs and oversized luxury fits combine to create a statement drop.',
    date: 'OCT 20, 2026',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 2,
    title: 'Winter Layering Made Easy: Hoodies & Sweaters',
    excerpt: 'How to combine relaxed jeans, heavy-gsm hoodies, and boxy jackets for maximum warmth.',
    date: 'OCT 15, 2026',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 3,
    title: 'How Hip-Hop Shaped Oversized Fashion',
    excerpt: 'From street performance to high-fashion runways — the journey of boxy fits.',
    date: 'OCT 10, 2026',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80'
  }
];
