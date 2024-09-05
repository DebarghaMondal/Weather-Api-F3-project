const body = document.body;
body.style.backgroundColor = "#360369";
body.style.color = "white";

const fetchBtn = document.getElementById("fetch-btn");
fetchBtn.addEventListener("click", getLocation);
const mainContainer = document.getElementsByClassName("landing-page")[0];

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.");
            break;
    }
}


function showPosition(position) {
    mainContainer.remove();
    let latValue = position.coords.latitude;
    let longValue = position.coords.longitude;
    console.log('Latitude:', latValue, 'Longitude:', longValue);
    let apiKey = "0ad5703a5773a1597f26fc27e287b8f4";
    let baseUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latValue}&lon=${longValue}&appid=${apiKey}&units=metric`;
    async function getData() {
        try {
            let response = await fetch(baseUrl);
            let data = await response.json();

            if (response.ok) {

                let weather = {
                    location: data.name,
                    windSpeed: data.wind.speed,
                    humidity: data.main.humidity,
                    pressure: data.main.pressure,
                    windDirection: data.wind.deg,
                    uvIndex: "N/A",
                    feelsLike: data.main.feels_like,
                    timezone: data.timezone
                };
                createLoading2(latValue, longValue, weather);
            } else {
                console.error("Error fetching weather data:", data);
            }
        } catch (error) {
            console.error('Fetch error:', error);
            alert('Failed to fetch weather data.');
        }
    }

    getData();
}
function createLoading2(latValue, longValue, weather) {
    let secondLanding = document.createElement("div");
    secondLanding.className = "second-landing-page";
    let innerSide = document.createElement("div");
    innerSide.innerHTML = `
    
              <div class="main-page">
                  <div class="weather-map">
                      <h2>Welcome To The Weather App</h2>
                      <p>${weather.location} is your current location</p>    
                      <div class="box">
                          <div class="map-box">Lat: ${latValue}</div>
                          <div class="map-box">Long: ${longValue}</div>
                      </div>
                  </div>
                  <div id="map" class="map">
                      <iframe src="https://maps.google.com/maps?q=${latValue},${longValue}&z=15&output=embed"></iframe>
                  </div>
              </div>
          <section class="weather-data">
                  <h2>Your Weather Data</h2>
                  <div class="weather-data-box">
                       <div class="map-box">Location: ${weather.location || 'N/A'}</div>
                      <div class="map-box">Wind Speed: ${weather.windSpeed || 'N/A'} kmph</div>
                      <div class="map-box">Humidity: ${weather.humidity || 'N/A'}</div>
                      <div class="map-box">Time Zone: GMT ${weather.timezone ? weather.timezone / 3600 : 'N/A'}</div>
                      <div class="map-box">Pressure: ${weather.pressure || 'N/A'}atm</div>
                      <div class="map-box">Wind Direction: ${weather.windDirection || 'N/A'}°</div>
                      <div class="map-box">UV Index: ${weather.uvIndex}</div>
                      <div class="map-box">Feels like: ${weather.feelsLike || 'N/A'}°</div>
                  </div>
          </section>
      `;
    secondLanding.appendChild(innerSide);
    document.body.appendChild(secondLanding);
}
