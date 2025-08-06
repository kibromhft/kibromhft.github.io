// Dropdown functionality for mobile devices
document.addEventListener('DOMContentLoaded', function() {
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    const caret = document.querySelector('.dropdown-toggle .caret');
    
    if (dropdownToggle && dropdownMenu) {
        // Toggle dropdown on click
        dropdownToggle.addEventListener('click', function(event) {
            event.preventDefault();
            event.stopPropagation();
            
            const isExpanded = dropdownMenu.classList.contains('show');
            
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
        
        // Close dropdown when clicking on dropdown menu items
        dropdownMenu.addEventListener('click', function(event) {
            if (event.target.tagName === 'A') {
                // Close dropdown when a menu item is clicked
                dropdownMenu.classList.remove('show');
                if (caret) {
                    caret.style.transform = 'rotate(0deg)';
                }
                dropdownToggle.setAttribute('aria-expanded', 'false');
            }
        });
        
        // Handle touch events for mobile
        dropdownToggle.addEventListener('touchstart', function(event) {
            event.preventDefault();
        });
    }
}); 