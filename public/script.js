const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';
const restaurants = [];
  
fetch(endpoint)
  .then(blob => blob.json())
  .then(data => restaurants.push(...data));
    
  //console.log(restaurants);
  //console.log(restaurants);

function findMatches(wordToMatch, restaurants) {
  const tempArr = restaurants.filter(place => {
    const regex = new RegExp(wordToMatch, 'gi');
    return place.city.match(regex) || place.name.match(regex) || place.category.match(regex)
  });
  const tempSet = new Set(tempArr.map(place => place.establishment_id));
  const unique_ids = Array.from(tempSet).slice(0,9);
  console.log(unique_ids);
  let id_length  = unique_ids.length - 1;
  const results = [];
  for (place in restaurants) {
    if (restaurants[place].establishment_id == unique_ids[id_length]) {
      //console.log(id);
      //console.log(unique_ids.slice(id_length-10,id_length));
      console.log(unique_ids.pop());
      id_length -= 1;
      //console.log(place);
      let catThis = restaurants[place];
      results.push(catThis);
    }
  }
  return results;//.slice(0,9);
}

function displayMatches() {
  const matchArray = findMatches(this.value, restaurants);
  const html = matchArray.map(place => {
    return `
      <li>
        <span class="name">${place.name} ${place.establishment_id}</span> <br>
        <span class="address">${place.address_line_1} <br>
        ${place.city}, ${place.state} ${place.zip}</span> <br>
        <span class="category">Category: ${place.category} <br>
        <span class="quarantining">Quarantining: ${place.ill_workers_restricted}</br></span>
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