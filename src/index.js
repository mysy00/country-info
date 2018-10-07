require('./styles/index.scss');

const apiKey = 'https://restcountries.eu/rest/v2'
const results = document.querySelector("#results")
const countrySearch = document.querySelector("#countrySearch")
const countryName = document.querySelector("#countryName")

/*
countrySearch.addEventListener('submit', e => {
  e.preventDefault()
  fetch(`${apiKey}/name/${countryName.value}`)
    .then(res => res.json())
    .then(data => displayData(data))
    .catch(err => console.log(err))
}) */

// just for tests 😉
document.addEventListener('DOMContentLoaded', e => {
  fetch(`${apiKey}/name/Poland`)
    .then(res => res.json())
    .then(data => displayData(data))
    .catch(err => console.log(err))
})

function displayData(data) {
  console.log(data)
  if (data.status) {
    results.innerHTML = `
      <h3>Ops! Looks like there's no data to display.</h3>
    `
    return false;
  }
  if (data.length > 1) {
    // TODO: Let user choose a country
    let countryNumber = 0
    results.innerHTML = `
      <h3>There's more than 1 result.</h3>
    `
  } else {
    results.innerHTML = `
      <h3>${ data[0].name } <img src="${ data[0].flag}" width="16" alt></h3>

      <dl class="info-box">
        <dt class="info-title">Native Name</dt>
        <dd class="info-value">${ data[0].nativeName }</dd>

        <dt class="info-title">Native Name</dt>
        <dd class="info-value">${ data[0].nativeName }</dd>

        <dt class="info-title">Capital</dt>
        <dd class="info-value">${ data[0].capital }</dd>

        <dt class="info-title">Native Name</dt>
        <dd class="info-value">${ data[0].nativeName }</dd>

        <dt class="info-title">Main Currency</dt>
        <dd class="info-value">${ data[0].currencies[0].name }</dd>
      </dl>
    `
  }
}

// Display current year, used in the footer
const currentYear = document.querySelector("#currentYear")
currentYear.innerHTML = new Date().getFullYear()