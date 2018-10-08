require('./styles/index.scss');

const apiKey = 'https://restcountries.eu/rest/v2'
const results = document.querySelector("#results")
const resultsTitle = document.querySelector("#resultsTitle")
const resultsContent = document.querySelector("#resultsContent")
const resultsCountriesFound = document.querySelector("#resultsCountriesFound")
const countrySearch = document.querySelector("#countrySearch")
const countryName = document.querySelector("#countryName")

/*
countrySearch.addEventListener('submit', e => {
  e.preventDefault()
  fetch(`${apiKey}/name/${countryName.value}`)
    .then(res => res.json())
    .then(data => manageData(data))
    .catch(err => console.log(err))
}) */

// just for tests 😉
document.addEventListener('DOMContentLoaded', e => {
  fetch(`${apiKey}/name/Pol`)
    .then(res => res.json())
    .then(data => manageData(data))
    .catch(err => console.log(err))
})

const manageData = data => {
  console.log(data)
  if (data.status) {
    results.innerHTML = '<h3>Ops! Looks like there\'s no data to display.</h3>'
    return false;
  }
  data.forEach((country, index) => {
    const {
      name,
      flag,
      nativeName,
      capital,
      population,
      alpha2Code,
      alpha3Code,
      callingCodes,
      topLevelDomain,
      subregion,
      currencies
    } = data[index]
    const foundData = `
      <div class="country" data-result="${index}">
        <h3 class="country-title">${ name } <img class="country-flag" src="${ flag }" alt></h3>

        <dl class="country-info">
          <div class="info-group">
            <dt class="info-title">Native Name</dt>
            <dd class="info-value">${ nativeName }</dd>
          </div>
  
          <div class="info-group">
            <dt class="info-title">Capital</dt>
            <dd class="info-value">${ capital }</dd>
          </div>

          <div class="info-group">
            <dt class="info-title">Population</dt>
            <dd class="info-value">${ population }</dd>
          </div>

          <div class="info-group">
            <dt class="info-title">Alpha Code</dt>
            <dd class="info-value">${ alpha2Code }</dd>
          </div>

          <div class="info-group">
            <dt class="info-title">Alpha Code 2</dt>
            <dd class="info-value">${ alpha3Code }</dd>
          </div>
          
          <div class="info-group">
            <dt class="info-title">Subregion</dt>
            <dd class="info-value">${ subregion }</dd>
          </div>
        </dl>

        <dl class="country-info">
          <div class="info-group">
            <dt class="info-title">Currencies</dt>
            <dd class="info-value">${ currencies[0].name }</dd>
          </div>
    
          <div class="info-group">
            <dt class="info-title">Calling Codes</dt>
            <dd class="info-value">${ callingCodes[0] }</dd>
          </div>

          <div class="info-group">
            <dt class="info-title">Internet Domains</dt>
            <dd class="info-value">${ topLevelDomain[0] }</dd>
          </div>
        </dl>
      </div>
    `
    if (data.length > 1) {
      resultsTitle.innerHTML = `<h3>We found ${ index + 1} countries!</h3>`
      resultsCountriesFound.innerHTML += `<li class="country-found" data-country="${index}">${name}</li>`
      resultsContent.innerHTML += foundData
    } else {
      resultsTitle.innerHTML = `<h3>We found a country!</h3>`
      resultsContent.innerHTML += foundData
    }
  })
}

// Display current year, used in the footer
const currentYear = document.querySelector("#currentYear")
currentYear.innerHTML = new Date().getFullYear()