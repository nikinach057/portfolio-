// Enhanced smooth scrolling for all navigation links
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('mobile-menu-btn').querySelector('i');
    
    const allNavLinks = document.querySelectorAll('a[href^="#"]');
    allNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Close mobile menu if open
                if (mobileMenu.classList.contains('translate-y-0')) {
                    mobileMenu.classList.remove('translate-y-0');
                    mobileMenu.classList.add('-translate-y-full');
                    menuIcon.classList.remove('fa-times');
                    menuIcon.classList.add('fa-bars');
                }
                
                // Smooth scroll to target
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Add active state to navigation
                allNavLinks.forEach(l => l.classList.remove('text-gray-300'));
                this.classList.add('text-gray-300');
            }
        });
    });
});
