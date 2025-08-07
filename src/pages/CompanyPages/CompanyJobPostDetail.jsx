import { useSearchParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import CompanyJobPostCard from "../../components/CompanyComponents/CompanyJobPostCard";
export default function CompanyJobPostDetail() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const agent = searchParams.get("agent");
  const job = {
    title: "Frontend Developer",
    company: "Tech Corp",
    salary: "80,000",
    date: "2025-07-22",
    description: "Build and maintain web applications using React.",
  };
  return (
    <div>
      <div className="h-screen mt-15">
        <div className="flex p-5 items-center text-blue-500 hover:text-blue-700">
          <ArrowLeft className="mr-2 w-4" />
          <Link to={"/jobs"}>Back to Job Posts</Link>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-9/10 max-w-4xl">
            <CompanyJobPostCard job={job} detail={true} />
          </div>
          <div className="w-9/10 max-w-4xl mb-10">
            <div>
              <div className="bg-white text-black m-5 space-y-2 rounded-xl shadow-sm p-7">
                <div className="flex justify-between">
                  <div className="flex flex-col">
                    <p className="text-lg mb-4 ">Job description</p>
                    <p className="text-gray-600">{job.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
