import Button from "../../components/Button";
import { ArrowDown, ArrowUp, Filter, Search, Users, XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import UserCard from "../../components/AdminComponents/UserCard";
import { useAuth } from "../../context/authContext";
import { Spinner } from "../../components/Spinner";
export default function AdminHome() {
  const [filter, setFilter] = useState(false);
  const role = ["Company", "Agent", "Admin"];
  const [filters, setFlters] = useState({
    role: false,
  });
  const [selectedFilters, setSelectedFilters] = useState({
    role: "",
    request: false,
    search: "",
  });
  const { user, getAllUsers, fetchUsersWithFilters } = useAuth();

  const [users, setusers] = useState(null);
  const [loading, setLoading] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    async function fetchuser() {
      setLoading(true);
      if (user) {
        try {
          const response = await getAllUsers();
          setusers(response.users);
        } catch (e) {
          console.log(e);
        } finally {
          setLoading(false);
        }
      }
    }
    fetchuser();
  }, [user]);
  function checkFilterNull() {
    const isRoleNull =
      !selectedFilters.role || selectedFilters.role.trim() === "";
    const searchValueNull =
      !selectedFilters.search || selectedFilters.search.trim() === "";

    return isRoleNull && searchValueNull;
  }
  const applyFilters = async () => {
    if (checkFilterNull()) {
      console.log("no filters selected !!!");
      setFilter(false);
      return;
    }
    try {
      const filterData = {
        role: selectedFilters.role.trim(),
        search: selectedFilters.search.trim(),
      };
      const response = await fetchUsersWithFilters(filterData);
      setFilteredUsers(response.users);
      console.log(response.users);
      setSelectedFilters({
        ...selectedFilters,
        request: true,
      });
    } catch (e) {
      console.log(e);
    } finally {
      setFilter(false);
    }
  };

  function clearFilters() {
    setFilteredUsers([]);
    setSelectedFilters({
      request: false,
      role: "",
      search: "",
    });
    setFilter(false);
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
                  onChange={(e) =>
                    setSelectedFilters({
                      ...selectedFilters,
                      search: e.target.value,
                      request: false,
                    })
                  }
                  value={selectedFilters.search}
                />
              </div>
            </div>
            <div className="w-full md:w-30">
              <Button
                text={"Search Users"}
                onClick={() => {
                  applyFilters();
                }}
              ></Button>
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
                            type="radio"
                            checked={selectedFilters.role == type}
                            onChange={() => {
                              setSelectedFilters((prev) => ({
                                ...prev,
                                role: type,
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
        <div className="p-2 w-full max-w-4xl mt-10">
          <h2 className="m-5 text-2xl font-bold">Users Found</h2>
          {loading ? (
            <div className="flex justify-center items-center m-5 space-x-5">
              <Spinner />
              <p className="text-xl font-semibold text-gray-500">Loading...</p>
            </div>
          ) : (
            <div className="w-full">
              {!checkFilterNull() && selectedFilters.request === true ? (
                filteredUsers.length === 0 ? (
                  <div className="w-full flex justify-center">
                    <p className="mt-8 font-semibold text-gray-500">
                      No users found..
                    </p>
                  </div>
                ) : (
                  <div className="w-full  flex flex-col items-center">
                    {filteredUsers.map((item, idx) => (
                      <UserCard user={item} key={idx} />
                    ))}
                  </div>
                )
              ) : !users || users.length === 0 ? (
                <div className="w-full flex justify-center">
                  <p className="mt-8 font-semibold text-gray-500">
                    No users found..
                  </p>
                </div>
              ) : (
                <div className="w-full   flex flex-col items-center">
                  {users.map((item, idx) => (
                    <UserCard user={item} key={idx} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
