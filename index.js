const infoWeatherElement = document.getElementById("info-weather");

async function loadWeather() {
  const response = await fetch("https://get.geojs.io/v1/ip/geo.json");
  const geoData = await response.json();
  const { longitude, latitude, city } = geoData;

  const res = await fetch(
    "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current_weather=true"
  );
  const weatherData = await res.json();
  const { current_weather } = weatherData;
  const { temperature, windspeed, winddirection, weathercode, is_day, time } =
    current_weather;

  const infoElement = document.createElement("div");
  infoElement.classList.add("info-element");

  const coordinatesElement = document.createElement("p");
  coordinatesElement.textContent = `Longitude: ${longitude}, Latitude: ${latitude}`;

  const cityElement = document.createElement("p");
  cityElement.textContent = `${city}`;

  const temperatureElement = document.createElement("p");
  temperatureElement.textContent = `${temperature} °C`;

  const timeElement = document.createElement("p");
  timeElement.textContent = `${time}`;

  const windspeedAndDirectionElement = document.createElement("p");
  windspeedAndDirectionElement.textContent = `Wind Speed: ${windspeed} km/h , Wind Direction: ${winddirection}°`;

  const windspeedIconElement = document.createElement("img");
  windspeedIconElement.src = "images/wind.png";
  windspeedIconElement.alt = "Windspeed Icon";
  windspeedIconElement.classList.add("windspeed-icon");

  const winddirectionIconElement = document.createElement("img");
  winddirectionIconElement.src = "images/wind-direction.png";
  winddirectionIconElement.alt = "Winddirection Icon";
  winddirectionIconElement.classList.add("winddirection-icon");

  const isDayElement = document.createElement("p");
  isDayElement.textContent = `Is Day: ${is_day ? "Yes" : "No"}`;

  const isDay = current_weather.is_day;
  const weatherIconElement = document.createElement("img");
  weatherIconElement.src = isDay ? "images/sun.gif" : "images/moon.gif";
  weatherIconElement.alt = "Weather Icon";
  weatherIconElement.classList.add("weather-icon");

  const descriptionElement = document.getElementById("description");
  descriptionElement.textContent += getWeatherDescription(weathercode);

  coordinatesElement.classList.add("coordinates");
  cityElement.classList.add("city");
  temperatureElement.classList.add("temperature");
  timeElement.classList.add("time");

  infoElement.append(
    weatherIconElement,
    cityElement,
    temperatureElement,
    windspeedAndDirectionElement,windspeedIconElement, winddirectionIconElement,
    descriptionElement,
    timeElement,
    coordinatesElement
  );

  infoWeatherElement.append(infoElement);

  function getWeatherDescription(code) {
    switch (code) {
      case 0:
        return "Clear sky";
      case 1:
        return "Mainly clear";
      case 2:
        return "Partly cloudy";
      case 3:
        return "Overcast";
      case 45:
        return "Fog";
      case 48:
        return "Depositing rime fog";
      case 51:
        return "Light drizzle";
      case 53:
        return "Moderate drizzle ";
      case 55:
        return "Dense intensity drizzle";
      case 56:
        return "Light freezing drizzle";
      case 57:
        return "Dense intensity drizzle";
      case 61:
        return "Slight rain";
      case 63:
        return "Moderate rain";
      case 65:
        return "Heavy intensity rain";
      case 66:
        return "Light freezing rain";
      case 67:
        return "Freezing rain heavy intensity";
      case 71:
        return "Slight snow fall";
      case 73:
        return "Moderate snow fall";
      case 75:
        return "Heavy intensity snow fall";
      case 77:
        return "Snow grains";
      case 80:
        return "Slight rain showers Slight";
      case 81:
        return "Moderate rain showers";
      case 82:
        return "Violent rain showers";
      case 85:
        return "Slight snow showers";
      case 86:
        return "Heavy snow showers";
      case 95:
        return "Thunderstorm: slight and moderate";
      case 96:
        return "Thunderstorm with slight hail";
      case 99:
        return "Thunderstorm with heavy hail";
      default:
        return "-";
    }
  }
}

loadWeather();
