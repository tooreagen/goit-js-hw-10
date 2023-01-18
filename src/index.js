import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from "./fetchCountries";
import debounce from "lodash.debounce";

const DEBOUNCE_DELAY = 300;
const inputCountryName = document.querySelector("#search-box");
const ulCountryList = document.querySelector(".country-list");
const divCountryInfo = document.querySelector(".country-info");

function countrySearch(event) {
    const name = event.target.value.trim();
    
    if (name) {
        fetchCountries(name).then((data) => {
            if (data.length > 10) {
                Notify.info("Too many matches found. Please enter a more specific name.");
                return;
            }
            createMarkup(data);
        }).catch(() => Notify.failure("Oops, there is no country with that name."));
    } else {
        clearMarkup();
    }
}

function createMarkup(countryArray) {
    clearMarkup();

    if (countryArray.length >= 2) {
        const markup = countryArray.map((country) => {
            const {
                flags: {svg: countryFlags},
                name: { official: countryName },
            } = country;

            return `<div class="heading">
                    <img src=${countryFlags} width="50">
                    <p class="country-name country-name-list">${countryName}</p>
                    </div>`
        }).join("");
        ulCountryList.innerHTML = markup;
    }
    else {
        const markup = countryArray.map((country) => {
            const {
                flags: {svg: countryFlags},
                name: { official: countryName },
                capital,
                population,
                languages,
            } = country;

            return `<div class="heading">
                        <img src=${countryFlags} width="50">
                        <p class="country-name">${countryName}</p>
                    </div>
                    <p><span class="county-property">Capital:</span> ${capital}</p>
                    <p><span class="county-property">Population:</span> ${population}</p>
                    <p><span class="county-property">Languages:</span> ${Object.values(languages)}</p>`
        }).join("");
        divCountryInfo.innerHTML = markup;
    }
}

function clearMarkup() {
    ulCountryList.innerHTML = "";
    divCountryInfo.innerHTML = "";
}

inputCountryName.addEventListener("input", debounce(countrySearch, DEBOUNCE_DELAY));

//