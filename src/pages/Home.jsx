import React, { useEffect } from "react";

import { getBackgroundImage } from "../api/useFetch";


import HomeLeft from "../components/HomeLeft";
import HomeRight from "../components/HomeRight";
import { useGlobalContext } from "../context/context";

const Home = () => {
  const { lat, long, setLat, setLong } = useGlobalContext();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
    });
  }, [lat, long]);

  // const convertKelvinToCelsius = (kelvin) => {
  //   const celsius = kelvin - 273.15;
  //   return celsius;
  // };

  const { weatherData  } = useGlobalContext();
  const image = getBackgroundImage(weatherData);

  const homeStyles = {
    backgroundImage: `linear-gradient(
      45deg,
      rgba(0, 0, 0, 0.5),
      rgba(0, 0, 0, 0.61)
    ),
    url(${image})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "bottom",
  };

  return (
    <>
      <div
        className="flex flex-col lg:flex-row justify-between"
        style={homeStyles}
      >
        <div className="lg:w-[65%]">
          <HomeLeft
          // convertKelvinToCelsius={convertKelvinToCelsius}
          />
        </div>
        <div className="lg:w-[35%]">
          <HomeRight />
        </div>
      </div>
    </>
  );
};

export default Home;
