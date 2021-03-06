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
    return place.city.match(regex) || place.name.match(regex) || place.category.match(regex) // change these values based on what filters we decide on.
  });
}

function displayMatches() {
  const matchArray = findMatches(this.value, restaurants);
  const html = matchArray.map(place => {
    return `
      <li>
        <span class="name">Name: ${place.name}</span> <br>
        <span class="city">City: ${place.city}</span> <br>
        <span class="category">Category: ${place.category} <br>
        <span class="quarantining">Quarantining: ${place.ill_workers_restricted}</span>
      </li>
    `
  });
   suggestions.innerHTML= html;
}

const searchInput  = document.querySelector('.search-bar');
const suggestions = document.querySelector('.suggestions');
const submitButton = document.querySelector('.submit-button');

searchInput.addEventListener('change', displayMatches);
//document.addEventListener('click', displayMatches);

function control(enter) {
  if (enter.keycode === 13) {
    enter.preventDefault();
    submitButton.click()
  }
}

document.addEventListener('keydown', control);