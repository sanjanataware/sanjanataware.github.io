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
        '.email-decoration, .year-animation, .projects-animation, .writing-animation, .classes-animation, .hobbies-animation'
    ).forEach(el => animationObserver.observe(el));


    // --- Articles carousel (Writing section) ---
    const carousel = document.getElementById('articles-carousel');
    if (carousel) {
        const formatDate = (iso) => {
            const d = new Date(iso + 'T00:00:00');
            return isNaN(d) ? iso : d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
        };

        fetch('articles.json?v=' + Date.now())
            .then(res => res.json())
            .then(articles => {
                carousel.innerHTML = '';
                articles.forEach(article => {
                    const card = document.createElement('a');
                    card.className = 'article-card';
                    card.href = 'article.html?id=' + encodeURIComponent(article.id);

                    const thumb = document.createElement('div');
                    thumb.className = 'article-thumb';
                    if (article.thumbnail) {
                        const img = document.createElement('img');
                        img.src = article.thumbnail;
                        img.alt = article.title;
                        img.loading = 'lazy';
                        thumb.appendChild(img);
                    } else {
                        thumb.classList.add('article-thumb-placeholder');
                        const snippet = document.createElement('span');
                        const plain = (article.excerpt || article.content || '')
                            .replace(/<[^>]*>/g, ' ')
                            .replace(/\s+/g, ' ')
                            .trim();
                        const words = plain.split(' ').slice(0, 14).join(' ');
                        snippet.textContent = words + (plain.split(' ').length > 14 ? '…' : '');
                        thumb.appendChild(snippet);
                    }

                    const body = document.createElement('div');
                    body.className = 'article-card-body';
                    const title = document.createElement('h4');
                    title.textContent = article.title;
                    const date = document.createElement('p');
                    date.className = 'article-date';
                    date.textContent = formatDate(article.date);
                    body.appendChild(title);
                    body.appendChild(date);

                    card.appendChild(thumb);
                    card.appendChild(body);
                    carousel.appendChild(card);
                });
            })
            .catch(() => {
                carousel.innerHTML = '<p class="carousel-loading">Couldn\'t load articles. You can still find my writing on <a href="https://medium.com/@sanjana.taware" target="_blank">Medium</a>.</p>';
            });

        document.querySelector('.carousel-prev').addEventListener('click', () => {
            carousel.scrollBy({ left: -carousel.clientWidth * 0.8, behavior: 'smooth' });
        });
        document.querySelector('.carousel-next').addEventListener('click', () => {
            carousel.scrollBy({ left: carousel.clientWidth * 0.8, behavior: 'smooth' });
        });
    }


    // --- Spotlight cursor effect ---
    const spotlight = document.getElementById('spotlight');
    document.addEventListener('mousemove', (e) => {
        spotlight.style.background = `radial-gradient(circle 55px at ${e.clientX}px ${e.clientY}px, rgba(233,196,106,0.22) 0%, rgba(233,196,106,0.05) 70%, transparent 100%)`;
    });
});
