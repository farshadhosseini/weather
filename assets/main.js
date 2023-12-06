import config from './config.js'
const citySelection = document.getElementById('citySelection');

citySelection.addEventListener('change', () => {
    const city = citySelection.options[citySelection.selectedIndex];
    getWeather(city.dataset.latitude, city.dataset.longitude, city.text)
})

async function getCities () {
    const response = await fetch("/assets/cities.json");
    return await response.json();
}

function createOptions () {
    getCities().then(cities => {    
        cities.forEach(city => {
            const option = document.createElement('option')
            option.value = city.slug;
            option.text = city.title;
            option.setAttribute('data-latitude', city.latitude);
            option.setAttribute('data-longitude', city.longitude);
            citySelection.appendChild(option)
        });

        const firstOption = citySelection.firstElementChild;
        getWeather(firstOption.dataset.latitude, firstOption.dataset.longitude, firstOption.text)
    })
}

function getWeather (latitude, longitude, cityName) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?appid=${config.apiKey}&lat=${latitude}&lon=${longitude}&units=metric`)
    .then(response => response.json())
    .then((res) => {
            document.querySelector(".city_mame").textContent= cityName;
            document.querySelector(".temp").textContent= res.main.temp;
            getWeatherIcon(res.weather[0].icon)
    })
}

function getWeatherIcon(code) {
    document.querySelector(".icon").src = `https://openweathermap.org/img/wn/${code}@4x.png`
}

createOptions();