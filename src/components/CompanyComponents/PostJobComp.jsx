import Select from "react-select";
import Button from "../Button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useJobs } from "../../hook/useJobs";
import { useJobPosts } from "../../hook/useJobPost";
import { useAuth } from "../../context/authContext";

export default function PostJobComp({
  create = true,
  Post = null,
  EditPost = null,
  updated = null,
}) {
  const navigate = useNavigate();
  const { jobs, createJob, addSubcatagory } = useJobs();
  const { user } = useAuth();
  const { createJobPost, updateJobPost } = useJobPosts();
  const [loading, setLoading] = useState(false);
  const [jobPost, setJobPost] = useState({
    salary: null,
    peopleNeeded: null,
    subcat: null,
    jobName: null,
    description: null,
  });
  useEffect(() => {
    if (!create && Post) {
      setJobPost({
        salary: Post.salary,
        peopleNeeded: Post.peopleNeeded,
        subcat: Post.subcatName ? Post.subcatName : "none",
        jobName: Post.jobName,
        description: Post.description,
      });
    }
  }, [Post, create]);

  const jobOptions = [
    ...Object.values(jobs).map((job) => ({ value: job.name, label: job.name })),
    { value: "other", label: "Other" },
  ];
  const selectedJob = Object.values(jobs).find(
    (job) => job.name === jobPost.jobName
  );
  const subtypeOptions =
    selectedJob && jobPost.jobName !== "other"
      ? [
          ...selectedJob.subcatagory.map((sub) => ({
            value: sub.name,
            label: sub.name,
            description: sub.description,
          })),
          { value: "none", label: "None" },
          { value: "other", label: "Other" },
        ]
      : [];

  const [showCustomJob, setShowCustomJob] = useState(false);
  const [customJob, setCustomJob] = useState({
    name: "",
    description: "",
  });
  const [showCustomSub, setShowCustomSub] = useState(false);
  const [customSub, setCustomSub] = useState({ name: "", desc: "" });

  const [errors, setErrors] = useState({
    salary: null,
    peopleNeeded: null,
    subcat: null,
    jobName: null,
    description: null,
    id: null,
  });
  const handleAddJob = async (e) => {
    e.preventDefault();
    try {
      const jobData = {
        name: customJob.name.trim(),
        description: customJob.description.trim(),
      };
      await createJob(jobData);
      setJobPost((prev) => ({
        ...prev,
        jobName: customJob.name.trim(),
        subcat: "",
      }));
      setCustomJob({ name: "", description: "" });
    } catch (e) {
      console.log(e);
    } finally {
      setShowCustomJob(false);
    }
  };

  const handleAddSub = async (e) => {
    e.preventDefault();
    try {
      const subData = {
        jobName: jobPost.jobName.trim(),
        subcatagories: [
          {
            name: customSub.name.trim(),
            description: customSub.desc.trim(),
          },
        ],
      };
      await addSubcatagory(subData);
      setJobPost((prev) => ({
        ...prev,
        subcat: customSub.name.trim(),
      }));
      setCustomSub({ name: "", desc: "" });
    } catch (e) {
      console.log(e);
    } finally {
      setShowCustomSub(false);
    }
  };
  const handlePost = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const jobData = {
        companyName: user.companyName.trim(),
        description: jobPost.description.trim(),
        jobName: jobPost.jobName.trim(),
        subcatagoryName: null,
        peopleNeeded: Number(jobPost.peopleNeeded.toString().trim()),
        salary: Number(jobPost.salary.toString().trim()),
      };
      if (jobPost.subcat != "none") {
        jobData["subcatagoryName"] = jobPost.subcat.trim();
      }
      console.log(jobData);
      await createJobPost(jobData);
      setTimeout(() => {
        navigate("/home/company");
      }, 1000);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  const handleEditPost = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const submitData = {
        jobName: jobPost.jobName.trim(),
        description: jobPost.description.trim(),
        peopleNeeded: Number(jobPost.peopleNeeded.toString().trim()),
        salary: Number(jobPost.salary.toString().trim()),
        subcatagoryName: null,
      };
      if (jobPost.subcat != "none") {
        submitData["subcatagoryName"] = jobPost.subcat.trim();
      }
      const response = await updateJobPost(submitData, Post.id);
      updated(response);
    } catch (e) {
      console.log(e);
    } finally {
      EditPost(false);
      setLoading(false);
    }
  };

  const handleSubmit = create ? handlePost : handleEditPost;

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-3xl">
        <div
          className={`flex bg-white my-10 flex-col items-center ${
            create ? "rounded-xl shadow-sm" : ""
          }`}
        >
          <h1 className="text-2xl mt-5 text-center font-semibold ">
            {create && "Create a Job Post"}
            {!create && "Update your Post"}
          </h1>
          <div className=" w-full p-4">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center w-full"
            >
              <div className="w-8/9">
                <div className="flex space-x-5 w-full">
                  <div className="w-1/2 flex flex-col my-5">
                    <label className="m-3 font-semibold">Job Name:</label>
                    <Select
                      options={jobOptions}
                      value={
                        jobOptions.find(
                          (opt) => opt.value === jobPost.jobName
                        ) || null
                      }
                      required={true}
                      onChange={(option) => {
                        setJobPost({
                          ...jobPost,
                          jobName: option.value,
                          subcat: null,
                        });
                        setShowCustomJob(option.value === "other");
                        setCustomJob({ name: "", description: "" });
                      }}
                      placeholder="Select job name..."
                      maxMenuHeight={160}
                    />
                  </div>
                  <div className="flex w-1/2  flex-col my-5">
                    <label className="m-3 font-semibold">Job Subtype:</label>
                    <Select
                      options={subtypeOptions}
                      value={
                        subtypeOptions.find(
                          (opt) => opt.value === jobPost.subcat
                        ) || null
                      }
                      required={true}
                      onChange={(option) => {
                        setJobPost({
                          ...jobPost,
                          subcat: option.value,
                        });
                        setShowCustomSub(option.value === "other");
                        setCustomSub({ name: "", desc: "" });
                      }}
                      isDisabled={
                        !jobPost.jobName ||
                        subtypeOptions.length === 0 ||
                        jobPost.jobName === "other"
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

                <div className="flex space-x-5 w-full mb-10">
                  <div className="flex flex-col w-1/2">
                    <label className="m-3 font-semibold">People Needed</label>
                    <input
                      className="border p-2 focus:outline-none rounded-sm border-gray-300 hover:border-gray-400"
                      type="number"
                      min={1}
                      value={jobPost.peopleNeeded}
                      required={true}
                      onChange={(e) =>
                        setJobPost({
                          ...jobPost,
                          peopleNeeded: e.target.value,
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
                <div className="flex flex-col my-5">
                  <label className="m-3 text-center font-semibold">
                    Job Description
                  </label>
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
                    rows={10}
                    className="border border-gray-300 p-3 focus:outline-none hover:border-gray-400 rounded-xl "
                  ></textarea>
                </div>
              </div>
              <div className="flex space-x-4">
                <div className="w-30">
                  {create && (
                    <Button
                      text={"Cancle"}
                      variant="dark"
                      onClick={() => navigate("/home/company")}
                    />
                  )}
                  {!create && (
                    <Button
                      text={"Cancle"}
                      variant="dark"
                      onClick={() => EditPost(false)}
                    />
                  )}
                </div>
                <div className="w-30">
                  {create && !loading && <Button text="Create" type="submit" />}
                  {create && loading && (
                    <Button text="Creating..." type="submit" />
                  )}
                  {!create && !loading && (
                    <Button text="Update" type="submit" />
                  )}{" "}
                  {!create && loading && (
                    <Button text="Updating..." type="submit" />
                  )}
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
              <label>Custom Job Description:</label>
              <textarea
                className="border-2 focus:outline-none border-gray-300 hover:border-gray-400 rounded p-2 w-full mb-3"
                placeholder=""
                rows={5}
                value={customJob.description}
                required={true}
                onChange={(e) =>
                  setCustomJob({
                    ...customJob,
                    description: e.target.value,
                  })
                }
              />

              <div className="flex justify-end mt-6 space-x-3">
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
          <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-sm relative">
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
                rows={5}
                value={customSub.desc}
                required={true}
                onChange={(e) =>
                  setCustomSub({
                    ...customSub,
                    desc: e.target.value,
                  })
                }
              />
              <div className="flex justify-end mt-6 space-x-3">
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
