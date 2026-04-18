async function search(query) {
    window.location.href = `/listings/search?listing=${query}`;
}

async function liveSearch(query) {
    const res = await fetch(`/listings/search?listing=${encodeURIComponent(query)}`, {
        headers: { 'Accept': 'application/json' } // 👈 tells backend you want JSON
    });
    const data = await res.json();
    liveHTML(data);
}

const inputSearch = (e) => {
    let input = e.target;
    let query = input.value;
    const clearBtn = input.closest('.input-grp').querySelector('.clearBtn');
    if(input.value) {
        clearBtn.style.display = 'block';
    } else {
        clearBtn.style.display = 'none';
    }
    liveSearch(query.trim());
}

function liveHTML(data) {
    let liveHTML = ``;

    data.forEach(listing => {
        liveHTML += `
            
            <a href="/listing/${listing._id}" class="listing-link-search">
                <div class="card-search">
                    <img src="${listing.image.url}" class="listing-img">
                    <div class="listing-info">
                        <div class="listing-title-des">
                            <b>${listing.title}</b> <br>
                            <p>${listing.description}</p>
                        </div>
                        <span>&#8377;${listing.price}</span>
                    </div>
                </div>
            </a>
            <hr>
        `
    });

    inputs.forEach(input => {
        let currentResult = input.closest('.input-grp').querySelector('.search-results');
        currentResult.innerHTML = liveHTML;
    });
}

const inputs = document.querySelectorAll(".search-input");
const searchBtns = document.querySelectorAll(".search-btn");
const crossSearchs = document.querySelectorAll(".clearBtn");
const searchResults = document.querySelectorAll('.search-results');

searchBtns.forEach(searchBtn => {
    searchBtn.addEventListener('click', (e) => {
        e.preventDefault();
        let query = e.target.value;
        search(query.trim());
    });
});


crossSearchs.forEach(crossSearch => {
    crossSearch.addEventListener('click', (e) => {
        e.target.value = '';
        let query = e.target.value;
        crossSearch.style.display = 'none';
        liveSearch(query.trim());
        inputs.forEach(input => {
            input.value = '';
        });
    });
});

let noSearch;

inputs.forEach(input => {
    input.addEventListener('input', (e) => setTimeout(inputSearch(e), 100));
});

inputs.forEach(input => {
    input.addEventListener('click', (e) => {
        e.stopPropagation();
        noSearch = input.closest('.input-grp').querySelector('.search-results');
        noSearch.classList.add('active');
    });
});

noSearch?.addEventListener('click', (e) => {
    e.stopPropagation();
});

const body = document.querySelector('body');

body.addEventListener('click', (e) => {
    noSearch.classList.remove('active');
});

