// import { useParams } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import { getCurrentTime, useFetch, getWeatherIcon } from "../api/useFetch";

import { useGlobalContext } from "../context/context";

import { BsArrowLeft } from "react-icons/bs";
import { useEffect } from "react";

const HeaderCard = () => {
  // const { lat, long, setLat, setLong } = useGlobalContext();
  const { weatherData, lat, long, setLat, setLong } =
    useGlobalContext();
  const { main, name, weather, sys } = weatherData;

  const currentTime = getCurrentTime();
  const weatherIcon = getWeatherIcon(weatherData);
  // console.log(weatherIcon)
  // console.log(weatherData)

  // useEffect(() => {
  //   navigator.geolocation.getCurrentPosition(function (position) {
  //     setLat(position.coords.latitude);
  //     setLong(position.coords.longitude);
  //   });
  // }, [lat, long]);

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-center text-white">
        <h1 className="font-bold text-6xl md:text-8xl">{main?.temp}&#176;</h1>
        <div className="flex justify-around items-center">
          <div className="flex flex-col px-3">
            <h2 className="font-bold text-2xl">{name}</h2>
            <p className="font-semibold text-base">{currentTime}</p>
          </div>
          <div className="text-start">
            <p className="font-black text-3xl">{weatherIcon}</p>
            <p className="font-bold text-2xl">{weather?.[0]?.main}</p>
          </div>
        </div>
      </div>
    </>
  );
};

const SideBarCard = () => {
  const { weatherData } = useGlobalContext();
  const { main, name, weather, sys, wind } = weatherData;

  const currentTime = getCurrentTime();
  const weatherIcon = getWeatherIcon(weatherData);

  return (
    <>
      <div className="pb-6">
        <p className="font-bold text-xl py-4">
          Current Location Weather Detail
        </p>
        <p className="flex justify-between font-bold text-xl py-2">
          <span className="">Humidity</span>
          <span className="">{main?.humidity}%</span>
        </p>
        <p className="flex justify-between font-bold text-xl py-2">
          <span className="">Temperature</span>
          <span className="">{main?.temp}&#176;C</span>
        </p>
        <p className="flex justify-between font-bold text-xl py-2">
          <span className="">Wind Speed</span>
          <span className="">{wind?.speed} m/s</span>
        </p>
      </div>
    </>
  );
};

const SearchResultCard = () => {
  const { resultData, setResultData } = useGlobalContext();

  const { searchValue } = useParams();
  const navigate = useNavigate();
  const searchData = useFetch("", "", searchValue);
  setResultData(searchData);
  const { main, name, weather, sys, wind } = searchData;

  const currentTime = getCurrentTime();
  const weatherIcon = getWeatherIcon(resultData);

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <>
      <div className="flex flex-col gap-8 text-white">
        <div className="">
          <button
            className="text-2xl text-black bg-[#ccc] p-3 rounded-full"
            onClick={handleGoBack}
          >
            <BsArrowLeft />
          </button>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-3">
            <h2 className="font-bold text-4xl">
              {name}, {sys?.country}
            </h2>
            <p className="">{currentTime}</p>
          </div>
          <div className="">
            <button className="bg-blue-600 text-sm md:text-base px-4 py-2 rounded">
              Save Location
            </button>
          </div>
        </div>
        <div className="grid grid-rows-2 lg:grid-cols-5">
          <div className="flex items-center gap-3 row-span-1 lg:col-span-2 lg:border-r-2">
            <h1 className="font-bold text-8xl">{weatherIcon}</h1>
            <div className="flex flex-col justify-center items-center text-center">
              <h1 className="font-bold text-6xl">
                {main?.temp.toFixed(1)}&#176;
              </h1>
              <p className="">{weather?.[0]?.main}</p>
            </div>
          </div>

          <div className="lg:col-span-3 row-span-1 flex flex-col gap-10 pl-5">
            <div className="flex justify-between text-center">
              <p className="flex flex-col">
                <span className="font-bold text-xl">{main?.temp_max}</span>
                <span className="">High</span>
              </p>
              <p className="flex flex-col">
                <span className="font-bold text-xl">{wind?.speed} mph</span>
                <span className="">Wind</span>
              </p>
              <p className="flex flex-col">
                <span className="font-bold text-xl">{main?.humidity}%</span>
                <span className="">Humidity</span>
              </p>
            </div>
            <div className="flex justify-between text-center">
              <p className="flex flex-col">
                <span className="font-bold text-xl">{main?.temp_min}</span>
                <span className="">Low</span>
              </p>
              <p className="flex flex-col">
                <span className="font-bold text-xl">{main?.pressure} in</span>
                <span className="">Pressure</span>
              </p>
              <p className="flex flex-col">
                <span className="font-bold text-xl">40%</span>
                <span className="">Precipitation</span>
              </p>
            </div>
          </div>
        </div>
        <div className="saved-location flex justify-center">
          <button className="bg-white text-blue-600 border-2 border-blue-600 px-5 py-2 rounded-md">
            View Saved Locations
          </button>
        </div>
      </div>
    </>
  );
};

export { HeaderCard, SideBarCard, SearchResultCard };
