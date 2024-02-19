import Bell from "/bell.png";
import Svg3 from "./svg3";
function TopSite() {
  return (
    <>
      <div className="bg-custom-white flex flex-row justify-between   p-2 z-40 ">
        <Svg3 width=" 70px" height="32px" />
        <img className="w-10" src={Bell} alt="" />
      </div>
    </>
  );
}
export default TopSite;
