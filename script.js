// State
let isSynced = false;
let expandedCard = null;

// DOM Elements
const tripSummary = document.getElementById('tripSummary');
const prepSection = document.getElementById('prepSection');
const syncIndicator = document.getElementById('syncIndicator');
const syncCard = document.getElementById('syncCard');

// Sync Trip Function
function syncTrip() {
  if (isSynced) return;
  
  isSynced = true;
  
  // Show sync indicator in header
  syncIndicator.classList.add('visible');
  
  // Show trip summary cards with animation
  tripSummary.classList.add('visible');
  
  // Animate cards in sequence
  const cards = tripSummary.querySelectorAll('.summary-card');
  cards.forEach((card, index) => {
    setTimeout(() => {
      card.classList.add('animate-in');
    }, index * 100);
  });
  
  // Update prep section (hide synced cards, keep advance booking)
  prepSection.classList.add('synced');
  
  // Hide the sync card specifically
  if (syncCard) {
    syncCard.style.display = 'none';
  }
  
  // Hide travel pass card
  const travelPassCard = document.getElementById('travelPassCard');
  if (travelPassCard) {
    travelPassCard.style.display = 'none';
  }
  
  // Scroll to top to see summary cards
  window.scrollTo({ top: 0, behavior: 'smooth' });
  
  // Haptic feedback if available
  if (navigator.vibrate) {
    navigator.vibrate(50);
  }
}

// Toggle Card Expansion
function toggleCard(cardType) {
  const cardMap = {
    'flight': 'flightCard',
    'esim': 'esimCard',
    'pass': 'passCard',
    'pay': 'payCard'
  };
  
  const cardId = cardMap[cardType];
  const card = document.getElementById(cardId);
  
  if (!card) return;
  
  // If clicking the same card, toggle it
  if (expandedCard === cardId) {
    card.classList.remove('expanded');
    expandedCard = null;
  } else {
    // Collapse any previously expanded card
    if (expandedCard) {
      const prevCard = document.getElementById(expandedCard);
      if (prevCard) {
        prevCard.classList.remove('expanded');
      }
    }
    
    // Expand the clicked card
    card.classList.add('expanded');
    expandedCard = cardId;
    
    // Scroll card into view if needed
    setTimeout(() => {
      card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
  }
  
  // Haptic feedback
  if (navigator.vibrate) {
    navigator.vibrate(30);
  }
}

// Touch/Click handlers for better mobile experience
document.addEventListener('DOMContentLoaded', () => {
  // Add touch feedback to all interactive elements
  const interactiveElements = document.querySelectorAll('.btn-primary, .btn-outline, .essential-card, .feature-card, .summary-card');
  
  interactiveElements.forEach(el => {
    el.addEventListener('touchstart', () => {
      el.style.transform = 'scale(0.98)';
    }, { passive: true });
    
    el.addEventListener('touchend', () => {
      el.style.transform = '';
    }, { passive: true });
  });
  
  // Prevent double-tap zoom on buttons
  const buttons = document.querySelectorAll('button');
  buttons.forEach(btn => {
    btn.addEventListener('touchend', (e) => {
      e.preventDefault();
    });
  });
});

// Pull to refresh simulation (optional)
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', (e) => {
  touchStartY = e.changedTouches[0].screenY;
}, { passive: true });

document.addEventListener('touchend', (e) => {
  touchEndY = e.changedTouches[0].screenY;
  
  // If at top of page and pulled down
  if (window.scrollY === 0 && touchEndY - touchStartY > 100) {
    // Could trigger refresh or show new content
    console.log('Pull to refresh detected');
  }
}, { passive: true });

// Service Worker Registration (for PWA capability)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js')
      .then(registration => {
        console.log('SW registered:', registration);
      })
      .catch(error => {
        console.log('SW registration failed:', error);
      });
  });
}

// Intersection Observer for lazy loading animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const animateOnScroll = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      animateOnScroll.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe elements that should animate on scroll
document.querySelectorAll('.feature-card, .essential-card').forEach(el => {
  animateOnScroll.observe(el);
});
