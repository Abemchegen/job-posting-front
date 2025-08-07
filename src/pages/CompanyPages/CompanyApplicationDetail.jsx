import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import CompanyApplicationCard from "../../components/CompanyComponents/CompanyApplicationCard";

export default function CompanyApplicationDetail() {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const application = {
    jobtitle: "Frontend Developer",
    company: "Tech Corp",
    id: 1,
    coverletter:
      "I am the right fit for this job. I have many experiances that make me qualified for this position. I believe that i'll do exceptionally well under time pressure and collaborate with my team...",
  };
  return (
    <div className="flex mt-15 justify-center">
      <div className="w-9/10 flex flex-col items-center">
        <CompanyApplicationCard detail={true} />
      </div>
    </div>
  );
}
