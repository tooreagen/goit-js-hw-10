
export function markupCountry(countryArray) {
    return countryArray.map((country) => {
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
}