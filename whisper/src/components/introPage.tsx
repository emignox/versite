import Friends from "/friend.jpeg";
import Svg2 from "./svg2";
import { useNavigate } from "react-router-dom";
import Svg3 from "./svg3";

function Intro() {
  const Navigate = useNavigate();

  return (
    <>
      <div className="flex h-screen  items-center justify-between fadeIn ">
        <div className=" lg:relative lg:bottom-1/4   lg:pl-8   lg:w-1/3 animate-slideInFromLeft lg:block hidden  ">
          <Svg3 width="300px" height="200px" />
          <p className=" lg text-xl mt-20 text-custom-dark-blue  text-justify  opacity-70 ">
            Make your life simpler ,<br /> full of adventures and new friends!
          </p>
          <img className=" w-" src="" alt="" />
        </div>
        <img
          className=" lg:object-contain lg:object-bottom object-cover w-full h-full absolute  inset-0 z-0 "
          style={{ filter: "brightness(0.5)" }}
          src={Friends}
          alt=""
        />
        <div className="z-10   mt-32">
          <Svg2 />
          <div className=" text-custom-white flex flex-col space-y-5  font-bold  justify-center items-center text-center text-xl mt-10 opacity-75">
            <p>Connect with new faces.</p>
            <p>Add friends and share adventures</p>
            <p> Discover meaningful connections. </p>
          </div>
          <p className=" text-custom-white text-center w-96 mt-32">
            Enjoy the full experience without any cost! Our platform is
            completely free.
          </p>
          <div className=" flex justify-center items-center my-9">
            <button
              onClick={() => Navigate("/signup")}
              className="  text-white py-2 px-6 w-3/5 font-bold rounded-2xl text-xl fillEffect shadow-lg  border border-custom-blue  lg:w-1/2 "
            >
              Get Started
            </button>
          </div>
        </div>
        <div className=" lg:relative  top-1/4 pl-20 text-xl  text-custom-dark-blue opacity-70  justify-center items-center w-1/3 animate-slideInFromRight lg:block hidden">
          Start your journey with us!
        </div>
      </div>
    </>
  );
}

export default Intro;
