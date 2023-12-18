import { useParams, useNavigate } from "react-router-dom";
import { SearchResultCard } from "../components/Card";
import { useGlobalContext } from "../context/context";
import { getBackgroundImage } from "../api/useFetch";

const SearchResult = () => {
  const { resultData } = useGlobalContext();
  // const { searchValue } = useParams();
  // const navigate = useNavigate();

  // const image = getBackgroundImage(searchData);
  const image = getBackgroundImage(resultData);

  const searchResultStyles = {
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
        className="flex justify-center items-center h-screen"
        style={searchResultStyles}
      >
        <div className="shadow flex bg-opacity-[0.15] justify- items- p-10 border rounded-xl backdrop-blur backdrop-filter min:h-[500px] w-[700px]">
          <div className="w-[100%]">
            <SearchResultCard 
            // resultData={resultData} 
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchResult;

// return (
//   <>
//     <div className="flex justify-center items-center h-screen">
//       hou
//       {/* <div className="flex bg-white bg-opacity-[0.15] justify- items- p-10 border rounded-xl backdrop-blur backdrop-filter bg-red-20 h-[550px] w-[700px]"> */}
//       {/* <div className="city-detail"> */}
//       <div className="relative h-[500px] w-[700px] border rounded-xl">
//         houd
//         <div className="w-[100%] bg-red-20 absolute inset-0 p-10 border rounded-xl bg-opacity-[0.15] backdrop-filter backdrop-blur">
//           <div className="w-[100%] relative z-50 text-white">
//             <BsArrowLeft />
//             <div className="absolute w-[100%]">
//               <button className="" onClick="">
//                 Back
//               </button>
//               <SearchResultCard />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   </>
// );
