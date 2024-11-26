/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from "axios";

const Information = ({ countryName }) => {
    const [countryData, setCountryData] = useState({});
    const [weatherData, setWeatherData] = useState({});
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);

        // country info
        axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${countryName}`)
            .then((response) => {
                setCountryData(response.data);

                const capital = response.data.capital[0];
                return axios.get(`https://wttr.in/${capital}?format=j1`)
            })
            .then((response) => {
                setWeatherData(response.data);
            })
            .catch((error) => {
                console.error("Error fetching country data:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [countryName]);

    if (isLoading) return <h1>Loading information for {countryName}...</h1>;
    if (!countryData) return <h1>Failed to load data</h1>;

    return (
        <>
            <h1>{countryName}</h1>
            <p>Capital: {countryData.capital[0]}</p>
            <p>Area: {countryData.area} m2</p>
            <b>Languages:</b>
            <ul>
                {Object.values(countryData.languages).map((language, index) => (
                    <li key={index}>{language}</li>
                ))}
            </ul>
            <img
                src={countryData.flags.png}
                alt={countryData.flags.alt}
            />

            <h2> Weather in {countryData.capital[0]}</h2>
            <p> Temperature: {weatherData.current_condition[0].temp_C} Celcius</p>
            <p> Wind: {weatherData.current_condition[0].windspeedKmph} km/h</p>
            <img
                src={weatherData.current_condition[0].weatherIconUrl[0].value}
                alt={weatherData.current_condition[0].weatherDesc[0].value}
            />

        </>
    );
};

export default Information;