import { Pen, Plus, Trash } from "lucide-react";
import AgentCvElement from "./AgentCvElement";
import { FilterBuilder } from "stream-chat";

export default function AgentCvCard({
  list = [],
  config = [],
  setEdit,
  setDelete,
  setAdd,
  setSelectedItem,
  sectionLable,
}) {
  return (
    <div className="flex justify-center mt-2 min-w-sm ">
      <div className="w-19/20 bg-white rounded-b-xl p-3 ">
        {list.map((item, idx) => (
          <div
            key={idx}
            className="flex justify-between w-full mb-2 p-3 rounded-2xl border-2 border-muted  text-black"
          >
            <div className="flex flex-1 min-w-0 overflow-hidden md:flex-row flex-col md:justify-between ">
              {config.map((field) => (
                <AgentCvElement
                  key={field.key}
                  identifier={field.key}
                  label={field.label}
                  item={item[field.key]}
                />
              ))}
            </div>
            <div className="flex items-center ">
              <Pen
                className="w-5 mr-3 text-brand hover:cursor-pointer"
                onClick={() => {
                  setEdit(true);
                  setSelectedItem({
                    label: sectionLable,
                    id: item.id,
                    itemIndex: idx,
                    config: config,
                  });
                }}
              />
              <Trash
                className="w-5 text-red-500 hover:cursor-pointer"
                onClick={() => {
                  setDelete(true);
                  setSelectedItem({
                    label: sectionLable,
                    itemIndex: idx,
                    id: item.id,
                    config: config,
                  });
                }}
              />
            </div>
          </div>
        ))}

        <div
          className="flex justify-center hover:cursor-pointer"
          onClick={() => setAdd(true)}
        >
          <div
            className="m-2 p-3 border-2 border-muted rounded-2xl hover:font-bold text-black"
            onClick={() => {
              setAdd(true);
              setSelectedItem({
                label: sectionLable,
                itemIndex: null,
                config: config,
              });
            }}
          >
            <div className="flex">
              <Plus className="text-brand mr-1" />
              <span className="mr-3">Add {sectionLable} </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
