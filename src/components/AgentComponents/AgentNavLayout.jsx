import { Outlet } from "react-router-dom";
import Nav from "../Nav";

export default function AgentNavLayout() {
  return (
    <div className="flex flex-col">
      <Nav role="agent" auth={true} />
      <Outlet />
    </div>
  );
}
