// ===================================
// HERO SLIDER FUNCTIONALITY
// ===================================

class HeroSlider {
    constructor() {
        this.slider = document.getElementById('heroSlider');
        this.slides = this.slider.querySelectorAll('.slide');
        this.dotsContainer = document.getElementById('sliderDots');
        this.currentSlide = 0;
        this.slideInterval = null;
        
        this.init();
    }
    
    init() {
        // Create dots
        this.createDots();
        
        // Start auto-play
        this.startAutoPlay();
        
        // Pause on hover
        this.slider.addEventListener('mouseenter', () => this.stopAutoPlay());
        this.slider.addEventListener('mouseleave', () => this.startAutoPlay());
    }
    
    createDots() {
        this.slides.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => this.goToSlide(index));
            this.dotsContainer.appendChild(dot);
        });
    }
    
    goToSlide(index) {
        // Remove active class from current slide and dot
        this.slides[this.currentSlide].classList.remove('active');
        this.dotsContainer.children[this.currentSlide].classList.remove('active');
        
        // Add active class to new slide and dot
        this.currentSlide = index;
        this.slides[this.currentSlide].classList.add('active');
        this.dotsContainer.children[this.currentSlide].classList.add('active');
    }
    
    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.slides.length;
        this.goToSlide(nextIndex);
    }
    
    startAutoPlay() {
        this.slideInterval = setInterval(() => this.nextSlide(), 5000);
    }
    
    stopAutoPlay() {
        if (this.slideInterval) {
            clearInterval(this.slideInterval);
        }
    }
}

// ===================================
// COUNTDOWN TIMER FUNCTIONALITY
// ===================================

class CountdownTimer {
    constructor(elementId, targetDate) {
        this.timer = document.getElementById(elementId);
        if (!this.timer) return;
        
        this.daysEl = this.timer.querySelector('#days');
        this.hoursEl = this.timer.querySelector('#hours');
        this.minutesEl = this.timer.querySelector('#minutes');
        this.secondsEl = this.timer.querySelector('#seconds');
        
        // Set target date (3 days from now)
        this.targetDate = targetDate || new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);
        
        this.start();
    }
    
    start() {
        this.update();
        this.interval = setInterval(() => this.update(), 1000);
    }
    
    update() {
        const now = new Date().getTime();
        const distance = this.targetDate - now;
        
        if (distance < 0) {
            this.stop();
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        this.daysEl.textContent = this.pad(days);
        this.hoursEl.textContent = this.pad(hours);
        this.minutesEl.textContent = this.pad(minutes);
        this.secondsEl.textContent = this.pad(seconds);
    }
    
    pad(num) {
        return num.toString().padStart(2, '0');
    }
    
    stop() {
        clearInterval(this.interval);
        this.daysEl.textContent = '00';
        this.hoursEl.textContent = '00';
        this.minutesEl.textContent = '00';
        this.secondsEl.textContent = '00';
    }
}

// ===================================
// ADD TO CART FUNCTIONALITY
// ===================================

class ShoppingCart {
    constructor() {
        this.cartCount = 0;
        this.wishlistCount = 0;
        this.cartBadge = document.querySelector('.cart-btn .badge');
        this.wishlistBadge = document.querySelector('.wishlist-btn .badge');
        
        this.initButtons();
    }
    
    initButtons() {
        // Add to Cart buttons
        document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.addToCart(btn);
            });
        });
        
        // Wishlist buttons
        document.querySelectorAll('.action-btn.wishlist').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleWishlist(btn);
            });
        });
    }
    
    addToCart(btn) {
        // Add animation
        btn.textContent = 'Added!';
        btn.style.backgroundColor = '#00FF66';
        
        // Increment cart count
        this.cartCount++;
        this.cartBadge.textContent = this.cartCount;
    // Reset button after delay
    setTimeout(() => {
        btn.textContent = 'Add To Cart';
        btn.style.backgroundColor = '';
    }, 2000);
    
    // Show notification (optional)
    this.showNotification('Product added to cart!');
}

toggleWishlist(btn) {
    const icon = btn.querySelector('i');
    
    if (icon.classList.contains('far')) {
        // Add to wishlist
        icon.classList.remove('far');
        icon.classList.add('fas');
        btn.style.color = '#DB4444';
        this.wishlistCount++;
        this.showNotification('Added to wishlist!');
    } else {
        // Remove from wishlist
        icon.classList.remove('fas');
        icon.classList.add('far');
        btn.style.color = '';
        this.wishlistCount--;
        this.showNotification('Removed from wishlist!');
    }
    
    this.wishlistBadge.textContent = this.wishlistCount;
}

showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #000;
        color: #fff;
        padding: 16px 24px;
        border-radius: 8px;
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}
}
// ===================================
// MOBILE MENU FUNCTIONALITY
// ===================================
class MobileMenu {
constructor() {
this.toggle = document.getElementById('mobileMenuToggle');
this.menu = document.getElementById('navMenu');
    if (this.toggle && this.menu) {
        this.init();
    }
}

init() {
    this.toggle.addEventListener('click', () => this.toggleMenu());
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!this.menu.contains(e.target) && !this.toggle.contains(e.target)) {
            this.menu.classList.remove('active');
        }
    });
}

toggleMenu() {
    this.menu.classList.toggle('active');
    const icon = this.toggle.querySelector('i');
    
    if (this.menu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
}
}
// ===================================
// SCROLL TO TOP FUNCTIONALITY
// ===================================
class ScrollToTop {
constructor() {
this.button = document.getElementById('scrollTop');
if (!this.button) return;
    this.init();
}

init() {
    // Show/hide button on scroll
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            this.button.classList.add('visible');
        } else {
            this.button.classList.remove('visible');
        }
    });
    
    // Scroll to top on click
    this.button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
}
// ===================================
// HORIZONTAL SCROLL ARROWS
// ===================================
class HorizontalScroll {
constructor() {
this.initScrollArrows();
}
initScrollArrows() {
    // Flash Sales scroll
    const flashSalesScroll = document.getElementById('flashSalesScroll');
    if (flashSalesScroll) {
        const arrows = flashSalesScroll.previousElementSibling.querySelector('.scroll-arrows');
        if (arrows) {
            this.setupScrollButtons(arrows, flashSalesScroll);
        }
    }
    
    // Other scroll sections can be added here
    document.querySelectorAll('.scroll-arrows').forEach((arrowContainer) => {
        const section = arrowContainer.closest('.section');
        const scrollContainer = section.querySelector('.products-scroll, .categories-grid');
        if (scrollContainer) {
            this.setupScrollButtons(arrowContainer, scrollContainer);
        }
    });
}

setupScrollButtons(arrowContainer, scrollContainer) {
    const leftArrow = arrowContainer.querySelector('.left');
    const rightArrow = arrowContainer.querySelector('.right');
    
    if (leftArrow) {
        leftArrow.addEventListener('click', () => {
            scrollContainer.scrollBy({
                left: -300,
                behavior: 'smooth'
            });
        });
    }
    
    if (rightArrow) {
        rightArrow.addEventListener('click', () => {
            scrollContainer.scrollBy({
                left: 300,
                behavior: 'smooth'
            });
        });
    }
}
}
// ===================================
// INITIALIZE ALL COMPONENTS
// ===================================
document.addEventListener('DOMContentLoaded', () => {
// Initialize Hero Slider
new HeroSlider();
// Initialize Countdown Timer
new CountdownTimer('countdownTimer');

// Initialize Shopping Cart
new ShoppingCart();

// Initialize Mobile Menu
new MobileMenu();

// Initialize Scroll to Top
new ScrollToTop();

// Initialize Horizontal Scroll
new HorizontalScroll();

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
});
// ===================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
anchor.addEventListener('click', function (e) {
const href = this.getAttribute('href');
if (href !== '#' && document.querySelector(href)) {
e.preventDefault();
document.querySelector(href).scrollIntoView({
behavior: 'smooth'
});
}
});
});