import Button from "../../components/Button";
import JobPostCard from "../../components/CompanyComponents/CompanyJobPostCard";
import { ArrowDown, ArrowUp, Filter, Search, XIcon } from "lucide-react";
import { useState } from "react";
import UserCard from "../../components/AdminComponents/UserCard";
export default function AdminHome() {
  const [filter, setFilter] = useState(false);

  const role = ["company", "agent"];

  const [filters, setFlters] = useState({
    role: false,
  });

  const [selectedFilters, setSelectedFilters] = useState({
    role: [],
  });

  function applyFilters() {
    setFilter(!filter);
  }

  function clearFilters() {
    setFilter(!filter);
    setSelectedFilters({
      role: [],
    });
  }
  return (
    <div>
      <div className=" space-y-4 bg-brand-dark flex flex-col mt-15 items-center text-white">
        <h1 className="text-4xl mt-18 mb-9 font-bold">Find Users</h1>
        <p className="text-center text-2xl mb-10">
          Search company users or agents using keywords
        </p>
        <div className="bg-white text-black relative mb-20 w-3/4 max-w-2xl p-5 rounded-xl shadow-sm flex justify-between items-center space-x-3">
          <div className="flex-1 flex flex-col md:flex-row items-center md:justify-between">
            <div className="flex md:w-4/5 w-full md:mb-0 mb-4 md:mr-2">
              <div className="flex border   hover:border-gray-400 rounded-lg shadow-sm border-gray-300 items-center w-full">
                <Search className="text-gray-500 w-5 mx-2 "></Search>

                <input
                  className="w-full flex-1 focus:outline-none text-gray-700 p-2"
                  placeholder="User names, emails or company names"
                />
              </div>
            </div>
            <div className="w-full md:w-30">
              <Button text={"Search Users"}></Button>
            </div>
          </div>

          <Filter
            className="text-gray-500"
            onClick={() => setFilter(!filter)}
          />
          {filter && (
            <div className="absolute z-20 left-1/2 -translate-x-1/2 top-full mt-2 rounded-xl shadow-sm bg-white p-5 w-110 ">
              <div className="flex mb-5 justify-between">
                <p className="text-2xl text-center">Filters</p>
                <XIcon
                  onClick={() => {
                    setFilter(!filter);
                  }}
                />
              </div>
              <div className="">
                <ul>
                  <div
                    onClick={() => {
                      setFlters({
                        ...filters,
                        role: !filters.role,
                      });
                    }}
                    className="flex  justify-between w-full rounded-xl p-2 border-2 border-gray-400"
                  >
                    <li>User Role</li>
                    {filters.role && <ArrowUp className="text-gray-500" />}
                    {!filters.role && <ArrowDown className="text-gray-500" />}
                  </div>
                  {filters.role && (
                    <ul className="w-11/12 p-3 rounded-b-xl my-2">
                      {role.map((type) => (
                        <li key={type} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={selectedFilters.role.includes(type)}
                            onChange={() => {
                              setSelectedFilters((prev) => ({
                                ...prev,
                                role: prev.role.includes(type)
                                  ? prev.role.filter((t) => t !== type)
                                  : [...prev.role, type],
                              }));
                            }}
                          />
                          <span>{type}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </ul>
                <div className="flex space-x-2 justify-center mt-5">
                  <div>
                    <Button
                      onClick={() => {
                        clearFilters();
                      }}
                      variant="dark"
                      text={"Clear All"}
                    />
                  </div>
                  <div>
                    <Button
                      onClick={() => applyFilters()}
                      text={"Apply Filters"}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-center">
        <div className="p-2 w-full max-w-5xl mt-10">
          <h2 className="m-5 text-2xl font-bold">Users Found</h2>
          <div className="w-full">
            <UserCard />
            <UserCard />
            <UserCard />
            <UserCard />
            <UserCard />
          </div>
        </div>
      </div>
    </div>
  );
}
