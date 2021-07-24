import Notiflix from 'notiflix';

export default function fetchCountries(name) {
  const BASE_URL = 'https://restcountries.eu/rest/v2/name/';

  return fetch(`${BASE_URL}${name}`)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Error');
    })
    .catch(error => {
      Notiflix.Notify.failure('Oops, there is no country with that name');
      return error;
    });
}

// fetchCountries('ukraine');
