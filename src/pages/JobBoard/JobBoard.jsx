import { JobList } from "../../components/JobList/JobList";
// import { hackerNewsApi } from "../../services/hackerNewsApi";
import { Preloader } from "../../components/Preloader/Preloader";
import { useState } from "react";
import { EndCard } from "../../components/endCard/EndCard";
import { ErrorCard } from "../../components/error/ErrorCard";
import Styles from "./jobBoard.module.css";
import { JobToolbar } from "../../components/jobToolbar/JobToolbar";
import { EmptyCard } from "../../components/emptyCard/EmptyCard";
export function JobBoard({
  jobData,
  error,
  isLoading,
  filteredJobs,
  setFilteredJobs,
  fetchJobs,
}) {
  const [visibleJobCount, setVisibleJobCount] = useState(5);
  const [searchInput, setSearchInput] = useState("");
  const [sortOrder, setSortOrder] = useState("newToOld"); //newToOld is default
  const toShowJobs = filteredJobs.slice(0, visibleJobCount);
  const isEndState = toShowJobs.length === filteredJobs.length;
  function handleLoadMore() {
    setVisibleJobCount((pre) => Math.min(pre + 5, jobData.length));
  }

  function handleJobSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = jobData.filter((job) => {
      const title = job.title.toLowerCase();
      return title.includes(searchTerm);
    });
    setFilteredJobs(filtered);
    setSearchInput(searchTerm);
  }

  function handleSort(e) {
    const selectedOrder = e.target.value;
    if (selectedOrder === "oldToNew" && sortOrder === "newToOld") {
      setFilteredJobs(filteredJobs.reverse());
      setSortOrder(selectedOrder);
    } else if (selectedOrder === "newToOld" && sortOrder === "oldToNew") {
      setFilteredJobs(filteredJobs.reverse());
      setSortOrder(selectedOrder);
    } else {
      return;
    }
  }
  function clearFilter() {
    setSearchInput(""); //make empty search bar
    setFilteredJobs(jobData) //reset data as it is
  }
  if (error) {
    //if error comes, override the preloading;
    return <ErrorCard err={error} reFetch={fetchJobs} />;
  }
  return (
    <div className={Styles.jobBoard}>
      {jobData.length < 1 || isLoading ? (
        <Preloader />
      ) : (
        <>
          <JobToolbar
            handleJobSearch={handleJobSearch}
            handleSort={handleSort}
            sortOrder={sortOrder}
            searchInput = {searchInput}
          />
          {filteredJobs.length < 1 && !isLoading ? (
            <EmptyCard clearFilter={clearFilter} />
          ) : (
            <>
              <JobList jobData={toShowJobs} />
              <div className={Styles.jobPagination}>
                <p>
                  Showing {toShowJobs.length} of {filteredJobs.length} jobs
                </p>
                <button onClick={handleLoadMore} disabled={isEndState}>
                  Load More
                </button>
              </div>
              {isEndState && <EndCard />}
            </>
          )}
        </>
      )}
    </div>
  );
}
