import login from "/like.jpg";
import { useNavigate } from "react-router-dom";
import Form_login from "./form-login";

function LoginForm() {
  const Navigate = useNavigate();
  return (
    <>
      <div className="flex flex-col text-center justify-center items-center lg:flex lg:flex-row lg:justify-start lg:items-center">
        <div className="relative">
          <img
            className="fadeIn shadow-lg lg:w-2/2 lg:h-screen brightness-50 "
            src={login}
            alt="login"
            style={{
              zIndex: 1,
            }}
          />
          <p
            className="text-custom-white absolute w-96 leading-loose font-bold text-lg sm:text-base md:text-lg lg:text-3xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-2 z-20"
            onClick={() => Navigate("/login")}
          >
            You don't have an account? <br /> what are you waiting for? <br />{" "}
            go and sign up now!
          </p>
          <button
            className=" hidden lg:block hover:border-custom-blue hover:text-custom-blue   text-center font-black w-2/5 text-custom-white rounded-xl mt-5 lg:text-xl hover:opacity-100  duration-700 cursor-pointer lg:absolute lg:border-2 lg:border-custom-white lg:bottom-1/4 lg:left-1/2 transform -translate-x-1/2 -translate-y-/2 p-2 z-20"
            onClick={() => Navigate("/signup")}
          >
            Sign Up
          </button>
        </div>
        <Form_login />
      </div>
    </>
  );
}

export default LoginForm;
