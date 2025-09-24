import LandingType from "../components/LandingType";
export default function RegisterType() {
  return (
    <div className="w-full h-full">
      <div className="w-full min-h-screen flex flex-col mt-5 items-center bg-brand-dark text-white">
        <h1 className="text-3xl font-bold mt-15">
          Start your journey with us!
        </h1>
        <div className="w-full flex justify-center mb-3">
          <div className="flex flex-col md:flex-row items-center w-full justify-center">
            <div className="flex justify-center">
              <LandingType
                question="Are you a job seeker?"
                text=" Kickstart your career with Sira. Sign up or log in to discover
                personalized job opportunities just for you."
                type="agent"
              />
            </div>
            <div className=" flex justify-center">
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
    </div>
  );
}
