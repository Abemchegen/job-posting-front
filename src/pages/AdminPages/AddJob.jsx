import { Check, Pen, Plus, Trash, X } from "lucide-react";
import { useEffect, useState } from "react";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { useJob, useJobs } from "../../hook/useJobs";

export default function AddJob() {
  const { createJob } = useJobs();
  const [addSub, setAddSub] = useState(false);
  const [subValues, setSubValues] = useState({ name: "", description: "" });
  const [jobAdded, setJobAdded] = useState(false);
  const [editingIdx, setEditingIdx] = useState(null);
  const [editValues, setEditValues] = useState({ name: "", description: "" });
  const [deleteProccede, setDeleteProccede] = useState(null);
  const [loading, setLoading] = useState(false);
  const [jobData, setJobData] = useState({
    name: "",
    description: "",
    subcatagories: [],
  });

  const navigate = useNavigate(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (jobAdded) {
        navigate("/pageJob");
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [jobAdded]);

  const handleAddJob = async (e) => {
    e.preventDefault();
    if (!jobData.name.trim() || !jobData.description.trim()) return;

    const submitData = {
      name: jobData.name.trim(),
      description: jobData.description.trim(),
    };

    if (jobData.subcatagories && jobData.subcatagories.length > 0) {
      submitData["subcatagories"] = jobData.subcatagories;
    }

    try {
      setLoading(true);
      await createJob(submitData);
      setJobAdded(true);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  const handleAddSub = (e) => {
    e.preventDefault();
    if (!subValues.name.trim() || !subValues.description.trim()) return;
    setJobData({
      ...jobData,
      subcatagories: [
        ...jobData.subcatagories,
        {
          name: subValues.name.trim(),
          description: subValues.description.trim(),
        },
      ],
    });
    setAddSub(false);
    setSubValues({ name: "", description: "" });
  };
  const handleSaveSub = (idx) => {
    setJobData((prev) => {
      const updated = [...prev.subcatagories];
      updated[idx] = { ...updated[idx], ...editValues };
      return { ...prev, subcatagories: updated };
    });
    setEditingIdx(null);
  };
  function handleDeleteSub(idx) {
    setJobData({
      ...jobData,
      subcatagories: jobData.subcatagories.filter((_, i) => i != idx),
    });
    setDeleteProccede(null);
  }
  return (
    <div className="flex justify-center mt-15 ">
      <div className="w-full max-w-xl shadow-sm rounded-xl bg-white my-5 p-5">
        <h1 className="text-center text-xl font-bold my-4">Add a new job</h1>

        <form onSubmit={handleAddJob}>
          <div className="space-y-2 mb-4 flex flex-col">
            <label className="m-2" htmlFor="name">
              Job name:{" "}
            </label>
            <input
              className="border-2 p-2 rounded-xl  hover:border-gray-400 border-gray-300"
              id="name"
              required={true}
              name="name"
              value={jobData.name}
              onChange={(e) => setJobData({ ...jobData, name: e.target.value })}
            />
          </div>
          <div className="space-y-2 flex flex-col">
            <label className="m-2" htmlFor="">
              Job description:{" "}
            </label>
            <textarea
              className="border-2 rounded-xl p-2 focus:outline-none hover:border-gray-400 border-gray-300"
              name="description"
              required={true}
              rows={4}
              value={jobData.description}
              onChange={(e) =>
                setJobData({ ...jobData, description: e.target.value })
              }
            />
          </div>
          <p className="my-5 mx-2">Job Subcatagories:</p>
          {jobData.subcatagories &&
            jobData.subcatagories
              .filter((sub) => sub.name.trim() || sub.description.trim())
              .map((sub, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between rounded p-5 m-3 shadow-sm"
                >
                  <div className="space-y-2">
                    {editingIdx === idx ? (
                      <>
                        <input
                          className="border rounded p-1 mb-1 w-full"
                          name="name"
                          value={editValues.name}
                          onChange={(e) => {
                            setEditValues({
                              ...editValues,
                              [e.target.name]: e.target.value,
                            });
                          }}
                        />
                        <input
                          className="border rounded p-1 w-full"
                          name="description"
                          value={editValues.description}
                          onChange={(e) => {
                            setEditValues({
                              ...editValues,
                              [e.target.name]: e.target.value,
                            });
                          }}
                        />
                      </>
                    ) : (
                      <>
                        <p className="font-semibold">{sub.name}</p>
                        <p>{sub.description}</p>
                      </>
                    )}
                  </div>
                  <div className="flex items-center space-x-3">
                    {editingIdx === idx ? (
                      <>
                        <Check
                          className="text-green-500 cursor-pointer"
                          onClick={() => handleSaveSub(idx)}
                        />
                        <X
                          className="text-gray-500 cursor-pointer"
                          onClick={() => setEditingIdx(null)}
                        />
                      </>
                    ) : (
                      <>
                        <Pen
                          className="text-green-500 hover:cursor-pointer"
                          onClick={() => {
                            setEditingIdx(idx);
                            setEditValues({
                              name: jobData.subcatagories[idx].name,
                              description:
                                jobData.subcatagories[idx].description,
                            });
                          }}
                        />
                        <Trash
                          className="text-red-500 hover:cursor-pointer"
                          onClick={() => setDeleteProccede(idx)}
                        />
                      </>
                    )}
                  </div>
                </div>
              ))}
          <div className="flex justify-center">
            <div
              onClick={() => {
                setAddSub(true);
              }}
              className="border-2 m-2 border-brand-light  bg-white p-3 rounded-xl flex text-gray-500 space-x-2 hover:font-semibold hover:border-brand hover:cursor-pointer"
            >
              <Plus />
              <p>Add Subcatagories</p>
            </div>
          </div>

          <div className="flex justify-center my-10  space-x-8">
            <div className="w-25">
              <Button
                onClick={() => {
                  navigate("/pageJob");
                }}
                variant="dark"
                text={"Cancle"}
              />
            </div>
            <div className="w-25">
              {!loading && <Button type="submit" text={"Save"} />}
              {loading && <Button type="submit" text={"Saving..."} />}
            </div>
          </div>
        </form>
      </div>

      {jobAdded && (
        <div className="flex z-10 justify-center items-center fixed inset-0 ">
          <div className="w-full max-w-sm p-5 bg-white shadow-xl rounded-xl">
            <h1 className="text-center text-xl mb-5 font-bold">
              Job created Succesfully!
            </h1>
          </div>
        </div>
      )}
      {addSub && (
        <div className="flex justify-center items-center fixed inset-0 ">
          <div className="w-full max-w-sm p-5 bg-white shadow-xl rounded-xl">
            <h1 className="text-center text-xl mb-5 font-bold">
              Add a subcatagory for job {jobData.name}
            </h1>
            <form onSubmit={handleAddSub}>
              <div className="space-y-2 mb-4 flex flex-col">
                <label htmlFor="name">Sub catagory name: </label>
                <input
                  className="border-2 p-2 rounded-xl hover:border-gray-400 border-gray-300"
                  id="name"
                  required={true}
                  name="name"
                  value={subValues.name}
                  onChange={(e) =>
                    setSubValues({ ...subValues, name: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2 flex flex-col">
                <label htmlFor="">Sub catagory description: </label>
                <textarea
                  className="border-2 rounded-xl p-2 focus:outline-none hover:border-gray-400 border-gray-300"
                  name="description"
                  required={true}
                  rows={4}
                  value={subValues.description}
                  onChange={(e) =>
                    setSubValues({ ...subValues, description: e.target.value })
                  }
                />
              </div>

              <div className="flex justify-center my-5 space-x-3">
                <div className="w-25">
                  <Button
                    onClick={() => {
                      setSubValues({ name: "", description: "" });
                      setAddSub(false);
                    }}
                    variant="dark"
                    text={"Cancle"}
                  />
                </div>
                <div className="w-25">
                  <Button type="submit" text={"Save"} />
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
      {deleteProccede != null && (
        <div className="flex justify-center items-center inset-0 z-10 fixed">
          <div className="w-full max-w-lg space-y-5 p-5 bg-white shadow-xl rounded-xl flex flex-col items-center">
            <h1 className="text-2xl text-center">
              Are you sure you want to delete this subcatagory?
            </h1>
            <p className="text-gray-500">
              Once you delete this data, you can no longer access it or restore
              it
            </p>
            <div className="flex space-x-2">
              <div className="w-20">
                <Button
                  text={"Cancle"}
                  onClick={() => {
                    setDeleteProccede(null);
                  }}
                />
              </div>
              <div className="w-20">
                <Button
                  variant="danger"
                  text={"Delete"}
                  onClick={() => {
                    handleDeleteSub(deleteProccede);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
