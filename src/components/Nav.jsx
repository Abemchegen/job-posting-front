import { Link, useNavigate } from "react-router-dom";
import { Search, User } from "lucide-react";
import Button from "./Button";
import { useAuth } from "../context/authContext";

export default function Nav() {
  const navigate = useNavigate();
  const { isAuthenticated, user, loading } = useAuth();
  return (
    <nav className="bg-muted flex h-15 z-10 px-2 w-full justify-between items-center fixed top-0 left-0 space-x-3">
      <div className="">
        {isAuthenticated && user.role == "AGENT" && (
          <div>
            <Link to="/home/agent" className="flex space-x-3 items-center">
              <Search className="w-8 h-8 text-white p-1 bg-brand rounded-sm"></Search>
              <span className="font-bold text-2xl">Sira</span>
            </Link>
          </div>
        )}
        {isAuthenticated && user.role == "COMPANY" && (
          <div>
            <Link to="/home/company" className="flex space-x-3 items-center">
              <Search className="w-8 h-8 text-white p-1 bg-brand rounded-sm"></Search>
              <span className="font-bold text-2xl">Sira</span>
            </Link>
          </div>
        )}
        {isAuthenticated && user.role == "ADMIN" && (
          <div>
            <Link to="/home/admin" className="flex space-x-3 items-center">
              <Search className="w-8 h-8 text-white p-1 bg-brand rounded-sm"></Search>
              <span className="font-bold text-2xl">Sira</span>
            </Link>
          </div>
        )}
        {!isAuthenticated && (
          <div>
            <Link to="/" className="flex space-x-3 items-center">
              <Search className="w-8 h-8 text-white p-1 bg-brand rounded-sm"></Search>
              <span className="font-bold text-2xl">Sira</span>
            </Link>
          </div>
        )}
      </div>
      {isAuthenticated && (
        <div className="flex space-x-10 mr-10">
          {user.role == "AGENT" && (
            <>
              <Link
                className="hover:text-brand hover:font-bold w-10"
                to="/home/agent"
              >
                Home
              </Link>
              <Link
                className="hover:text-brand hover:font-bold w-31"
                to="/myapplications"
              >
                My Applications
              </Link>{" "}
              <Link
                className="hover:text-brand hover:font-bold w-10"
                to="myChats"
              >
                Chat
              </Link>
              <Link
                className="hover:text-brand hover:font-bold w-10"
                to={`/account/agent`}
              >
                Account
              </Link>
            </>
          )}
          {user.role == "COMPANY" && (
            <div className="flex justify-between w-75">
              <div>
                <Link
                  className="hover:text-brand hover:font-bold "
                  to="/home/company"
                >
                  Home
                </Link>
              </div>
              <div>
                <Link
                  className="hover:text-brand hover:font-bold "
                  to="/postJob"
                >
                  Post Job
                </Link>
              </div>
              <div>
                <Link className="hover:text-brand hover:font-bold" to="myChats">
                  Chat
                </Link>
              </div>
              <div>
                <Link
                  className="hover:text-brand hover:font-bold"
                  to={`/account/company`}
                >
                  Account
                </Link>
              </div>
            </div>
          )}
          {user.role == "ADMIN" && (
            <>
              <Link
                className="hover:text-brand hover:font-bold w-10"
                to="/home/admin"
              >
                Home
              </Link>

              <Link
                className="hover:text-brand hover:font-bold w-10"
                to="/pageJob"
              >
                Jobs
              </Link>
              <Link
                className="hover:text-brand hover:font-bold w-18"
                to="/addjob"
              >
                Add Job
              </Link>
              <Link
                className="hover:text-brand hover:font-bold w-10"
                to={`/account/admin`}
              >
                Account
              </Link>
            </>
          )}
        </div>
      )}
      {!isAuthenticated && (
        <div className="flex space-x-4">
          <Button
            onClick={() => navigate("/login")}
            text={"Login"}
            variant="dark"
          ></Button>
          <Button
            onClick={() => navigate("/registerType")}
            text={"Register"}
          ></Button>
        </div>
      )}
    </nav>
  );
}
