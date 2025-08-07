import { Outlet } from "react-router-dom";
import Nav from "../Nav";

export default function AdminNavLayout() {
  return (
    <div className="flex flex-col">
      <Nav role="admin" auth={true} />
      <Outlet />
    </div>
  );
}
