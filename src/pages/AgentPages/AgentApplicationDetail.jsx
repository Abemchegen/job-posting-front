import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import AgentApplicationCard from "../../components/AgentComponents/AgentApplicationCard";

export default function AgentApplicationDetail() {
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
    <div className="flex mt-20 justify-center">
      <div className="w-4/5">
        <AgentApplicationCard detail={true} />
      </div>
    </div>
  );
}
