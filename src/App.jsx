import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import RegisterType from "./pages/RegisterType";
import Apply from "./pages/AgentPages/Apply";
import MyApplications from "./pages/AgentPages/MyApplications";
import AgentHome from "./pages/AgentPages/AgentHome";
import CompanyHome from "./pages/CompanyPages/CompanyHome";
import SigninNavLayout from "./components/SigninNavLayout";
import CompanyNavLayout from "./components/CompanyComponents/CompanyNavLayout";
import CompanySidebarLayout from "./components/CompanyComponents/CompanySidebarLayout";
import ChangePassword from "./pages/ChangePassword";
import AgentAccount from "./pages/AgentPages/AgentAccount";
import CompanyAccount from "./pages/CompanyPages/CompanyAccount";
import Application from "./pages/CompanyPages/Application";
import AgentNavLayout from "./components/AgentComponents/AgentNavLayout";
import AgentSidebarLayout from "./components/AgentComponents/AgentSidebarLayout";
import AgentJobPostDetail from "./pages/AgentPages/AgentJobPostDetail";
import AgentApplicationDetail from "./pages/AgentPages/AgentApplicationDetail";
import CompanyJobPostDetail from "./pages/CompanyPages/CompanyJobPostDetail";
import CompanyApplicationDetail from "./pages/CompanyPages/CompanyApplicationDetail";
import AgentCV from "./pages/AgentPages/AgentCV";
import PostJob from "./pages/CompanyPages/PostJob";
import EditPost from "./pages/CompanyPages/EditPost";
import AdminNavLayout from "./components/AdminComponents/AdminNavLayout";
import AdminHome from "./pages/AdminPages/AdminHome";
import UserDetail from "./pages/AdminPages/UserDetail";
import AdminAccount from "./pages/AdminPages/AdminAccount";
import AdminSidebarLayout from "./components/AdminComponents/AdminSidebarLayout";
import JobDetail from "./pages/AdminPages/JobDetail";
import AddJob from "./pages/AdminPages/AddJob";
import { AuthProvider } from "./context/authContext";
import { ErrorBoundary } from "react-error-boundary";
import Button from "./components/Button";
import { useLocation } from "react-router-dom";
import JobPage from "./pages/AdminPages/JobPage";
import VerifyEmail from "./pages/VerifyEmail";
import Chats from "./pages/Chats";

function MyFallback({ error, resetErrorBoundary }) {
  const location = useLocation();
  return (
    <div className="flex justify-center">
      <div className="w-3/4 mt-15 bg-white p-5 rounded flex flex-col justify-center items-center ">
        <p className="text-2xl font-bold m-3">Something Went Wrong</p>
        <pre>Error: {error.message}</pre>
        <pre className="text-xs text-left w-full overflow-x-auto bg-gray-100 p-2 rounded mt-2">
          {error.stack}
        </pre>
        <div className="m-3">
          <Button text="Try Again" onClick={resetErrorBoundary} />
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ErrorBoundary FallbackComponent={MyFallback}>
          <Routes>
            <Route element={<SigninNavLayout />}>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/registerType" element={<RegisterType />} />
              <Route path="/changePassword" element={<ChangePassword />} />
              <Route path="/verifyEmail" element={<VerifyEmail />} />
            </Route>
            <Route element={<CompanyNavLayout />}>
              <Route path="/home/company" element={<CompanyHome />} />
              <Route path="/postJob" element={<PostJob />} />
              <Route path="/myChats" element={<Chats />} />

              <Route path="/application" element={<Application />} />
              <Route path="/editPost" element={<EditPost />} />

              <Route
                path="/detailjobpost/company"
                element={<CompanyJobPostDetail />}
              />
              <Route
                path="/applicationdetailcompany"
                element={<CompanyApplicationDetail />}
              />

              <Route element={<CompanySidebarLayout />}>
                <Route path="/account/company" element={<CompanyAccount />} />
              </Route>
            </Route>
            <Route element={<AdminNavLayout />}>
              <Route path="/home/admin" element={<AdminHome />} />
              <Route path="/userdetail" element={<UserDetail />} />
              <Route path="/pageJob" element={<JobPage />} />
              <Route path="/detailjob" element={<JobDetail />} />
              <Route path="/addjob" element={<AddJob />} />

              <Route element={<AdminSidebarLayout />}>
                <Route path="/account/admin" element={<AdminAccount />} />
              </Route>
            </Route>
            <Route element={<AgentNavLayout />}>
              <Route path="/home/agent" element={<AgentHome />} />
              <Route
                path="/detailjobpost/agent"
                element={<AgentJobPostDetail />}
              />
              <Route path="/apply" element={<Apply />} />
              <Route path="/myapplications" element={<MyApplications />} />
              <Route
                path="/agentapplicationdetail"
                element={<AgentApplicationDetail />}
              />
              <Route element={<AgentSidebarLayout />}>
                <Route path="/account/agent" element={<AgentAccount />} />
                <Route path="/chats" element={<Chats />} />
                <Route path="/cv" element={<AgentCV />} />
              </Route>
            </Route>
          </Routes>{" "}
        </ErrorBoundary>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
