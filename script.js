// مصفوفة ديناميكية مجهزة لـ 40 فيلم
const moviesList = Array.from({ length: 40 }, (_, i) => ({
    id: `movie${i + 1}`,
    title: i === 0 ? "Spider-Man: Brand New Day" : `Movie Title ${i + 1}`,
    badge: i < 5 ? "TOP 10" : "HD",
    rating: (7.5 + (i % 25) * 0.1).toFixed(1),
    year: "2026"
}));

// الفحص التلقائي لملفات movieX.html (خدّام مع Live Server)
async function checkPageExists(url) {
    try {
        const response = await fetch(url, { method: 'HEAD' });
        return response.ok;
    } catch (e) {
        return false;
    }
}

async function renderMovies(movies) {
    const container = document.getElementById('moviesContainer');
    container.innerHTML = '';

    let activeMoviesCount = 0;

    for (const movie of movies) {
        const pageUrl = `${movie.id}.html`;
        const exists = await checkPageExists(pageUrl);

        if (exists) {
            activeMoviesCount++;
            const cardHTML = `
                <a href="${pageUrl}" class="movie-card">
                    <div class="card-img-wrapper">
                        <img src="movie-posters/${movie.id}.jpg" alt="${movie.title}" onerror="this.src='https://via.placeholder.com/300x169/111/fff?text=No+Cover'">
                        ${movie.badge ? `<span class="badge-top">${movie.badge}</span>` : ''}
                        <span class="badge-tag"><i class="fa-solid fa-star"></i> ${movie.rating}</span>
                    </div>
                    <div class="card-info">
                        <div class="card-title">${movie.title}</div>
                        <div class="card-meta">${movie.year}</div>
                    </div>
                </a>
            `;
            container.innerHTML += cardHTML;
        }
    }

    if (activeMoviesCount === 0) {
        container.innerHTML = '<p style="color:#aaa;">No movies available currently. Add movieX.html files to render them here.</p>';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    renderMovies(moviesList);
});

// محرك البحث
function filterMovies() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const filtered = moviesList.filter(m => m.title.toLowerCase().includes(query));
    renderMovies(filtered);
}