import {
  ArrowDown,
  ArrowUp,
  Briefcase,
  Folder,
  GraduationCap,
  Medal,
  XIcon,
} from "lucide-react";
import { useState } from "react";
import { useEffect } from "react";
import Button from "../../components/Button";
import AgentCvCard from "../../components/AgentComponents/AgentCvCard";
import AgentCvElement from "../../components/AgentComponents/AgentCvElement";
import { useAuth } from "../../context/authContext";
import { useApplications } from "../../hook/useApplications";

export default function AgentCV() {
  const { user, setUser } = useAuth();
  const { uploadCv, updateCv, deleteCv } = useApplications();
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

  const [cvData, setCvData] = useState({});
  const [per, setPer] = useState(0);

  useEffect(() => {
    if (user && user.cv != null && user.cv.resume != null) {
      setCvData({
        Education: user.cv.resume.education || [],
        Experiance: user.cv.resume.experiance || [],
        Award: user.cv.resume.award || [],
        Project: user.cv.resume.project || [],
      });
      const filledSections =
        (user.cv.resume.education && user.cv.resume.education.length > 0
          ? 1
          : 0) +
        (user.cv.resume.experiance && user.cv.resume.experiance.length > 0
          ? 1
          : 0) +
        (user.cv.resume.award && user.cv.resume.award.length > 0 ? 1 : 0) +
        (user.cv.resume.project && user.cv.resume.project.length > 0 ? 1 : 0);

      setPer(Math.round((filledSections / 4) * 100));
    }
  }, [user]);

  const [expand, setExpand] = useState({
    education: false,
    project: false,
    award: false,
    experiance: false,
  });

  const [edit, setEdit] = useState(false);
  const [deleteEle, setDeleteEle] = useState(false);
  const [selectedItem, setSelectedItem] = useState({
    label: null,
    id: null,
    itemIndex: null,
    config: null,
  });
  const [editFormData, setEditFormData] = useState({});
  const [addFormData, setAddFormData] = useState({});
  const [add, setAdd] = useState(false);

  useEffect(() => {
    if (edit && selectedItem) {
      setEditFormData({
        ...cvData[selectedItem.label][selectedItem.itemIndex],
      });
    }
  }, [edit, selectedItem]);

  const handleSaveEdit = async () => {
    try {
      if (!editFormData) return;
      const uploadData = {
        id: selectedItem.id,
      };
      if (selectedItem.label == "Education") {
        uploadData["education"] = editFormData;
      } else if (selectedItem.label == "Project") {
        uploadData["project"] = editFormData;
      } else if (selectedItem.label == "Experiance") {
        uploadData["experiance"] = editFormData;
      } else if (selectedItem.label == "Award") {
        uploadData["award"] = editFormData;
      }

      const response = await updateCv(uploadData);
      setUser({
        ...user,
        cv: response.cv,
      });
    } catch (e) {
    } finally {
      setEdit(false);
      setSelectedItem(null);
    }
  };

  const handleDelete = async () => {
    try {
      if (!selectedItem) return;
      let deletename;
      if (selectedItem.label == "Education") {
        deletename = "education";
      } else if (selectedItem.label == "Project") {
        deletename = "project";
      } else if (selectedItem.label == "Experiance") {
        deletename = "experiance";
      } else if (selectedItem.label == "Award") {
        deletename = "award";
      }

      const response = await deleteCv(selectedItem.id, deletename);
      setUser({
        ...user,
        cv: response.cv,
      });
    } catch (e) {
    } finally {
      setDeleteEle(false);
      setSelectedItem(null);
    }
  };

  const handleAdd = async () => {
    try {
      if (!addFormData) return;
      const uploadData = {};
      if (selectedItem.label == "Education") {
        uploadData["education"] = [addFormData];
      } else if (selectedItem.label == "Project") {
        uploadData["project"] = [addFormData];
      } else if (selectedItem.label == "Experiance") {
        uploadData["experiance"] = [addFormData];
      } else if (selectedItem.label == "Award") {
        uploadData["award"] = [addFormData];
      }

      const response = await uploadCv(uploadData);
      setUser({
        ...user,
        cv: response.cv,
      });
    } catch (e) {
    } finally {
      setAdd(false);
      setAddFormData(null);
      setSelectedItem(null);
    }
  };
  return (
    <div className="flex justify-center m-5">
      <div className="w-4/5 min-w-sm flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-10 text-center">
          You can add your education, experiance and projects here{" "}
        </h1>
        <div className="w-full flex flex-col items-center mb-10">
          <div className="max-w-3xl w-full rounded-lg shadow-lg space-y-3 bg-white flex flex-col items-center justify-center mb-4 p-4">
            <h1 className="text-xl font-semibold"> CV Completion Progress</h1>
            <div className="flex space-x-5 items-center">
              <p className="text-brand text-xl font-bold">{per}%</p>
              <div className="w-48 h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-brand transition-all duration-300"
                  style={{ width: `${per}%` }}
                ></div>
              </div>
            </div>

            {per > 0 && per < 100 && (
              <>
                <h1 className="text-md text-brand">
                  Keep going! You're making great progress.
                </h1>
                <p className="text-gray-500">
                  Complete your CV to increase your chances of landing your
                  dream job.
                </p>
              </>
            )}
            {per == 100 && (
              <>
                <h1 className="text-md text-brand">
                  Congratulations! Your CV is complete.
                </h1>
                <p className="text-gray-500">
                  Improve your CV to increase your chances of landing your dream
                  job.
                </p>
              </>
            )}
          </div>
        </div>
        {!user && (
          <div className="flex justify-center items-center">
            <Spinner />
          </div>
        )}
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
            <AgentCvCard
              setAdd={setAdd}
              setDelete={setDeleteEle}
              setSelectedItem={setSelectedItem}
              setEdit={setEdit}
              sectionLable={"Education"}
              list={cvData.Education}
              config={educationConfig}
            />
          )}
        </div>
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
            <AgentCvCard
              setAdd={setAdd}
              setDelete={setDeleteEle}
              setSelectedItem={setSelectedItem}
              setEdit={setEdit}
              sectionLable={"Experiance"}
              list={cvData.Experiance}
              config={experianceConfig}
            />
          )}
        </div>
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
            <AgentCvCard
              setAdd={setAdd}
              setDelete={setDeleteEle}
              setSelectedItem={setSelectedItem}
              sectionLable={"Project"}
              setEdit={setEdit}
              list={cvData.Project}
              config={projectConfig}
            />
          )}
        </div>
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
            <AgentCvCard
              setAdd={setAdd}
              setDelete={setDeleteEle}
              setSelectedItem={setSelectedItem}
              setEdit={setEdit}
              sectionLable={"Award"}
              list={cvData.Award}
              config={awardConfig}
            />
          )}
        </div>
      </div>
      {edit && selectedItem !== null && (
        <div className="fixed inset-0 z-10 flex items-center justify-center">
          <div className="w-1/2 ml-15 min-w-100 bg-white shadow-2xl rounded-2xl p-7">
            <div className="flex mb-5 justify-between">
              <h1 className="font-bold text-xl">Edit</h1>
              <XIcon
                onClick={() => {
                  setEdit(false);
                  setSelectedItem(null);
                }}
              />
            </div>

            {selectedItem.config.map((field) => (
              <AgentCvElement
                key={field.key}
                label={field.label}
                type="edit"
                field={field}
                item={editFormData[field.key]}
                editChange={(value) =>
                  setEditFormData((prev) => ({
                    ...prev,
                    [field.key]: value.trim(),
                  }))
                }
              />
            ))}
            <div className="flex space-x-4 mt-7">
              <Button
                text={"Cancle"}
                variant="dark"
                onClick={() => {
                  setEdit(false);
                  setSelectedItem(null);
                }}
              />
              <Button
                text={"Save"}
                onClick={() => {
                  handleSaveEdit();
                }}
              />
            </div>
          </div>
        </div>
      )}
      {deleteEle && selectedItem !== null && (
        <div className="fixed inset-0 z-10 flex items-center justify-center">
          <div className="w-1/2 ml-15 min-w-90 bg-white shadow-2xl rounded-2xl p-7">
            <h1 className="font-bold text-xl text-center">
              Are you sure you want to delete this Entry?
            </h1>

            <div className="flex space-x-4 mt-7">
              <Button
                text={"Cancle"}
                variant="dark"
                onClick={() => {
                  setDeleteEle(false);
                  setSelectedItem(null);
                }}
              />
              <Button
                text={"Delete"}
                onClick={() => {
                  handleDelete();
                }}
                variant="danger"
              />
            </div>
          </div>
        </div>
      )}
      {add && selectedItem !== null && (
        <div className="fixed inset-0 z-10 flex items-center justify-center">
          <div className="w-1/2 ml-15 min-w-100 bg-white shadow-2xl rounded-2xl p-7">
            <h1 className="font-bold text-xl mb-7 text-center">
              Add your {selectedItem.label} here.
            </h1>

            {selectedItem.config.map((field) => (
              <AgentCvElement
                field={field}
                key={field.key}
                label={field.label}
                type="add"
                addChange={(value) =>
                  setAddFormData((prev) => ({
                    ...prev,
                    [field.key]:
                      typeof value === "string" ? value.trim() : value,
                  }))
                }
              />
            ))}

            <div className="flex space-x-4 mt-7">
              <Button
                text={"Cancle"}
                variant="dark"
                onClick={() => {
                  setAdd(false);
                  setSelectedItem(null);
                }}
              />
              <Button
                text={"Save"}
                onClick={() => {
                  handleAdd();
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
