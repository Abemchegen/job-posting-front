import { File, LockIcon, LogOut, Menu, Settings, User } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
export default function Sidebar({ active, setactive, role }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (e) {}
  };
  return (
    <div>
      {active && (
        <div className="flex flex-shrink-0 fixed top-0 left-0 h-[calc(100vh-60px)] mt-15 ">
          <div className="flex flex-col justify-between w-55 rounded-tr-lg bg-brand-dark h-full text-white p-5">
            <ul className="space-y-3 ">
              <div className="flex justify-between mb-7">
                <div className="flex">
                  <Settings className="mr-2" />
                  <p>Settings</p>
                </div>
                <button onClick={() => setactive(!active)}>
                  <Menu className="hover:cursor-pointer" />
                </button>
              </div>
              {role == "agent" && (
                <NavLink
                  onClick={() => {}}
                  to={`/account/agent`}
                  className={({ isActive }) =>
                    "flex p-2 mb-3 rounded-sm " +
                    (isActive
                      ? "bg-brand"
                      : "hover:bg-[#00a896] hover:font-bold")
                  }
                >
                  <div className="flex">
                    <User className="mr-2" />
                    <span>My Account</span>
                  </div>
                </NavLink>
              )}
              {role == "company" && (
                <NavLink
                  onClick={() => {}}
                  to={`/account/company`}
                  className={({ isActive }) =>
                    "flex p-2 mb-3 rounded-sm " +
                    (isActive
                      ? "bg-brand"
                      : "hover:bg-[#00a896] hover:font-bold")
                  }
                >
                  <div className="flex">
                    <User className="mr-2" />
                    <span>My Account</span>
                  </div>
                </NavLink>
              )}
              {role == "agent" && (
                <NavLink
                  className={({ isActive }) =>
                    "flex p-2 mb-3 rounded-sm " +
                    (isActive
                      ? "bg-brand"
                      : "hover:bg-[#00a896] hover:font-bold")
                  }
                  to={"/cv"}
                >
                  <File className="mr-2" />
                  <span>My CV</span>
                </NavLink>
              )}
              <NavLink
                className={({ isActive }) =>
                  "flex p-2 rounded-sm " +
                  (isActive
                    ? "bg-brand"
                    : "  hover:bg-[#00a896] hover:font-bold")
                }
                to={"/changePassword"}
              >
                <LockIcon className="mr-2" />
                <span>Change Password</span>
              </NavLink>
              <button
                className="flex w-full p-2 rounded-sm focus:bg-brand hover:bg-[#00a896] hover:font-bold"
                onClick={() => {
                  handleLogout();
                }}
              >
                <LogOut className="mr-2" />
                <span>Logout</span>
              </button>
            </ul>
          </div>
        </div>
      )}
      {!active && (
        <div className="flex fixed top-0 left-0 h-[calc(100vh-60px)] mt-15 flex-shrink-0">
          <div className="flex flex-col justify-between w-15 rounded-tr-lg bg-brand-dark text-white p-2">
            <ul className="space-y-3">
              <div className="flex justify-between p-2 mb-7">
                <button onClick={() => setactive(!active)}>
                  <Menu className="hover:cursor-pointer" />
                </button>
              </div>
              {role == "company" && (
                <NavLink
                  className={({ isActive }) =>
                    "flex p-2 mb-1 rounded-sm  " +
                    (isActive ? "bg-brand" : "hover:bg-[#00a896]")
                  }
                  to={`/account/company`}
                >
                  <User className="mr-2" />
                </NavLink>
              )}
              {role == "agent" && (
                <NavLink
                  className={({ isActive }) =>
                    "flex p-2 mb-1 rounded-sm  " +
                    (isActive ? "bg-brand" : "hover:bg-[#00a896]")
                  }
                  to={`/account/agent`}
                >
                  <User className="mr-2" />
                </NavLink>
              )}
              {role == "agent" && (
                <>
                  <NavLink
                    className={({ isActive }) =>
                      "flex p-2 mb-1 rounded-sm " +
                      (isActive ? "bg-brand" : "hover:bg-[#00a896]")
                    }
                    to={"/cv"}
                  >
                    <File className="mr-2" />
                  </NavLink>
                </>
              )}

              <NavLink
                className={({ isActive }) =>
                  "flex p-2 mb-1 rounded-sm " +
                  (isActive ? "bg-brand" : "hover:bg-[#00a896]")
                }
                to={"/changePassword"}
              >
                <LockIcon className="mr-2" />
              </NavLink>
              <button
                className="flex w-full p-2 rounded-sm focus:bg-brand hover:bg-[#00a896] hover:font-bold"
                onClick={() => {
                  handleLogout();
                }}
              >
                <LogOut className="mr-2" />
              </button>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
