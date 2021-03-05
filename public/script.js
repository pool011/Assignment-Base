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
    return place.city.match(regex) // change these values based on what filters we decide on.
  });
}

function displayMatches() {
  console.log(this.value);
}

const searchInput  = document.querySelector('.search-bar');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('change', displayMatches);