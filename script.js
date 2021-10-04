

var searchCityInput = document.getElementById("search-city");
var searchButton = document.getElementById("search-button");
var apiKey = "859703ec2c35d55d411c037402bef9ad";
var recentSearch = JSON.parse(localStorage.getItem("search")) || [];

var pastEl = document.getElementById("recent-search");
var clearEl = document.getElementById("clear-search");


search.addEventListener("click", function (event) {
  event.preventDefault();
  var searchCityVal = searchCityInput.value;
  if (searchCityVal.length <= 0) {
    alert("please add a city");
  } else {
    getWeather(searchCityVal)
    console.log(searchCityVal);

    recentSearch.push(searchCityVal);
    localStorage.setItem("search", JSON.stringify(recentSearch));
    renderRecentSearch();
  }

});

clearEl.addEventListener("click", function () {
  localStorage.clear();
  recentSearch = [];
  renderRecentSearch();
})
function renderRecentSearch() {
  pastEl.innerHTML = "";
  for (let i = 0; i < recentSearch.length; i++) {
    const historyItem = document.createElement("input");
    historyItem.setAttribute("type", "text");
    historyItem.setAttribute("readonly", true);
    historyItem.setAttribute("class", "form-control d-block bg-white");
    historyItem.setAttribute("value", recentSearch[i]);
    historyItem.addEventListener("click", function () {
      getWeather(historyItem.value);
    })
    pastEl.append(historyItem);
  }
}
renderRecentSearch();
if (recentSearch.length > 0) {
  getWeather(recentSearch[recentSearch.length - 1]);
}


// my TA showed me how to use 
function getWeather(city) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      moment.unix(1633290639).format('L')
      console.log(moment.unix(data.dt).format('L'))
      console.log(data);
      currentWeather(data, city)
      var lat = data.coord.lat
      var lon = data.coord.lon
      // Get lat and lon store in variables
      fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`)
        .then(function (res) {
          return res.json();
        })
        .then(function (response) {
          console.log("uvi response:", response.current.uvi);
          fiveDayWeather(response.daily.slice(1, 6))
          let uviResponse = response.current.uvi
          const UV = document.getElementById("uvi");
          UV.innerHTML = ""
          if (uviResponse <= 2.99) {
            console.log('green')
            UV.style.backgroundColor = "green"
          }
          else if (uviResponse < 8) {
            UV.style.backgroundColor = "yellow"
            console.log('yellow')
            UV.style.color = "black"
          }
          else if (uviResponse >= 8) {
            UV.style.backgroundColor = "red"
            UV.style.color = "aliceblue"
          }
          UV.append(uviResponse)

        }
        )

    })
}


// function to render curent weather
function currentWeather(data, city, uviResponse) {
  const temperature = document.getElementById("tempt");
  const wind = document.getElementById("wind");
  const humidity = document.getElementById("humidity");
  const cityName = document.getElementById("the-city");
  const date = moment.unix(data.dt).format('L');
  const iconCity = document.getElementById("day-icon");
  console.log("second uvi response:", uviResponse)
  temperature.textContent = data.main.temp;
  humidity.textContent = data.main.humidity;
  cityName.innerHTML = ""
  cityName.textContent = cityName.textContent + ": " + city + " (" + date + ")";
  iconCity.setAttribute('src', 'http://openweathermap.org/img/w/' + data.weather[0].icon + '.png')
  wind.textContent = data.wind.speed;
  // UV.textContent = data
  console.log("data returned:", data)
  console.log("city returned:", city)


}

// function to display 5 day forecast
function fiveDayWeather(data) {
  const day1 = data[0];
  console.log("day1:", day1.weather[0].icon)
  const temptA = document.getElementById("tempt-a");
  const humidity1 = document.getElementById("humidity-a");
  const wind1 = document.getElementById("wind-a");
  const iconDay1 = document.getElementById("simbol-a");
  const dateday1 = document.getElementById('day-first');

  dateday1.textContent = moment.unix(day1.dt).format('L');
  humidity1.textContent = day1.humidity;
  temptA.textContent = day1.temp.max;
  wind1.textContent = day1.wind_speed;
  iconDay1.setAttribute('src', 'http://openweathermap.org/img/w/' + day1.weather[0].icon + '.png')


  const day2 = data[1];
  console.log("day2:", day2.weather[0].icon)
  const temptB = document.getElementById("tempt-b");
  const humidity2 = document.getElementById("humidity-b");
  const wind2 = document.getElementById("wind-b");
  const iconDay2 = document.getElementById("simbol-b");
  const dateday2 = document.getElementById('day-second');

  dateday2.textContent = moment.unix(day2.dt).format('L');
  humidity2.textContent = day2.humidity;
  wind2.textContent = day2.wind_speed;
  temptB.textContent = day2.temp.max;
  iconDay2.setAttribute('src', 'http://openweathermap.org/img/w/' + day2.weather[0].icon + '.png')


  const day3 = data[2];
  console.log("day3:", day3.weather[0].icon)
  const temptc = document.getElementById("tempt-c");
  const humidity3 = document.getElementById("humidity-c");
  const wind3 = document.getElementById("wind-c");
  const iconDay3 = document.getElementById("simbol-c");
  const dateday3 = document.getElementById('day-third');

  dateday3.textContent = moment.unix(day3.dt).format('L');
  humidity3.textContent = day3.humidity;
  wind3.textContent = day3.wind_speed;
  temptc.textContent = day3.temp.max;
  iconDay3.setAttribute('src', 'http://openweathermap.org/img/w/' + day3.weather[0].icon + '.png')


  const day4 = data[3];
  console.log("day4:", day4.weather[0].icon)
  const temptd = document.getElementById("tempt-d");
  const humidity4 = document.getElementById("humidity-d");
  const wind4 = document.getElementById("wind-d");
  const iconDay4 = document.getElementById("simbol-d");
  const dateday4 = document.getElementById('day-fourth');


  dateday4.textContent = moment.unix(day4.dt).format('L');
  humidity4.textContent = day4.humidity;
  wind4.textContent = day4.wind_speed;
  temptd.textContent = day4.temp.max;
  iconDay4.setAttribute('src', 'http://openweathermap.org/img/w/' + day4.weather[0].icon + '.png')


  const day5 = data[4];
  console.log("day5:", day5.weather[0].icon)
  const temptE = document.getElementById("tempt-e");
  const humidity5 = document.getElementById("humidity-e");
  const wind5 = document.getElementById("wind-e");
  const iconDay5 = document.getElementById("simbol-e");
  const dateday5 = document.getElementById('day-fifth');

  dateday5.textContent = moment.unix(day5.dt).format('L');
  humidity5.textContent = day5.humidity;
  wind5.textContent = day5.wind_speed;
  temptE.textContent = day5.temp.max;
  iconDay5.setAttribute('src', 'http://openweathermap.org/img/w/' + day5.weather[0].icon + '.png')

}


