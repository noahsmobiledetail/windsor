// --- Existing JavaScript from your site (if any) would go here ---
document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle logic
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navUl = document.querySelector('header.site-header nav ul');

    if (mobileMenuToggle && navUl) {
        mobileMenuToggle.addEventListener('click', () => {
            navUl.classList.toggle('active');
        });

        // Close mobile menu when a link is clicked (for smoother navigation)
        navUl.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navUl.classList.remove('active');
            });
        });
    }

    // Example: Gallery filter (only applies to index.html, but harmless here)
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (filterButtons.length > 0 && galleryItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const filter = button.dataset.filter;

                galleryItems.forEach(item => {
                    if (filter === 'all' || item.dataset.category === filter) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }


    // Example: Testimonial Slider (only applies to index.html, but harmless here)
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const testimonialDots = document.querySelectorAll('.testimonial-dot');
    const prevTestimonialBtn = document.querySelector('.prev-testimonial');
    const nextTestimonialBtn = document.querySelector('.next-testimonial');
    let currentSlide = 0;

    function showSlide(index) {
        testimonialSlides.forEach((slide, i) => {
            slide.classList.remove('active');
            testimonialDots[i].classList.remove('active');
        });
        if (testimonialSlides[index]) { // Check if slide exists before adding class
            testimonialSlides[index].classList.add('active');
        }
        if (testimonialDots[index]) { // Check if dot exists before adding class
            testimonialDots[index].classList.add('active');
        }
    }

    if (prevTestimonialBtn && nextTestimonialBtn && testimonialSlides.length > 0) {
        prevTestimonialBtn.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + testimonialSlides.length) % testimonialSlides.length;
            showSlide(currentSlide);
        });

        nextTestimonialBtn.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % testimonialSlides.length;
            showSlide(currentSlide);
        });

        testimonialDots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                currentSlide = parseInt(e.target.dataset.slide);
                showSlide(currentSlide);
            });
        });

        showSlide(currentSlide); // Initialize slider
    }

    // Before/After Slider Logic (only applies to index.html, but harmless here)
    document.querySelectorAll('.before-after-slider').forEach(slider => {
        const afterImage = slider.querySelector('.after-image');
        const sliderHandle = slider.querySelector('.slider-handle');
        let isDragging = false;

        // Function to update the slider position
        function updateSlider(x) {
            let newWidth = x - slider.getBoundingClientRect().left;
            if (newWidth < 0) newWidth = 0;
            if (newWidth > slider.offsetWidth) newWidth = slider.offsetWidth;

            afterImage.style.width = `${newWidth}px`;
            sliderHandle.style.left = `${newWidth}px`;
        }

        // Mouse events
        sliderHandle.addEventListener('mousedown', (e) => {
            isDragging = true;
            e.preventDefault(); // Prevent default drag behavior
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            updateSlider(e.clientX);
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
        });

        // Touch events
        sliderHandle.addEventListener('touchstart', (e) => {
            isDragging = true;
            e.preventDefault(); // Prevent scrolling while dragging
        }, { passive: false });

        document.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            updateSlider(e.changedTouches[0].clientX);
        }, { passive: false });

        document.addEventListener('touchend', () => {
            isDragging = false;
        });

        // Initialize slider position (e.g., 50%)
        updateSlider(slider.getBoundingClientRect().left + slider.offsetWidth / 2);

        // Recalculate on window resize
        window.addEventListener('resize', () => {
            updateSlider(slider.getBoundingClientRect().left + slider.offsetWidth / 2);
        });
    });

    // Scroll animation for elements with 'animate-on-scroll'
    const animateOnScrollElements = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            } else {
                // Optional: remove 'animated' class if you want animation to repeat on scroll
                // entry.target.classList.remove('animated');
            }
        });
    }, { threshold: 0.1 });

    animateOnScrollElements.forEach(element => {
        observer.observe(element);
    });

    // Client Counter (only applies to index.html, but harmless here)
    const clientCountElement = document.getElementById('clientCount');
    const targetCount = 150;
    const animationDuration = 2000;

    function animateCount(element, start, end, duration) {
        let current = start;
        const range = end - start;
        const increment = end > start ? 1 : -1;
        const stepTime = Math.abs(Math.floor(duration / range));
        const actualStepTime = Math.max(stepTime, 1);

        const timer = setInterval(() => {
            current += increment;
            element.textContent = current;

            if ((increment === 1 && current >= end) || (increment === -1 && current <= end)) {
                clearInterval(timer);
                element.textContent = end + '+';
            }
        }, actualStepTime);
    }

    const clientStatsSection = document.getElementById('client-stats');

    if (clientStatsSection && clientCountElement) {
        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCount(clientCountElement, 0, targetCount, animationDuration);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counterObserver.observe(clientStatsSection);
    }
});
