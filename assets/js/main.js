/* SKB Pumps — main.js */

/* ── Mobile Nav ── */
const menuBtn   = document.getElementById('menuBtn');
const menuClose = document.getElementById('menuClose');
const mobileNav = document.getElementById('mobileNav');

function openNav() {
  mobileNav.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeNav() {
  mobileNav.classList.remove('open');
  document.body.style.overflow = '';
}

if (menuBtn)   menuBtn.addEventListener('click', openNav);
if (menuClose) menuClose.addEventListener('click', closeNav);
if (mobileNav) {
  mobileNav.addEventListener('click', function(e) {
    if (e.target === mobileNav) closeNav();
  });
}
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeNav();
});

/* ── Sticky header shadow ── */
const header = document.querySelector('.site-header');
if (header) {
  window.addEventListener('scroll', function() {
    header.classList.toggle('scrolled', window.scrollY > 10);
  }, { passive: true });
}

/* ── Product Filter (products.html) ── */
const filterBtns = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

if (filterBtns.length && productCards.length) {
  filterBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      filterBtns.forEach(function(b) { b.classList.remove('active'); });
      btn.classList.add('active');

      const cat = btn.dataset.cat;
      productCards.forEach(function(card) {
        if (cat === 'all' || (card.dataset.cat && card.dataset.cat.split(' ').includes(cat))) {
          card.style.display = '';
          card.style.animation = 'fadeInUp 0.3s ease both';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ── Stats counter animation ── */
function animateCount(el) {
  const target = parseInt(el.dataset.target, 10);
  const suffix = el.dataset.suffix || '';
  if (!target) return;
  const duration = 1800;
  const step = 16;
  const increments = Math.ceil(duration / step);
  let current = 0;
  const counter = setInterval(function() {
    current++;
    el.textContent = Math.round((target / increments) * current) + suffix;
    if (current >= increments) {
      el.textContent = target + suffix;
      clearInterval(counter);
    }
  }, step);
}

const statNums = document.querySelectorAll('.stat-number[data-target]');
if (statNums.length && 'IntersectionObserver' in window) {
  const obs = new IntersectionObserver(function(entries, observer) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  statNums.forEach(function(el) { obs.observe(el); });
}

/* ── Smooth scroll for anchor links ── */
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
