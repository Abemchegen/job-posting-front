import Button from "../Button";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import CloudImage from "../CloudImage";
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
export default function CompanyApplicationCard({ detail = false }) {
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
  const options = [
    { value: "notreviewed", label: "Not Reviewed" },
    { value: "reviewing", label: "Reviewing" },
    { value: "interview", label: "Interview" },
    { value: "accepted", label: "Accepted" },
    { value: "rejected", label: "Rejected" },
  ];
  const [status, setStatus] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("Not Reviewed");
  const [searchParams] = useSearchParams();
  const applicationID = searchParams.get("id");
  const navigate = useNavigate();
  const [Icons, SetIcons] = useState({
    coverLetter: false,
    education: false,
    project: false,
    award: false,
    experiance: false,
  });
  const application = {
    jobtitle: "Frontend Developer",
    company: "Tech Corp",
    id: 1,
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
    date: "12-11-2022",
    status: "Not reviewed",
    coverletter:
      "I am the right fit for this job. I have many experiances that make me qualified for this position. I believe that i'll do exceptionally well under time pressure and collaborate with my team...",
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
                  navigate(`/companyapplicationdetail?id=${application.id}`)
                }
              />
            </div>
          )}
        </div>
        {!detail && (
          <div className="text-gray-500 truncate">
            {application.user.coverLetter}
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
              <span className="text-gray-500">
                Status: {application.status}
              </span>
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
                  onChange={(option) => setSelectedStatus(option.value)}
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
    </div>
  );
}
