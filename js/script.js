// ========================
// Mobile Menu Toggle
// ========================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ========================
// Sticky Navigation
// ========================
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = '#ffffff';
        header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
    }
});

// ========================
// Active Navigation Link
// ========================
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-menu a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ========================
// Counter Animation
// ========================
const counters = document.querySelectorAll('.counter');
let counterAnimated = false;

const animateCounters = () => {
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };

        updateCounter();
    });
};

// Trigger counter animation when stats section is in view
const statsSection = document.querySelector('.stats');
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !counterAnimated) {
            animateCounters();
            counterAnimated = true;
        }
    });
}, observerOptions);

if (statsSection) {
    observer.observe(statsSection);
}

// ========================
// Scroll to Top Button
// ========================
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('active');
    } else {
        scrollTopBtn.classList.remove('active');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ========================
// Contact Form Submission
// ========================
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    // Validate form (basic validation)
    if (!name || !email || !subject || !message) {
        alert('Please fill in all required fields');
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
    }

    // Here you would typically send the form data to a server
    // For this demo, we'll just show a success message
    alert(`Thank you, ${name}! Your message has been sent successfully. We'll get back to you soon!`);
    
    // Reset form
    contactForm.reset();
});

// ========================
// Smooth Scroll for All Links
// ========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// ========================
// Add Animation on Scroll
// ========================
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.property-card, .service-card, .testimonial-card');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Set initial state
document.querySelectorAll('.property-card, .service-card, .testimonial-card').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'all 0.6s ease';
});

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// ========================
// Property Card Favorites
// ========================
const favoriteButtons = document.querySelectorAll('.overlay-btn:last-child');
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

favoriteButtons.forEach((btn, index) => {
    // Check if already favorited
    if (favorites.includes(index)) {
        btn.querySelector('i').style.color = '#e74c3c';
    }

    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const icon = btn.querySelector('i');
        
        if (favorites.includes(index)) {
            // Remove from favorites
            favorites = favorites.filter(fav => fav !== index);
            icon.style.color = '';
        } else {
            // Add to favorites
            favorites.push(index);
            icon.style.color = '#e74c3c';
        }
        
        // Save to localStorage
        localStorage.setItem('favorites', JSON.stringify(favorites));
    });
});

// ========================
// Newsletter Form
// ========================
const newsletterForm = document.querySelector('.newsletter-form');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const email = emailInput.value;

        if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            alert('Thank you for subscribing to our newsletter!');
            emailInput.value = '';
        } else {
            alert('Please enter a valid email address');
        }
    });
}

// ========================
// Property Image Zoom Effect
// ========================
const propertyImages = document.querySelectorAll('.property-image img');

propertyImages.forEach(img => {
    img.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
    });
    
    img.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// ========================
// Loading Animation
// ========================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ========================
// Search Functionality
// ========================
const searchBtn = document.querySelector('.btn-search');
const searchInputs = document.querySelectorAll('.search-box input, .search-box select');

if (searchBtn) {
    searchBtn.addEventListener('click', () => {
        const location = searchInputs[0].value;
        const propertyType = searchInputs[1].value;
        const priceRange = searchInputs[2].value;

        console.log('Search Parameters:', {
            location,
            propertyType,
            priceRange
        });

        // Here you would typically filter properties based on search criteria
        alert(`Searching for ${propertyType || 'properties'} in ${location || 'all locations'} with price range: ${priceRange || 'any'}`);
    });
}

// ========================
// Console Welcome Message
// ========================
console.log('%c Welcome to My Dream Home! ', 'background: #3498db; color: white; font-size: 20px; padding: 10px;');
console.log('%c Find your perfect property with us! ', 'background: #2c3e50; color: white; font-size: 14px; padding: 5px;');