import { useState } from "react";
import Sidebar from "../Sidebar";
import { Outlet } from "react-router-dom";
export default function AdminSidebarLayout() {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  return (
    <div>
      <div className="flex">
        <Sidebar
          role={"admin"}
          active={sidebarExpanded}
          setactive={setSidebarExpanded}
        />
  <div className={`flex-1 mt-16 ${sidebarExpanded ? "ml-56" : "ml-16"}`}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
