import React from 'react';

import Titles from './components/Titles';
import Form from './components/Form';
import Weather from './components/Weather';

const API_KEY = '11b407e9e867a2198295844d39e7c435';

class App extends React.Component {
    state = {
        temperature: undefined,
        temperature_max: undefined,
        city: undefined,
        country: undefined,
        sunrise: undefined,
        humidity: undefined,
        description: undefined,
        error: undefined
    } 

    getWeather = async (e) => {
        e.preventDefault();
        const city = e.target.elements.city.value;
        const country = e.target.elements.country.value;
        const api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`);
        const data = await api_call.json();
        if (city && country) {
            console.log(data);
            this.setState({
                temperature: data.main.temp,
                temperature_max: data.main.temp_max,
                city: data.name,
                country: data.sys.country,
                sunrise: data.sys.sunrise,
                humidity: data.main.humidity,
                description: data.weather[0].description,
                error: ''
            });
        } else {
            this.setState({
                temperature: undefined,
                temperature_max: undefined,
                city: undefined,
                country: undefined,
                sunrise: undefined,
                humidity: undefined,
                description: undefined,
                error: 'Please enter values'
            });
        }
    };

    render() {
        return (
            <div>
                <div className="wrapper">
                    <div className="main">
                        <div className="container">
                            <div className="row">
                                <div className="col-xs-5 title-container">
                                    <Titles />
                                </div>
                                <div className="col-xs-7 form-container">
                                    <Form getWeather={this.getWeather}/>
                                    <Weather 
                                    temperature={this.state.temperature}
                                    temperature_max={this.state.temperature_max}
                                    city={this.state.city}
                                    country={this.state.country}
                                    sunrise={this.state.sunrise}
                                    humidity={this.state.humidity}
                                    description={this.state.description}
                                    error={this.state.error}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};


export default App;