import React, { useState, useContext, useEffect } from "react";
import { useFetch } from "../api/useFetch";




const AppContext = React.createContext("");

const WeatherProvider = ({ children }) => {
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [resultData, setResultData] = useState(useFetch(lat, long));

  const weatherData = useFetch(lat, long);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
    });
  }, [lat, long]);



  return (
    <AppContext.Provider
      value={{
        lat,
        long,
        setLat,
        setLong,
        weatherData,
        resultData,
        setResultData,
        searchResults,
        setSearchResults,
        // getWeatherIcon,
        // getBackgroundImage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { WeatherProvider, useGlobalContext };
