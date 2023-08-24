document.addEventListener("DOMContentLoaded", function() {
    const searchButton = document.getElementById("searchButton");
    const cityInput = document.getElementById("cityInput");
    const resultDiv = document.getElementById("result");

    searchButton.addEventListener("click", function() {
        const city = cityInput.value;
        if (city) {
            fetchWeatherData(city)
                .then(data => {
                    resultDiv.innerHTML = `
                        Condições climáticas em ${data.city}:<br>
                        Temperatura: ${data.temperature}°C<br>
                        Tempo: ${data.main} - ${data.description}
                    `;
                })
                .catch(error => {
                    resultDiv.innerHTML = "Erro ao buscar dados climáticos.";
                    console.error("Erro ao buscar dados climáticos:", error);
                });
        } else {
            resultDiv.innerHTML = "Por favor, insira uma cidade.";
        }
    });

    async function fetchWeatherData(city) {
        const apiKey = "9f038218d6a951e39745c1b7dd409c9e"; 
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`);
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.statusText}`);
        }
        const data = await response.json();
        return {
            city: data.name,
            temperature: data.main.temp,
            main: data.weather[0].main,
            description: data.weather[0].description
        };
    }
});
