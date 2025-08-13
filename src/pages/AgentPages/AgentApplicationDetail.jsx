import { useSearchParams } from "react-router-dom";
import AgentApplicationCard from "../../components/AgentComponents/AgentApplicationCard";
import { useApplication } from "../../hook/useApplications";
import { Spinner } from "../../components/Spinner";

export default function AgentApplicationDetail() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const { application, loading } = useApplication(id);

  return (
    <div className="flex mt-20 justify-center">
      {!application && !loading && (
        <div className="w-full flex justify-center">
          <p className="mt-8 font-semibold text-gray-500">
            Application not found...
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
        <div className="w-full flex justify-center">
          <AgentApplicationCard detail={true} applicationItem={application} />
        </div>
      )}
    </div>
  );
}
