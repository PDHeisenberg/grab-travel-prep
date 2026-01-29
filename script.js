// State
let isSynced = false;
let expandedCard = null;

// DOM Elements
const tripCards = document.getElementById('tripCards');
const featureCards = document.getElementById('featureCards');
const syncIndicator = document.getElementById('syncIndicator');
const advanceBookingSection = document.getElementById('advanceBookingSection');

// Sync Trip Function
function syncTrip(event) {
  if (event) {
    event.stopPropagation();
  }
  
  if (isSynced) return;
  isSynced = true;
  
  // Show sync indicator in header
  syncIndicator.classList.add('visible');
  
  // Hide feature cards
  featureCards.classList.add('hidden');
  
  // Show advance booking section
  advanceBookingSection.classList.add('visible');
  
  // Show trip cards with animation
  tripCards.classList.add('visible');
  
  // Animate each card
  const cards = tripCards.querySelectorAll('.trip-card');
  cards.forEach((card, index) => {
    card.style.opacity = '0';
    setTimeout(() => {
      card.classList.add('animate');
    }, index * 80);
  });
  
  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
  
  // Haptic feedback
  if (navigator.vibrate) {
    navigator.vibrate([50]);
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
  
  // If clicking the same card, collapse it
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
    
    // Scroll into view if needed
    setTimeout(() => {
      card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
  }
  
  // Haptic feedback
  if (navigator.vibrate) {
    navigator.vibrate([30]);
  }
}

// Touch feedback for interactive elements
document.addEventListener('DOMContentLoaded', () => {
  const touchElements = document.querySelectorAll('.btn-primary, .btn-secondary, .essential-card, .trip-card, .icon-btn');
  
  touchElements.forEach(el => {
    el.addEventListener('touchstart', function() {
      this.style.transform = 'scale(0.97)';
    }, { passive: true });
    
    el.addEventListener('touchend', function() {
      this.style.transform = '';
    }, { passive: true });
    
    el.addEventListener('touchcancel', function() {
      this.style.transform = '';
    }, { passive: true });
  });
});

// Prevent zoom on double-tap for buttons
let lastTouchEnd = 0;
document.addEventListener('touchend', (event) => {
  const now = Date.now();
  if (now - lastTouchEnd <= 300) {
    event.preventDefault();
  }
  lastTouchEnd = now;
}, { passive: false });

// Service Worker Registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  });
}
