const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';
const restaurants = [];
  
fetch(endpoint)
  .then(blob => blob.json())
  .then(data => restaurants.push(...data));
    
  //console.log(restaurants);
  //console.log(restaurants);

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
        <span class="address">${place.address_line_1} <br>
        ${place.city}, ${place.state} ${place.zip}</span> <br>
        <span class="category">Category: ${place.category} <br>
        <span class="quarantining">Quarantining: ${place.ill_workers_restricted}</span>
      </li>
    `
  }).join('');
  suggestions.innerHTML= html;
}

const searchInput  = document.querySelector('.search-bar');
const suggestions = document.querySelector('.suggestions');
const submitButton = document.querySelector('.submit-button');

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);
//document.addEventListener('click', displayMatches);

function control(enter) {
  if (enter.keycode === 13) {
    enter.preventDefault();
    submitButton.click()
  }
}

document.addEventListener('keydown', control);