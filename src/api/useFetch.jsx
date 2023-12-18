import React, { useState, useEffect } from "react";
import axios from "axios";

import { FaSun, FaCloudSun, FaCloudRain, FaSnowflake } from "react-icons/fa";
import clear from "../assets/image/clear-sky.jpg";
import clouds from "../assets/image/cloudy.jpg";
import rainy from "../assets/image/rainy.jpg";
import snow from "../assets/image/snow.png";

const useFetch = (lat, lng, city = "") => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = "https://api.openweathermap.org/data/2.5/weather";
  // const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;
  const API_KEY = import.meta.env.VITE_API_KEY;

  const fetchData = async function () {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        // &units=metric
        `${API_URL}/?lat=${lat}&lon=${lng}&q=${city}&appid=${API_KEY}&units=metric`
      );

      if (response.statusText === "OK") {
        setData(response.data);
      }
    } catch (err) {
      console.log(err);
      setError("Error fetching weather data. Please try again.");
      // setError("Your search does not exist. Seems you made a mistake. Check again!");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [lat, lng, city]);

  // return data;
  return { data, error, fetchData, isLoading };
};

const getCurrentTime = () => {
  const now = new Date();
  const dateOptions = { hour: "2-digit", minute: "2-digit" };
  const dayOptions = {
    day: "numeric",
    weekday: "long",
    month: "long",
    year: "numeric",
  };

  const dateTime = now.toLocaleTimeString("en-US", dateOptions);
  const dateday = now.toLocaleDateString("en-US", dayOptions);
  return `${dateTime} - ${dateday}`;
};

const getWeatherIcon = (data) => {
  const val = data?.weather?.[0]?.main.toLowerCase();
  switch (val) {
    case "clear": {
      return <FaSun className="text-yellow-500" />;
    }

    case "clouds": {
      return <FaCloudSun />;
    }

    case "rain": {
      return <FaCloudRain />;
    }

    case "snow": {
      return <FaSnowflake />;
    }

    default:
      return <FaCloudSun />;
  }
};

const getBackgroundImage = (data) => {
  const val = data?.weather?.[0]?.main.toLowerCase();
  switch (val) {
    case "clear": {
      return clear;
    }

    case "clouds": {
      return clouds;
    }

    case "rain": {
      return rainy;
    }

    case "snow": {
      return snow;
    }

    default:
      return clear;
  }
};

export { useFetch, getCurrentTime, getWeatherIcon, getBackgroundImage };
