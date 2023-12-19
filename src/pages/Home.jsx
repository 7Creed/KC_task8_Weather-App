import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBackgroundImage, useFetch } from "../api/useFetch";
import HomeLeft from "../components/HomeLeft";
import HomeRight from "../components/HomeRight";
import { useGlobalContext } from "../context/context";

import Modal from "./Modal";

const Home = () => {
  const {
    weatherData,
    lat,
    long,
    setLat,
    setLong,
    setSearchResults,
    setResultData,
    searchResults,
    setIsError,
  } = useGlobalContext();
  const { searchValue } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [inputVal, setInputVal] = useState("");

  const navigate = useNavigate();
  const inputRef = useRef(null);

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

  const { data: searchData, isLoading, error } = useFetch("", "", inputVal);

  useEffect(() => {
    if (searchData && searchData.name) {
      setResultData(searchData);
      navigate(`/search-result/${searchData.name}`);
    }
  }, [searchData, navigate]);

  const handleSearch = async (e) => {
    e.preventDefault();
    const inputValue = inputRef.current.value;

    setInputVal(inputValue);

    inputRef.current.value = "";

    setSearchResults((prevResults) => {
      let savedResult = prevResults?.some(
        (prev) => inputValue.toLowerCase() === prev.toLowerCase()
      );

      const updatedResults = savedResult
        ? prevResults
        : [...prevResults, inputValue];

      return updatedResults;
    });

    if (error) {
      // console.log(error);
      // Set a timer to display the error modal after 2 seconds
      setTimeout(() => {
        setIsError(error);
        setShowModal(true);
      }, 3000);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      {showModal && <Modal handleCloseModal={handleCloseModal} />}

      <div
        className="flex justify-center items-center min-h-screen"
        style={homeStyles}
      >
        {isLoading ? (
          <p className="text-white text-center text-xl border py-4 px-10 w-[50%]">
            Loading...
          </p>
        ) : (
          <div
            className="flex flex-col lg:flex-row justify-between w-full"
            // style={homeStyles}
          >
            <div className="lg:w-[65%]">
              <HomeLeft
              // convertKelvinToCelsius={convertKelvinToCelsius}
              />
            </div>
            <div className="lg:w-[35%]">
              <HomeRight handleSearch={handleSearch} inputRef={inputRef} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
