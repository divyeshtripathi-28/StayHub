async function search(query) {
    window.location.href = `/listings/search?listing=${query}`;
}

async function liveSearch(query) {
    if (!query) return;
    const res = await fetch(`/listings/search?listing=${encodeURIComponent(query)}`, {
        headers: { 'Accept': 'application/json' } // 👈 tells backend you want JSON
    });
    const data = await res.json();
    liveHTML(data);
}

const inputSearch = (e) => {
    let query = input.value;
    console.log("QUERY:", query.trim());
    liveSearch(query.trim());
}

function liveHTML(data) {
    let liveHTML = ``;

    data.forEach(listing => {
        liveHTML += `
            <a href="/listing/${listing._id}" class="listing-link">
                <div class="card col listing-card">
                    <img src="${listing.image.url}" class="card-img-top" style="height: 20rem;">
                    <div class="card-img-overlay"></div>
                    <div class="card-body">
                        <p class="card-text">
                            <b>${listing.title}</b>  <br>
                            &#8377;${listing.price.toLocaleString("en-IN")} / night
                            <i class="tax-info"> &nbsp; &nbsp; +18% GST</i>
                        </p>
                    </div>
                </div>
            </a>
        `
    });

    document.querySelector(".listings-js").innerHTML = liveHTML;
}

const input = document.querySelector(".search-input");
const searchBtn = document.querySelector(".search-btn");
console.log("input:", input);      // Add these
console.log("searchBtn:", searchBtn); 

searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let query = input.value;
    console.log("QUERY:", query.trim());
    search(query.trim());
});


input.addEventListener('input', () => setTimeout(inputSearch, 300));
