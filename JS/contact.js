// Gestion du formulaire de contact
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Animation du bouton
    const submitBtn = contactForm.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
    submitBtn.disabled = true;

    // Récupération des données du formulaire
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData.entries());

    try {
        // Simulation d'envoi (à remplacer par votre logique d'envoi réelle)
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Message de succès
        showNotification('Message envoyé avec succès !', 'success');
        contactForm.reset();
    } catch (error) {
        showNotification('Erreur lors de l\'envoi du message.', 'error');
    } finally {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
});

// Animation des champs du formulaire
const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');

formInputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });

    input.addEventListener('blur', () => {
        if (!input.value) {
            input.parentElement.classList.remove('focused');
        }
    });
});

// Animation des cartes d'information
const infoCards = document.querySelectorAll('.info-card');

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

infoCards.forEach(card => {
    observer.observe(card);
});

// Animation des icônes sociales
const socialLinks = document.querySelectorAll('.social-link');

socialLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
        const icon = link.querySelector('i');
        icon.style.transform = 'scale(1.2) rotate(5deg)';
    });
    
    link.addEventListener('mouseleave', () => {
        const icon = link.querySelector('i');
        icon.style.transform = 'scale(1) rotate(0deg)';
    });
});

// Fonction de notification
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Animation d'entrée
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateY(0)';
    }, 100);
    
    // Suppression après 3 secondes
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Validation des champs en temps réel
formInputs.forEach(input => {
    input.addEventListener('input', () => {
        validateField(input);
    });
});

function validateField(input) {
    const value = input.value.trim();
    let isValid = true;
    let errorMessage = '';

    switch (input.type) {
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            isValid = emailRegex.test(value);
            errorMessage = 'Veuillez entrer une adresse email valide';
            break;
        case 'text':
            isValid = value.length >= 2;
            errorMessage = 'Ce champ doit contenir au moins 2 caractères';
            break;
        case 'textarea':
            isValid = value.length >= 10;
            errorMessage = 'Le message doit contenir au moins 10 caractères';
            break;
    }

    const formGroup = input.parentElement;
    const errorElement = formGroup.querySelector('.error-message') || document.createElement('div');
    
    if (!isValid) {
        errorElement.className = 'error-message';
        errorElement.textContent = errorMessage;
        if (!formGroup.querySelector('.error-message')) {
            formGroup.appendChild(errorElement);
        }
        input.classList.add('invalid');
    } else {
        errorElement.remove();
        input.classList.remove('invalid');
    }

    return isValid;
}
