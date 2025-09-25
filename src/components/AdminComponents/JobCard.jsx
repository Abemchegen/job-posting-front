import { Check, Pen, Plus, Trash, X } from "lucide-react";
import Button from "../Button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useJobs } from "../../hook/useJobs";

export default function JobCard({ detail = false, jobItem }) {
  const {
    updateJobDetails,
    updateSubcatagory,
    addSubcatagory,
    deleteaJob,
    deleteSubcat,
  } = useJobs();
  const [job, setJob] = useState({
    id: jobItem.id,
    name: jobItem.name,
    description: jobItem.description,
    subcatagory: jobItem.subcatagory,
  });
  const [addSub, setAddSub] = useState(false);
  const [editingIdx, setEditingIdx] = useState(null);
  const [editValues, setEditValues] = useState({ name: "", description: "" });
  const [editJob, setEditJob] = useState(false);
  const [editJobValues, setEditJobValues] = useState({
    name: job.name,
    description: job.description,
  });
  const [deleteJob, setDeleteJob] = useState(false);
  const [addValues, setAddValues] = useState({ name: "", description: "" });
  const [deleteProccede, setDeleteProccede] = useState(null);
  const [jobDeleted, setJobDeleted] = useState(false);

  const handleAddSub = async (e) => {
    e.preventDefault();
    if (!addValues.name.trim() || !addValues.description.trim()) return;
    try {
      const subData = {
        jobName: job.name.trim(),
        subcatagories: [
          {
            name: addValues.name.trim(),
            description: addValues.description.trim(),
          },
        ],
      };
      const response = await addSubcatagory(subData);
      setJob(response);
      setAddValues({ name: "", description: "" });
      setAddSub(false);
    } catch (e) {
    } finally {
    }
  };

  const handleUpdateSub = async (idx) => {
    try {
      const subData = {
        jobName: job.name.trim(),
        subcatagory: {
          existingName: job.subcatagory[idx].name.trim(),
          updatedName: editValues.name.trim(),
          description: editValues.description.trim(),
        },
      };
      const response = await updateSubcatagory(subData);
      setJob(response);
    } catch (e) {
    } finally {
      setEditingIdx(null);
    }
  };
  const handleDeleteSub = async (idx) => {
    try {
      const deleteData = {
        jobName: job.name.trim(),
        subcatagories: [
          {
            name: job.subcatagory[idx].name.trim(),
            description: job.subcatagory[idx].description.trim(),
          },
        ],
      };
      const response = await deleteSubcat(deleteData);
      setJob(response);
    } catch (e) {
    } finally {
      setDeleteProccede(null);
    }
  };
  const handleEditJob = async () => {
    if (!editJobValues.name.trim() || !editJobValues.description.trim()) return;

    try {
      const updateData = {
        existingJobname: job.name.trim(),
        updatedJobName: editJobValues.name.trim(),
        description: editJobValues.description.trim(),
      };
      const response = await updateJobDetails(updateData);
      setJob(response);
    } catch (e) {
    } finally {
      setEditJob(false);
    }
  };

  const handleDeleteJob = async () => {
    try {
      const response = await deleteaJob(job.id);
      setJobDeleted(true);
    } catch (e) {
    } finally {
      setDeleteJob(false);
    }
  };
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (jobDeleted) {
        navigate("/pageJob");
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [jobDeleted]);

  return (
    <div className="w-full">
      {!detail && (
        <div className="bg-white shadow-sm rounded-lg my-5 ">
          <div className="flex w-full justify-between p-8 items-center">
            <div className="flex w-3/4 flex-col">
              <p className="text-2xl mb-3 text-brand">{job.name}</p>
              <div className="flex">
                <p className="font-semibold mr-2 text-gray-500">Description:</p>
                <p className="truncate text-gray-500">{job.description}</p>
              </div>
            </div>
            <div className="w-30">
              <Button
                text={"View Details"}
                onClick={() => navigate(`/detailjob?id=${job.id}`)}
              />
            </div>
          </div>
        </div>
      )}
      {detail && (
        <div className="bg-white shadow-sm rounded-lg m-5 p-8 ">
          <div className="flex flex-col">
            <div className="flex justify-end">
              <div className="flex items-center space-x-4">
                <Pen
                  onClick={() => setEditJob(true)}
                  className="hover:cursor-pointer text-green-500"
                />
                <Trash
                  onClick={() => setDeleteJob(true)}
                  className="hover:cursor-pointer text-red-500"
                />
              </div>
            </div>
            <div>
              <p className="text-2xl text-center m-3 text-brand">{job.name}</p>
            </div>

            <div className="text-gray-500">
              <p className="font-semibold m-3">Description:</p>
              <textarea
                value={job.description}
                disabled={true}
                rows={3}
                className="border-2 m-3 border-gray-300 hover:border-gray-400 p-2 w-full"
              ></textarea>
            </div>
            <div className="text-gray-500">
              <p className="font-semibold m-3">Subcatagory:</p>
              {job.subcatagory &&
                job.subcatagory.map((sub, idx) => (
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
                            onClick={() => handleUpdateSub(idx)}
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
                                name: job.subcatagory[idx].name,
                                description: job.subcatagory[idx].description,
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
            </div>
            <div className="flex justify-center">
              <div
                onClick={() => {
                  setAddSub(true);
                }}
                className="border-2 m-5 border-brand-light bg-white p-3 rounded-xl flex text-gray-500 space-x-2 hover:font-semibold hover:border-brand hover:cursor-pointer"
              >
                <Plus />
                <p>Add Subcatagory</p>
              </div>
            </div>
          </div>
        </div>
      )}
      {deleteJob && (
        <div className="flex justify-center items-center inset-0 z-10 fixed">
          <div className="w-full max-w-lg space-y-5 p-5 bg-white shadow-xl rounded-xl flex flex-col items-center">
            <h1 className="text-2xl text-center">
              Are you sure you want to delete this Job?
            </h1>
            <p className="text-gray-500">
              Once you delete this job, you can no longer access it or restore
              it
            </p>
            <div className="flex space-x-2">
              <div className="w-20">
                <Button
                  text={"Cancle"}
                  onClick={() => {
                    setDeleteJob(false);
                  }}
                />
              </div>
              <div className="w-20">
                <Button
                  variant="danger"
                  text={"Delete"}
                  onClick={() => {
                    handleDeleteJob();
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      {jobDeleted && (
        <div className="flex justify-center items-center inset-0 z-10 fixed">
          <div className="w-full max-w-lg space-y-5 p-5 bg-white shadow-xl rounded-xl flex flex-col items-center">
            <h1 className="text-2xl text-center">Job deleted Successfully!</h1>
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
      {editJob && (
        <div className="flex justify-center items-center fixed inset-0 ">
          <div className="w-full max-w-sm p-5 bg-white shadow-xl rounded-xl">
            <h1 className="text-2xl font-bold text-center mb-5">
              Edit job {job.name}
            </h1>
            <div className="space-y-2 mb-4 flex flex-col">
              <label htmlFor="name">Job name: </label>
              <input
                className="border-2 p-2 rounded-xl hover:border-gray-400 border-gray-300"
                id="name"
                required={true}
                name="name"
                value={editJobValues.name}
                onChange={(e) =>
                  setEditJobValues({
                    ...editJobValues,
                    name: e.target.value,
                  })
                }
              />
            </div>
            <div className="space-y-2 flex flex-col">
              <label htmlFor="">Job description: </label>
              <textarea
                className="border-2 rounded-xl p-2 focus:outline-none hover:border-gray-400 border-gray-300"
                name="description"
                required={true}
                rows={4}
                value={editJobValues.description}
                onChange={(e) =>
                  setEditJobValues({
                    ...editJobValues,
                    description: e.target.value,
                  })
                }
              />
            </div>
            <div className="flex justify-center my-5 space-x-3">
              <div className="w-20">
                <Button
                  onClick={() => {
                    setEditJobValues({
                      name: job.name,
                      description: job.description,
                    });
                    setEditJob(false);
                  }}
                  variant="dark"
                  text={"Cancle"}
                />
              </div>
              <div className="w-20">
                <Button onClick={() => handleEditJob()} text={"Save"} />
              </div>
            </div>
          </div>
        </div>
      )}
      {addSub && (
        <div className="flex justify-center items-center fixed inset-0 ">
          <div className="w-full max-w-sm p-5 bg-white shadow-xl rounded-xl">
            <h1 className="text-center text-xl mb-5 font-bold">
              Add a subcatagory for job {job.name}
            </h1>
            <form onSubmit={handleAddSub}>
              <div className="space-y-2 mb-4 flex flex-col">
                <label htmlFor="name">Sub catagory name: </label>
                <input
                  className="border-2 p-2 rounded-xl hover:border-gray-400 border-gray-300"
                  id="name"
                  required={true}
                  name="name"
                  value={addValues.name}
                  onChange={(e) =>
                    setAddValues({ ...addValues, name: e.target.value })
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
                  value={addValues.description}
                  onChange={(e) =>
                    setAddValues({ ...addValues, description: e.target.value })
                  }
                />
              </div>

              <div className="flex justify-center my-5 space-x-3">
                <div className="w-20">
                  <Button
                    onClick={() => {
                      setAddValues({ name: "", description: "" });
                      setAddSub(false);
                    }}
                    variant="dark"
                    text={"Cancle"}
                  />
                </div>
                <div className="w-20">
                  <Button type="submit" text={"Save"} />
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
