import AgentApplicationCard from "../../components/AgentComponents/AgentApplicationCard";
import { Search } from "lucide-react";
import Button from "../../components/Button";

export default function MyApplications() {
  return (
    <div className="flex w-full flex-col justify-center mt-15 items-center">
      <div className="w-full flex flex-col items-center">
        <h1 className="text-3xl font-semibold mb-5">Your Applications </h1>
        <p className="text-gray-500 text-lg mb-10">
          Search applications you have made so far by using keywords.
        </p>
        <div className="bg-white text-black relative mb-20 w-3/4 max-w-2xl p-5 rounded-xl shadow-sm flex justify-between items-center space-x-3">
          <div className="flex-1 flex flex-col md:flex-row items-center md:justify-between">
            <div className="flex md:w-4/5 w-full md:mb-0 mb-4 md:mr-2">
              <div className="flex border  hover:border-gray-400 rounded-lg shadow-sm border-gray-300 items-center w-full">
                <Search className="text-gray-500 w-5 mx-2 "></Search>
                <input
                  className="w-full flex-1 focus:outline-none text-gray-700 p-2"
                  placeholder="Job title, keywords, or company"
                />
              </div>
            </div>
            <div className="w-full md:w-30">
              <Button text={"Search Jobs"}></Button>
            </div>
          </div>
        </div>
        <div className="w-9/10">
          <AgentApplicationCard />
          <AgentApplicationCard />
          <AgentApplicationCard />
          <AgentApplicationCard />
        </div>
      </div>
    </div>
  );
}
