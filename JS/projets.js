const burger = document.getElementById('burger');
const navLinks = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
    navLinks.classList.toggle('active')
});

// Gestion des filtres de projets
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Mise à jour des boutons actifs
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filter = button.getAttribute('data-filter');

        // Animation de filtrage
        projectCards.forEach(card => {
            const category = card.getAttribute('data-category');
            
            if (filter === 'all' || filter === category) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Animation au scroll pour les cartes de projet
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const projectObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            projectObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

projectCards.forEach(card => {
    projectObserver.observe(card);
});

// Animation des images au survol
projectCards.forEach(card => {
    const image = card.querySelector('.project-image img');
    
    card.addEventListener('mouseenter', () => {
        image.style.transform = 'scale(1.1)';
    });
    
    card.addEventListener('mouseleave', () => {
        image.style.transform = 'scale(1)';
    });
});

// Animation des tags
const projectTags = document.querySelectorAll('.project-tags span');
projectTags.forEach(tag => {
    tag.addEventListener('mouseenter', () => {
        tag.style.transform = 'translateY(-2px)';
        tag.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    });
    
    tag.addEventListener('mouseleave', () => {
        tag.style.transform = 'translateY(0)';
        tag.style.boxShadow = 'none';
    });
});
