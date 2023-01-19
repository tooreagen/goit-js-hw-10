import '../css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from "./fetchCountries";
import { markupCountryList } from "./markupCountryList";
import { markupCountry } from "./markupCountry";
import debounce from "lodash.debounce";

const DEBOUNCE_DELAY = 300;
const inputCountryName = document.querySelector("#search-box");
const ulCountryList = document.querySelector(".country-list");
const divCountryInfo = document.querySelector(".country-info");

function countrySearch(event) {
    const name = event.target.value.trim();
    
    if (!name) {
        clearMarkup();
        return;
    }
    fetchCountries(name).then((data) => {
        if (data.length > 10) {
            Notify.info("Too many matches found. Please enter a more specific name.");
            clearMarkup();
            return;
        }
        createMarkup(data);
    }).catch(() => {
        Notify.failure("Oops, there is no country with that name.");
        clearMarkup();
    });
}

function createMarkup(countryArray) {
    clearMarkup();

    if (countryArray.length >= 2) {
        ulCountryList.innerHTML = markupCountryList(countryArray);
    }
    else {
        divCountryInfo.innerHTML = markupCountry(countryArray);
    }
}

function clearMarkup() {
    ulCountryList.innerHTML = "";
    divCountryInfo.innerHTML = "";
}

inputCountryName.addEventListener("input", debounce(countrySearch, DEBOUNCE_DELAY));