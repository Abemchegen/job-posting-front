import { useSearchParams } from "react-router-dom";
import JobCard from "../../components/AdminComponents/JobCard";
import { useJob } from "../../hook/useJobs";
import { Spinner } from "../../components/Spinner";

export default function JobDetail() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const { job, loading } = useJob(id);
  return (
    <div className="mt-15 flex justify-center">
      {!job && !loading && (
        <div className="w-full">
          <p className="mt-8 font-semibold text-gray-500">Job not found...</p>
        </div>
      )}
      {!job && loading && (
        <div className="flex justify-center items-center m-5 space-x-5">
          <Spinner />
          <p className="text-xl font-semibold text-gray-500">Loading...</p>
        </div>
      )}
      {job && (
        <div className="w-full max-w-2xl">
          <JobCard detail={true} jobItem={job} />
        </div>
      )}
    </div>
  );
}
