// Gleamora Hair Care Web site JavaScript 
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const hairButtons = document.querySelectorAll('.hair-btn');
    const productCards = document.querySelectorAll('.product-card');
    const categoryItems = document.querySelectorAll('.category-item');
    const needItems = document.querySelectorAll('.need-item');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    // Hero Slider Elements
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;

    // =============================================
    // HERO SLIDER FUNCTIONALITY
    // =============================================

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        if (slides[index] && indicators[index]) {
            slides[index].classList.add('active');
            indicators[index].classList.add('active');
        }
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    let sliderInterval = setInterval(nextSlide, 5000);

    if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', () => {
            clearInterval(sliderInterval);
            nextSlide();
            sliderInterval = setInterval(nextSlide, 5000);
        });

        prevBtn.addEventListener('click', () => {
            clearInterval(sliderInterval);
            prevSlide();
            sliderInterval = setInterval(nextSlide, 5000);
        });
    }

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            clearInterval(sliderInterval);
            currentSlide = index;
            showSlide(currentSlide);
            sliderInterval = setInterval(nextSlide, 5000);
        });
    });

    // =============================================
    // HAIR TYPE FILTER FUNCTIONALITY
    // =============================================

    hairButtons.forEach(button => {
        button.addEventListener('click', function() {
            hairButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const selectedType = this.getAttribute('data-type');
            
            productCards.forEach((card, index) => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    if (selectedType === 'all') {
                        card.style.display = 'block';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                        card.style.transition = 'all 0.4s ease-out';
                    } else {
                        const cardTypes = card.getAttribute('data-hair-type');
                        if (cardTypes && cardTypes.includes(selectedType)) {
                            card.style.display = 'block';
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                            card.style.transition = 'all 0.4s ease-out';
                        } else {
                            card.style.display = 'none';
                        }
                    }
                }, index * 50);
            });

            setTimeout(() => {
                updateProductCount(selectedType);
            }, 500);

            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });

    // =============================================
    // CATEGORY INTERACTION
    // =============================================

    categoryItems.forEach(item => {
        item.addEventListener('click', function(e) {
            addRippleEffect(this, e);
            const categoryName = this.querySelector('h3').textContent;
            
            const productsSection = document.querySelector('.products');
            if (productsSection) {
                productsSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
            
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);

            console.log(`Selected category: ${categoryName}`);
        });
    });

    // =============================================
    // SHOP BY NEED FUNCTIONALITY
    // =============================================

    needItems.forEach(item => {
        item.addEventListener('click', function() {
            const needType = this.querySelector('h3').textContent;
            
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'translateY(-10px) scale(1)';
            }, 150);
            
            const productsSection = document.querySelector('.products');
            if (productsSection) {
                productsSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
            
            console.log(`Selected need: ${needType}`);
        });
    });

    // =============================================
    // PRODUCT CARD INTERACTIONS
    // =============================================

    const quickViewButtons = document.querySelectorAll('.quick-view');
    quickViewButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            const brand = productCard.querySelector('.brand').textContent;
            const price = productCard.querySelector('.current-price').textContent;
            showProductModal(productName, brand, price);
        });
    });

    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // =============================================
    // MOBILE MENU FUNCTIONALITY
    // =============================================

    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('mobile-active');
            this.classList.toggle('active');
            animateHamburgerMenu(this);
        });

        const navLinkItems = navLinks.querySelectorAll('a');
        navLinkItems.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('mobile-active');
                mobileMenuToggle.classList.remove('active');
                animateHamburgerMenu(mobileMenuToggle);
            });
        });
    }

    // =============================================
    // NEWSLETTER FORM
    // =============================================

    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            if (email && validateEmail(email)) {
                showNotification('Thank you for subscribing! Check your email for confirmation.', 'success');
                emailInput.value = '';
            } else {
                showNotification('Please enter a valid email address.', 'error');
            }
        });
    }

    // =============================================
    // CTA BUTTON FUNCTIONALITY
    // =============================================

    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetSection = document.querySelector('.top-categories');
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // =============================================
    // SCROLL ANIMATIONS
    // =============================================

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll(
        '.category-item, .product-card, .tip-card, .need-item'
    );
    
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease-out ${index * 0.1}s, transform 0.6s ease-out ${index * 0.1}s`;
        observer.observe(el);
    });

    // =============================================
    // IMAGE LOADING
    // =============================================

    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease-in-out';
        
        if (img.complete) {
            img.style.opacity = '1';
        }
    });

    // =============================================
    // UTILITY FUNCTIONS
    // =============================================

    function addRippleEffect(element, e) {
        const ripple = document.createElement('div');
        ripple.classList.add('ripple');
        
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
        ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
        
        element.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    }

    function animateHamburgerMenu(toggle) {
        const spans = toggle.querySelectorAll('span');
        spans.forEach((span, index) => {
            if (toggle.classList.contains('active')) {
                if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
                if (index === 1) span.style.opacity = '0';
                if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                span.style.transform = '';
                span.style.opacity = '';
            }
        });
    }

    function updateProductCount(selectedType) {
        const visibleProducts = document.querySelectorAll('.product-card[style*="display: block"]').length;
        const productsSection = document.querySelector('.products h2');
        
        if (productsSection) {
            const typeNames = {
                'all': 'All Products',
                'dry': 'Dry Hair Products',
                'oily': 'Oily Hair Products',
                'curly': 'Curly Hair Products',
                'straight': 'Straight Hair Products',
                'damaged': 'Damaged Hair Products'
            };
            const displayName = typeNames[selectedType] || 'Featured Products';
            productsSection.textContent = `${displayName} (${visibleProducts})`;
        }
    }

    function showProductModal(name, brand, price) {
        const modalContent = `
            Product: ${name}
            Brand: ${brand}
            Price: ${price}
            
            This would open a detailed product view in a real application.
        `;
        alert(modalContent);
    }

    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#4CAF50' : '#f44336'};
            color: white;
            padding: 15px 20px;
            border-radius: 5px;
            z-index: 9999;
            animation: slideInRight 0.3s ease-out;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // =============================================
    // PERFORMANCE OPTIMIZATIONS
    // =============================================

    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    let scrollToTopButton = null;
    window.addEventListener('scroll', debounce(() => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > 500 && !scrollToTopButton) {
            createScrollToTopButton();
        } else if (scrollTop <= 500 && scrollToTopButton) {
            scrollToTopButton.remove();
            scrollToTopButton = null;
        }
    }, 100));

    function createScrollToTopButton() {
        scrollToTopButton = document.createElement('button');
        scrollToTopButton.innerHTML = '↑';
        scrollToTopButton.className = 'scroll-to-top';
        scrollToTopButton.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: #b65a3c;
            color: white;
            border: none;
            font-size: 20px;
            cursor: pointer;
            z-index: 1000;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            transition: all 0.3s ease;
        `;

        scrollToTopButton.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        scrollToTopButton.addEventListener('mouseenter', () => {
            scrollToTopButton.style.transform = 'scale(1.1)';
            scrollToTopButton.style.background = '#8a4228';
        });

        scrollToTopButton.addEventListener('mouseleave', () => {
            scrollToTopButton.style.transform = 'scale(1)';
            scrollToTopButton.style.background = '#b65a3c';
        });

        document.body.appendChild(scrollToTopButton);
    }

    // =============================================
    // DYNAMIC STYLES
    // =============================================

    const dynamicStyles = document.createElement('style');
    dynamicStyles.textContent = `
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(182, 90, 60, 0.3);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }

        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }

        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        
        @media (max-width: 768px) {
            .nav-links.mobile-active {
                display: flex !important;
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: white;
                flex-direction: column;
                padding: 20px;
                box-shadow: 0 4px 15px rgba(0,0,0,0.1);
                z-index: 1000;
            }
            
            .nav-links.mobile-active li {
                margin: 10px 0;
            }

            .scroll-to-top {
                bottom: 20px !important;
                right: 20px !important;
                width: 45px !important;
                height: 45px !important;
            }
        }

        .animate-in {
            animation: fadeInUp 0.6s ease-out;
        }
    `;
    document.head.appendChild(dynamicStyles);

    // ============================================
    // PAGE LOAD ANIMATION
    // =============================================

    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in-out';
        document.body.style.opacity = '1';
    }, 100);

    console.log('Gleamora Hair Care website loaded successfully!');
});
