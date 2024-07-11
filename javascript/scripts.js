// Variáveis
const apiKey = '6180dd31a0302771b3734fe6ee218195'; // Minha chave da api - OpenWeather = Tempo
const apiCountryURL = 'https://flagsapi.com/'; // Chave da api - CountryFlags = Bandeiras Países

const cityInput = document.querySelector('#city-input'); // Pegando o Input
const serachBtn = document.querySelector('#search'); // Pegando o BTN

const cityElement = document.querySelector('#city'); // Pegando o nome da cidade
const tempElement = document.querySelector('#temperature span'); // Id de 'temperatura' que é o SPAN
const descElement = document.querySelector('#description'); // Descrição
const weatherIconElement = document.querySelector('#weather-icon'); // Pegando o nome da cidade
const countryElement = document.querySelector('#country'); // Bandeira do País
const humidityElement = document.querySelector('#humidity span'); // ID Umidade - SPAN
const windyElement = document.querySelector('#wind span'); // ID Vento - SPAN

const weatherContainer = document.querySelector('#weather-data') // Conteudo, onde irei remover a classe que esconde o Conteudo
// Funções
// Pegar os dados da API Weather:
const getWeatherData = async (city) => {

    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;
    const res = await fetch(apiWeatherURL);
    const data = await res.json();

    return data;
}

// Pegas os dados da API Unsplash = Imagens das cidades
const fetchCityImage = async (city) => {
    const unsplashAccessKey = 'EtpMFi3sEXuatItBWf9H2zF202gfxVo6znNyEg3OwK4';
    const unsplashApiUrl = `https://api.unsplash.com/search/photos?query=${city}&client_id=${unsplashAccessKey}`;

    try {
        const response = await fetch(unsplashApiUrl);
        const data = await response.json();

        const imageUrl = data.results[0].urls.regular; // Obtendo a URL da imagem do primeiro resultado

        document.body.style.backgroundImage = `url(${imageUrl})`; // Definindo a imagem como background do body
    } catch (error) {
        console.error('Erro ao buscar imagem da cidade:', error);
    }
}

// Função que mostra os Resultados, trocando os dados no HTML
const showWeatherData = async (city) => {

    try {
        const data = await getWeatherData(city);

        cityElement.innerHTML = data.name; // Trocando o nome da cidade
        tempElement.innerHTML = Number.parseInt(data.main.temp); // Mostrando o Grau inteiro, e não com duas casas após a virgula
        descElement.innerHTML = data.weather[0].description; // Mostrando se é nublado, ensolarado, chuvoso, etc...
        weatherIconElement.setAttribute('src', `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`); // Mudando o Icone
        countryElement.setAttribute('src', `https://flagsapi.com/${data.sys.country}/flat/32.png`); // Bandeira
        humidityElement.innerHTML = `${data.main.humidity}%`; // Umidade
        windyElement.innerHTML = `${data.wind.speed}km/h`;

        weatherContainer.classList.remove('hide'); // Removendo a class HIDE que esconde o conteudo
    } catch (error) {

        // Remover todos os elementos dentro da div 'weather-container'
        weatherContainer.classList.add('hide'); // Adicionando a class HIDE que esconde o conteudo

        // Exibir mensagem de erro com um alerta
        alert("Não foi possível encontrar o clima da cidade. Por favor, insira uma cidade válida.");
    }
}

// Eventos
serachBtn.addEventListener('click', (event) => {

    event.preventDefault();

    const city = cityInput.value.trim(); // Pegando o valor do Input, o Trim remove espaços em branco
    // Se existir a cidade
    if (city) {
        showWeatherData(city); // E faço a busca do mesmo jeito
        fetchCityImage(city); // Pegando a foto da Cidade
    } else {
        alert("Por favor, insira uma cidade.");
    }
});

cityInput.addEventListener('keyup', (event) => {

    // Se houver um click de 'Enter' no Input:
    if (event.code === 'Enter') {
        const city = event.target.value.trim(); // Pego o valor do Input, o Trim remove espaços em branco

        // Se existir a cidade
        if (city) {
            showWeatherData(city); // E faço a busca do mesmo jeito
            fetchCityImage(city); // Pegando a foto da Cidade
        } else {
            alert("Por favor, insira uma cidade.");
        }
    }
})