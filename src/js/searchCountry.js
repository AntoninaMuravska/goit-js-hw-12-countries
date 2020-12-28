import countriesListTpl from '../templates/countries-list.hbs';
import countryCardTpl from '../templates/country-card.hbs';
import refs from './refs';
import fetchCountries from './fetchCountries.js';
import errorNotification from './pnotify.js';

const debounce = require('lodash.debounce');
const { searchCountryInput, countryContainer } = refs;

searchCountryInput.addEventListener('input', debounce(searchCountry, 500));

function searchCountry(event) {
  const queryValue = event.target.value;
  //   console.dir(queryValue);
  fetchCountries(queryValue).then(data => {
    if (data.length === 1) {
      clearCountryContainer();
      updateCountryCard(data);
      return;
    }
    if (data.length >= 2 && data.length <= 10) {
      clearCountryContainer();
      updateCountriesList(data);
      return;
    }
    if (data.length > 10) {
      clearCountryContainer();
      errorNotification(
        'Too many matches found. Please enter a more specific query!',
      );
    }
  });
}

function updateCountryCard(country) {
  const countryCard = countryCardTpl(country);
  countryContainer.insertAdjacentHTML('afterbegin', countryCard);
}

function updateCountriesList(countries) {
  const countryList = countriesListTpl(countries);
  countryContainer.insertAdjacentHTML('afterbegin', countryList);
}

function clearCountryContainer() {
  countryContainer.innerHTML = '';
}
