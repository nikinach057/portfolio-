// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = mobileMenuBtn.querySelector('i');
    
    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', function() {
        const isOpen = mobileMenu.classList.contains('translate-y-0');
        
        if (isOpen) {
            // Close menu
            mobileMenu.classList.remove('translate-y-0');
            mobileMenu.classList.add('-translate-y-full');
            menuIcon.classList.remove('fa-times');
            menuIcon.classList.add('fa-bars');
        } else {
            // Open menu
            mobileMenu.classList.remove('-translate-y-full');
            mobileMenu.classList.add('translate-y-0');
            menuIcon.classList.remove('fa-bars');
            menuIcon.classList.add('fa-times');
        }
    });
});
