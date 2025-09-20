import { Calendar, DollarSign, House } from "lucide-react";
import Button from "../Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { BsPerson } from "react-icons/bs";
import { GiCheckMark } from "react-icons/gi";

export default function AgentJobPostCard({ jobPost, detail = false }) {
  const [jobPostData, setJobPostData] = useState({
    salary: jobPost.salary,
    peopleNeeded: jobPost.peopleNeeded,
    subcatDesc: jobPost.subcatDesc,
    company: jobPost.companyName,
    subcatName: jobPost.subcatName,
    jobName: jobPost.jobName,
    description: jobPost.description,
    date: jobPost.date,
    id: jobPost.id,
    applied: jobPost.applied,
    applicationid: jobPost.applicationid,
  });
  console.log(jobPostData.applied);
  const navigate = useNavigate();
  return (
    <div className="w-full flex flex-col items-center">
      <div className="bg-white max-w-4xl w-full text-black m-5 space-y-2 rounded-xl shadow-sm p-7">
        <div className="flex flex-col w-full">
          <div className="flex w-full justify-between">
            <div className="flex flex-col space-y-2 mb-2">
              <p className="text-blue-600 text-xl text-center font-bold hover:text-blue-700">
                {jobPostData.jobName}
              </p>
              {jobPostData.subcatName && (
                <p className="text-gray-500 font-semibold">
                  {jobPostData.subcatName}
                </p>
              )}
            </div>

            {!detail && (
              <div className="flex justify-end">
                <div className="w-30">
                  <Button
                    text={"View Details"}
                    onClick={() =>
                      navigate(`/detailjobpost/agent?id=${jobPostData.id}`)
                    }
                  />
                </div>
              </div>
            )}
          </div>

          <div className="space-x-4 flex mb-2 md:flex-row flex-col md:items-center space-y-1 overflow-hidden">
            <div className="flex space-x-4">
              <div className="flex items-center ">
                <DollarSign className="w-4 font-light text-gray-500"></DollarSign>
                <span className="text-gray-500"> {jobPostData.salary}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 font-light mr-1 text-gray-500"></Calendar>
                <span className="text-gray-500"> {jobPostData.date}</span>
              </div>
              <div className="flex items-center">
                <BsPerson className="w-4 font-light mr-1 text-gray-500"></BsPerson>
                <span className="text-gray-500">
                  {jobPostData.peopleNeeded}
                </span>
              </div>
            </div>
            <div className="flex space-x-3">
              <div className="flex items-center">
                <House className="w-4 font-light mr-1 text-gray-500"></House>
                <span className="text-gray-500"> {jobPostData.company}</span>
              </div>
            </div>
            {jobPostData.applied == true && (
              <div className="flex items-center">
                <GiCheckMark className="w-4 font-light mr-1 t text-green-500"></GiCheckMark>
                <span className="text-gray-500"> Applied </span>
              </div>
            )}
          </div>

          {!detail && (
            <p className="whitespace-pre-wrap line-clamp-2">
              {jobPostData.description}
            </p>
          )}
          {detail && (
            <div className="w-full mt-2 text-black space-y-2">
              <div className="flex flex-col">
                <p className="text-lg font-semibold text-gray-500 my-2 ">
                  Job description
                </p>
                <p className="whitespace-pre-wrap text-gray-600">
                  {jobPost.description}
                </p>
                {detail && jobPostData.applied == false && (
                  <div className="flex justify-center">
                    <div className="w-35 mt-5 ">
                      <Button
                        text={"Apply"}
                        onClick={() => navigate(`/apply?id=${jobPostData.id}`)}
                      />
                    </div>
                  </div>
                )}
                {detail && jobPostData.applied == true && (
                  <div className="flex justify-center">
                    <div className="w-35 mt-5 ">
                      <Button
                        text={"View Application"}
                        onClick={() =>
                          navigate(
                            `/agentapplicationdetail?id=${jobPostData.applicationid}`
                          )
                        }
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
