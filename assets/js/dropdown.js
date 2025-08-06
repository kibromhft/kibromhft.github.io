// Dropdown functionality for mobile devices
document.addEventListener('DOMContentLoaded', function() {
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    const caret = document.querySelector('.dropdown-toggle .caret');
    
    if (dropdownToggle && dropdownMenu) {
        // Close dropdown when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideDropdown = dropdownToggle.contains(event.target) || dropdownMenu.contains(event.target);
            
            if (!isClickInsideDropdown) {
                dropdownMenu.classList.remove('show');
                if (caret) {
                    caret.style.transform = 'rotate(0deg)';
                }
                dropdownToggle.setAttribute('aria-expanded', 'false');
            }
        });
        
        // Toggle dropdown on click
        dropdownToggle.addEventListener('click', function(event) {
            event.preventDefault();
            event.stopPropagation();
            
            const isExpanded = dropdownToggle.getAttribute('aria-expanded') === 'true';
            
            if (isExpanded) {
                // Close dropdown
                dropdownMenu.classList.remove('show');
                if (caret) {
                    caret.style.transform = 'rotate(0deg)';
                }
                dropdownToggle.setAttribute('aria-expanded', 'false');
            } else {
                // Open dropdown
                dropdownMenu.classList.add('show');
                if (caret) {
                    caret.style.transform = 'rotate(180deg)';
                }
                dropdownToggle.setAttribute('aria-expanded', 'true');
            }
        });
        
        // Handle touch events for mobile
        dropdownToggle.addEventListener('touchstart', function(event) {
            event.preventDefault();
        });
    }
}); 