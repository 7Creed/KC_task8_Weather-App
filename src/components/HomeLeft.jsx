import { useGlobalContext } from "../context/context";
import { HeaderCard } from "./Card";

const HomeLeft = () => {
  const { weatherData } = useGlobalContext();
  // console.log(weatherData)


  return (
    <>
      <div className="flex flex-col justify-between text-white p-20 lg:h-screen">
        <div className="">
          <h2 className="text-xl font-bold">Weather-wiz</h2>
        </div>
        <div className="">
          {Object.keys(weatherData)?.length > 0 ? (
            <HeaderCard />
          ) : (
            <div className="">
              <h2 className="text-2xl font-bold">
                Failed to fetch weather of current location. Check your internet
                connectivity or enable your location
              </h2>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default HomeLeft;
