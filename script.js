let searchFormEl = document.querySelector('#search-city');

let apiKey = "1632de6bdebb99057b37059590e9992d";

let queryUrl = `https://api.openweathermap.org/data/2.5/forecast?q=' + choseCity + '&appid=${apiKey}`;


fetch(queryUrl)
.then(headers => headers.json())
.then(weatherData => {
    console.log(weatherData);
})


function getParams() {
    let searchCity = document.location.search.split('&');

}


function handleSearchFormSubmit(event) {
    event.preventDefault();
  
    let searchInputVal = document.querySelector('#search-input').value;
    
  
    if (!searchInputVal) {
      console.error('You need a search input value!');
      return;
    }
  
    searchApi(searchInputVal);
  }
  
  searchFormEl.addEventListener('submit', handleSearchFormSubmit);