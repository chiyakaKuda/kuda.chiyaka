document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    const navToggle = document.querySelector('.nav-toggle');
    const mainNav = document.querySelector('.main-nav');
    const progressBar = document.getElementById('navProgressBar');
    
    // Track visited sections
    const visitedSections = new Set();
    
    // Calculate total page height for progress bar
    const totalHeight = document.body.scrollHeight - window.innerHeight;
    
    // Intersection Observer for sections
    const observerOptions = {
        threshold: 0.2 // Lower threshold to mark as visited sooner
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            const id = entry.target.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav-link[href="#${id}"]`);
            
            if (entry.isIntersecting) {
                // Mark section as active
                navLinks.forEach(link => link.classList.remove('active'));
                correspondingLink.classList.add('active');
                
                // Mark as visited
                visitedSections.add(id);
                correspondingLink.classList.add('visited');
                
                // Update progress indicators
                updateProgressIndicators();
            } else {
                correspondingLink.classList.remove('active');
            }
        });
    }, observerOptions);
    
    // Observe all sections
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            mainNav.classList.toggle('expanded');
            
            const isExpanded = mainNav.classList.contains('expanded');
            navToggle.setAttribute('aria-expanded', isExpanded);
        });
    }
    
    // Close mobile menu when clicking on a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                mainNav.classList.remove('expanded');
                navToggle.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });
    
    // Update progress bar on scroll
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const scrollProgress = (scrollPosition / totalHeight) * 100;
        
        // Update main progress bar
        if (window.innerWidth <= 768) {
            // For mobile: horizontal progress
            progressBar.style.width = `${scrollProgress}%`;
        } else {
            // For desktop: vertical progress
            progressBar.style.height = `${scrollProgress}%`;
        }
    });
    
    // Function to update progress indicators
    function updateProgressIndicators() {
        const totalSections = sections.length;
        const visitedCount = visitedSections.size;
        const progressPercentage = (visitedCount / totalSections) * 100;
        
        // Update any additional progress indicators if needed
        console.log(`Progress: ${progressPercentage.toFixed(0)}% (${visitedCount}/${totalSections} sections viewed)`);
    }
    
    // Form submission prevention (for demo)
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Message sent! (This is a demo - no actual message was sent)');
            contactForm.reset();
        });
    }
    
    // Smooth reveal animation for sections
    const revealElements = document.querySelectorAll('.section > .container');
    
    revealElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        element.style.transitionDelay = `${index * 0.1}s`;
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 200);
    });
});