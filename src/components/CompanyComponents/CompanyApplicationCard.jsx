import Button from "../Button";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import CloudImage from "../CloudImage";
import { useJobPosts } from "../../hook/useJobPost";

import {
  ArrowDown,
  ArrowUp,
  Briefcase,
  Folder,
  GraduationCap,
  Medal,
  Calendar,
  TimerIcon,
  File,
} from "lucide-react";
import CompanyCvCard from "./CompanyCVCard";
import Select from "react-select";
export default function CompanyApplicationCard({
  applicationItem,
  detail = false,
}) {
  const [application, SetApplication] = useState({
    id: applicationItem.jobApplicationID,
    postid: applicationItem.jobPostID,
    coverLetter: applicationItem.coverLetter,
    user: {
      id: applicationItem.userInfo.id,
      fullname: applicationItem.userInfo.name,
      email: applicationItem.userInfo.email,
      pfp: applicationItem.userInfo.pfp,
      birthdate: applicationItem.userInfo.birthdate,
      phonenumber: applicationItem.userInfo.phonenumber,
    },
    cv: {
      Education: applicationItem.cv.resume.education,
      Experiance: applicationItem.cv.resume.experiance,
      Award: applicationItem.cv.resume.award,
      Project: applicationItem.cv.resume.project,
    },
    date: applicationItem.appliedAt,
    status: applicationItem.status,
  });
  console.log(applicationItem, "fsdklfjol");
  const educationConfig = [
    { key: "level", label: "Education" },
    { key: "institution", label: "Institution" },
    { key: "gpa", label: "Gpa" },
  ];

  const experianceConfig = [
    { key: "name", label: "Experiance" },
    { key: "description", label: "Description" },
    { key: "year", label: "Year" },
  ];
  const projectConfig = [
    { key: "name", label: "Project" },
    { key: "description", label: "Description" },
    { key: "url", label: "Link" },
  ];
  const awardConfig = [
    { key: "name", label: "Award" },
    { key: "description", label: "Description" },
    { key: "url", label: "Link" },
  ];
  const options = [
    { value: "PENDING", label: "Pending" },
    { value: "REVIEWING", label: "Reviewing" },
    { value: "INTERVIEW", label: "Interview" },
    { value: "ACCEPTED", label: "Accepted" },
    { value: "REJECTED", label: "Rejected" },
  ];
  const statusLabel =
    options.find((opt) => opt.value === application.status)?.label ||
    application.status;
  const { updateStatesofApplication } = useJobPosts();
  const [status, setStatus] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(application.status);
  const navigate = useNavigate();
  const [expand, setExpand] = useState({
    coverLetter: false,
    education: false,
    project: false,
    award: false,
    experiance: false,
  });

  const handleStatusChange = async (value) => {
    try {
      const update = {
        status: value,
      };
      const response = await updateStatesofApplication(
        application.postid,
        application.id,
        update
      );
      console.log(response, "status");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="w-full flex justify-center max-w-3xl">
      <div className="bg-white text-black min-w-sm w-full m-2 space-y-2 rounded-xl shadow-sm p-7">
        <div className="flex items-center justify-between">
          <div className="flex items-center mb-3 space-x-3 cursor-pointer ">
            <div
              className="rounded-full w-23 h-23 flex flex-col items-center justify-center transition"
              onClick={() => {}}
            >
              <CloudImage
                className="rounded-full"
                publicId={application.user.pfp}
                width={100}
                height={100}
              />
            </div>
            <div className="flex flex-col">
              <p className="text-blue-600 text-xl font-bold hover:text-blue-800">
                {application.user.fullname}
              </p>
              <p className="text-lg">{application.user.email}</p>
            </div>
          </div>

          {!detail && (
            <div>
              <Button
                text={"View Details"}
                onClick={() =>
                  navigate(
                    `/applicationdetailcompany?aid=${application.id}&pid=${application.postid}`
                  )
                }
              />
            </div>
          )}
        </div>
        {!detail && (
          <div className="text-gray-500 truncate">
            {application.coverLetter}
          </div>
        )}

        <div className="space-x-4 flex items-center">
          <div className="flex">
            <Calendar className="w-4 font-light mr-1 text-gray-500"></Calendar>
            <span className="text-gray-500"> {application.date}</span>
          </div>
          <div className="flex items-center ">
            <TimerIcon className="w-4 font-light text-gray-500"></TimerIcon>

            {!detail && (
              <span className="text-gray-500">Status: {statusLabel}</span>
            )}
            {detail && (
              <div className="flex p-2 items-center ">
                <Select
                  className="w-40 hover:border hover:rounded-sm hover:border-brand"
                  options={options}
                  styles={{
                    control: (base, state) => ({
                      ...base,
                      boxShadow: "none",
                      borderColor: state.isFocused ? "#00a896" : "#f0f0f0",
                    }),
                  }}
                  value={options.find((opt) => opt.value === selectedStatus)}
                  onChange={(option) => {
                    setSelectedStatus(option.value);
                    handleStatusChange(option.value); // Pass the new value directly
                  }}
                />
              </div>
            )}
          </div>
        </div>
        {detail && (
          <div className="flex w-full  flex-col">
            <div className="flex justify-center my-5 mx-3">
              <div className=" min-w-sm w-full flex flex-col items-center">
                <div className="w-full  mb-3">
                  <div
                    className="p-5 bg-brand-dark text-white rounded-xl"
                    onClick={() =>
                      setExpand({
                        ...expand,
                        coverLetter: !expand.coverLetter,
                      })
                    }
                  >
                    <div className="flex justify-between">
                      <div className="flex space-x-2">
                        <File />
                        <p className="font-bold">Cover Letter</p>
                      </div>
                      {!expand.coverLetter && <ArrowDown />}
                      {expand.coverLetter && <ArrowUp />}
                    </div>
                  </div>
                  {expand.coverLetter && (
                    <div className="flex mt-2 min-w-sm justify-center">
                      <div className="w-19/20 p-3 ">
                        <div className="p-4 border-2 border-muted rounded-2xl">
                          <p>{application.coverLetter}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                {application.cv.Education &&
                  application.cv.Education.length > 0 && (
                    <div className="w-full mb-3">
                      <div
                        className="p-5 bg-brand-dark text-white rounded-xl"
                        onClick={() =>
                          setExpand({
                            ...expand,
                            education: !expand.education,
                          })
                        }
                      >
                        <div className="flex justify-between">
                          <div className="flex space-x-2">
                            <GraduationCap />
                            <p className="font-bold">Education</p>
                          </div>
                          {!expand.education && <ArrowDown />}
                          {expand.education && <ArrowUp />}
                        </div>
                      </div>
                      {expand.education && (
                        <CompanyCvCard
                          list={application.cv.Education}
                          config={educationConfig}
                        />
                      )}
                    </div>
                  )}
                {application.cv.Experiance &&
                  application.cv.Experiance.length > 0 && (
                    <div className="w-full mb-3">
                      <div
                        className="p-5 bg-brand-dark text-white rounded-xl"
                        onClick={() =>
                          setExpand({
                            ...expand,
                            experiance: !expand.experiance,
                          })
                        }
                      >
                        <div className="flex justify-between">
                          <div className="flex space-x-2">
                            <Briefcase />
                            <p className="font-bold">Experiance</p>
                          </div>
                          {!expand.experiance && <ArrowDown />}
                          {expand.experiance && <ArrowUp />}
                        </div>
                      </div>
                      {expand.experiance && (
                        <CompanyCvCard
                          list={application.cv.Experiance}
                          config={experianceConfig}
                        />
                      )}
                    </div>
                  )}
                {application.cv.Project &&
                  application.cv.Project.length > 0 && (
                    <div className="w-full mb-3">
                      <div
                        className=" p-5  bg-brand-dark text-white rounded-xl"
                        onClick={() =>
                          setExpand({
                            ...expand,
                            project: !expand.project,
                          })
                        }
                      >
                        <div className="flex justify-between">
                          <div className="flex space-x-2">
                            <Folder />
                            <p className="font-bold">Project</p>
                          </div>
                          {!expand.project && <ArrowDown />}
                          {expand.project && <ArrowUp />}
                        </div>
                      </div>
                      {expand.project && (
                        <CompanyCvCard
                          list={application.cv.Project}
                          config={projectConfig}
                        />
                      )}
                    </div>
                  )}
                {application.cv.Award && application.cv.Award.length > 0 && (
                  <div className="w-full ">
                    <div
                      className="p-5 bg-brand-dark text-white rounded-xl"
                      onClick={() =>
                        setExpand({
                          ...expand,
                          award: !expand.award,
                        })
                      }
                    >
                      <div className="flex justify-between">
                        <div className="flex space-x-2">
                          <Medal />
                          <p className="font-bold">Awards</p>
                        </div>
                        {!expand.award && <ArrowDown />}
                        {expand.award && <ArrowUp />}
                      </div>
                    </div>
                    {expand.award && (
                      <CompanyCvCard
                        list={application.cv.Award}
                        config={awardConfig}
                      />
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
