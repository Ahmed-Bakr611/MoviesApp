import CustomNavBar from "../components/CustomNavBar";
import { Outlet } from "react-router";
export default function LayoutPage() {
  return (
    <div className="myLayout">
      <CustomNavBar></CustomNavBar>
      <Outlet></Outlet>
    </div>
  );
}
