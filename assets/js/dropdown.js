// Dropdown functionality for mobile devices
document.addEventListener('DOMContentLoaded', function() {
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    const caret = document.querySelector('.dropdown-toggle .caret');
    
    if (dropdownToggle && dropdownMenu) {
        let isDropdownOpen = false;
        let isMobile = window.innerWidth <= 768;
        
        // Update mobile detection on resize
        window.addEventListener('resize', function() {
            isMobile = window.innerWidth <= 768;
        });
        
        // Toggle dropdown on click (mobile behavior)
        dropdownToggle.addEventListener('click', function(event) {
            if (isMobile) {
                event.preventDefault();
                event.stopPropagation();
                
                if (isDropdownOpen) {
                    // Close dropdown
                    dropdownMenu.classList.remove('show');
                    if (caret) {
                        caret.style.transform = 'rotate(0deg)';
                    }
                    dropdownToggle.setAttribute('aria-expanded', 'false');
                    isDropdownOpen = false;
                } else {
                    // Open dropdown
                    dropdownMenu.classList.add('show');
                    if (caret) {
                        caret.style.transform = 'rotate(180deg)';
                    }
                    dropdownToggle.setAttribute('aria-expanded', 'true');
                    isDropdownOpen = true;
                }
            }
        });
        
        // Close dropdown when clicking outside (mobile behavior)
        document.addEventListener('click', function(event) {
            if (isMobile) {
                const isClickInsideDropdown = dropdownToggle.contains(event.target) || dropdownMenu.contains(event.target);
                
                if (!isClickInsideDropdown && isDropdownOpen) {
                    dropdownMenu.classList.remove('show');
                    if (caret) {
                        caret.style.transform = 'rotate(0deg)';
                    }
                    dropdownToggle.setAttribute('aria-expanded', 'false');
                    isDropdownOpen = false;
                }
            }
        });
        
        // Close dropdown when clicking on dropdown menu items (mobile behavior)
        dropdownMenu.addEventListener('click', function(event) {
            if (isMobile && event.target.tagName === 'A') {
                // Close dropdown when a menu item is clicked
                dropdownMenu.classList.remove('show');
                if (caret) {
                    caret.style.transform = 'rotate(0deg)';
                }
                dropdownToggle.setAttribute('aria-expanded', 'false');
                isDropdownOpen = false;
            }
        });
        
        // Handle touch events for mobile
        dropdownToggle.addEventListener('touchstart', function(event) {
            if (isMobile) {
                event.preventDefault();
            }
        });
        
        // Desktop hover behavior - remove show class when not hovering
        if (!isMobile) {
            dropdownToggle.addEventListener('mouseenter', function() {
                dropdownMenu.classList.add('show');
                if (caret) {
                    caret.style.transform = 'rotate(180deg)';
                }
                dropdownToggle.setAttribute('aria-expanded', 'true');
            });
            
            dropdownToggle.addEventListener('mouseleave', function() {
                dropdownMenu.classList.remove('show');
                if (caret) {
                    caret.style.transform = 'rotate(0deg)';
                }
                dropdownToggle.setAttribute('aria-expanded', 'false');
            });
        }
    }
}); 