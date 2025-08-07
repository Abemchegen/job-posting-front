import { Outlet } from "react-router-dom";
import Nav from "../Nav";

export default function CompanyNavLayout() {
  return (
    <div className="flex flex-col">
      <Nav auth={true} role="company" />
      <Outlet />
    </div>
  );
}
