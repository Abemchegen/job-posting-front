import Select from "react-select";

export default function AgentCvElement({
  label,
  field,
  item,
  agent = true,
  type = "normal",
  editChange = null,
  addChange = null,
}) {
  const level = ["HighSchool", "Bachelors", "Masters", "Doctorate"];

  const options = [
    ...Object.values(level).map((l) => ({ value: l, label: l })),
  ];
  return (
    <>
      {type === "edit" && (
        <div className="w-full flex min-w-0  mr-10 mb-2">
          <p className="text-gray-500 w-25 whitespace-nowrap font-bold mr-2">
            {label}:
          </p>
          {field.key == "description" && field.label == "Description" ? (
            <textarea
              id="item"
              required={true}
              value={item ?? ""}
              onChange={(e) => editChange && editChange(e.target.value)}
              rows={5}
              className=" flex-1 text-gray-500 border-2 outline-none focus:border-gray-400  py-1 px-2 border-gray-300 rounded-sm"
            />
          ) : (field.key == "gpa" && field.label == "Gpa") ||
            (field.key == "year" && field.label == "Year") ? (
            <input
              id="item"
              required={true}
              type="number"
              value={item ?? 0}
              onChange={(e) => editChange && editChange(e.target.value)}
              className=" flex-1 text-gray-500 border-2 outline-none focus:border-gray-400  py-1 px-2 border-gray-300 rounded-sm"
            />
          ) : (
            <input
              id="item"
              required={true}
              value={item ?? ""}
              onChange={(e) => editChange && editChange(e.target.value)}
              className=" flex-1 text-gray-500 border-2 outline-none focus:border-gray-400  py-1 px-2 border-gray-300 rounded-sm"
            />
          )}
        </div>
      )}
      {type === "normal" && agent && (
        <div className="w-full flex items-center min-w-0 mr-10 mb-2">
          <p className="text-gray-500 font-bold mr-2 ">{label}:</p>
          <p className="text-gray-500 py-1 truncate">{item}</p>
        </div>
      )}
      {type === "normal" && !agent && (
        <div className="w-full flex items-center min-w-0 mb-2">
          <p className="text-gray-500 font-bold mr-2 ">{label}:</p>
          <p className="text-gray-500 py-1">{item}</p>
        </div>
      )}

      {type === "add" && (
        <div className="w-full flex min-w-0  mr-10 mb-2">
          <p className="text-gray-500 w-25 whitespace-nowrap font-bold mr-2">
            {label}:
          </p>
          {field.key === "level" && field.label === "Education" ? (
            <div className="flex-1">
              <Select
                classNamePrefix="react-select"
                options={options}
                required={true}
                onChange={(option) => {
                  addChange && addChange(option.value);
                }}
                placeholder="Select Education level..."
                maxMenuHeight={160}
                styles={{
                  control: (base) => ({
                    ...base,
                    borderWidth: "2px",
                    boxShadow: "none",
                  }),
                  singleValue: (base) => ({ ...base, color: "#6B7280" }),
                  placeholder: (base) => ({ ...base, color: "#6B7280" }),
                  menu: (base) => ({ ...base, color: "#6B7280" }),
                }}
              />
            </div>
          ) : field.key === "description" && field.label === "Description" ? (
            <textarea
              id="item"
              required={true}
              onChange={(e) => addChange && addChange(e.target.value)}
              rows={5}
              className="flex-1 text-gray-500 border-2 outline-none focus:border-gray-400 py-1 px-2 border-gray-300 rounded-sm"
            />
          ) : (field.key == "gpa" && field.label == "Gpa") ||
            (field.key == "year" && field.label == "Year") ? (
            <input
              id="item"
              required={true}
              type="number"
              step="any"
              onChange={(e) => addChange && addChange(e.target.value)}
              className=" flex-1 text-gray-500 border-2 outline-none focus:border-gray-400  py-1 px-2 border-gray-300 rounded-sm"
            />
          ) : (
            <input
              id="item"
              required={true}
              onChange={(e) => addChange && addChange(e.target.value)}
              className="flex-1 text-gray-500 border-2 outline-none focus:border-gray-400 py-1 px-2 border-gray-300 rounded-sm"
            />
          )}
        </div>
      )}
    </>
  );
}
