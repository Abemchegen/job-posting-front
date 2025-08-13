import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import CompanyApplicationCard from "../../components/CompanyComponents/CompanyApplicationCard";
import { useJobPosts } from "../../hook/useJobPost";
import { Spinner } from "../../components/Spinner";

export default function CompanyApplicationDetail() {
  const [searchParams] = useSearchParams();
  const aid = searchParams.get("aid");
  const pid = searchParams.get("pid");
  const { getanApplication } = useJobPosts();
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function fetchApplication() {
      try {
        setLoading(true);
        const response = await getanApplication(pid, aid);
        console.log(response, "application here ");
        setApplication(response);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    }
    fetchApplication();
  }, [aid, pid]);

  return (
    <div className="flex mt-15 justify-center">
      {!application && !loading && (
        <div className="w-full flex justify-center">
          <p className="mt-8 font-semibold text-gray-500">
            No Applications yet...
          </p>
        </div>
      )}
      {!application && loading && (
        <div className="flex justify-center items-center m-5 space-x-5">
          <Spinner />
          <p className="text-xl font-semibold text-gray-500">Loading...</p>
        </div>
      )}
      {application && (
        <div className="w-9/10 flex flex-col items-center">
          <CompanyApplicationCard detail={true} applicationItem={application} />
        </div>
      )}
    </div>
  );
}
