import { Link, useNavigate } from "react-router-dom";
import { Search, User } from "lucide-react";
import Button from "./Button";
import { useAuth } from "../context/authContext";
import { Spinner } from "./Spinner";

export default function Nav() {
  const navigate = useNavigate();
  const { isAuthenticated, user, loading } = useAuth();
  console.log(isAuthenticated, user, loading);
  return (
    <nav className="bg-muted flex h-16 z-10 px-2 w-full justify-between items-center fixed top-0 left-0 space-x-3">
      <div>
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
              <Search className="w-8 h-8 text-white p-1 bg-brand rounded-sm" />
              <span className="font-bold text-2xl">Sira</span>
            </Link>
          </div>
        )}
      </div>
      {loading && <Spinner />}
      {!loading && isAuthenticated && (
        <div className="flex mr-10">
          {user.role == "AGENT" && (
            <div className="flex justify-between w-80">
              <div>
                <Link
                  className="hover:text-brand hover:font-bold w-12"
                  to="/home/agent"
                >
                  Home
                </Link>{" "}
              </div>{" "}
              <div>
                <Link
                  className="hover:text-brand hover:font-bold w-32"
                  to="/myapplications"
                >
                  My Applications
                </Link>{" "}
              </div>
              <div>
                {" "}
                <Link
                  className="hover:text-brand hover:font-bold w-12"
                  to="myChats"
                >
                  Chat
                </Link>
              </div>
              <div>
                {" "}
                <Link
                  className="hover:text-brand hover:font-bold w-12"
                  to={`/account/agent`}
                >
                  Account
                </Link>
              </div>
            </div>
          )}
          {user.role == "COMPANY" && (
            <div className="flex justify-between w-80">
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
            <div className="flex justify-between w-80">
              <div>
                <Link
                  className="hover:text-brand hover:font-bold w-12"
                  to="/home/admin"
                >
                  Home
                </Link>{" "}
              </div>
              <div>
                <Link
                  className="hover:text-brand hover:font-bold w-12"
                  to="/pageJob"
                >
                  Jobs
                </Link>{" "}
              </div>
              <div>
                {" "}
                <Link
                  className="hover:text-brand hover:font-bold w-20"
                  to="/addjob"
                >
                  Add Job
                </Link>{" "}
              </div>
              <div>
                {" "}
                <Link
                  className="hover:text-brand hover:font-bold w-12"
                  to={`/account/admin`}
                >
                  Account
                </Link>{" "}
              </div>
            </div>
          )}
        </div>
      )}

      {!loading && !isAuthenticated && (
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
