import { Slider } from "@mui/material";
import Button from "../../components/Button";
import CompanyJobPostCard from "../../components/CompanyComponents/CompanyJobPostCard";
import { ArrowDown, ArrowUp, Filter, Search, XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useJobPosts } from "../../hook/useJobPost";
import { Spinner } from "../../components/Spinner";

export default function CompanyHome() {
  const [filter, setFilter] = useState(false);
  const { jobPosts, loading, fetchJobPost, fetchJobsWithFilters } =
    useJobPosts();
  const [error, setError] = useState(null);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    if (jobPosts) {
      setPosts(jobPosts);
    }
  }, [jobPosts]);
  const datePostedOptions = [
    "Any Time",
    "Past 24 hours",
    "Past Week",
    "Past Month",
  ];

  const sortResults = ["Latest Posts", "Highest Salary"];
  const [filters, setFlters] = useState({
    salaryRange: false,
    datePosted: false,
    sortResult: false,
  });

  const [selectedFilters, setSelectedFilters] = useState({
    salaryRange: {
      initial: null,
      final: null,
    },
    datePosted: "",
    sortResult: "",
  });

  const applyFilters = async () => {
    const isSalaryNull =
      selectedFilters.salaryRange.initial == null &&
      selectedFilters.salaryRange.final == null;
    const isDateNull =
      !selectedFilters.datePosted || selectedFilters.datePosted.trim() === "";
    const isSortNull =
      !selectedFilters.sortResult || selectedFilters.sortResult.trim() === "";
    const searchValueNull =
      !selectedFilters.search || selectedFilters.search.trim() === "";

    if (isSalaryNull && isDateNull && isSortNull && searchValueNull) {
      console.log("no filters selected !!!");
      setFilter(false);
      return;
    }
    try {
      const filterData = {
        salary: selectedFilters.salaryRange,
        date: selectedFilters.datePosted.trim(),
        sort: selectedFilters.sortResult.trim(),
        search: selectedFilters.search.trim(),
      };
      console.log(filterData);

      const response = await fetchJobsWithFilters(filterData);
      setPosts(response);
      console.log(response);
    } catch (e) {
      console.log(e);
    } finally {
      setFilter(false);
    }
  };

  const clearFilters = async () => {
    try {
      const response = await fetchJobPost();
      setPosts(response);
      setSelectedFilters({
        salaryRange: {
          initial: null,
          final: null,
        },
        datePosted: "",
        sortResult: "",
      });
      console.log(response);
    } catch (e) {
      console.log(e);
    } finally {
      setFilter(false);
    }
  };
  return (
    <div>
      <div className=" space-y-4 bg-brand-dark flex flex-col mt-15 mb-15  items-center text-white">
        <h1 className="text-4xl text-center mt-18 mb-9 font-bold">
          Job Posts made by your company
        </h1>
        <p className="text-center text-xl mb-10">
          Search your company's job posts using key words
        </p>
        <div className="bg-white text-black relative mb-20 w-3/4 max-w-2xl p-5 rounded-xl shadow-sm flex justify-between items-center space-x-3">
          <div className="flex-1 flex flex-col md:flex-row items-center md:justify-between">
            <div className="flex md:w-4/5 w-full md:mb-0 mb-4 md:mr-2">
              <div className="flex border   hover:border-gray-400 rounded-lg shadow-sm border-gray-300 items-center w-full">
                <Search className="text-gray-500 w-5 mx-2 "></Search>
                <input
                  className="w-full flex-1 focus:outline-none text-gray-700 p-2"
                  placeholder="Job post name, or job speciallity ..."
                  onChange={(e) =>
                    setSelectedFilters({
                      ...selectedFilters,
                      search: e.target.value,
                    })
                  }
                  value={selectedFilters.search}
                />
              </div>
            </div>
            <div className="w-full md:w-30">
              <Button
                text={"Search Posts"}
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
                  <div className="flex space-x-4">
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
                                type="radio"
                                checked={selectedFilters.datePosted === type}
                                onChange={() => {
                                  setSelectedFilters((prev) => ({
                                    ...prev,
                                    datePosted: type,
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
      </div>
      <div className="flex mb-10 justify-center">
        <div className="p-2 w-full max-w-5xl">
          <h2 className="m-5 text-2xl font-bold">Job Posts Found</h2>

          {posts.length == 0 && !loading && (
            <div className="w-full">
              <p className="mt-8 font-semibold text-gray-500">
                No posts found...
              </p>
            </div>
          )}
          {posts.length == 0 && loading && (
            <div className="flex justify-center items-center m-5 space-x-5">
              <Spinner />
              <p className="text-xl font-semibold text-gray-500">Loading...</p>
            </div>
          )}
          {posts.length > 0 && (
            <div className="w-full">
              {posts.map((item, idx) => {
                return <CompanyJobPostCard jobPost={item} key={idx} />;
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
