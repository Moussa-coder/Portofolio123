const burger = document.getElementById('burger');
const navLinks = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    burger.classList.toggle('active');
});

// Animation des barres de compétences
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress-bar');
    const skillPercentages = document.querySelectorAll('.skill-percentage');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const percentage = entry.target.getAttribute('data-percentage');
                entry.target.style.width = percentage + '%';
                
                // Animation du pourcentage
                const percentageElement = entry.target.parentElement.parentElement.querySelector('.skill-percentage');
                animatePercentage(percentageElement, percentage);
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });

    skillBars.forEach(bar => {
        observer.observe(bar);
    });
}

// Animation des pourcentages
function animatePercentage(element, target) {
    let current = 0;
    const increment = target / 50;
    const duration = 1500;
    const interval = duration / 50;

    const counter = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '%';
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(current) + '%';
        }
    }, interval);
}

// Animation des cartes de compétences
function animateCompetenceCards() {
    const cards = document.querySelectorAll('.competence-category');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.category-icon');
            icon.style.transform = 'rotate(10deg) scale(1.1)';
        });
        
        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.category-icon');
            icon.style.transform = 'rotate(0) scale(1)';
        });
    });
}

// Animation des outils
function animateTools() {
    const tools = document.querySelectorAll('.tool-item');
    
    tools.forEach(tool => {
        tool.addEventListener('mouseenter', () => {
            const icon = tool.querySelector('.tool-icon');
            icon.style.transform = 'scale(1.2) rotate(5deg)';
        });
        
        tool.addEventListener('mouseleave', () => {
            const icon = tool.querySelector('.tool-icon');
            icon.style.transform = 'scale(1) rotate(0)';
        });
    });
}

// Animation au scroll
function handleScrollAnimations() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(element => {
        observer.observe(element);
    });
}

// Effet de parallaxe sur l'en-tête
function handleParallax() {
    const header = document.querySelector('.section-header');
    if (header) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            header.style.transform = `translateY(${scrolled * 0.2}px)`;
        });
    }
}

// Animation des cartes au survol
function handleCardHover() {
    const cards = document.querySelectorAll('.competence-category, .tool-item');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
            card.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = 'var(--shadow)';
        });
    });
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    // Ajouter la classe animate-on-scroll aux éléments
    const elementsToAnimate = document.querySelectorAll('.competence-category, .tool-item');
    elementsToAnimate.forEach(element => {
        element.classList.add('animate-on-scroll');
    });

    // Lancer les animations
    handleScrollAnimations();
    animateSkillBars();
    animateCompetenceCards();
    animateTools();
    handleParallax();
    handleCardHover();
});
