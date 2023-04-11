import { useEffect, useState } from "react";
import axios from "axios";

const api_key = process.env.REACT_APP_API_KEY;

const getWeatherData = (latCapital, lonCapital) => {
  return axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latCapital}&lon=${lonCapital}&appid=${api_key}&units=metric`
    )
    .then((response) => {
      return response.data;
    });
};

const Weather = ({ countryCapital, latCapital, lonCapital }) => {
  // console.log("Temperature: ", weatherData.main.temp);
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
  //setLoadWeatherData,
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
      //setLoadWeatherData(true);

      //console.log(countriesDisplayList[0]);
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
  //const [loadWeatherData, setLoadWeatherData] = useState(false);
  //const [weatherDataTest, setWeatherDataTest] = useState("");

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
            .includes(value.toLowerCase())
        ) {
          countriesTemp = countriesTemp.concat(countriesList[i]);
        }
      }
      setCountriesDisplayList(countriesTemp);
    } else {
      setCountriesDisplayList([]);
    }
  }, [value, countriesList]);

  /** Let's see if useEffect does the trick. Answer: It does not.*/
  /*
  useEffect(() => {
    if (loadWeatherData) {
      const latCapital = countriesDisplayList[0].capitalInfo.latlng[0];
      const lonCapital = countriesDisplayList[0].capitalInfo.latlng[1];
      console.log("lat, lon: ", latCapital, lonCapital);

      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latCapital}&lon=${lonCapital}&appid=${api_key}&units=metric`
        )
        .then((response) => setWeatherDataTest(response.data));
      setLoadWeatherData(false);
    }
  }, [loadWeatherData, countriesDisplayList]);*/

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
        //setLoadWeatherData={setLoadWeatherData}
      />
    </>
  );
};

export default App;
