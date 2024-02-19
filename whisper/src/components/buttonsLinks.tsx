/* TypeScript React */
import { FaFacebookSquare } from "react-icons/fa";
import { FaApple } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";

const icons = [
  {
    title: "Facebook",
    icon: <FaFacebookSquare className="mx-2" />,
    className:
      "text-blue-500  w-44 rounded-lg  bg-slate-200 border-2 border-black ",
  },
  {
    title: "Apple",
    icon: <FaApple className="mx-2" />,
    className: "text-white bg-black  w-44 rounded-lg border-2 border-black  ",
  },
  {
    title: "Google",
    icon: <FaGoogle className="mx-2" />,
    className:
      "text-red-500 bg-slate-200 w-44 rounded-lg  border-2 border-black",
  },
  // Aggiungi qui altre icone se necessario
];

function Links() {
  return (
    <div className="lg:flex flex flex-col  space-y-5  py-3 ">
      {icons.map((icon, index) => (
        <div
          key={index}
          className="lg:flex lg:flex-row  flex flex-col  text-center justify-center items-center mx-5 border-2 "
          onClick={() => alert("sorry this feature is not available yet")}
        >
          <button
            className={`flex justify-center items-center shadow-xl  text-xl ${icon.className} hover:`}
          >
            {icon.icon}
            {icon.title}
          </button>
        </div>
      ))}
    </div>
  );
}

export default Links;
