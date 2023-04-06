import { useEffect, useState } from "react";
import axios from "axios";

const api_key = process.env.REACT_APP_API_KEY;

const Weather = ({
  countryCapital,
  latCapital,
  lonCapital,
  weatherData,
  setWeatherData,
}) => {
  /**Don't do the get request here. Or at least don't use a state funciton to save the data */
  /*axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latCapital}&lon=${lonCapital}&appid=${api_key}&units=metric`
    )
    .then((response) => setWeatherData(response.data));*/

  console.log("weather data: ", weatherData);
  return (
    <>
      <h2>Weather in {countryCapital}</h2>
      <div>Temperature: &deg;C</div>
      <div>Wind: m/s</div>
    </>
  );
};

const DisplayCountries = ({
  countriesDisplayList,
  showCountry,
  weatherData,
  setWeatherData,
}) => {
  /** Do not display anything if the list is empty */
  if (countriesDisplayList !== []) {
    /** Display default message if list is longer than 10 countries */
    if (countriesDisplayList.length > 10) {
      return <div>Too many matches, specify another filter</div>;

      /** If there is exactly one country in the list, the country information will be displayed */
    } else if (countriesDisplayList.length === 1) {
      const countryCapital = countriesDisplayList[0].capital[0];
      const latCapital = countriesDisplayList[0].capitalInfo.latlng[0];
      const lonCapital = countriesDisplayList[0].capitalInfo.latlng[1];

      // console.log();

      console.log(countriesDisplayList[0]);
      return (
        <div>
          <h1>{countriesDisplayList[0].name.common}</h1>
          <div>Capital: {countryCapital}</div>
          <div>
            Area: {countriesDisplayList[0].area} km<sup>2</sup>
          </div>
          <h3>Languages: </h3>
          <div>
            <ul>
              {Object.values(countriesDisplayList[0].languages).map((lang) => (
                <li key={lang}>{lang}</li>
              ))}
            </ul>
          </div>
          <div>
            <img
              src={countriesDisplayList[0].flags.png}
              alt={countriesDisplayList[0].flags.alt}
            />
          </div>
          <Weather
            countryCapital={countryCapital}
            lonCapital={lonCapital}
            latCapital={latCapital}
            weatherData={weatherData}
            setWeatherData={setWeatherData}
          />
        </div>
      );

      /** Display up to ten countries that match the filter */
    } else {
      return countriesDisplayList.map((country) => (
        <div key={country.name.common}>
          {country.name.common}
          <button onClick={() => showCountry(country.name.common)}>show</button>
        </div>
      ));
    }
  } else {
  }
};

const App = () => {
  const [value, setValue] = useState("");
  const [countriesList, setCountriesList] = useState([]);
  const [countriesDisplayList, setCountriesDisplayList] = useState([]);
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    axios
      .get(`https://restcountries.com/v3.1/all`)
      .then((response) => setCountriesList(response.data));
  }, []);

  useEffect(() => {
    if (value) {
      let countriesTemp = [];
      for (let i = 0; i < countriesList.length; i++) {
        if (
          countriesList[i].name.common
            .toLowerCase()
            .includes(value.toLocaleLowerCase())
        ) {
          countriesTemp = countriesTemp.concat(countriesList[i]);
        }
      }
      setCountriesDisplayList(countriesTemp);
    } else {
      setCountriesDisplayList([]);
    }
  }, [value, countriesList]);

  const handleCountriesInput = (event) => {
    setValue(event.target.value);
  };

  const showCountry = (countryName) => {
    const countryTemp = countriesList.filter(
      (country) => country.name.common === countryName
    );
    setCountriesDisplayList(countryTemp);
  };

  return (
    <>
      Find countries by name:{" "}
      <input value={value} onChange={handleCountriesInput} />
      <DisplayCountries
        countriesDisplayList={countriesDisplayList}
        showCountry={showCountry}
        weatherData={weatherData}
        setWeatherData={setWeatherData}
      />
    </>
  );
};

export default App;
