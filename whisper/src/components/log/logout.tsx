import logoutimg from "/ilogout.png";
import axios from "axios";
import cookie from "js-cookie";

const LogOut = () => {
  const removeCookie = (key: string) => {
    if (typeof window !== "undefined") {
      cookie.remove(key);
    }
  };

  const logout = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5001/api/user/logout`,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        removeCookie("jwt");
        window.location.href = "/";
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("Error", error.response?.data);
      } else if (error instanceof Error) {
        console.error("Error", error.message);
      }
    }
  };

  return (
    <>
      <li onClick={logout}>
        <button className="lg:focus:outline-none lg:focus:border-l-4 lg:border-custom-blue hover:cursor-pointer">
          <img className="w-10" src={logoutimg} alt="" />
        </button>
      </li>
    </>
  );
};

export default LogOut;
