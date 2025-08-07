import Select from "react-select";
import Button from "../../components/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PostJob() {
  const navigate = useNavigate();

  const [job, setJob] = useState({
    waiter: {
      name: "Waiter",
      description: "Waits on people",
      subcatagories: [
        { name: "Cafe Waiter", description: "Serves in the cafe" },
        { name: "Restaurant Waiter", description: "Serves in the restaurant" },
      ],
    },
    pilot: {
      name: "Pilot",
      description: "Flies aircraft",
      subcatagories: [],
    },
    enginner: {
      name: "Engineer",
      description: "Engineering jobs",
      subcatagories: [
        { name: "Software Engineer", description: "Develops software" },
        { name: "Mechanical Engineer", description: "Works with machines" },
        { name: "Electrical Engineer", description: "Works with electricity" },
        { name: "Electro Mechanical Engineer", description: "Works with both" },
      ],
    },
    biotech: {
      name: "Biotech",
      description: "Biotechnology jobs",
      subcatagories: [],
    },
    teacher: {
      name: "Teacher",
      description: "Teaches students",
      subcatagories: [
        { name: "Highschool", description: "Teaches highschool" },
        { name: "College", description: "Teaches college" },
        { name: "University", description: "Teaches university" },
      ],
    },
    accountant: {
      name: "Accountant",
      description: "Handles accounts",
      subcatagories: [],
    },
  });

  const [jobPost, setJobPost] = useState({
    description: "",
    salary: "",
    people: "",
    jobName: null,
    jobSub: null,
  });
  const [errors, setErrors] = useState({
    description: "",
    salary: "",
    people: "",
    jobName: "",
    jobSub: "",
  });

  const jobOptions = [
    ...Object.keys(job).map((key) => ({ value: key, label: job[key].name })),
    { value: "other", label: "Other" },
  ];
  const subtypeOptions =
    jobPost.jobName && jobPost.jobName.value !== "other"
      ? [
          ...job[jobPost.jobName.value].subcatagories.map((sub) => ({
            value: sub.name,
            label: sub.name,
            description: sub.description,
          })),
          { value: "other", label: "Other" },
        ]
      : [];

  const [showCustomJob, setShowCustomJob] = useState(false);
  const [customJob, setCustomJob] = useState({
    name: "",
    sub: "",
    subDesc: "",
  });
  const [showCustomSub, setShowCustomSub] = useState(false);
  const [customSub, setCustomSub] = useState({ name: "", desc: "" });
  function handlePost(e) {
    e.preventDefault();
    // api call to store the new post
    navigate("/home/company");
  }
  const handleAddJob = (e) => {
    e.preventDefault();
    setJob({
      ...job,
      [customJob.name]: {
        name: customJob.name,
        description: customJob.subDesc,
        ...(customJob.sub && customJob.subDesc
          ? {
              subcatagories: [
                { name: customJob.sub, description: customJob.subDesc },
              ],
            }
          : { subcatagories: [] }),
      },
    });
    setJobPost((prev) => ({
      ...prev,
      jobName: { value: customJob.name, label: customJob.name },
      jobSub: { value: customJob.sub, label: customJob.sub },
    }));

    setCustomJob({ name: "", sub: "", subDesc: "" });
    setShowCustomJob(false);
  };

  const handleAddSub = (e) => {
    e.preventDefault();

    setJob({
      ...job,
      [jobPost.jobName.value]: {
        ...job[jobPost.jobName.value],
        subcatagories: [
          ...job[jobPost.jobName.value].subcatagories,
          { name: customSub.name, description: customSub.desc },
        ],
      },
    });
    setJobPost((prev) => ({
      ...prev,
      jobSub: { value: customSub.name, label: customSub.name },
    }));
    setCustomSub({ name: "", desc: "" });
    setShowCustomSub(false);
  };

  return (
    <div className="mt-10 flex justify-center">
      <div className="w-3/4 max-w-xl">
        <div className="flex bg-white my-10 flex-col items-center rounded-xl shadow-sm">
          <h1 className="text-2xl mt-5 text-center font-semibold ">
            Create a Job Post
          </h1>
          <div className=" w-full p-4">
            <form
              onSubmit={handlePost}
              className="flex flex-col items-center w-full"
            >
              <div className="w-8/9">
                <div className="flex space-x-5 w-full">
                  <div className="w-1/2 flex flex-col my-5">
                    <label className="m-3 font-semibold">Job Name:</label>
                    <Select
                      options={jobOptions}
                      value={jobPost.jobName}
                      required={true}
                      onChange={(option) => {
                        setJobPost({
                          ...jobPost,
                          jobName: option,
                          jobSub: null,
                        });
                        setShowCustomJob(option.value === "other");
                        setCustomJob({ name: "", sub: "", subDesc: "" });
                      }}
                      placeholder="Select job name..."
                      maxMenuHeight={160}
                    />
                  </div>
                  <div className="flex w-1/2  flex-col my-5">
                    <label className="m-3 font-semibold">Job Subtype:</label>
                    <Select
                      options={subtypeOptions}
                      value={jobPost.jobSub}
                      required={true}
                      onChange={(option) => {
                        setJobPost({
                          ...jobPost,
                          jobSub: option,
                        });
                        setShowCustomSub(option.value === "other");
                        setCustomSub({ name: "", desc: "" });
                      }}
                      isDisabled={
                        !jobPost.jobName ||
                        subtypeOptions.length === 0 ||
                        jobPost.jobName.value === "other"
                      }
                      maxMenuHeight={160}
                      placeholder={
                        jobPost.jobName
                          ? subtypeOptions.length
                            ? "Select subtype..."
                            : "No subtypes available"
                          : "Select job name first"
                      }
                    />
                  </div>
                </div>
                <div className="flex flex-col my-5">
                  <label className="m-3 font-semibold">Job Description:</label>
                  <textarea
                    type="text"
                    required={true}
                    value={jobPost.description}
                    onChange={(e) =>
                      setJobPost({
                        ...jobPost,
                        description: e.target.value,
                      })
                    }
                    rows={5}
                    className="border border-gray-300 p-3 focus:outline-none hover:border-gray-400 rounded-xl "
                  ></textarea>
                </div>

                <div className="flex space-x-5 w-full mb-10">
                  <div className="flex flex-col w-1/2">
                    <label className="m-3 font-semibold">People Needed</label>
                    <input
                      className="border p-2 focus:outline-none rounded-sm border-gray-300 hover:border-gray-400"
                      type="number"
                      min={1}
                      value={jobPost.people}
                      required={true}
                      onChange={(e) =>
                        setJobPost({
                          ...jobPost,
                          people: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="flex flex-col w-1/2">
                    <label className="m-3 font-semibold">Salary</label>
                    <input
                      className="border p-2 focus:outline-none rounded-sm border-gray-300  hover:border-gray-400"
                      type="number"
                      value={jobPost.salary}
                      min={1}
                      required={true}
                      onChange={(e) =>
                        setJobPost({
                          ...jobPost,
                          salary: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="flex space-x-4">
                <div className="w-30">
                  <Button
                    text={"Cancle"}
                    variant="dark"
                    onClick={() => navigate("/home/company")}
                  />
                </div>
                <div className="w-30">
                  <Button type="submit" text={"Create"} />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      {showCustomJob && (
        <div className="fixed inset-0 z-20 flex items-center justify-center ">
          <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-sm relative">
            <button
              className="absolute top-2 right-3 text-2xl text-gray-400 hover:text-gray-700"
              type="button"
              onClick={() => setShowCustomJob(false)}
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4 text-center">
              Custom Job Entry
            </h2>
            <form onSubmit={handleAddJob}>
              <label>Custom Job Name:</label>
              <input
                className="border-2 focus:outline-none border-gray-300 hover:border-gray-400 rounded p-2 w-full mb-3"
                placeholder=""
                required={true}
                value={customJob.name}
                onChange={(e) =>
                  setCustomJob({
                    ...customJob,
                    name: e.target.value,
                  })
                }
              />
              <label>Custom Subcategory Name:</label>
              <input
                className="border-2 focus:outline-none border-gray-300 hover:border-gray-400 rounded p-2 w-full mb-3"
                placeholder=""
                value={customJob.sub}
                required={!!customJob.subDesc}
                onChange={(e) =>
                  setCustomJob({
                    ...customJob,
                    sub: e.target.value,
                  })
                }
              />
              <label>Custom Subcategory Description:</label>
              <textarea
                className="border-2 focus:outline-none border-gray-300 hover:border-gray-400 rounded p-2 w-full mb-3"
                placeholder=""
                value={customJob.subDesc}
                required={!!customJob.sub}
                onChange={(e) =>
                  setCustomJob({
                    ...customJob,
                    subDesc: e.target.value,
                  })
                }
              />
              <div className="flex justify-end mt-10 space-x-3">
                <Button
                  variant="dark"
                  text="Cancel"
                  onClick={() => setShowCustomJob(false)}
                />
                <Button text="Save" type="submit" />
              </div>
            </form>
          </div>
        </div>
      )}
      {showCustomSub && !showCustomJob && (
        <div className="fixed inset-0 z-20 flex items-center justify-center ">
          <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md relative">
            <button
              className="absolute top-2 right-3 text-2xl text-gray-400 hover:text-gray-700"
              type="button"
              onClick={() => setShowCustomSub(false)}
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4 text-center">
              Custom Subcategory Entry
            </h2>
            <form onSubmit={handleAddSub}>
              <label>Custom Subcategory Name:</label>

              <input
                className="border-2 focus:outline-none border-gray-300 hover:border-gray-400 rounded p-2 w-full mb-3"
                placeholder=""
                value={customSub.name}
                required={true}
                onChange={(e) =>
                  setCustomSub({
                    ...customSub,
                    name: e.target.value,
                  })
                }
              />
              <label>Custom Subcategory Description:</label>

              <textarea
                className="border-2 focus:outline-none border-gray-300 hover:border-gray-400 rounded p-2 w-full mb-3"
                placeholder=""
                value={customSub.desc}
                required={true}
                onChange={(e) =>
                  setCustomSub({
                    ...customSub,
                    desc: e.target.value,
                  })
                }
              />
              <div className="flex justify-end space-x-3">
                <Button
                  variant="dark"
                  text="Cancel"
                  onClick={() => setShowCustomSub(false)}
                />
                <Button text="Save" type="submit" />
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
