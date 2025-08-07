import { Search } from "lucide-react";
import Button from "../../components/Button";
import JobCard from "../../components/AdminComponents/JobCard";

export default function Jobs() {
  return (
    <div>
      <div className="space-y-4 flex flex-col mt-15 items-center">
        <p className="text-center mt-10 text-xl text-gray-500 mb-7">
          Search Jobs using keywords
        </p>
        <div className="bg-white text-black relative mb-20 w-3/4 max-w-2xl p-5 rounded-xl shadow-sm flex justify-between items-center space-x-3">
          <div className="flex-1 flex flex-col md:flex-row items-center md:justify-between">
            <div className="flex md:w-4/5 w-full md:mb-0 mb-4 md:mr-2">
              <div className="flex border hover:border-gray-400 rounded-lg shadow-sm border-gray-300 items-center w-full">
                <Search className="text-gray-500 w-5 mx-2 "></Search>
                <input
                  className="w-full flex-1 focus:outline-none text-gray-700 p-2"
                  placeholder="Job names or discriptions"
                />
              </div>
            </div>
            <div className="w-full md:w-30">
              <Button text={"Search Users"}></Button>
            </div>
          </div>
        </div>
        <div className="max-w-4xl w-full">
          <p className="text-2xl m-3">Jobs Found</p>
          <JobCard />
          <JobCard />
          <JobCard />
          <JobCard />
        </div>
      </div>
    </div>
  );
}
