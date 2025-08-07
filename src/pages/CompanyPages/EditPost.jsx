import Select from "react-select";
import Button from "../../components/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EditPost() {
  const navigate = useNavigate();

  const job = {
    waiter: ["cafe waiter", "restaurant waiter"],
    doctor: ["dentist", "gastriontist"],
    pilot: [],
    enginner: [
      "Software Engineeir",
      "Mechanical Enginieer",
      "Electrical Engineeir",
      "ELectro Mechanical Engineir",
    ],
    biotech: [],
    teacher: ["Highschool", "college", "university"],
    Accountant: [],
  };

  const [jobPost, setJobPost] = useState({
    id: 1,
    description:
      "We need qualified workers for our company. We need front end enginners ",
    salary: "4000",
    people: "3",
    jobName: {
      value: "enginner",
      label: "enginner",
    },
    jobSub: {
      value: "Software Engineeir",
      label: "Software Engineeir",
    },
  });
  const [errors, setErrors] = useState({
    description: "",
    salary: "",
    people: "",
    jobName: "",
    jobSub: "",
  });
  const jobOptions = Object.keys(job).map((key) => ({
    value: key,
    label: key,
  }));
  const subtypeOptions = jobPost.jobName
    ? job[jobPost.jobName.value].map((sub) => ({ value: sub, label: sub }))
    : [];
  function handlePost(e) {
    e.preventDefault();
    // api call to store the new post
    navigate(`/jobpostdetail/company?id=${jobPost.id}`);
  }
  return (
    <div className="mt-10 flex justify-center">
      <div className="w-3/4 max-w-xl">
        <div className="flex bg-white my-10 flex-col items-center rounded-xl shadow-sm">
          <h1 className="text-2xl mt-5 text-center font-semibold ">
            Edit this Job Post
          </h1>
          <div className=" w-full p-4">
            <form
              onSubmit={handlePost}
              className="flex flex-col items-center w-full"
            >
              <div className="w-8/9">
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
                      onChange={(option) =>
                        setJobPost({
                          ...jobPost,
                          jobSub: option,
                        })
                      }
                      isDisabled={
                        !jobPost.jobName || subtypeOptions.length === 0
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
                    onClick={() =>
                      navigate(`/jobpostdetail/company?id=${jobPost.id}`)
                    }
                  />
                </div>
                <div className="w-30">
                  <Button type="submit" text={"Save"} />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
