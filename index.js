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


// CONTACT FORM HANDLER

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById("contactForm");

form.addEventListener("submit", function(e){

    e.preventDefault();

    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    const text =
`*New Admission Inquiry*

 Name: ${name}
 Phone: ${phone}
 Email: ${email}

 Message:
${message}`;

    window.open(
        `https://wa.me/923323668386?text=${encodeURIComponent(text)}`,
        "_blank"
    );

});
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


document.addEventListener("DOMContentLoaded", function() {
    
    // 1. Accordion Toggle Logic
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Apni current category ke baki active items ko close karein
            const currentCategory = [...faqItems].filter(f => !f.classList.contains('hide-faq'));
            currentCategory.forEach(innerItem => innerItem.classList.remove('active'));
            
            // Agar pehle active nahi tha toh open kar dein
            if (!isActive) {
                item.classList.contains('hide-faq') ? null : item.classList.add('active');
            }
        });
    });

    // 2. Swipable Categories/Tabs Switching Filter Logic
    const tabButtons = document.querySelectorAll('.faq-tab-btn');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Active class handles for buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const targetCategory = button.getAttribute('data-target');
            
            // Hide all and display targets smoothly
            faqItems.forEach(item => {
                item.classList.remove('active'); // Close everything first
                
                if (item.classList.contains(targetCategory)) {
                    item.classList.remove('hide-faq');
                } else {
                    item.classList.add('hide-faq');
                }
            });

            // Pehle visible item ko automated click kar ke open kar dein dynamic feel ke liye
            const firstVisible = document.querySelector(`.faq-item.${targetCategory}`);
            if (firstVisible) {
                firstVisible.classList.add('active');
            }
        });
    });
});

// TESTIMONIALS SLIDER LOGIC (fix: use correct IDs + avoid conflicts with gallery prev/next)
document.addEventListener("DOMContentLoaded", function () {
    const testimonialsSection = document.getElementById("testimonials");
    if (!testimonialsSection) return;

    const track = testimonialsSection.querySelector("#sliderTrack");
    const slides = testimonialsSection.querySelectorAll(".testimonial-slide");
    const prevBtn = testimonialsSection.querySelector("#prevBtn");
    const nextBtn = testimonialsSection.querySelector("#nextBtn");
    const dotsContainer = testimonialsSection.querySelector("#sliderDots");

    // Guard clause: agar element page par nahi hain tou code error na de
    if (!track || slides.length === 0 || !prevBtn || !nextBtn || !dotsContainer) return;

    let currentIndex = 0;
    let autoPlayTimer;

    function getItemsPerView() {
        return window.innerWidth > 992 ? 2 : 1;
    }

    function getMaxIndices() {
        const itemsPerView = getItemsPerView();
        return slides.length - itemsPerView + 1;
    }

    // 1. Dynamic Dots Setup Control Generator
    function createDots() {
        dotsContainer.innerHTML = "";
        const maxIndices = getMaxIndices();

        for (let i = 0; i < maxIndices; i++) {
            const dot = document.createElement("div");
            dot.classList.add("dot");
            if (i === currentIndex) dot.classList.add("active");
            dot.addEventListener("click", () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
    }

    // 2. Core Moving Slider Engine Mechanics
    function updateSlider() {
        const itemsPerView = getItemsPerView();
        let maxIndices = slides.length - itemsPerView + 1;
        if (maxIndices < 1) maxIndices = 1;

        // Boundaries checks reset loops safety guards
        if (currentIndex >= maxIndices) currentIndex = 0;
        if (currentIndex < 0) currentIndex = maxIndices - 1;

        const slideWidth = slides[0].getBoundingClientRect().width;
        const gapSize = 25; // must match .testimonials-slider-track gap

        // Horizontal translation transformation calculations
        const moveDistance = currentIndex * (slideWidth + gapSize);
        track.style.transform = `translateX(-${moveDistance}px)`;

        // Update active dot layout securely
        const dots = dotsContainer.querySelectorAll(".dot");
        dots.forEach((dot, idx) => {
            if (idx === currentIndex) dot.classList.add("active");
            else dot.classList.remove("active");
        });
    }

    function goToSlide(index) {
        currentIndex = index;
        updateSlider();
        startAutoPlay(); // Restart timer rules upon interactions
    }

    // Navigation Triggers
    nextBtn.addEventListener("click", () => {
        currentIndex++;
        updateSlider();
        startAutoPlay();
    });

    prevBtn.addEventListener("click", () => {
        currentIndex--;
        updateSlider();
        startAutoPlay();
    });

    // 3. Automated Slide Cycle Loop Controls (4 seconds intervals)
    function startAutoPlay() {
        clearInterval(autoPlayTimer);
        autoPlayTimer = setInterval(() => {
            currentIndex++;
            updateSlider();
        }, 4000);
    }

    // 4. Manual Touch Drag & Swipe Calculations Setup
    let startX = 0;
    let isDragging = false;

    track.addEventListener("mousedown", (e) => {
        startX = e.pageX;
        isDragging = true;
    });

    track.addEventListener("mouseup", (e) => {
        if (!isDragging) return;
        const endX = e.pageX;
        handleSwipe(startX, endX);
        isDragging = false;
    });

    track.addEventListener(
        "touchstart",
        (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
        },
        { passive: true }
    );

    track.addEventListener(
        "touchend",
        (e) => {
            if (!isDragging) return;
            const endX = e.changedTouches[0].clientX;
            handleSwipe(startX, endX);
            isDragging = false;
        },
        { passive: true }
    );

    function handleSwipe(start, end) {
        const threshold = 50; // swipe detection
        if (start - end > threshold) {
            currentIndex++; // Swiped left -> Go Next
        } else if (end - start > threshold) {
            currentIndex--; // Swiped right -> Go Prev
        }
        updateSlider();
        startAutoPlay();
    }

    // Window Resize Recalibration monitors
    window.addEventListener("resize", () => {
        // recreate dots because itemsPerView might change
        currentIndex = Math.min(currentIndex, getMaxIndices() - 1);
        createDots();
        updateSlider();
    });

    // Initial Active Setup Trigger execution Callings
    createDots();
    updateSlider();
    startAutoPlay();
});
