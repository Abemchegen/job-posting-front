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
  House,
} from "lucide-react";
import Button from "../Button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import CloudImage from "../CloudImage";
import CompanyCvCard from "../CompanyComponents/CompanyCVCard";
import { useApplications } from "../../hook/useApplications";
import { Spinner } from "../Spinner";
export default function AgentApplicationCard({
  applicationItem,
  detail = false,
}) {
  const [showPdf, setShowPdf] = useState(false);

  const navigate = useNavigate();
  const [deleteProccede, SetDeleteProccede] = useState(false);
  const [deleteApp, setDeleteApp] = useState(false);
  const { deleteApplication } = useApplications();
  const [loading, setLoading] = useState(null);
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
  const handleDeleteApp = async () => {
    try {
      setLoading(true);
      const response = await deleteApplication(
        applicationItem.jobApplicationID
      );
      console.log(response);
      SetDeleteProccede(true);
    } catch (e) {
      console.log(e);
    } finally {
      setDeleteApp(false);
      setLoading(false);
    }
  };
  const [expand, setExpand] = useState({
    coverLetter: false,
    education: false,
    project: false,
    award: false,
    experiance: false,
    fileCV: false,
  });

  useEffect(() => {
    if (deleteProccede) {
      const timer = setTimeout(() => {
        navigate("/myapplications");
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [deleteProccede]);

  return (
    <div className="w-full max-w-4xl mb-2">
      <div className="bg-white  text-black min-w-sm space-y-2 rounded-xl shadow-sm p-7">
        <div className="flex justify-between items-center">
          <div className="flex items-center mb-3 space-x-3 cursor-pointer ">
            {detail && (
              <div
                className="rounded-full w-23 h-23 flex flex-col items-center justify-center transition"
                onClick={() => {}}
              >
                <CloudImage
                  className="rounded-full"
                  publicId={applicationItem.userInfo.pfp}
                  width={100}
                  height={100}
                />
              </div>
            )}
            <div className="flex flex-col">
              <p className="text-blue-600 text-xl font-bold hover:text-blue-800">
                {applicationItem.jobName}
              </p>
              {applicationItem.subcatName && (
                <p className="text-gray-600 font-semibold ">
                  {applicationItem.subcatName}
                </p>
              )}
            </div>
          </div>
          {!detail && (
            <div>
              <Button
                text={"View Details"}
                onClick={() =>
                  navigate(
                    `/agentapplicationdetail?id=${applicationItem.jobApplicationID}`
                  )
                }
              />
            </div>
          )}
          {detail && (
            <div className="flex space-x-3">
              <div>
                <Button
                  variant="danger"
                  text={"Delete Application"}
                  onClick={() => setDeleteApp(true)}
                />
              </div>
            </div>
          )}
        </div>
        <div className="space-x-4 flex">
          <div className="flex">
            <Calendar className="w-4 font-light mr-1 text-gray-500"></Calendar>
            <span className="text-gray-500"> {applicationItem.appliedAt}</span>
          </div>
          <div className="flex">
            <TimerIcon className="w-4 font-light text-gray-500"></TimerIcon>
            <span className="text-gray-500"> Status: {statusLabel}</span>
          </div>
          <div className="flex">
            <House className="w-4 font-light text-gray-500"></House>
            <span className="text-gray-500">{applicationItem.companyName}</span>
          </div>
        </div>
        {detail && (
          <div className="flex w-full flex-col">
            <div className="flex justify-center my-5 mx-3">
              <div className=" min-w-sm w-full flex flex-col items-center">
                {applicationItem.coverLetter && (
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
                            <p>{applicationItem.coverLetter}</p>
                          </div>
                        </div>
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
                      <div className="flex mt-2 min-w-sm justify-center">
                        <div className="w-19/20 p-3 ">
                          <div className="p-4 border-2 border-muted rounded-2xl bg-white">
                            <iframe
                              src={`https://docs.google.com/gview?url=${encodeURIComponent(
                                applicationItem.cvURL
                              )}&embedded=true`}
                              width="100%"
                              height="600px"
                              title="CV PDF"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                {applicationItem.cv &&
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
                {applicationItem.cv &&
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
                {applicationItem.cv &&
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
                {applicationItem.cv &&
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
              </div>
            </div>
          </div>
        )}
      </div>

      {deleteApp && (
        <div className="flex justify-center fixed inset-0 z-10 items-center">
          <div className="w-4/7 bg-white shadow-2xl rounded-2xl">
            {!deleteProccede && (
              <div className="flex flex-col items-center mt-5  rounded-xl p-6 ">
                <h1 className="text-2xl font-bold mb-3">
                  Are you sure you want to delete this Job Application?
                </h1>
                <p className="mb-5">
                  If you proccede, your application will be permanently deleted,
                  and can not be recovered.
                </p>
                <div className="flex space-x-3">
                  <div>
                    <Button
                      text={"Cancel"}
                      onClick={() => setDeleteApp(false)}
                    />
                  </div>
                  <div>
                    {!loading && (
                      <Button
                        text={"Procede"}
                        variant="danger"
                        onClick={() => handleDeleteApp()}
                      />
                    )}
                    {loading && <Spinner />}
                  </div>
                </div>
              </div>
            )}
            {deleteProccede && (
              <div className="flex flex-col items-center mt-5 rounded-xl p-6">
                <h1 className="text-2xl font-bold mb-3">
                  Your application is deleted Successfully.
                </h1>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
