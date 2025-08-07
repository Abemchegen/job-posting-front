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
import Button from "../Button";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import CloudImage from "../CloudImage";
import CompanyCvCard from "../CompanyComponents/CompanyCVCard";

export default function AgentApplicationCard({ detail = false }) {
  const [searchParams] = useSearchParams();
  const applicationID = searchParams.get("id");
  const navigate = useNavigate();
  const [deleteProccede, SetDeleteProccede] = useState(false);

  const [deleteApplication, setDeleteApplication] = useState(false);

  const application = {
    jobtitle: "Frontend Developer",
    company: "Tech Corp",
    id: 1,
    date: "12-11-2022",
    status: "Not reviewed",
    user: {
      id: 1,
      fullname: "Abem Tigist",
      email: "abem@gmail.com",
      coverLetter:
        "My name is Abem Tigist, and I am from Addis Ababa Ethiopia. I believe I am the right fit for this job. I have a lot of experiances regarding this field and i am very educated and respected",
      pfp: "cld-sample-5",
      cv: {
        Education: [
          {
            educationLevel: "Highschool",
            educationInstitution: "Don bosco",
            gpa: "3.8",
          },
          {
            educationLevel: "Degree",
            educationInstitution:
              "Addis Ababa Science and Technology University",
            gpa: "3.5",
          },
        ],
        Experiance: [
          {
            experianceName: "Atlas Computer Technology",
            experianceDescription: "Java Developer",
            experianceYear: 2,
          },
        ],
        Award: [
          {
            awardname: "hackaton leader",
            awardDescription: "won hackathon",
            awardUrl: "url",
          },
        ],
        Project: [
          {
            projectName: "Food ordering Site",
            projectDescription: "Made with react and Golang",
            projectUrl: "url",
          },
        ],
      },
    },
    coverletter:
      "I am the right fit for this job. I have many experiances that make me qualified for this position. I believe that i'll do exceptionally well under time pressure and collaborate with my team...",
  };
  const educationConfig = [
    { key: "educationLevel", label: "Education" },
    { key: "educationInstitution", label: "Institution" },
    { key: "gpa", label: "Gpa" },
  ];

  const experianceConfig = [
    { key: "experianceName", label: "Experiance" },
    { key: "experianceDescription", label: "Description" },
    { key: "experianceYear", label: "Year" },
  ];
  const projectConfig = [
    { key: "projectName", label: "Project" },
    { key: "projectDescription", label: "Description" },
    { key: "projectUrl", label: "Link" },
  ];
  const awardConfig = [
    { key: "awardname", label: "Award" },
    { key: "awardDescription", label: "Description" },
    { key: "awardUrl", label: "Link" },
  ];
  const [cvData, setCvData] = useState({
    Education: [
      {
        educationLevel: "Highschool",
        educationInstitution: "Don bosco",
        gpa: "3.8",
      },
      {
        educationLevel: "Degree",
        educationInstitution: "Addis Ababa Science and Technology University",
        gpa: "3.5",
      },
    ],
    Experiance: [
      {
        experianceName: "Atlas Computer Technology",
        experianceDescription: "Java Developer",
        experianceYear: 2,
      },
    ],
    Award: [
      {
        awardname: "hackaton leader",
        awardDescription: "won hackathon",
        awardUrl: "url",
      },
    ],
    Project: [
      {
        projectName: "Food ordering Site",
        projectDescription: "Made with react and Golang",
        projectUrl: "url",
      },
    ],
  });

  const [Icons, SetIcons] = useState({
    coverLetter: false,
    education: false,
    project: false,
    award: false,
    experiance: false,
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
    <div className="w-full ">
      <div className="bg-white  text-black min-w-sm  m-5 space-y-2 rounded-xl shadow-sm p-7">
        <div className="flex justify-between">
          <div className="flex items-center mb-3 space-x-3 cursor-pointer ">
            {detail && (
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
            )}
            <div className="flex flex-col">
              <p className="text-blue-600 text-xl font-bold hover:text-blue-800">
                {application.jobtitle}
              </p>
              <p className="text-lg">{application.company}</p>
            </div>
          </div>
          {!detail && (
            <div>
              <Button
                text={"View Details"}
                onClick={() =>
                  navigate(`/agentapplicationdetail?id=${application.id}`)
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
                  onClick={() => setDeleteApplication(true)}
                />
              </div>
            </div>
          )}
        </div>

        <div className="space-x-4 flex">
          <div className="flex">
            <Calendar className="w-4 font-light mr-1 text-gray-500"></Calendar>
            <span className="text-gray-500"> {application.date}</span>
          </div>
          <div className="flex">
            <TimerIcon className="w-4 font-light text-gray-500"></TimerIcon>
            <span className="text-gray-500"> Status: {application.status}</span>
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
                      SetIcons({
                        ...Icons,
                        coverLetter: !Icons.coverLetter,
                      })
                    }
                  >
                    <div className="flex justify-between">
                      <div className="flex space-x-2">
                        <File />
                        <p className="font-bold">Cover Letter</p>
                      </div>
                      {!Icons.coverLetter && <ArrowDown />}
                      {Icons.coverLetter && <ArrowUp />}
                    </div>
                  </div>
                  {Icons.coverLetter && (
                    <div className="flex mt-2 min-w-sm justify-center">
                      <div className="w-19/20 p-3 ">
                        <div className="p-4 border-2 border-muted rounded-2xl">
                          <p>{application.coverletter}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="w-full mb-3">
                  <div
                    className="p-5 bg-brand-dark text-white rounded-xl"
                    onClick={() =>
                      SetIcons({
                        ...Icons,
                        education: !Icons.education,
                      })
                    }
                  >
                    <div className="flex justify-between">
                      <div className="flex space-x-2">
                        <GraduationCap />
                        <p className="font-bold">Education</p>
                      </div>
                      {!Icons.education && <ArrowDown />}
                      {Icons.education && <ArrowUp />}
                    </div>
                  </div>
                  {Icons.education && (
                    <CompanyCvCard
                      list={cvData.Education}
                      config={educationConfig}
                    />
                  )}
                </div>
                <div className="w-full mb-3">
                  <div
                    className="p-5 bg-brand-dark text-white rounded-xl"
                    onClick={() =>
                      SetIcons({
                        ...Icons,
                        experiance: !Icons.experiance,
                      })
                    }
                  >
                    <div className="flex justify-between">
                      <div className="flex space-x-2">
                        <Briefcase />
                        <p className="font-bold">Experiance</p>
                      </div>
                      {!Icons.experiance && <ArrowDown />}
                      {Icons.experiance && <ArrowUp />}
                    </div>
                  </div>
                  {Icons.experiance && (
                    <CompanyCvCard
                      list={cvData.Experiance}
                      config={experianceConfig}
                    />
                  )}
                </div>
                <div className="w-full mb-3">
                  <div
                    className=" p-5  bg-brand-dark text-white rounded-xl"
                    onClick={() =>
                      SetIcons({
                        ...Icons,
                        project: !Icons.project,
                      })
                    }
                  >
                    <div className="flex justify-between">
                      <div className="flex space-x-2">
                        <Folder />
                        <p className="font-bold">Project</p>
                      </div>
                      {!Icons.project && <ArrowDown />}
                      {Icons.project && <ArrowUp />}
                    </div>
                  </div>
                  {Icons.project && (
                    <CompanyCvCard
                      list={cvData.Project}
                      config={projectConfig}
                    />
                  )}
                </div>
                <div className="w-full ">
                  <div
                    className="p-5 bg-brand-dark text-white rounded-xl"
                    onClick={() =>
                      SetIcons({
                        ...Icons,
                        award: !Icons.award,
                      })
                    }
                  >
                    <div className="flex justify-between">
                      <div className="flex space-x-2">
                        <Medal />
                        <p className="font-bold">Awards</p>
                      </div>
                      {!Icons.award && <ArrowDown />}
                      {Icons.award && <ArrowUp />}
                    </div>
                  </div>
                  {Icons.award && (
                    <CompanyCvCard list={cvData.Award} config={awardConfig} />
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {deleteApplication && (
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
                      text={"Cancle"}
                      onClick={() => setDeleteApplication(false)}
                    />
                  </div>
                  <div>
                    <Button
                      text={"Proccede"}
                      variant="danger"
                      onClick={() => SetDeleteProccede(true)}
                    />
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
