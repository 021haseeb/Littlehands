document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    // Toggle menu visibility when clicking the burger icon
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevents click from bubbling up to document
        navLinks.classList.toggle('active');
        
        // Icon change effect (Optional: bars to X toggle)
        const icon = menuToggle.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
        } else {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
    });

    // Close menu when clicking anywhere outside of it
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        }
    });



    
});

// GALLERY SLIDER LOGIC
document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('sliderTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dots = document.querySelectorAll('.dot');
    const cards = document.querySelectorAll('.gallery-card');

    let currentIndex = 0;

    function getVisibleCardsCount() {
        if (window.innerWidth <= 768) return 1;
        if (window.innerWidth <= 1200) return 3;
        return 5; // Default Desktop
    }

    function updateSlider() {
        const visibleCards = getVisibleCardsCount();
        const cardWidth = cards[0].getBoundingClientRect().width;
        const gap = 20; // Match CSS gap
        
        // Calculate dynamic shift amount
        const amountToMove = currentIndex * (cardWidth + gap);
        track.style.transform = `translateX(-${amountToMove}px)`;

        // Sync active indicator dots
        dots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    nextBtn.addEventListener('click', () => {
        const visibleCards = getVisibleCardsCount();
        const maxIndex = cards.length - visibleCards;
        
        if (currentIndex < maxIndex) {
            currentIndex++;
        } else {
            currentIndex = 0; // Loop back to start
        }
        updateSlider();
    });

    prevBtn.addEventListener('click', () => {
        const visibleCards = getVisibleCardsCount();
        const maxIndex = cards.length - visibleCards;

        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = maxIndex; // Jump to end loop
        }
        updateSlider();
    });

    // Dots navigation mechanism
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            const visibleCards = getVisibleCardsCount();
            const maxIndex = cards.length - visibleCards;
            
            if(index <= maxIndex) {
                currentIndex = index;
                updateSlider();
            }
        });
    });

    // Handle recalculation on window resize
    window.addEventListener('resize', updateSlider);
});
// LIGHTBOX FULL SIZE TRIGGER SYSTEM
document.addEventListener('DOMContentLoaded', () => {
    const galleryCards = document.querySelectorAll('.gallery-card img');
    const lightbox = document.getElementById('galleryLightbox');
    const lightboxImg = document.getElementById('lightboxFullImg');
    const closeBtn = document.getElementById('lightboxClose');
    const prevBtn = document.getElementById('lightboxPrev');
    const nextBtn = document.getElementById('lightboxNext');

    let activeImgIndex = 0;
    const imageSources = Array.from(galleryCards).map(img => img.src);

    // Open Lightbox
    galleryCards.forEach((img, index) => {
        img.parentElement.addEventListener('click', () => {
            activeImgIndex = index;
            updateLightboxImage();
            lightbox.classList.add('show');
            document.body.style.overflow = 'hidden'; /* Stops background body scroll */
        });
    });

    function updateLightboxImage() {
        lightboxImg.src = imageSources[activeImgIndex];
    }

    // Next Action
    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        activeImgIndex = (activeImgIndex + 1) % imageSources.length;
        updateLightboxImage();
    });

    // Prev Action
    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        activeImgIndex = (activeImgIndex - 1 + imageSources.length) % imageSources.length;
        updateLightboxImage();
    });

    // Close Actions
    closeBtn.addEventListener('click', () => {
        lightbox.classList.remove('show');
        document.body.style.overflow = 'auto';
    });

    // Close when clicking empty dark space
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
    });

    // Keyboard controls support
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('show')) return;
        if (e.key === 'Escape') {
            lightbox.classList.remove('show');
            document.body.style.overflow = 'auto';
        } else if (e.key === 'ArrowRight') {
            activeImgIndex = (activeImgIndex + 1) % imageSources.length;
            updateLightboxImage();
        } else if (e.key === 'ArrowLeft') {
            activeImgIndex = (activeImgIndex - 1 + imageSources.length) % imageSources.length;
            updateLightboxImage();
        }
    });
});

// FAQ 100% WORKING INTERACTION ACCORDION
document.addEventListener('DOMContentLoaded', () => {
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const currentItem = question.parentElement;
            
            // Close other open panels automatically
            document.querySelectorAll('.faq-item').forEach(item => {
                if (item !== currentItem && item.classList.contains('active')) {
                    item.classList.remove('active');
                }
            });

            // Toggle active status
            currentItem.classList.toggle('active');
        });
    });
});

// CONTACT FORM HANDLER

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');

    if(contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simple validation feedback alert placeholder
            alert('Thank you! Your inquiry message has been submitted successfully.');
            contactForm.reset();
        });
    }
});

// Smooth scrolling for anchor links
(function () {
    const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    document.addEventListener('click', (e) => {
        const target = e.target.closest('a[href^="#"]');
        if (!target) return;

        const href = target.getAttribute('href');
        if (!href || href === '#') return;
        
        const id = href.slice(1);
        const el = document.getElementById(id);
        if (!el) return;

        e.preventDefault();

        if (prefersReduced) {
            el.scrollIntoView();
        } else {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        // Update URL hash without jumping
        history.pushState(null, '', href);
    });
})();
