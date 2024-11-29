function displayTemp(response) {
let temperatureElement = document.querySelector("#temp");
let temperature = response.data.temperature.current;
let cityElement = document.querySelector("#city");
let humidityElement = document.querySelector("#humidity");
let windElement = document.querySelector("#wind");
let descriptionElement = document.querySelector("#description");
let feelsLikeElement = document.querySelector("#feelsLike");
let timeElement=document.querySelector("#dateTime")
let date=new Date(response.data.time*1000)
let weatherIcon = document.querySelector(".weatherIcon");
weatherIcon.innerHTML = `<img src="${response.data.condition.icon_url}"class="WeatherEmoticon" >`;



cityElement.innerHTML = response.data.city;
temperatureElement.innerHTML = Math.round(temperature);
humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
windElement.innerHTML = `${response.data.wind.speed}km/h`;
descriptionElement.innerHTML = response.data.condition.description;
feelsLikeElement.innerHTML = `${response.data.temperature.feels_like}&degC`;
timeElement.innerHTML=formatDate(date);
}

function formatDate(date){
   
    let minutes = String(date.getMinutes()).padStart(2,"0"); 
    let hours = String(date.getHours()).padStart(2, "0"); 
    let days= [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    ];
    let day=days[date.getDay()];
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
let month = months[date.getMonth()];
let dateNow = date.getDate();
    
return `${day}, ${month} ${dateNow} 🔹 ${hours}:${minutes}`;
    
}
  
function search(event) {
  if (event) {
    event.preventDefault();
  }

  let cityInput = event
    ? document.querySelector("#search-input-data").value.trim()
    : "Vienna";
  let h2 = document.querySelector("h2");

  if (cityInput) {
    h2.innerHTML = cityInput;
    let apiKey = "746foa43283b3t834aba30e76024ce8a";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${cityInput}&key=${apiKey}`;
    axios.get(apiUrl).then(displayTemp);
  } else {

    h2.innerHTML = "";
    alert("Please enter a city.");
    
  }

}

function displayForecast(){

let forecastElement = document.querySelector("#forecast");

let days= ["Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

let forecastHTML="";

days.forEach(function (day){
forecastHTML = 
forecastHTML + 
`
<div class="weather-forecast-day">
        <div class="weather-forecast-date">${day}</div>
        <div class="weather-forecast-icon">🌤️</div>
        <div class="weather-forecast-temperatures"> 
        <div class="temp-estimate-high"><strong>12&deg</strong></div>  
        <div class="temp-estimate-low">14&deg</div></div>
        </div>
`;
});
forecastElement.innerHTML = forecastHTML;
}



let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

search();
displayForecast();


