import { useState } from "react";
import Sidebar from "../Sidebar";
import { Outlet } from "react-router-dom";
export default function AgentSidebarLayout() {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  return (
    <div>
      <div className="flex">
        <Sidebar
          role={"agent"}
          active={sidebarExpanded}
          setactive={setSidebarExpanded}
        />
        <div className={`flex-1 mt-15 ${sidebarExpanded ? "ml-55" : "ml-15"}`}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
