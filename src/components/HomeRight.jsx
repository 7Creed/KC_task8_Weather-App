import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SideBarCard } from "./Card";
import { useFetch } from "../api/useFetch";
import { useGlobalContext } from "../context/context";
import { AiOutlineClose } from "react-icons/ai";

const HomeRight = () => {
  const { searchResults, setSearchResults } = useGlobalContext();
  const inputRef = useRef(null);
  const [searchValue, setSearchValue] = useState("");

  const navigate = useNavigate();

  // const handleInputChange = (e) => {
  //   console.log('Input value:', inputRef.current.value)
  // }

  const handleSearch = (e) => {
    e.preventDefault();
    const inputValue = inputRef.current.value;

    console.log("Input Value:", inputValue);

    inputRef.current.value = "";

    setSearchResults((prevResults) => {
      let savedResult = prevResults?.some(
        (prev) => inputValue.toLowerCase() === prev.toLowerCase()
      );

      console.log("Previous Search Results:", searchResults);
      const updatedResults = savedResult
        ? prevResults
        : [...prevResults, inputValue];
      console.log("Updated Search Results:", searchResults);
      return updatedResults;
    });

    navigate(`/search-result/${inputValue}`);
  };
  // console.log(searchResults);

  const handleDelBtn = (num) => {
    console.log(num);
    console.log(searchResults);
    setSearchResults((prevs) => prevs.filter((_, index) => index + 1 !== num));
  };

  return (
    <>
      <div className="shadow bg-white bg-opacity-[0.15] backdrop-blur h-screen pl-10 pr-5">
        <div className="search pt-20 pb-10">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <input
                ref={inputRef}
                type="search"
                id="search"
                className="block w-full p-5 pl-5 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 outline-none"
                placeholder="Search for a city"
                required
              />
              <button
                type="submit"
                className="text-white absolute right-2.5 bottom-4 bg-blue-600 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2"
              >
                Search
              </button>
            </div>
          </form>

          <div className="text-white py-10">
            <p className="">Your Previous Searches</p>
            <div className="previous-search h-24 w-[100%] overflow-y-auto pr-5">
              <ul className="">
                {searchResults
                  .map((result, index) => {
                    let idx = index + 1;
                    return (
                      <li
                        key={idx}
                        className="flex justify-between items-center"
                      >
                        <Link to={`/search-result/${result}`} className="flex-grow">
                          {console.log(result)}
                          <span className="">{result}</span>
                        </Link>
                        <div className="" onClick={() => handleDelBtn(idx)}>
                          <AiOutlineClose className="text-red-600 bg-[#cccccc]" />
                        </div>
                      </li>
                    );
                  })
                  .reverse()}
              </ul>
            </div>
          </div>
        </div>

        <div className="border-2 border-white"></div>
        <div className="side">
          <SideBarCard />
        </div>

        <button className="text-blue-600 text-lg bg-white border border-blue-600 py-3 px-5 rounded-md">
          View Saved Locations
        </button>
      </div>
    </>
  );
};

export default HomeRight;
