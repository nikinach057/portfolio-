// Intersection Observer for fade-in animations
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe all sections with fade-in class
    const fadeInSections = document.querySelectorAll('.section-fade-in');
    fadeInSections.forEach(section => {
        observer.observe(section);
    });
    
    // About section specific animations
    const aboutObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe about cards
    const aboutCards = document.querySelectorAll('.about-card');
    aboutCards.forEach((card, index) => {
        aboutObserver.observe(card);
    });
    
    // Observe expertise items
    const expertiseItems = document.querySelectorAll('.expertise-item');
    expertiseItems.forEach(item => {
        aboutObserver.observe(item);
    });
    
    // Observe highlight items
    const highlightItems = document.querySelectorAll('.highlight-item');
    highlightItems.forEach(item => {
        aboutObserver.observe(item);
    });
});
