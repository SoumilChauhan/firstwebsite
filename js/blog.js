// Bonkers Corner — Blog Page Script

document.addEventListener('DOMContentLoaded', () => {
  const blogGrid = document.getElementById('blogGrid');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const loadMoreBtn = document.getElementById('loadMoreBtn');

  // Blog posts data
  const BLOG_POSTS = [
    {
      id: 1,
      title: 'Culture Corner: Indian Heritage Meets Streetwear',
      excerpt: 'Discover how traditional Indian motifs and craftsmanship merge with modern oversized silhouettes in our latest collection.',
      category: 'culture',
      date: 'Oct 20, 2026',
      readTime: '5 min read',
      image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 2,
      title: 'Winter Layering Guide: Hoodies, Knits & Coats',
      excerpt: 'Master the art of cold-weather streetwear. From heavyweight GSM hoodies to boxy jackets, here\'s how to stay warm without sacrificing style.',
      category: 'style-guide',
      date: 'Oct 15, 2026',
      readTime: '7 min read',
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 3,
      title: 'How Hip-Hop Shaped Oversized Fashion Forever',
      excerpt: 'From Bronx block parties to global runways — trace the evolution of boxy fits and their cultural impact on modern streetwear.',
      category: 'culture',
      date: 'Oct 10, 2026',
      readTime: '6 min read',
      image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 4,
      title: 'Bonkers X Anushka Sen: The Collaboration',
      excerpt: 'Behind the scenes of our most ambitious drop yet. Meet the talent and discover the creative vision behind every piece.',
      category: 'news',
      date: 'Oct 5, 2026',
      readTime: '4 min read',
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 5,
      title: 'Cargo Pants Styling: 5 Outfit Formulas',
      excerpt: 'Cargos are having a moment. Learn how to style them for casual days, date nights, and everything in between.',
      category: 'style-guide',
      date: 'Oct 1, 2026',
      readTime: '8 min read',
      image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 6,
      title: 'The Rise of Indian Streetwear Brands',
      excerpt: 'Why homegrown labels are dominating the conversation and how they\'re redefining luxury fashion in India.',
      category: 'trending',
      date: 'Sep 25, 2026',
      readTime: '5 min read',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 7,
      title: 'Sustainable Fashion: Our Commitment to India',
      excerpt: 'From organic cotton sourcing to ethical manufacturing — inside look at how we produce 100% Made in India streetwear sustainably.',
      category: 'news',
      date: 'Sep 20, 2026',
      readTime: '6 min read',
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 8,
      title: 'Accessories That Complete Your Look',
      excerpt: 'Bags, caps, and bag charms — discover the statement pieces that elevate any streetwear outfit from good to iconic.',
      category: 'style-guide',
      date: 'Sep 15, 2026',
      readTime: '4 min read',
      image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 9,
      title: 'Festival Season Fashion: What to Wear',
      excerpt: 'Concerts, cultural gatherings, and weekend adventures — get styled for every festival moment with these go-to outfits.',
      category: 'trending',
      date: 'Sep 10, 2026',
      readTime: '5 min read',
      image: 'https://images.unsplash.com/photo-1506629082925-23914a206ed6?auto=format&fit=crop&w=600&q=80'
    }
  ];

  let currentFilter = 'all';
  let displayedPosts = 6;

  // Render blog posts
  function renderPosts(filter = 'all', limit = 6) {
    let filtered = filter === 'all'
      ? BLOG_POSTS
      : BLOG_POSTS.filter(post => post.category === filter);

    const postsToDisplay = filtered.slice(0, limit);

    blogGrid.innerHTML = postsToDisplay.map(post => `
      <article class="blog-card" data-category="${post.category}">
        <div class="blog-card-image">
          <img src="${post.image}" alt="${post.title}" loading="lazy">
          <span class="blog-card-category">${post.category.replace('-', ' ')}</span>
        </div>
        <div class="blog-card-content">
          <div class="blog-card-meta">
            <span><i class="far fa-calendar"></i> ${post.date}</span>
            <span><i class="far fa-clock"></i> ${post.readTime}</span>
          </div>
          <h3 class="blog-card-title">${post.title}</h3>
          <p class="blog-card-excerpt">${post.excerpt}</p>
          <a href="#" class="blog-card-link">READ MORE <i class="fas fa-arrow-right"></i></a>
        </div>
      </article>
    `).join('');

    // Show/hide load more button
    if (loadMoreBtn) {
      loadMoreBtn.style.display = limit >= filtered.length ? 'none' : 'inline-block';
    }
  }

  // Filter click handlers
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      currentFilter = btn.dataset.category;
      displayedPosts = 6;
      renderPosts(currentFilter, displayedPosts);
    });
  });

  // Load more handler
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
      displayedPosts += 3;
      renderPosts(currentFilter, displayedPosts);
    });
  }

  // Initial render
  renderPosts(currentFilter, displayedPosts);
});
