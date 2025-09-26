import "../index.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import Button from "../components/Button";
import LandingCard from "../components/LandingCard";
import LandingType from "../components/LandingType";
import { useEffect } from "react";
export default function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      if (user.role === "AGENT") {
        navigate("/home/agent");
      } else if (user.role === "COMPANY") {
        navigate("/home/company");
      } else if (user.role === "ADMIN") {
        navigate("/home/admin");
      }
    }
  }, [user, navigate]);

  return (
    <div className="w-full bg-muted">
  <div className="flex flex-col w-full min-h-screen items-center mt-16 bg-brand-dark text-muted mb-20 py-5">
        <h1 className="text-5xl mt-10 font-bold">Welcome to Sira!</h1>
        <div className="w-full flex justify-center">
          <div className="flex flex-col md:flex-row items-center  w-full justify-center">
            <div className="flex justify-center">
              <LandingType
                question="Are you a job seeker?"
                text=" Kickstart your career with Sira. Sign up or log in to discover
                personalized job opportunities just for you."
                type="agent"
              />
            </div>
            <div className="flex justify-center">
              <LandingType
                question="Are you a job poster?"
                text="Find top talent fast with Sira. Post your job and connect with
                qualified candidates today."
                type="company"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-full  justify-center flex-col items-center">
        <h2 className="text-4xl mb-5 font-bold">Why Choose Sira?</h2>
        <p className="text-gray-500 text-2xl mb-10 ">
          We make job searching simple and effective
        </p>
        <div className="flex w-full  flex-col gap-6 p-6 md:flex-row ">
          <LandingCard
            text="Advanced filters and recommendations to find the perfect job
              match."
            title="Smart Search"
          />
          <LandingCard
            text="Connect with leading employers and startups across various
              industries."
            title="Top Companies"
          />
          <LandingCard
            text="Resources and tools to help you advance your career and skills."
            title="Career Growth"
          />
        </div>
      </div>
  <div className="flex w-full justify-center  flex-col items-center mt-16">
        <p className="text-gray-500  text-2xl mb-10 ">
          We make job posting efficient and simple
        </p>
        <div className="flex w-full  flex-col gap-6 p-6 md:flex-row ">
          <LandingCard
            text="Advanced filters and recommendations to find the perfect match for
              your company."
            title="Smart Search"
          />
          <LandingCard
            text="Connect with leading employees across various industries."
            title="Top employees"
          />
          <LandingCard
            text="Helping you grow your business with top employees."
            title="Business Growth"
          />
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
