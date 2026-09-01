import { JobList } from "../../components/JobList/JobList";
import { hackerNewsApi } from "../../services/hackerNewsApi";
import { Preloader } from "../../components/Preloader/Preloader";
import { useEffect, useState } from "react";
import { EndCard } from "../../components/endCard/EndCard";
import { ErrorCard } from "../../components/error/errorCard";
import Styles from "./jobBoard.module.css";
import { JobToolbar } from "../../components/jobToolbar/JobToolbar";
export function JobBoard() {
  const [jobData, setJobData] = useState([]);
  const [visibleJobCount, setVisibleJobCount] = useState(5);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [sortOrder, setSortOrder] = useState("newToOld"); //newToOld is default
  const toShowJobs = filteredJobs.slice(0, visibleJobCount);
  const isEndState = toShowJobs.length === filteredJobs.length;
  function handleLoadMore() {
    setVisibleJobCount((pre) => Math.min(pre + 5, jobData.length));
  }
  useEffect(() => {
    async function getJobs() {
      try {
        const data = await hackerNewsApi();
        console.log(data);
        setJobData(data);
        setFilteredJobs(data);
      } catch (e) {
        setError(e.message);
      }
    }
    getJobs();
  }, []);

  async function reFetchJobs() {
    setIsLoading(true);
    setError(""); //make it empty show that old error message state updated which trigger screen refresh
    try {
      const data = await hackerNewsApi();
      setJobData(data);
    } catch (e) {
      setError(e.message || "Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  }
  if (error) {
    //if error comes, override the preloading;
    return <ErrorCard err={error} reFetch={reFetchJobs} />;
  }

  function handleJobSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = jobData.filter((job) => {
      const title = job.title.toLowerCase();
      return title.includes(searchTerm);
    });
    setFilteredJobs(filtered);
  }

  function handleSort(e) {
    const selectedOrder = e.target.value;
    if (selectedOrder === "oldToNew" && sortOrder === "newToOld") {
      setFilteredJobs(filteredJobs.reverse());
      setSortOrder(selectedOrder);
    } else if(selectedOrder === "newToOld" && sortOrder === "oldToNew") {
      setFilteredJobs(filteredJobs.reverse());
      setSortOrder(selectedOrder);
    }else{
      return;
    }
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
          />
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
    </div>
  );
}
