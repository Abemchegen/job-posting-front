import { Search } from "lucide-react";
import Button from "../../components/Button";
import JobCard from "../../components/AdminComponents/JobCard";
import { useJobs } from "../../hook/useJobs";
import { Spinner } from "../../components/Spinner";
import { useState } from "react";

export default function JobPage() {
  const { jobs, loading, fetchJobsWithFilters } = useJobs();
  const [selectedFilters, setSelectedFilters] = useState({
    request: false,
    search: "",
  });
  const [filteredJobs, setFilteredJobs] = useState([]);
  function checkFilterNull() {
    const searchValueNull =
      !selectedFilters.search === "" || selectedFilters.search.trim() === "";
    return searchValueNull;
  }
  const applyFilters = async () => {
    if (checkFilterNull()) {
      setFilter(false);
      return;
    }
    try {
      const filterData = {
        search: selectedFilters.search.trim(),
      };
      const response = await fetchJobsWithFilters(filterData);
      setFilteredJobs(response);

      setSelectedFilters({
        ...selectedFilters,
        request: true,
      });
    } catch (e) {
    } finally {
      setFilter(false);
    }
  };

  function clearFilters() {
    setFilteredJobs([]);
    setSelectedFilters({
      request: false,
      search: "",
    });
    setFilter(false);
  }
  return (
    <div>
      <div className="space-y-4 flex flex-col mt-15 items-center">
        <p className="text-center mt-10 text-xl text-gray-500 mb-7">
          Search Jobs using keywords
        </p>
        <div className="bg-white text-black relative mb-20 w-3/4 max-w-2xl p-5 rounded-xl shadow-sm flex justify-between items-center space-x-3">
          <div className="flex-1 flex flex-col md:flex-row items-center md:justify-between">
            <div className="flex md:w-4/5 w-full md:mb-0 mb-4 md:mr-2">
              <div className="flex border hover:border-gray-400 rounded-lg shadow-sm border-gray-300 items-center w-full">
                <Search className="text-gray-500 w-5 mx-2 "></Search>
                <input
                  className="w-full flex-1 focus:outline-none text-gray-700 p-2"
                  placeholder="Job names or Discription keywords"
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
                text={"Search Jobs"}
                onClick={() => {
                  applyFilters();
                }}
              ></Button>
            </div>
          </div>
        </div>
        <div className="max-w-4xl w-full">
          <p className="text-2xl m-3">Jobs Found</p>
          {loading ? (
            <div className="flex justify-center items-center m-5 space-x-5">
              <Spinner />
              <p className="text-xl font-semibold text-gray-500">Loading...</p>
            </div>
          ) : (
            <div className="w-full">
              {!checkFilterNull() && selectedFilters.request === true ? (
                filteredJobs.length === 0 ? (
                  <div className="w-full flex justify-center">
                    <p className="mt-8 font-semibold text-gray-500">
                      No jobs found..
                    </p>
                  </div>
                ) : (
                  <div className="w-full  flex flex-col items-center">
                    {filteredJobs.map((item, idx) => (
                      <JobCard jobItem={item} key={idx} />
                    ))}
                  </div>
                )
              ) : !jobs || jobs.length === 0 ? (
                <div className="w-full flex justify-center">
                  <p className="mt-8 font-semibold text-gray-500">
                    No jobs found..
                  </p>
                </div>
              ) : (
                <div className="w-full   flex flex-col items-center">
                  {jobs.map((item, idx) => (
                    <JobCard jobItem={item} key={idx} />
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
