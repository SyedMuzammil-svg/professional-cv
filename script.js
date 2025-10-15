// Theme Toggle Function
function toggleTheme() {
    console.log('Toggling theme');
    document.body.classList.toggle('dark-mode');
    const themeBtn = document.getElementById('themeToggle');
    
    if (document.body.classList.contains('dark-mode')) {
        themeBtn.textContent = '☀️ Light Mode';
        themeBtn.style.background = 'rgba(255,255,255,0.3)';
    } else {
        themeBtn.textContent = '🌙 Dark Mode';
        themeBtn.style.background = 'rgba(255,255,255,0.2)';
    }
    
    // Save theme preference
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
}
// Download CV Function - PICTURE FIX & SKILLS COLOR
function downloadCV() {
    // Get current photo URL
    const currentPhoto = document.querySelector('.profile-photo');
    const photoStyle = window.getComputedStyle(currentPhoto);
    const photoUrl = photoStyle.backgroundImage.replace(/url\(['"]?(.*?)['"]?\)/i, '$1');
    
    // Create a copy of CV content without controls
    const cvWrapper = document.querySelector('.cv-wrapper');
    const cvClone = cvWrapper.cloneNode(true);
    
    // Remove controls (dark mode & download buttons)
    const controls = cvClone.querySelector('.controls');
    if (controls) {
        controls.remove();
    }
    
    const cvContent = cvClone.innerHTML;
    
    // Create a new window for printing
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Syed Muzammil - Web Developer CV</title>
            <style>
                body { 
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
                    margin: 0; 
                    padding: 0;
                    background: white;
                    color: #2c3e50;
                    line-height: 1.6;
                }
                .container { 
                    max-width: 1000px; 
                    margin: 0 auto; 
                    padding: 20px;
                }
                .cv-wrapper { 
                    background: white; 
                    border-radius: 15px;
                    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
                    overflow: hidden;
                }
                .header { 
                    background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%); 
                    color: white; 
                    padding: 40px; 
                }
                .profile-section { 
                    display: flex; 
                    align-items: center; 
                    gap: 30px; 
                }
                .profile-photo { 
                    width: 140px; 
                    height: 140px; 
                    border-radius: 50%; 
                    border: 4px solid #3498db;
                    background-image: url('${photoUrl}') !important;
                    background-size: cover !important;
                    background-position: center !important;
                    background-repeat: no-repeat !important;
                }
                .personal-info h1 {
                    font-size: 2.2em;
                    margin-bottom: 5px;
                    color: white;
                }
                .personal-info .title {
                    font-size: 1.2em;
                    color: #3498db;
                    margin-bottom: 15px;
                    font-weight: 600;
                }
                .contact-info {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 8px;
                    margin-top: 15px;
                }
                .contact-item {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    color: white;
                }
                .main-content { 
                    display: grid; 
                    grid-template-columns: 1fr 1fr; 
                    gap: 30px; 
                    padding: 40px;
                }
                .section { 
                    margin-bottom: 25px; 
                }
                .section-title { 
                    color: #2c3e50; 
                    border-bottom: 2px solid #3498db; 
                    padding-bottom: 8px; 
                    margin-bottom: 15px;
                    font-size: 1.3em;
                    font-weight: 600;
                }
                .skills-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
                    gap: 8px;
                }
                .skill-item {
                    background: #2c3e50 !important;
                    color: white !important;
                    padding: 6px 12px;
                    border-radius: 15px;
                    text-align: center;
                    font-size: 0.85em;
                    border: 1px solid #34495e;
                }
                .experience-item, .education-item {
                    margin-bottom: 15px;
                    padding: 15px;
                    background: rgba(52, 152, 219, 0.1);
                    border-radius: 8px;
                    border-left: 4px solid #3498db;
                }
                .company, .institute {
                    font-weight: bold;
                    color: #2c3e50;
                    font-size: 1.1em;
                    margin-bottom: 5px;
                }
                .duration {
                    color: #3498db;
                    font-size: 0.85em;
                    margin-bottom: 8px;
                }
                .achievement-list {
                    list-style: none;
                    padding-left: 0;
                }
                .achievement-list li {
                    padding: 4px 0;
                    padding-left: 20px;
                    position: relative;
                    color: #2c3e50;
                }
                .achievement-list li:before {
                    content: "✓";
                    position: absolute;
                    left: 0;
                    color: #3498db;
                    font-weight: bold;
                }
                
                /* Hide controls in print */
                .controls { 
                    display: none !important; 
                }
                
                /* Ensure colors work in print */
                @media print {
                    body { 
                        margin: 0; 
                        padding: 0;
                        background: white !important;
                        color: black !important;
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                    }
                    .container {
                        padding: 0;
                        margin: 0;
                    }
                    .cv-wrapper {
                        box-shadow: none;
                        border-radius: 0;
                    }
                    .header { 
                        background: #2c3e50 !important; 
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                    }
                    .skill-item {
                        background: #2c3e50 !important;
                        color: white !important;
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                        border: 1px solid #34495e !important;
                    }
                    .profile-photo {
                        background-image: url('${photoUrl}') !important;
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                    }
                    .controls { 
                        display: none !important; 
                    }
                    @page {
                        margin: 0.5in;
                        size: A4;
                    }
                }
                
                @media (max-width: 768px) {
                    .main-content {
                        grid-template-columns: 1fr;
                        gap: 20px;
                        padding: 20px;
                    }
                    .profile-section {
                        flex-direction: column;
                        text-align: center;
                        gap: 20px;
                    }
                    .contact-info {
                        grid-template-columns: 1fr;
                    }
                    .header {
                        padding: 30px 20px;
                    }
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="cv-wrapper">
                    ${cvContent}
                </div>
            </div>
            <script>
                window.onload = function() {
                    // Auto-print after 1 second
                    setTimeout(() => {
                        window.print();
                    }, 1000);
                    
                    // Close window after print
                    window.onafterprint = function() {
                        setTimeout(() => {
                            window.close();
                        }, 500);
                    };
                };
            </script>
        </body>
        </html>
    `);
    printWindow.document.close();
}
// Load saved preferences
function loadSavedPreferences() {
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'true') {
        document.body.classList.add('dark-mode');
        const themeBtn = document.getElementById('themeToggle');
        if (themeBtn) {
            themeBtn.textContent = '☀️ Light Mode';
            themeBtn.style.background = 'rgba(255,255,255,0.3)';
        }
    }
}

// Initialize animations
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

    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Event listeners setup
function setupEventListeners() {
    const themeToggle = document.getElementById('themeToggle');
    const downloadBtn = document.getElementById('downloadBtn');
    
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', downloadCV);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('CV Portfolio Loaded');
    setupEventListeners();
    loadSavedPreferences();
    initializeAnimations();
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.key === 'd') {
        e.preventDefault();
        toggleTheme();
    }
    
    if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        downloadCV();
    }
});
