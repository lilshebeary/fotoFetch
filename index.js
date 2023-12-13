const apiKey = process.env.API_KEY;

const fetchForm = document.getElementById('fetch-form');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const searchResults = document.querySelector('.search-results');
const showMore = document.getElementById('show-more-btn');

let inputData = "";
let page = 1;

async function fetchImages(){
    
    inputData = searchInput.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${apiKey}`;
    try {
        const response = await fetch(url);
        const data = await response.json();

        const results = data.results;

        if(page === 1){
            searchResults.innerHtml = "";
        }
      displayImg(results);
    } catch (error) {
        console.error("fetched no fotos", error);
    }
    page++;
    if(page > 1){
        showMore.style.display = "block";
    }
}

fetchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    page = 1;
    fetchImages()
} )
showMore.addEventListener('click', () => {
    fetchImages()
} )

const clearImg = ((inputData) => inputData="");

function displayImg(results){
    results.map(result => {
    const imgWrapper = document.createElement('div');
    imgWrapper.classList.add('search-result');
    const image = document.createElement('img');
    image.src = result.urls.small;
    image.alt = result.alt_description;
    const imgLink = document.createElement('a');
    imgLink.href = result.links.html;
    imgLink.target = "_blank";
    imgLink.textContent = result.alt_description;

    imgWrapper.appendChild(image);
    imgWrapper.appendChild(imgLink);
    searchResults.appendChild(imgWrapper);
})
}