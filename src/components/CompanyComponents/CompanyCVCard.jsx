import AgentCvElement from "../AgentComponents/AgentCvElement";

export default function CompanyCvCard({ list = [], config = [] }) {
  return (
    <div className="flex justify-center mt-2 min-w-sm ">
      <div className="w-19/20 p-3 ">
        {list.map((item, idx) => (
          <div
            key={idx}
            className="flex justify-between w-full mb-2 p-3 rounded-2xl border-2 border-muted  text-black"
          >
            <div className="flex flex-1 min-w-0 flex-col ">
              {config.map((field) => (
                <AgentCvElement
                  agent={false}
                  key={field.key}
                  label={field.label}
                  item={item[field.key]}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
