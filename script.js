document.addEventListener('DOMContentLoaded', function() {

    // --- Scroll-based active nav link highlighting ---
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.tab-section');

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                });
            }
        });
    }, { rootMargin: '0px 0px -65% 0px', threshold: 0 });

    sections.forEach(section => sectionObserver.observe(section));

    // --- Animations triggered as sections scroll into view ---
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll(
        '.email-decoration, .year-animation, .projects-animation, .writing-animation, .classes-animation'
    ).forEach(el => animationObserver.observe(el));


    // --- Spotlight cursor effect ---
    const spotlight = document.getElementById('spotlight');
    document.addEventListener('mousemove', (e) => {
        spotlight.style.background = `radial-gradient(circle 55px at ${e.clientX}px ${e.clientY}px, rgba(233,196,106,0.22) 0%, rgba(233,196,106,0.05) 70%, transparent 100%)`;
    });
});
