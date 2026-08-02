// =============================
// قائمة الأفلام
// =============================
const moviesList = [
    {
        id: "movie1",
        title: "Spider-Man: Brand New Day",
        badge: "TOP 10",
        rating: "7.5",
        year: "2026"
    },
    {
        id: "movie2",
        title: "The Odyssey",
        badge: "NEW",
        rating: "8.5",
        year: "2026"
    }
];

// =============================
// عرض الأفلام
// =============================
function renderMovies(movies) {
    const container = document.getElementById("moviesContainer");
    container.innerHTML = "";

    if (movies.length === 0) {
        container.innerHTML = `
            <p style="color:#aaa;text-align:center;padding:30px;">
                No movies available.
            </p>
        `;
        return;
    }

    movies.forEach(movie => {

        const card = `
        <a href="${movie.id}.html" class="movie-card">

            <div class="card-img-wrapper">

                <img
                    src="movie-posters/${movie.id}.jpg"
                    alt="${movie.title}"
                    onerror="this.src='https://via.placeholder.com/300x450/222/ffffff?text=No+Poster'"
                >

                ${
                    movie.badge
                    ? `<span class="badge-top">${movie.badge}</span>`
                    : ""
                }

                <span class="badge-tag">
                    <i class="fa-solid fa-star"></i>
                    ${movie.rating}
                </span>

            </div>

            <div class="card-info">
                <div class="card-title">${movie.title}</div>
                <div class="card-meta">${movie.year}</div>
            </div>

        </a>
        `;

        container.innerHTML += card;

    });
}

// =============================
// البحث
// =============================
function filterMovies() {

    const query = document
        .getElementById("searchInput")
        .value
        .toLowerCase();

    const filtered = moviesList.filter(movie =>
        movie.title.toLowerCase().includes(query)
    );

    renderMovies(filtered);
}

// =============================
// تحميل الصفحة
// =============================
document.addEventListener("DOMContentLoaded", () => {
    renderMovies(moviesList);
});
