import AgentApplicationCard from "../../components/AgentComponents/AgentApplicationCard";
import Button from "../../components/Button";
import { useApplications } from "../../hook/useApplications";
import { useAuth } from "../../context/authContext";
import { useEffect, useState } from "react";
import { ArrowDown, ArrowUp, Filter, Search, XIcon } from "lucide-react";
import Slider from "@mui/material/Slider";
import { Spinner } from "../../components/Spinner";

export default function MyApplications() {
  const [filter, setFilter] = useState(false);
  const { getMyApplications, fetchApplicationsWithFilters } = useApplications();
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [loading, setLoading] = useState(null);

  const appliedAtOptions = ["Past 24 hours", "Past Week", "Past Month"];
  const sortResults = ["Latest Applications", "Highest Salary"];
  const [filters, setFlters] = useState({
    salaryRange: false,
    appliedAt: false,
    sortResult: false,
    status: false,
  });
  const statusOptions = [
    { value: "PENDING", label: "Pending" },
    { value: "REVIEWING", label: "Reviewing" },
    { value: "INTERVIEW", label: "Interview" },
    { value: "ACCEPTED", label: "Accepted" },
    { value: "REJECTED", label: "Rejected" },
  ];
  const [selectedFilters, setSelectedFilters] = useState({
    request: false,
    salaryRange: {
      initial: null,
      final: null,
    },
    appliedAt: "",
    sortResult: "",
    status: "",
    search: "",
  });
  useEffect(() => {
    async function fetchMyApplications() {
      try {
        setLoading(true);
        const response = await getMyApplications();

        setApplications(response);
      } catch (e) {
      } finally {
        setLoading(false);
      }
    }
    fetchMyApplications();
  }, [user]);

  function checkFilterNull() {
    const isSalaryNull =
      selectedFilters.salaryRange.initial == null &&
      selectedFilters.salaryRange.final == null;
    const isDateNull =
      !selectedFilters.appliedAt || selectedFilters.appliedAt.trim() === "";
    const isSortNull =
      !selectedFilters.sortResult || selectedFilters.sortResult.trim() === "";
    const isStatusNull =
      !selectedFilters.status || selectedFilters.status.trim() === "";
    const searchValueNull =
      !selectedFilters.search || selectedFilters.search.trim() === "";

    return (
      isSalaryNull &&
      isDateNull &&
      isSortNull &&
      isStatusNull &&
      searchValueNull
    );
  }
  const applyFilters = async () => {
    if (checkFilterNull()) {
      setFilter(false);
      return;
    }
    try {
      const filterData = {
        salary: selectedFilters.salaryRange,
        date: selectedFilters.appliedAt.trim(),
        sort: selectedFilters.sortResult.trim(),
        status: selectedFilters.status.trim(),
        search: selectedFilters.search.trim(),
      };

      const response = await fetchApplicationsWithFilters(filterData);

      setFilteredApplications(response);
      setSelectedFilters({
        ...selectedFilters,
        request: true,
      });
    } catch (e) {
    } finally {
      setFilter(false);
    }
  };
  const clearFilters = async () => {
    setFilteredApplications([]); // <-- clear filtered results
    setSelectedFilters({
      request: false,
      salaryRange: { initial: null, final: null },
      appliedAt: "",
      sortResult: "",
      status: "",
      search: "",
    });
    setFilter(false);
  };

  return (
  <div className="flex w-full flex-col justify-center mt-16 items-center">
      <div className="w-full flex flex-col items-center">
        <p className="text-gray-500 text-lg mb-5">
          Search applications you have made so far by using keywords.
        </p>
        <div className="bg-white text-black relative mb-20 w-3/4 max-w-2xl p-5 rounded-xl shadow-sm flex justify-between items-center space-x-3">
          <div className="flex-1 flex flex-col md:flex-row items-center md:justify-between">
            <div className="flex md:w-4/5 w-full md:mb-0 mb-4 md:mr-2">
              <div className="flex border  hover:border-gray-400 rounded-lg shadow-sm border-gray-300 items-center w-full">
                <Search className="text-gray-500 w-5 mx-2 "></Search>
                <input
                  className="w-full flex-1 focus:outline-none text-gray-700 p-2"
                  placeholder="Job title, or company name"
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
                onClick={() => {
                  applyFilters();
                }}
                text={"Search Jobs"}
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
                  <div className="flex space-x-4">
                    <div className="flex mb-3 flex-col w-full">
                      <div
                        onClick={() => {
                          setFlters({
                            ...filters,
                            appliedAt: !filters.appliedAt,
                          });
                        }}
                        className="flex w-full justify-between rounded-xl p-2  border-2 border-gray-400"
                      >
                        <li>Applied at</li>
                        {filters.appliedAt && (
                          <ArrowUp className="text-gray-500" />
                        )}
                        {!filters.appliedAt && (
                          <ArrowDown className="text-gray-500" />
                        )}
                      </div>
                      {filters.appliedAt && (
                        <ul className="w-11/12 p-3 rounded-b-xl my-2">
                          {appliedAtOptions.map((type) => (
                            <li
                              key={type}
                              className="flex items-center space-x-2"
                            >
                              <input
                                type="radio"
                                checked={selectedFilters.appliedAt === type}
                                onChange={() => {
                                  setSelectedFilters((prev) => ({
                                    ...prev,
                                    appliedAt: type,
                                  }));
                                }}
                              />
                              <span>{type}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                    <div className="flex flex-col w-full">
                      <div className="flex mb-3 flex-col w-full">
                        <div
                          onClick={() => {
                            setFlters({
                              ...filters,
                              sortResult: !filters.sortResult,
                            });
                          }}
                          className="flex w-full  justify-between rounded-xl p-2  border-2 border-gray-400"
                        >
                          <li>Sort Results</li>
                          {filters.sortResult && (
                            <ArrowUp className="text-gray-500" />
                          )}
                          {!filters.sortResult && (
                            <ArrowDown className="text-gray-500" />
                          )}
                        </div>
                        {filters.sortResult && (
                          <ul className="w-11/12 p-3 rounded-b-xl my-2">
                            {sortResults.map((type) => (
                              <li
                                key={type}
                                className="flex items-center space-x-2"
                              >
                                <input
                                  type="radio"
                                  checked={selectedFilters.sortResult === type}
                                  onChange={() => {
                                    setSelectedFilters((prev) => ({
                                      ...prev,
                                      sortResult: type,
                                    }));
                                  }}
                                />
                                <span>{type}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-4">
                    <div className="flex mb-3 flex-col w-full">
                      <div
                        onClick={() => {
                          setFlters({
                            ...filters,
                            salaryRange: !filters.salaryRange,
                          });
                        }}
                        className="flex justify-between rounded-xl p-2 border-2 border-gray-400"
                      >
                        <li>Salary Range</li>
                        {filters.salaryRange && (
                          <ArrowUp className="text-gray-500" />
                        )}
                        {!filters.salaryRange && (
                          <ArrowDown className="text-gray-500" />
                        )}
                      </div>
                      {filters.salaryRange && (
                        <div className="p-4">
                          <Slider
                            sx={{
                              color: "#00a896",
                              "& .MuiSlider-thumb": {
                                // borderColor: "#00a896",
                                backgroundColor: "#00a896",
                              },
                              "& .MuiSlider-rail": {
                                backgroundColor: "#02c39a",
                              },
                              "& .MuiSlider-track": {
                                backgroundColor: "#00a896",
                              },
                            }}
                            value={
                              selectedFilters.salaryRange
                                ? [
                                    selectedFilters.salaryRange.initial,
                                    selectedFilters.salaryRange.final,
                                  ]
                                : [0, 0]
                            }
                            onChange={(_, value) =>
                              setSelectedFilters((prev) => ({
                                ...prev,
                                salaryRange: {
                                  initial: value[0],
                                  final: value[1],
                                },
                              }))
                            }
                            valueLabelDisplay="auto"
                            min={0}
                            max={200000}
                            step={1000}
                          />
                          <div>
                            ${selectedFilters.salaryRange.initial || 0} - $
                            {selectedFilters.salaryRange.final || 100000}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex mb-3 flex-col w-full">
                      <div
                        onClick={() => {
                          setFlters({
                            ...filters,
                            status: !filters.status,
                          });
                        }}
                        className="flex w-full justify-between rounded-xl p-2  border-2 border-gray-400"
                      >
                        <li>Status</li>
                        {filters.status && (
                          <ArrowUp className="text-gray-500" />
                        )}
                        {!filters.status && (
                          <ArrowDown className="text-gray-500" />
                        )}
                      </div>
                      {filters.status && (
                        <ul className="w-11/12 p-3 rounded-b-xl my-2">
                          {statusOptions.map((item) => (
                            <li
                              key={item.value}
                              className="flex items-center space-x-2"
                            >
                              <input
                                type="radio"
                                checked={selectedFilters.status === item.value}
                                onChange={() => {
                                  setSelectedFilters((prev) => ({
                                    ...prev,
                                    status: item.value,
                                  }));
                                }}
                              />
                              <span>{item.label}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
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
        <div className="w-9/10">
          {loading ? (
            <div className="flex justify-center items-center m-5 space-x-5">
              <Spinner />
              <p className="text-xl font-semibold text-gray-500">Loading...</p>
            </div>
          ) : (
            <>
              {/* Only show filtered results if filters are active and request is done */}
              {!checkFilterNull() && selectedFilters.request === true ? (
                filteredApplications.length === 0 ? (
                  <div className="w-full flex justify-center">
                    <p className="mt-8 font-semibold text-gray-500">
                      No applications found..
                    </p>
                  </div>
                ) : (
                  <div className="w-full flex flex-col items-center">
                    {filteredApplications.map((item, idx) => (
                      <AgentApplicationCard applicationItem={item} key={idx} />
                    ))}
                  </div>
                )
              ) : applications.length === 0 ? (
                <div className="w-full flex justify-center">
                  <p className="mt-8 font-semibold text-gray-500">
                    No applications found..
                  </p>
                </div>
              ) : (
                <div className="w-full flex flex-col items-center">
                  {applications.map((item, idx) => (
                    <AgentApplicationCard applicationItem={item} key={idx} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
