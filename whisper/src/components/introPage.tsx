import Friends from "/friend.jpeg";
import Button from "./button";
import Svg2 from "./svg2";

function Intro() {
  return (
    <>
      <div className="flex h-screen  items-center justify-center">
        <img
          className="object-cover w-full h-full absolute inset-0 z-0"
          src={Friends}
          alt=""
        />
        <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
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
            {" "}
            <Button value="Get  Started" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Intro;
