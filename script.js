document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.mobile-nav-toggle');
    const primaryNav = document.getElementById('primary-navigation');
    const navLinks = document.querySelectorAll('.nav-links a');

    if (navToggle && primaryNav) {
        navToggle.addEventListener('click', () => {
            const isOpen = primaryNav.classList.toggle('active');
            primaryNav.setAttribute('data-visible', String(isOpen));
            navToggle.setAttribute('aria-expanded', String(isOpen));
            navToggle.innerHTML = isOpen ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (primaryNav.classList.contains('active')) {
                    primaryNav.classList.remove('active');
                    primaryNav.setAttribute('data-visible', 'false');
                    navToggle.setAttribute('aria-expanded', 'false');
                    navToggle.innerHTML = '<i class="fas fa-bars"></i>';
                }
            });
        });
    }

    // Active Navigation Link on Scroll
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        let current = 'home';

        sections.forEach(section => {
            const top = section.offsetTop - 130;
            if (scrollY >= top) {
                current = section.getAttribute('id');
            }
        });

        // Map individual practice sections to highlight "Practice Areas" in top nav
        const practiceIds = ['civil-litigation', 'criminal-litigation', 'family-law', 'ni-act'];
        const navMatch = practiceIds.includes(current) ? 'practice-areas' : current;

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${navMatch}`) {
                link.classList.add('active');
            }
        });
    });

    // Consultation Modal
    const modal = document.getElementById('consultationModal');
    const closeBtn = document.querySelector('.close-modal');
    const modalForm = document.getElementById('consultationForm');
    const modalSuccess = document.getElementById('formSuccess');
    const modalAreaSelect = document.getElementById('modalArea');

    document.querySelectorAll('.open-consultation').forEach(btn => {
        btn.addEventListener('click', (e) => {
            if (!modal) return;
            e.preventDefault();
            const area = btn.getAttribute('data-area');
            if (area && modalAreaSelect) {
                modalAreaSelect.value = area;
            }
            modal.style.display = 'block';
            if (modalForm) {
                modalForm.style.display = 'block';
                modalForm.reset();
                if (area && modalAreaSelect) modalAreaSelect.value = area;
            }
            if (modalSuccess) modalSuccess.style.display = 'none';
        });
    });

    if (closeBtn && modal) {
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    window.addEventListener('click', (e) => {
        if (modal && e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Handle Form Submissions (Modal + Inline)
    function bindFormSuccess(formEl, successEl) {
        if (!formEl || !successEl) return;
        formEl.addEventListener('submit', (e) => {
            e.preventDefault();
            formEl.style.display = 'none';
            successEl.style.display = 'block';
        });
    }

    bindFormSuccess(modalForm, modalSuccess);
    bindFormSuccess(
        document.getElementById('inlineConsultationForm'),
        document.getElementById('inlineFormSuccess')
    );

    // Subtle Scroll Animations
    const revealTargets = document.querySelectorAll(
        '.about-layout, .founder-grid, .practice-jump-card, .practice-detail-card, .office-card, .contact-form-wrapper'
    );

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

        revealTargets.forEach(el => {
            el.classList.add('fade-up');
            observer.observe(el);
        });
    }
});
