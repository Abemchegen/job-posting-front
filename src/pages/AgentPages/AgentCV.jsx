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

export default function AgentCV() {
  // Config arrays for each section
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

  const [cvIcons, SetCvIcons] = useState({
    education: false,
    project: false,
    award: false,
    experiance: false,
  });

  const [edit, setEdit] = useState(false);
  const [deleteEle, setDeleteEle] = useState(false);
  const [selectedItem, setSelectedItem] = useState({
    label: null,
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

  function handleSaveEdit() {
    const updatedSection = [...cvData[selectedItem.label]];
    updatedSection[selectedItem.itemIndex] = { ...editFormData };
    setCvData({
      ...cvData,
      [selectedItem.label]: updatedSection,
    });
    console.log(updatedSection, editFormData);
    setEdit(false);
    setEditFormData(null);
    setSelectedItem(null);
  }

  function handleDelete() {
    let section = [...cvData[selectedItem.label]];
    section = section.filter((_, idx) => idx !== selectedItem.itemIndex);
    setCvData({
      ...cvData,
      [selectedItem.label]: section,
    });
    setDeleteEle(false);
    setSelectedItem(null);
  }

  function handleAdd() {
    let section = [...cvData[selectedItem.label]];
    section.push({
      ...addFormData,
    });
    setCvData({
      ...cvData,
      [selectedItem.label]: section,
    });
    setAdd(false);
    setAddFormData(null);
    setSelectedItem(null);
  }
  return (
    <div className="flex justify-center m-5">
      <div className="w-4/5 min-w-sm flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-5 text-center">
          You can add your education, experiance and projects here{" "}
        </h1>
        <div className="w-full  mb-3">
          <div
            className="p-5 bg-brand-dark text-white rounded-xl"
            onClick={() =>
              SetCvIcons({
                ...cvIcons,
                education: !cvIcons.education,
              })
            }
          >
            <div className="flex justify-between">
              <div className="flex space-x-2">
                <GraduationCap />
                <p className="font-bold">Education</p>
              </div>
              {!cvIcons.education && <ArrowDown />}
              {cvIcons.education && <ArrowUp />}
            </div>
          </div>
          {cvIcons.education && (
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
              SetCvIcons({
                ...cvIcons,
                experiance: !cvIcons.experiance,
              })
            }
          >
            <div className="flex justify-between">
              <div className="flex space-x-2">
                <Briefcase />
                <p className="font-bold">Experiance</p>
              </div>
              {!cvIcons.experiance && <ArrowDown />}
              {cvIcons.experiance && <ArrowUp />}
            </div>
          </div>
          {cvIcons.experiance && (
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
              SetCvIcons({
                ...cvIcons,
                project: !cvIcons.project,
              })
            }
          >
            <div className="flex justify-between">
              <div className="flex space-x-2">
                <Folder />
                <p className="font-bold">Project</p>
              </div>
              {!cvIcons.project && <ArrowDown />}
              {cvIcons.project && <ArrowUp />}
            </div>
          </div>
          {cvIcons.project && (
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
              SetCvIcons({
                ...cvIcons,
                award: !cvIcons.award,
              })
            }
          >
            <div className="flex justify-between">
              <div className="flex space-x-2">
                <Medal />
                <p className="font-bold">Awards</p>
              </div>
              {!cvIcons.award && <ArrowDown />}
              {cvIcons.award && <ArrowUp />}
            </div>
          </div>
          {cvIcons.award && (
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
                item={editFormData[field.key]}
                editChange={(value) =>
                  setEditFormData((prev) => ({
                    ...prev,
                    [field.key]: value,
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
          <div className="w-1/2 ml-15 max-w-120 bg-white shadow-2xl rounded-2xl p-7">
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
          <div className="w-1/2 ml-15 max-w-120 bg-white shadow-2xl rounded-2xl p-7">
            <h1 className="font-bold text-xl mb-7 text-center">
              Add your {selectedItem.label} here.
            </h1>

            {selectedItem.config.map((field) => (
              <AgentCvElement
                key={field.key}
                label={field.label}
                type="add"
                item={editFormData[field.key]}
                addChange={(value) =>
                  setAddFormData((prev) => ({
                    ...prev,
                    [field.key]: value,
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
