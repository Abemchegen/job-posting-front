import "../index.css";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import Button from "../components/Button";
export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-muted">
      <div className="flex flex-col w-full min-h-screen items-center mt-15 bg-brand-dark text-muted mb-20 py-5">
        <h1 className="text-5xl mt-10 font-bold">Welcome to Sira!</h1>
        <div className="w-full flex  justify-center">
          <div className="flex text-center flex-col md:flex-row items-center justify-center md:w-4/5 md:space-x-6">
            <div className="flex items-center justify-center">
              <div className="max-w-120 mt-8 p-3 flex flex-col items-center bg-muted text-black shadow-sm rounded-lg ">
                <h2 className="text-3xl  font-bold mt-15">
                  Are you a job seeker?
                </h2>
                <p className="my-15 p-3 h-15">
                  Kickstart your career with Sira. Sign up or log in to discover
                  personalized job opportunities just for you.
                </p>
                <div className="mb-5">
                  <Button
                    onClick={() => navigate("/signup?type=agent")}
                    text={"Get started!"}
                  ></Button>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="max-w-120 mt-8 p-3 flex flex-col bg-muted text-black items-center shadow-sm rounded-lg">
                <h2 className="text-3xl font-bold mt-15">
                  Are you a job poster?
                </h2>
                <p className="my-15 h-15 p-3">
                  Find top talent fast with Sira. Post your job and connect with
                  qualified candidates today.{" "}
                </p>
                <div className="mb-5">
                  <Button
                    onClick={() => navigate("/signup?type=company")}
                    text={"Get started!"}
                  ></Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex  w-full max-w-7xl flex-col items-center">
        <h2 className="text-4xl mb-5 font-bold">Why Choose Sira?</h2>
        <p className="text-gray-500 text-2xl mb-10 ">
          We make job searching simple and effective
        </p>
        <div className="flex flex-col gap-6 p-6 md:flex-row ">
          <div className="mb-4 flex flex-col min-w-[182px] shadow-sm rounded-lg basis-1/3 p-5 bg-white">
            <Search className="w-8 mb-4 h-8 text-white p-1 bg-brand rounded-sm"></Search>
            <p className="text-xl mb-2">Smart Search</p>
            <p className="mb-2">
              Advanced filters and recommendations to find the perfect job
              match.
            </p>
          </div>
          <div className="mb-4 flex min-w-[182px] flex-col rounded-lg shadow-sm basis-1/3 p-5 bg-white">
            <Search className="w-8 mb-4 h-8 text-white p-1 bg-brand rounded-sm"></Search>
            <p className="text-xl mb-2">Top Companies</p>
            <p className="mb-2">
              Connect with leading employers and startups across various
              industries.
            </p>
          </div>
          <div className="mb-4 flex flex-col min-w-[182px] shadow-sm rounded-lg basis-1/3 p-5 bg-white">
            <Search className="w-8 mb-4 h-8 text-white p-1 bg-brand rounded-sm"></Search>
            <p className="text-xl mb-2">Career Growth</p>
            <p className="mb-2">
              Resources and tools to help you advance your career and skills.
            </p>
          </div>
        </div>
      </div>
      <div className="flex  w-full max-w-7xl flex-col items-center mt-20">
        <p className="text-gray-500 text-2xl mb-15 ">
          We make job posting efficient and simple
        </p>
        <div className="flex flex-col gap-6 p-6 md:flex-row ">
          <div className="mb-4 flex flex-col min-w-[182px] shadow-sm rounded-lg basis-1/3 p-5 bg-white">
            <Search className="w-8 mb-4 h-8 text-white p-1 bg-brand rounded-sm"></Search>
            <p className="text-xl mb-2">Smart Search</p>
            <p className="mb-2">
              Advanced filters and recommendations to find the perfect match for
              your company.
            </p>
          </div>
          <div className="mb-4 flex min-w-[182px] flex-col rounded-lg shadow-sm basis-1/3 p-5 bg-white">
            <Search className="w-8 mb-4 h-8 text-white p-1 bg-brand rounded-sm"></Search>
            <p className="text-xl mb-2">Top employees</p>
            <p className="mb-2">
              Connect with leading employees across various industries.
            </p>
          </div>
          <div className="mb-4 flex flex-col min-w-[182px] shadow-sm rounded-lg basis-1/3 p-5 bg-white">
            <Search className="w-8 mb-4 h-8 text-white p-1 bg-brand rounded-sm"></Search>
            <p className="text-xl mb-2">Business Growth</p>
            <p className="mb-2">
              Helping you grow your business with top employees.
            </p>
          </div>
        </div>
      </div>
      <div className="flex p-6 flex-col w-full items-center bg-brand-dark text-muted py-2">
        <h2 className="text-4xl my-10 font-bold text-muted">
          Ready to explore ?
        </h2>
        <p className="text-gray-300 text-xl mb-10">
          Join thousands of professionals and companies that have connected
          through us!
        </p>

        <div className="my-5">
          <Button
            onClick={() => navigate("/registerType")}
            text={"Register Now"}
          ></Button>
        </div>
      </div>
    </div>
  );
}
