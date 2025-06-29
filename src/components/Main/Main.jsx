 import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navba";
// import Navbar from "../../Components/Navbar/Navbar";
// import { Helmet } from "react-helmet";

const Main = () => {
  return (
    <div className="px-6">
       
      {/* <Navbar /> */}
      <Navbar/>
      <Outlet className="mt-10 px-3"></Outlet>
    </div>
  );
};

export default Main;