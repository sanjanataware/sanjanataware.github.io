document.addEventListener('DOMContentLoaded', function() {

    // --- Tab switching ---
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.tab-section');

    function showSection(id) {
        sections.forEach(s => s.classList.remove('active'));
        navLinks.forEach(l => l.classList.remove('active'));

        const target = document.getElementById(id);
        if (target) target.classList.add('active');

        const activeLink = document.querySelector(`.nav-link[data-section="${id}"]`);
        if (activeLink) activeLink.classList.add('active');
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const section = link.dataset.section;
            showSection(section);

            // Close mobile menu if open
            document.getElementById('sidebar').classList.remove('open');
        });
    });

    // --- Animations triggered when a section becomes active ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.2 });

    function observeAnimations() {
        document.querySelectorAll(
            '.email-decoration, .year-animation, .projects-animation, .writing-animation, .classes-animation'
        ).forEach(el => observer.observe(el));
    }

    observeAnimations();

    // Re-trigger animations when switching tabs by re-observing
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            setTimeout(observeAnimations, 50);
        });
    });


    // --- Spotlight cursor effect ---
    const spotlight = document.getElementById('spotlight');
    document.addEventListener('mousemove', (e) => {
        spotlight.style.background = `radial-gradient(circle 55px at ${e.clientX}px ${e.clientY}px, rgba(233,196,106,0.22) 0%, rgba(233,196,106,0.05) 70%, transparent 100%)`;
    });

    // --- Mobile menu toggle ---
    const menuBtn = document.getElementById('mobile-menu-btn');
    const sidebar = document.getElementById('sidebar');

    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            sidebar.classList.toggle('open');
        });
    }
});
