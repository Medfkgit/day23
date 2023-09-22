class WeatherApp {
    constructor(cities) {
      this.cities = cities;
    }
  
    selectRandomCity() {
      const randomIndex = Math.floor(Math.random() * this.cities.length);
      return this.cities[randomIndex];
    }
  
    async fetchWeatherData(city) {
      // Replace with your actual API key
      const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lng}&current_weather=true`;
  
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Failed to fetch weather data');
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error;
      }
    }
  
    async displayCityTemperature() {
      const selectedCity = this.selectRandomCity();
      console.log(`Selected City: ${selectedCity.name}`);
  
      try {
        const weatherData = await this.fetchWeatherData(selectedCity);
        const temperature = weatherData.current_weather.temperature;
        console.log(`Temperature: ${temperature}°C`);
      } catch (error) {
        console.error('Failed to display temperature:', error);
      }
    }
  
    start() {
      this.displayCityTemperature();
    }
  }
  
  const cities = [
    { name: 'New York', lat: 40.7128, lng: -74.0060 },
    // ... Add other cities here ...
  ];
  
  const weatherApp = new WeatherApp(cities);
  weatherApp.start();
  