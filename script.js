// Intersection Observer to trigger animations on scroll
document.addEventListener('DOMContentLoaded', function() {
    // Options for the observer
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2 // Trigger when 20% of the element is visible
    };

    // Callback function when elements intersect
    const callback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add 'animate' class to trigger animations
                entry.target.classList.add('animate');

                // Optionally unobserve after animation triggers (animations only play once)
                // observer.unobserve(entry.target);
            }
        });
    };

    // Create the observer
    const observer = new IntersectionObserver(callback, options);

    // Observe all animation elements
    const animatedElements = document.querySelectorAll(
        '.email-decoration, .year-animation, .projects-animation, .writing-animation, .classes-animation'
    );

    animatedElements.forEach(element => {
        observer.observe(element);
    });
});
