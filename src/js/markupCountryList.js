
export function markupCountryList(countryArray) {
    return countryArray.map((country) => {
        const {
            flags: { svg: countryFlags },
            name: { official: countryName },
        } = country;

        return `<div class="heading">
            <img src=${countryFlags} width="50">
            <p class="country-name country-name-list">${countryName}</p>
            </div>`
    }).join("");
}