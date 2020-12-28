import errorNotification from './pnotify.js';

export default function fetchCountries(searchQuery) {
  const url = 'https://restcountries.eu/rest/v2/name/';

  return fetch(`${url}${searchQuery}`)
    .then(response => {
      if (response.ok) return response.json();
      throw new Error('Error');
    })
    .catch(error => {
      errorNotification('No matches found. Try again.');
      return error;
    });
}

// fetchCountries(Ukraine)
//   .then(renderCountry)
//   .catch(error => {
//     console.log(error);
//   });

// function renderCountry(country) {
//   const markup = countryCardTpl(country);
//   refs.countryContainer.innerHTML = markup;
// }
