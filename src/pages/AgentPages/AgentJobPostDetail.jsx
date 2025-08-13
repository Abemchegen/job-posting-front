import { useSearchParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import AgentJobPostCard from "../../components/AgentComponents/AgentJobPostCard";
import { Spinner } from "../../components/Spinner";
import { useAgentJobPost } from "../../hook/useApplications";

export default function AgentJobPostDetail() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const { jobPost, loading } = useAgentJobPost(id);

  return (
    <div>
      <div className="h-screen mt-15">
        {!jobPost && !loading && (
          <div className="w-full">
            <p className="mt-8 font-semibold text-gray-500">
              Post not found...
            </p>
          </div>
        )}
        {!jobPost && loading && (
          <div className="flex justify-center items-center m-5 space-x-5">
            <Spinner />
            <p className="text-xl font-semibold text-gray-500">Loading...</p>
          </div>
        )}
        {jobPost && (
          <>
            <div className="flex p-5 items-center text-blue-500 hover:text-blue-700">
              <ArrowLeft className="mr-2 w-4" />
              <Link to={"/home/agent"}>Back to Jobs</Link>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-full">
                <AgentJobPostCard jobPost={jobPost} detail={true} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
