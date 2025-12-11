// Modal Functions
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Close modal when clicking outside
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Popup notification system
function showPopup(message, type = 'success') {
    const popup = document.createElement('div');
    popup.className = `popup popup-${type}`;
    popup.textContent = message;
    popup.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 9999;
        animation: slideIn 0.3s ease-out;
        font-weight: 500;
    `;
    
    document.body.appendChild(popup);
    
    setTimeout(() => {
        popup.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => popup.remove(), 300);
    }, 2000);
}

// Add CSS animations for popups
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Enhanced Smooth scrolling for navigation links with visual feedback
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            
            const targetSection = document.querySelector(href);
            const targetId = href.substring(1);
            
            // Scroll to the section
            targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            
            // Show visual feedback with section name
            const sectionName = targetId.charAt(0).toUpperCase() + targetId.slice(1);
            showPopup(`📍 Scrolling to ${sectionName}...`, 'success');
            
            // Add highlight effect to the section
            targetSection.style.transition = 'all 0.3s ease';
            targetSection.style.boxShadow = 'inset 0 0 30px rgba(11, 61, 145, 0.3)';
            
            setTimeout(() => {
                targetSection.style.boxShadow = 'none';
            }, 2000);
        }
    });
});

// Add animation to elements on scroll - faster refresh
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe project cards and about cards with faster animations
document.querySelectorAll('.project-card, .about-card, .skill-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    observer.observe(el);
});

// Active navigation link on scroll - faster update
let scrollTimeout;
window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    }, 50);
}, { passive: true });

// Button click feedback
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', () => {
        showPopup('Button clicked! ✨', 'success');
    });
});

// Welcome message with faster load
window.addEventListener('load', function() {
    console.log('Welcome to Nuthan Kanth K L\'s Portfolio!');
    console.log('Click on About or Skills sections to learn more!');
    showPopup('Welcome to my portfolio! 👋', 'success');
});
