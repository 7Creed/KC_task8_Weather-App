import React, { useState, useContext, useEffect } from "react";
import { useFetch } from "../api/useFetch";
// import { useParams } from "react-router-dom";

const AppContext = React.createContext("");

const WeatherProvider = ({ children }) => {
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  const storedSearchResults = JSON.parse(localStorage.getItem("searchResults")) || [];
  const [searchResults, setSearchResults] = useState(storedSearchResults);
  const [resultData, setResultData] = useState({});
  const [weatherData, setWeatherData] = useState({});

  // console.log(searchResults)
  const [isError, setIsError] = useState(null);
  // const [loading, setLoading] = useState(null);
  
  const { data, fetchData: fetchWeatherData, error, isLoading } = useFetch(lat, long);

  // const { searchValue } = useParams();
  // console.log(searchValue)
  // // const {resultData} = useFetch("", "", searchValue);
  // const [searchData, setSearchData] = useState({});

  // useEffect(() => {
  //   if (searchValue !== undefined) {
  //     const {resultData} = useFetch("", "", searchValue);
  //     if (resultData) {
  //       setSearchData(resultData);
  //     }
  //   // setIsError(error)
  //   }
  // }, [searchValue]);
  // useEffect(() => {
  //   if (searchValue !== undefined) {
  //     const fetchData = async () => {
  //       try {
  //         const { resultData } = await useFetch("", "", searchValue);
  //         // Check if resultData is available before updating searchData
  //         if (resultData) {
  //           setSearchData(resultData);
  //         }
  //         // Handle errors if necessary
  //       } catch (error) {
  //         // Handle errors here
  //         console.error(error);
  //         setIsError(true); // Set isError to true, for example
  //       }
  //     };

  //     fetchData();
  //   }
  // }, [searchValue]);
  // console.log(searchData)

  // console.log(data, fetchWeatherData, error)
  // console.log("err", error)

  // const weatherData = useFetch(lat, long);

  useEffect(() => {
    localStorage.setItem("searchResults", JSON.stringify(searchResults));
  }, [searchResults]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
    });
    // }, []);
  }, [lat, long]);
  // console.log(lat, long)

  useEffect(() => {
    setWeatherData(data);
    // setIsError(error)
  }, [data]);

  // useEffect(() => {
  //   setLoading(true);
  //   // setIsError(error)
  // }, [isLoading]);

  // useEffect(() => {
  //   // Call useFetch here to fetch the data
  //   setResultData(useFetch(lat, long));
  // }, [lat, long]);

  // useEffect(() => {
  //   // Fetch data using useFetch when lat or long changes
  //   if (lat !== null && long !== null) {
  //     const fetchData = async () => {
  //       try {
  //         const response = await fetchWeatherData(lat, long);
  //         // setResultData(response.data);
  //         setWeatherData(response.data);
  //       } catch (error) {
  //         console.error(error);
  //         // Handle error if necessary
  //       }
  //     };

  //     fetchData();
  //   }
  // }, [lat, long, fetchWeatherData]);

  // useEffect(() => {

  //   // Fetch data using useFetch when lat or long changes
  //   // if (lat !== null && long !== null) {
  //     const fetchData = async () => {
  //       try {
  //         console.log(lat, long)
  //         const response = await fetchWeatherData();
  //         console.error(response.data);
  //         console.error("data");

  //         setWeatherData(response.data);
  //       } catch (error) {
  //         // console.error(error);
  //         // Handle error if necessary
  //       }
  //     // };
  //     console.log("heheh")
  //   }
  //   // fetchData();
  //   if (lat !== null && long !== null) {
  //     fetchData();
  //   }
  // }, [lat, long, fetchWeatherData]);

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
        // searchData,
        // setSearchData,
        searchResults,
        setSearchResults,
        // getWeatherIcon,
        // getBackgroundImage,
        isError,
        setIsError,
        // loading,
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
