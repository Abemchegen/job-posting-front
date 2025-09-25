import { useEffect, useState } from "react";
import CompanyApplicationCard from "../../components/CompanyComponents/CompanyApplicationCard";
import { useJobPosts } from "../../hook/useJobPost";
import { useSearchParams } from "react-router-dom";
import { Spinner } from "../../components/Spinner";

export default function Application() {
  const [searchParams] = useSearchParams();
  const jobpostid = searchParams.get("id");
  const { getAllApplications } = useJobPosts();
  const [loading, setLoading] = useState(null);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    async function fetchApplications() {
      try {
        setLoading(true);
        const response = await getAllApplications(jobpostid);
        setApplications(response);
      } catch (e) {
      } finally {
        setLoading(false);
      }
    }
    fetchApplications();
  }, [jobpostid]);
  return (
    <div className="flex w-full mt-15 justify-center">
      {applications.length == 0 && !loading && (
        <div className="w-full flex justify-center">
          <p className="mt-8 font-semibold text-gray-500">
            No Applications yet...
          </p>
        </div>
      )}
      {applications.length == 0 && loading && (
        <div className="flex justify-center items-center m-5 space-x-5">
          <Spinner />
          <p className="text-xl font-semibold text-gray-500">Loading...</p>
        </div>
      )}
      {applications.length > 0 && (
        <div className="flex flex-col items-center w-full">
          {applications.map((item, idx) => {
            return <CompanyApplicationCard applicationItem={item} key={idx} />;
          })}
        </div>
      )}
    </div>
  );
}
