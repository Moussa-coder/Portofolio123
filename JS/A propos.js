// Gestion du menu burger
const burger = document.getElementById('burger');
const navLinks = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    burger.classList.toggle('active');
});

// Animation des statistiques
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
        const target = parseInt(stat.textContent);
        let current = 0;
        const increment = target / 50; // Vitesse de l'animation
        const duration = 2000; // Durée en ms
        const interval = duration / 50;

        const counter = setInterval(() => {
            current += increment;
            if (current >= target) {
                stat.textContent = target;
                clearInterval(counter);
            } else {
                stat.textContent = Math.floor(current);
            }
        }, interval);
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

// Animation de la timeline
function animateTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });

    timelineItems.forEach(item => {
        observer.observe(item);
    });
}

// Animation des cartes de compétences
function animateSkillCards() {
    const skillCards = document.querySelectorAll('.skill-card');
    
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.skill-icon');
            icon.style.transform = 'scale(1.2) rotate(5deg)';
        });
        
        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.skill-icon');
            icon.style.transform = 'scale(1) rotate(0deg)';
        });
    });
}

// Effet de parallaxe sur l'en-tête
function handleParallax() {
    const header = document.querySelector('.about-header');
    if (header) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            header.style.transform = `translateY(${scrolled * 0.2}px)`;
        });
    }
}

// Animation des cartes statistiques
function animateStatCards() {
    const statCards = document.querySelectorAll('.stat-card');
    
    statCards.forEach(card => {
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
    const elementsToAnimate = document.querySelectorAll('.stat-card, .skill-card, .about-content');
    elementsToAnimate.forEach(element => {
        element.classList.add('animate-on-scroll');
    });

    // Lancer les animations
    handleScrollAnimations();
    animateTimeline();
    animateSkillCards();
    handleParallax();
    animateStatCards();
    
    // Lancer l'animation des statistiques après un court délai
    setTimeout(animateStats, 500);
});
