async function windowActions() {
  const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';

  const request = await fetch(endpoint);
  const restaurants = await request.json();

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

  function displayMatches(event) {
    const matchArray = findMatches(event.target.value, restaurants);
    const html = matchArray.map(place => {
      return `
      <div class="box">
        <li>
          <span class="name">${place.name}</span> <br>
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