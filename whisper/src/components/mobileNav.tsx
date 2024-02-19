import message from "/messages.png";
import loupe from "/loupe.png";
import home from "/home.png";
import plus from "/plus.png";
import profile from "/account.png";
import { useNavigate } from "react-router-dom";
import TopSite from "./topSite";
import { useState } from "react";
import Popup from "./popUpPost";

function MoblieNav() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const icons = [
    { path: home, ref: "/home", alt: "home" },
    { path: loupe, ref: "/search", alt: "search" },
    {
      path: plus,
      alt: "add",
      onClick: () => setIsOpen(true), // aggiungi un gestore di click per aprire il popup
    },
    { path: message, ref: "/message", alt: "message" },
    { path: profile, ref: "/profile", alt: "profile" },
  ];

  return (
    <>
      <div className=" ">
        <TopSite />
      </div>
      <div className=" flex justify-around fixed bottom-0 w-full bg-custom-white py-2  z-40">
        {icons.map((icon, index) => (
          <div key={index}>
            <img
              className="w-10 h-10"
              src={icon.path}
              alt={icon.alt}
              onClick={() => {
                if (icon.alt === "add") {
                  setIsOpen(true);
                } else if (icon.ref) {
                  navigate(icon.ref);
                }
              }}
            />
          </div>
        ))}
      </div>
      {isOpen && <Popup closePopup={() => setIsOpen(false)} />}
    </>
  );
}

export default MoblieNav;
