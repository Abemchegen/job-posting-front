import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
export default function RegisterType() {
  const navigate = useNavigate();
  return (
    <div className="w-full h-full">
      <div className="w-full min-h-screen flex flex-col mt-15 items-center justify-center  bg-brand-dark text-white">
        <h1 className="text-3xl font-bold mt-3">Start your journey with us!</h1>
        <div className="flex flex-col items-center md:flex-row justify-center w-3/4 mt-10 ">
          <div className="flex flex-col items-center md:flex-row justify-center w-full">
            <div className="flex justify-center  ">
              <div className="max-w-120 m-3 p-3 bg-muted text-black  flex flex-col items-center shadow-sm rounded-lg ">
                <h2 className="text-3xl font-bold mt-15">
                  Are you a job seeker?
                </h2>
                <p className="my-15 h-15 p-3">
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
            <div className="flex justify-center">
              <div className="max-w-120 m-3 p-3  bg-muted text-black flex flex-col items-center shadow-sm rounded-lg">
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
    </div>
  );
}
