import Button from "../../components/Button";
import Slider from "@mui/material/Slider";
import { ArrowDown, ArrowUp, Filter, Search, XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import AgentJobPostCard from "../../components/AgentComponents/AgentJobPostCard";
import { useAuth } from "../../context/authContext";
import apiService from "../../service/api";
export default function AgentHome() {
  const { user, isAuthenticated } = useAuth();
  const [filter, setFilter] = useState(false);
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const jobTypes = [
    "Full-time",
    "Part-time",
    "Contract",
    "Temporary",
    "Internship",
  ];
  const experienceLevels = [
    "Entry Level",
    "Mid Level",
    "Senior Level",
    "Executive",
  ];

  const salaryRanges = [
    "Any",
    "$0 - $50,000",
    "$50,000 - $100,000",
    "$100,000 - $150,000",
    "$150,000+",
  ];

  const datePostedOptions = [
    "Any Time",
    "Past 24 hours",
    "Past Week",
    "Past Month",
  ];

  const sortResults = ["Relevance", "Date Posted (newest)", "Salary (highest)"];
  const [filters, setFlters] = useState({
    jobType: false,
    experienceLevel: false,
    salaryRange: false,
    datePosted: false,
    sortResult: false,
  });

  const [selectedFilters, setSelectedFilters] = useState({
    jobTypes: [],
    experienceLevel: [],
    salaryRange: [],
    datePosted: [],
    sortResult: [],
  });

  function applyFilters() {
    setFilter(!filter);
  }

  function clearFilters() {
    setFilter(!filter);
    setSelectedFilters({
      jobTypes: [],
      experienceLevel: [],
      salaryRange: [],
      datePosted: [],
      sortResult: [],
    });
  }

  useEffect(() => {
    const fetchJobPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await apiService.getAllJobPosts();
        setJob(data || []);
      } catch (err) {
        setError("Failed to load job posts");
      } finally {
        setLoading(false);
      }
    };
  }, [user]);
  return (
    <div>
      <div className=" space-y-4 bg-brand-dark flex flex-col mt-15 items-center text-white">
        <h1 className="text-4xl mt-18 mb-9 font-bold">Find your Dream Job</h1>
        <p className="text-center text-2xl mb-10">
          Discover thousands of job opportunities from top companies
        </p>
        <div className="bg-white text-black relative mb-20 w-3/4 max-w-2xl p-5 rounded-xl shadow-sm flex justify-between items-center space-x-3">
          <div className="flex-1 flex flex-col md:flex-row items-center md:justify-between">
            <div className="flex md:w-4/5 w-full md:mb-0 mb-4 md:mr-2">
              <div className="flex border   hover:border-gray-400 rounded-lg shadow-sm border-gray-300 items-center w-full">
                <Search className="text-gray-500 w-5 mx-2 "></Search>

                <input
                  className="w-full flex-1 focus:outline-none text-gray-700 p-2"
                  placeholder="Job title, keywords, or company"
                />
              </div>
            </div>
            <div className="w-full md:w-30">
              <Button text={"Search Jobs"}></Button>
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
                    <div className="flex flex-col w-full">
                      <div className="flex flex-col w-full mb-3 items-center">
                        <div
                          onClick={() => {
                            setFlters({
                              ...filters,
                              jobType: !filters.jobType,
                            });
                          }}
                          className="flex justify-between w-full rounded-xl p-2 border-2 border-gray-400"
                        >
                          <li>Job Type</li>
                          {filters.jobType && (
                            <ArrowUp className="text-gray-500" />
                          )}
                          {!filters.jobType && (
                            <ArrowDown className="text-gray-500" />
                          )}
                        </div>
                        {filters.jobType && (
                          <ul className="w-11/12 p-3 rounded-b-xl my-2">
                            {jobTypes.map((type) => (
                              <li
                                key={type}
                                className="flex items-center space-x-2"
                              >
                                <input
                                  type="checkbox"
                                  checked={selectedFilters.jobTypes.includes(
                                    type
                                  )}
                                  onChange={() => {
                                    setSelectedFilters((prev) => ({
                                      ...prev,
                                      jobTypes: prev.jobTypes.includes(type)
                                        ? prev.jobTypes.filter(
                                            (t) => t !== type
                                          )
                                        : [...prev.jobTypes, type],
                                    }));
                                  }}
                                />
                                <span>{type}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                      <div className="flex flex-col mb-3 w-full">
                        <div
                          onClick={() => {
                            setFlters({
                              ...filters,
                              experienceLevel: !filters.experienceLevel,
                            });
                          }}
                          className="flex w-full justify-between rounded-xl p-2 border-2 border-gray-400"
                        >
                          <li>Experience Level</li>
                          {filters.experienceLevel && (
                            <ArrowUp className="text-gray-500" />
                          )}
                          {!filters.experienceLevel && (
                            <ArrowDown className="text-gray-500" />
                          )}
                        </div>
                        {filters.experienceLevel && (
                          <ul className="w-11/12 p-3 rounded-b-xl my-2">
                            {experienceLevels.map((type) => (
                              <li
                                key={type}
                                className="flex items-center space-x-2"
                              >
                                <input
                                  type="checkbox"
                                  checked={selectedFilters.experienceLevel.includes(
                                    type
                                  )}
                                  onChange={() => {
                                    setSelectedFilters((prev) => ({
                                      ...prev,
                                      experienceLevel:
                                        prev.experienceLevel.includes(type)
                                          ? prev.experienceLevel.filter(
                                              (t) => t !== type
                                            )
                                          : [...prev.experienceLevel, type],
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
                    <div className="flex flex-col w-full">
                      <div className="flex mb-3 flex-col w-full">
                        <div
                          onClick={() => {
                            setFlters({
                              ...filters,
                              datePosted: !filters.datePosted,
                            });
                          }}
                          className="flex w-full justify-between rounded-xl p-2  border-2 border-gray-400"
                        >
                          <li>Date Posted</li>
                          {filters.datePosted && (
                            <ArrowUp className="text-gray-500" />
                          )}
                          {!filters.datePosted && (
                            <ArrowDown className="text-gray-500" />
                          )}
                        </div>
                        {filters.datePosted && (
                          <ul className="w-11/12 p-3 rounded-b-xl my-2">
                            {datePostedOptions.map((type) => (
                              <li
                                key={type}
                                className="flex items-center space-x-2"
                              >
                                <input
                                  type="checkbox"
                                  checked={selectedFilters.datePosted.includes(
                                    type
                                  )}
                                  onChange={() => {
                                    setSelectedFilters((prev) => ({
                                      ...prev,
                                      datePosted: prev.datePosted.includes(type)
                                        ? prev.datePosted.filter(
                                            (t) => t !== type
                                          )
                                        : [...prev.datePosted, type],
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
                                  type="checkbox"
                                  checked={selectedFilters.sortResult.includes(
                                    type
                                  )}
                                  onChange={() => {
                                    setSelectedFilters((prev) => ({
                                      ...prev,
                                      sortResult: prev.sortResult.includes(type)
                                        ? prev.sortResult.filter(
                                            (t) => t !== type
                                          )
                                        : [...prev.sortResult, type],
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
                          selectedFilters.salaryRange.length
                            ? selectedFilters.salaryRange
                            : [0, 0]
                        }
                        onChange={(_, value) =>
                          setSelectedFilters((prev) => ({
                            ...prev,
                            salaryRange: value,
                          }))
                        }
                        valueLabelDisplay="auto"
                        min={0}
                        max={200000}
                        step={1000}
                      />
                      <div>
                        Selected: ${selectedFilters.salaryRange[0] || 0} - $
                        {selectedFilters.salaryRange[1] || 100000}
                      </div>
                    </div>
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
          <h2 className="m-5 text-2xl font-bold">Jobs Found</h2>
          {job &&
            job.map((job, idx) => {
              <AgentJobPostCard key={idx} job={job} />;
            })}
          {!job && (
            <div>
              <div className="h-30 text-brand-dark">
                <p>No Job posts found at the moment...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
