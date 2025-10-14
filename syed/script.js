// Theme Toggle Function
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const themeBtn = document.querySelector('.theme-toggle');
    
    if (document.body.classList.contains('dark-mode')) {
        themeBtn.textContent = '☀️ Light Mode';
        themeBtn.style.background = 'rgba(255,255,255,0.3)';
    } else {
        themeBtn.textContent = '🌙 Dark Mode';
        themeBtn.style.background = 'rgba(255,255,255,0.2)';
    }
    
    // Save theme preference to localStorage
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
}

// Photo Upload Function
function handlePhotoUpload(event) {
    const file = event.target.files[0];
    if (file) {
        // Check if file is an image
        if (!file.type.match('image.*')) {
            alert('Please upload an image file (JPEG, PNG, etc.)');
            return;
        }
        
        // Check file size (max 2MB)
        if (file.size > 2 * 1024 * 1024) {
            alert('Please upload an image smaller than 2MB');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = function(e) {
            const profilePhoto = document.getElementById('profilePhoto');
            profilePhoto.innerHTML = '';
            profilePhoto.style.backgroundImage = `url(${e.target.result})`;
            profilePhoto.style.backgroundSize = 'cover';
            profilePhoto.style.backgroundPosition = 'center';
            
            // Save photo to localStorage
            localStorage.setItem('profilePhoto', e.target.result);
        }
        reader.onerror = function() {
            alert('Error reading file. Please try again.');
        }
        reader.readAsDataURL(file);
    }
}

// Download CV Function
function downloadCV() {
    // Create a temporary element for PDF generation
    const element = document.querySelector('.cv-wrapper');
    
    // You can implement PDF download using libraries like:
    // html2pdf.js or jspdf in a real application
    
    alert('📄 CV Download Feature!\n\nIn a complete implementation, we would use:\n- html2pdf.js for PDF generation\n- Or window.print() for printing\n\nFor now, you can:\n1. Press Ctrl+P to print as PDF\n2. Take a screenshot\n3. Copy the HTML code for your portfolio');
    
    // Example for future implementation:
    // html2pdf().from(element).save('Syed_Muzammil_CV.pdf');
}

// Load saved preferences
function loadSavedPreferences() {
    // Load dark mode preference
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'true') {
        document.body.classList.add('dark-mode');
        const themeBtn = document.querySelector('.theme-toggle');
        themeBtn.textContent = '☀️ Light Mode';
        themeBtn.style.background = 'rgba(255,255,255,0.3)';
    }
    
    // Load saved photo
    const savedPhoto = localStorage.getItem('profilePhoto');
    if (savedPhoto) {
        const profilePhoto = document.getElementById('profilePhoto');
        profilePhoto.innerHTML = '';
        profilePhoto.style.backgroundImage = `url(${savedPhoto})`;
        profilePhoto.style.backgroundSize = 'cover';
        profilePhoto.style.backgroundPosition = 'center';
    }
}

// Add fade-in animation on scroll
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeIn 0.6s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all sections for animation
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Enhanced click effects
function addClickEffects() {
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Add ripple effect styles dynamically
function addRippleStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        button {
            position: relative;
            overflow: hidden;
        }
    `;
    document.head.appendChild(style);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    loadSavedPreferences();
    initializeAnimations();
    addRippleStyles();
    addClickEffects();
    
    console.log('🚀 CV Portfolio Loaded Successfully!');
    console.log('💡 Features: Dark Mode, Photo Upload, Animations, Responsive Design');
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl+D for dark mode toggle
    if (e.ctrlKey && e.key === 'd') {
        e.preventDefault();
        toggleTheme();
    }
    
    // Ctrl+S for download
    if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        downloadCV();
    }
});