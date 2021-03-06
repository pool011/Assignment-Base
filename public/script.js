async function windowActions() {
const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';

const request = await fetch(endpoint);
const restaurants = await request.json();

function findMatches(wordToMatch, restaurants) {
  return restaurants.filter(place => {
    const regex = new RegExp(wordToMatch, 'gi');
    return place.city.match(regex) || place.name.match(regex) || place.category.match(regex)
  });
}

function displayMatches(event) {
  const matchArray = findMatches(event.target.value, restaurants);
  const html = matchArray.map(place => {
    return `
    <div class="box">
      <li>
        <h2 class="subtitle is-3"><span class="name">${place.name}</span></h2>
        <span class="category">${place.category}</span> <br>
        <span class="address">${place.address_line_1}</span> <br>
        ${place.city}, ${place.state} ${place.zip}</span> <br>
        <span class="category">${place.category} <br>
        <span class="quarantining">Quarantining: ${place.ill_workers_restricted}</span>
      </li>
    </div>
    `
  }).join('');
  suggestions.innerHTML= html;
}

const searchInput  = document.querySelector('.input');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('keyup', (evt) => { displayMatches(evt) });

}
window.onload = windowActions();