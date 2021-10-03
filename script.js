

var searchCityInput = document.getElementById("search-city");
var searchButton = document.getElementById("search-button");
var apiKey = "859703ec2c35d55d411c037402bef9ad";
// var uvIndex= "https://api.openweathermap.org/data/2.5/uvi?appid={appid}&lat={lat}&lon={lon}";
// var currentWeather= "https://api.openweathermap.org/data/2.5/weather?appid="
// var weatherForecast= "https://api.openweathermap.org/data/2.5/forecast?4e5dbe7db2b5e9c8b47fa40b691443d5q={city name},{country code}";




search.addEventListener("click", function (event) {
  event.preventDefault();
  var searchCityVal = searchCityInput.value;
  if (searchCityVal.length <= 0) {
    alert("please add a city");
  } else {
    getWeather(searchCityVal)
  console.log(searchCityVal);
  }

});


// my TA showed me how to use 
function getWeather(city) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      console.log(data);
      currentWeather(data, city)
      var lat = data.coord.lat
      var lon = data.coord.lon
      // Get lat and lon store in variables
      fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`)
        .then(function (res) {
          return res.json();
        })
        .then(function(response) {
          console.log("uvi response:", response.current.uvi);
          fiveDayWeather(response.daily.slice(1, 6))
          let uviResponse =response.current.uvi
          const UV = document.getElementById("uvi");
          UV.innerHTML = ""
       if (uviResponse <= 2.99){
         console.log('green')
         UV.style.backgroundColor= "green"
       }
        if(3 < uviResponse <7.99 ){
         UV.style.backgroundColor="yellow"
         UV.style.color="black"
       } 
       if (uviResponse >8 ){
        UV.style.backgroundColor = "red"
        UV.style.color = "aliceblue"
       }
         UV.append(uviResponse)
         
        }
        )

      // $(document).ready(function(){})
    })
}
//Fetch data for the one call api, passing in the lat and lon variables to the api url






// condtitional for icon

// function handle search history (one that gets search history and one that places them in local storage)
JSON.parse(localStorage.getItem("searchedItems"))
JSON.parse(localStorage.getItem("city-result"));

// function to render curent weather
function currentWeather(data, city, uviResponse) {
  const temperature = document.getElementById("tempt");
  const wind = document.getElementById("wind");
  const humidity = document.getElementById("humidity");
  const cityName = document.getElementById("the-city");
console.log("second uvi response:", uviResponse)
  temperature.textContent = data.main.temp;
  humidity.textContent = data.main.humidity;
  cityName.innerHTML=""
  cityName.textContent = cityName.textContent + ": " + city
  wind.textContent = data.wind.speed;
  // UV.textContent = data
  console.log("data returned:", data)
  console.log("city returned:", city)
 

}

// function to display 5 day forecast
function fiveDayWeather(data) {
  const day1 = data[0];
  console.log("day1:",day1)
  const temptA = document.getElementById("tempt-a");
  const humidity1 = document.getElementById("humidity-a");
    const wind1 = document.getElementById("wind-a");
// const iconDay1 = document.getElementById("simbol-a")

  humidity1.textContent = day1.humidity;
  temptA.textContent = day1.temp.max;
     wind1.textContent = day1.wind_speed;
    //  iconDay1.append = 


  const day2 = data[1];
  const temptB = document.getElementById("tempt-b");
  const humidity2 = document.getElementById("humidity-b");
   const wind2 = document.getElementById("wind-b");

  humidity2.textContent = day2.humidity;
   wind2.textContent = day2.wind_speed;
  temptB.textContent = day2.temp.max;
  
  const day3 = data[2];
  const temptc = document.getElementById("tempt-c");
  const humidity3 = document.getElementById("humidity-c");
   const wind3 = document.getElementById("wind-c");

  humidity3.textContent = day3.humidity;
   wind3.textContent = day3.wind_speed;
  temptc.textContent = day3.temp.max;

  const day4 = data[3];
  const temptd = document.getElementById("tempt-d");
  const humidity4 = document.getElementById("humidity-d");
   const wind4 = document.getElementById("wind-d");

  humidity4.textContent = day4.humidity;
   wind4.textContent = day4.wind_speed;
  temptd.textContent = day4.temp.max;

  const day5 = data[4];
  const temptE = document.getElementById("tempt-e");
  const humidity5 = document.getElementById("humidity-e");
   const wind5 = document.getElementById("wind-e");
  
  humidity5.textContent = day5.humidity;
   wind5.textContent = day5.wind_speed;
  temptE.textContent = day5.temp.max;
}

