const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';
const restaurants = [];
  
fetch(endpoint)
  .then(blob => blob.json())
  .then(data => restaurants.push(...data));
    
function findMatches(wordToMatch, restaurants) {
  return restaurants.filter(place => {
    const regex = new RegExp(wordToMatch, 'gi');
    return place.city.match(regex) || place.name.match(regex) || place.category.match(regex)
  });
}

function displayMatches() {
  const matchArray = findMatches(this.value, restaurants);
  const html = matchArray.map(place => {
    return `
      <li>
        <span class="name">${place.name}</span> <br>
        <span class="category">${place.category} <br>
        <span class="address">${place.address_line_1} <br>
        ${place.city}, ${place.state} ${place.zip}</span> <br>
        <span class="category">${place.category} <br>
        <span class="quarantining">Quarantining: ${place.ill_workers_restricted}</span>
      </li>
    `
  }).join('');
  suggestions.innerHTML= html;
}

const searchInput  = document.querySelector('.input');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);

document.addEventListener('keydown', control);