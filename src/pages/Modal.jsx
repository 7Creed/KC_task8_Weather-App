import React from "react";
import { AiFillWarning } from "react-icons/ai";
// import { useFetch } from '../api/useFetch';
import { useGlobalContext } from "../context/context";

const Modal = ({handleCloseModal}) => {
  const { isError } = useGlobalContext();

  return (
    <div className="">
      <div className="fixed top-0 left-0 w-full h-screen bg-black opacity-70 z-50"></div>
      <div className="absolute top-[15%] left-[15%] bg-white w-[70%] pt-3 pb-10 z-50">
        <div className="w-[70%] m-auto">
          {/* {children} */}
          <AiFillWarning className="text-9xl text-yellow-400 w-[70%] m-auto" />

          <div className="">{isError}</div>
          
          <div className="space-y-4">
            {/* <div className="text-2xl text-center">{isError}</div> */}
            <button className="w-full py-1 bg-black text-white rounded-md border-none"
            onClick={handleCloseModal}
            >
              Close
            </button>
          
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
