export default function AgentCvElement({
  label,
  item,
  agent = true,
  type = "normal",
  editChange = null,
  addChange = null,
}) {
  return (
    <>
      {type === "edit" && (
        <div className="w-full flex min-w-0  mr-10 mb-2">
          <p className="text-gray-500 w-25 whitespace-nowrap font-bold mr-2">
            {label}:
          </p>
          <input
            id="item"
            placeholder={item}
            onChange={(e) => editChange && editChange(e.target.value)}
            className=" flex-1 text-gray-500 border-2 outline-none focus:border-gray-400  py-1 px-2 border-gray-300 rounded-sm"
          />
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
          <input
            id="item"
            placeholder={item}
            onChange={(e) => addChange && addChange(e.target.value)}
            className=" flex-1 text-gray-500 border-2 outline-none focus:border-gray-400  py-1 px-2 border-gray-300 rounded-sm"
          />
        </div>
      )}
    </>
  );
}
