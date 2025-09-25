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
  MessageCircle,
  File,
  User,
} from "lucide-react";
import CompanyCvCard from "./CompanyCVCard";
import Select from "react-select";
export default function CompanyApplicationCard({
  applicationItem,
  detail = false,
}) {
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
    options.find((opt) => opt.value === applicationItem.status)?.label ||
    applicationItem.status;
  const { updateStatesofApplication } = useJobPosts();
  const [status, setStatus] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(applicationItem.status);
  const navigate = useNavigate();
  const [expand, setExpand] = useState({
    coverLetter: false,
    education: false,
    project: false,
    award: false,
    experiance: false,
    fileCV: false,
  });

  const handleStatusChange = async (value) => {
    try {
      const update = {
        status: value,
      };
      const response = await updateStatesofApplication(
        applicationItem.jobPostID,
        applicationItem.jobApplicationID,
        update
      );
    } catch (e) {}
  };

  return (
    <div className="w-full flex justify-center max-w-3xl">
      <div className="bg-white w-full  m-2 space-y-2 rounded-xl shadow-sm p-7">
        <div className="flex items-center justify-between">
          <div
            className={`flex ${
              !detail ? "max-w-[70%] overflow-hidden" : ""
            }  items-center mb-3 space-x-3`}
          >
            {applicationItem.userInfo.pfp && (
              <div className="flex-shrink-0 rounded-full w-23 h-23 flex flex-col items-center justify-center transition">
                <CloudImage
                  className="rounded-full"
                  publicId={applicationItem.userInfo.pfp}
                  width={100}
                  height={100}
                />
              </div>
            )}
            {!applicationItem.userInfo.pfp && (
              <div className="flex-shrink-0 rounded-full w-23 h-23 flex flex-col items-center justify-center transition">
                <User className="rounded-full w-full h-full text-gray-400 bg-gray-100 p-4" />
              </div>
            )}

            <div className="flex flex-col truncate ">
              <p className="text-blue-600 text-xl font-bold hover:text-blue-800">
                {applicationItem.userInfo.name}
              </p>
              <p className="text-lg truncate">
                {applicationItem.userInfo.email}
              </p>
              <p className="text-lg truncate">
                {applicationItem.userInfo.phonenumber}
              </p>
            </div>
          </div>

          {!detail && (
            <div className="w-30 ml-4">
              <Button
                text={"View Details"}
                onClick={() =>
                  navigate(
                    `/applicationdetailcompany?aid=${applicationItem.jobApplicationID}&pid=${applicationItem.jobPostID}`
                  )
                }
              />
            </div>
          )}
        </div>
        {!detail && (
          <div className="text-gray-500 truncate">
            {applicationItem.coverLetter}
          </div>
        )}

        <div className="space-x-4 flex items-center">
          <div className="flex">
            <Calendar className="w-4 font-light mr-1 text-gray-500"></Calendar>
            <span className="text-gray-500"> {applicationItem.appliedAt}</span>
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
          <div
            className="flex cursor-pointer"
            onClick={() =>
              navigate(`/myChats?reciever=${applicationItem.userInfo.id}`)
            }
          >
            <MessageCircle className="w-4 font-light mr-1 text-gray-500" />
            <span className="text-gray-500"> Start a chat</span>
          </div>
        </div>
        {detail && (
          <div className="flex w-full  flex-col">
            <div className="flex justify-center w-full my-5 mx-3">
              <div className="w-full flex flex-col items-center">
                <div className="w-full">
                  {applicationItem.coverLetter && (
                    <div className="w-full mb-3">
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
                        <div className="flex w-full justify-center mt-2 min-w-sm ">
                          <div className="p-4 m-2 w-19/20 border-2 border-muted rounded-2xl">
                            <p>{applicationItem.coverLetter}</p>
                          </div>{" "}
                        </div>
                      )}
                    </div>
                  )}
                  {applicationItem.cvURL && (
                    <div className="w-full  mb-3">
                      <div
                        className="p-5 bg-brand-dark text-white rounded-xl"
                        onClick={() =>
                          setExpand({
                            ...expand,
                            fileCV: !expand.fileCV,
                          })
                        }
                      >
                        <div className="flex justify-between">
                          <div className="flex space-x-2">
                            <File />
                            <p className="font-bold">CV</p>
                          </div>
                          {!expand.fileCV && <ArrowDown />}
                          {expand.fileCV && <ArrowUp />}
                        </div>
                      </div>
                      {expand.fileCV && (
                        <div className="flex w-full justify-center mt-2 min-w-sm ">
                          <div className="p-4 m-2 w-19/20  border-2 border-muted rounded-2xl">
                            <iframe
                              src={`https://docs.google.com/gview?url=${encodeURIComponent(
                                applicationItem.cvURL
                              )}&embedded=true`}
                              width="100%"
                              height="600px"
                              title="CV PDF"
                            />{" "}
                          </div>{" "}
                        </div>
                      )}
                    </div>
                  )}
                  {applicationItem.cv && (
                    <>
                      {applicationItem.cv.resume &&
                        applicationItem.cv.resume.education &&
                        applicationItem.cv.resume.education.length > 0 &&
                        !applicationItem.cvURL && (
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
                                list={applicationItem.cv.resume.education}
                                config={educationConfig}
                              />
                            )}
                          </div>
                        )}
                      {applicationItem.cv.resume &&
                        applicationItem.cv.resume.experiance &&
                        applicationItem.cv.resume.experiance.length > 0 &&
                        !applicationItem.cvURL && (
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
                                list={applicationItem.cv.resume.experiance}
                                config={experianceConfig}
                              />
                            )}
                          </div>
                        )}
                      {applicationItem.cv.resume &&
                        applicationItem.cv.resume.project &&
                        applicationItem.cv.resume.project.length > 0 &&
                        !applicationItem.cvURL && (
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
                                list={applicationItem.cv.resume.project}
                                config={projectConfig}
                              />
                            )}
                          </div>
                        )}
                      {applicationItem.cv.resume &&
                        applicationItem.cv.resume.award &&
                        applicationItem.cv.resume.award.length > 0 &&
                        !applicationItem.cvURL && (
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
                                list={applicationItem.cv.resume.award}
                                config={awardConfig}
                              />
                            )}
                          </div>
                        )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
