const inputCity = document.getElementById("search-input");
const mainImg = document.getElementById("main-img");
const cityElements = document.getElementsByClassName("city");
const temperature = document.getElementsByClassName("temperature")
const percentage = document.getElementsByClassName("percentage"); // 0 procenta, 1 vitr


let apiKey = "169c17ca2fcc66452d0ba9f14a534df3";
let apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

async function fetchData(city) {
    try {
        let response = await fetch(apiUrl + city + "&appid=" + apiKey);
        if (!response.ok) {
            alert("The city doesnt exist")
            throw new Error('Network response was not ok');
        }
        let data = await response.json();

        mainImg.src = changeImage(data.weather[0].main);
        cityElements[0].textContent = data.name;
        temperature[0].textContent = `${Math.round(data.main.temp)} °C`;
        percentage[0].textContent = data.main.humidity + "%"
        percentage[1].textContent = data.wind.speed + " km/s"
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

inputCity.addEventListener('change', function () {
    let city = inputCity.value;
    fetchData(city);
});


function changeImage(input) {
    switch (input) {
        case 'Clouds':
            return "img/cloudy.png";
        case 'Clear':
            return "img/sun.png";
        case 'Rain':
            return "img/cloudy.png";
        case 'Drizzle':
            return "img/mist.png";
        case 'Mist':
            return "img/mist.png";
        default:
            return "img/ytlogo.png";
    }
}


fetchData("prague");


