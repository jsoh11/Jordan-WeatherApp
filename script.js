let searchForm = document.getElementById('search-form')
const searchButton = document.getElementById('search-btn')

let searchInput = document.querySelector('#search-input')

let apiKey = "1632de6bdebb99057b37059590e9992d";






function handleSearchFormSubmit(event) {
  event.preventDefault();


  //call to geocode api with searchVal to get coords
  //call to  one call api with coords
  //get indfo back from onecall and hydrate page with data





  let geocodeUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${searchInput.value}&appid=${apiKey}`


  fetch(geocodeUrl)
    .then(response => response.json())
    .then(geoData => {
      if (!geoData) {
        alert('Could not find that city!')
      }
      const lon = geoData[0].lon
      const lat = geoData[0].lat

      let oneCallUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`

      fetch(oneCallUrl)
        .then(response => response.json())
        .then(oneCallData => {
          console.log(oneCallData)


          displayToday(oneCallData)
          displayCard(oneCallData, 1)
          displayCard(oneCallData, 2)
          displayCard(oneCallData, 3)
          displayCard(oneCallData, 4)
          displayCard(oneCallData, 5)
        })

    })



}

function displayToday(oneCallData) {
  let cityDate = document.querySelector('.date-main')
  let currentDate = oneCallData.current.dt;


  var date = new Date(currentDate * 1000);

  var day = date.getDay();

  var month = date.getMonth();

  var year = "0" + date.getYear();


  var formattedTime = (month + 1) + '/' + (day + 15) + '/' + year.substr(-2);

  console.log(formattedTime);

  cityDate.textContent = "Today's weather for: " + searchInput.value + " " + formattedTime

  console.log(searchInput.value)

  let cityTemp = document.querySelector('.temp-main');
  let currentTemp = oneCallData.current.temp;

  cityTemp.textContent = "Temp: " + currentTemp + " Degrees Fahrenheit"

  console.log(currentTemp)

  let cityWind = document.querySelector('.wind-main');
  let currentWind = oneCallData.current.wind_speed;

  cityWind.textContent = "Wind: " + currentWind + "MPH"
  console.log(currentWind)

  let cityHum = document.querySelector('.hum-main');
  let currentHum = oneCallData.current.humidity;

  cityHum.textContent = "Humidity: " + currentHum + "%"
  console.log(currentHum)

  let cityUv = document.querySelector('.uv-main')
  let currentUv = oneCallData.current.uvi;

  cityUv.textContent = "UV Index: " + currentUv
  console.log(currentUv)


}

function displayCard(oneCallData, currentCard) {

  let cityTemp = document.querySelector(`.temp-${currentCard}`);
  let currentTemp = oneCallData.daily[currentCard].temp.day

  cityTemp.textContent = "Temp: " + currentTemp + " Degrees Fahrenheit"

  console.log(currentTemp)

  let cityWind = document.querySelector(`.wind-${currentCard}`);
  let currentWind = oneCallData.daily[currentCard].wind_speed;

  cityWind.textContent = "Wind: " + currentWind + "MPH"
  console.log(currentWind)

  let cityHum = document.querySelector(`.hum-${currentCard}`);
  let currentHum = oneCallData.daily[currentCard].humidity;

  cityHum.textContent = "Humidity: " + currentHum + "%"


}

searchForm.addEventListener('submit', handleSearchFormSubmit);



  //- search for a city
  //    - presented with
          //- current
            // the city name,
              //ex
                // const cityInfo = document.getElementById('city-info)
                // cityInfo.textContent = oneCalData.current.weather.stuff
            // the date,
            //  an icon representation of weather conditions,
            //  the temperature,
            //  the humidity
            //, the wind speed,
            // and the UV index
              // -  presented with a color that indicates whether the conditions are favorable, moderate, or severe


          // future conditions for that city and
         //  I am presented with a 5-day forecast that displays
            // the date,
            // an icon representation of weather conditions, 
            //the temperature,
            // the wind speed,
            // and the humidity

          // -  that city is added to the search history
          //    - again presented with current and future conditions for that city