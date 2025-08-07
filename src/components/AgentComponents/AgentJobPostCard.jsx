import { Calendar, DollarSign } from "lucide-react";
import Button from "../Button";
import { useNavigate } from "react-router-dom";

export default function AgentJobPostCard({ job, detail = false }) {
  const navigate = useNavigate();
  return (
    <div className="bg-white text-black m-5 space-y-2 rounded-xl shadow-sm p-7">
      <div className="flex mb-3 justify-between">
        <div className="flex flex-col">
          <p className="text-blue-600 text-xl mb-3 font-bold hover:text-blue-800">
            {job.title}
          </p>
          <p className="text-lg">{job.company}</p>
        </div>
        {!detail && (
          <div>
            <Button
              text={"View Details"}
              onClick={() => navigate(`/jobpostdetail/agent?id=${job.id}`)}
            />
          </div>
        )}
        {detail && (
          <div>
            <Button
              text={"Apply"}
              onClick={() => navigate(`/apply?id=${job.id}`)}
            />
          </div>
        )}
      </div>
      <div className="space-x-4 flex">
        <div className="flex">
          <DollarSign className="w-4 font-light text-gray-500"></DollarSign>
          <span className="text-gray-500"> {job.salary}</span>
        </div>
        <div className="flex">
          <Calendar className="w-4 font-light mr-1 text-gray-500"></Calendar>
          <span className="text-gray-500"> {job.date}</span>
        </div>
      </div>
      {!detail && <p>{job.description}</p>}
    </div>
  );
}
