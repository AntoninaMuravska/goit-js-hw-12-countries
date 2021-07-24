import refs from './refs.js';
import fetchCountries from './fetchCountries.js';
import Notiflix from 'notiflix';
import countriesListTpl from '../templates/countries-list.hbs';
import countryCardTpl from '../templates/country-card.hbs';

const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

refs.inputRef.addEventListener('input', debounce(searchCountry, DEBOUNCE_DELAY));

function searchCountry(e) {
  const queryValue = e.target.value;
  // console.dir(queryValue);

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
      Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
    }

  });
}

function updateCountryCard(country) {
  const countryCard = countryCardTpl(country);
  refs.countryInfoCardRef.insertAdjacentHTML('afterbegin', countryCard);
}

function updateCountriesList(countries) {
  const countryList = countriesListTpl(countries);
  refs.countryListRef.insertAdjacentHTML('afterbegin', countryList);
}

function clearCountryContainer() {
  refs.countryListRef.innerHTML = '';
  refs.countryInfoCardRef.innerHTML = '';
}
