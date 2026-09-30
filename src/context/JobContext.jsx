import { createContext, useState, useEffect} from "react";
import { hackerNewsApi } from "../services/hackerNewsApi";
const JobContext = createContext(null);

function JobProvider({ children }) {
  const [jobData, setJobData] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [filteredJobs, setFilteredJobs] = useState([]);

  //manual refresh/retry
  async function fetchJobs() {
    setIsLoading(true);
    setError("");
    try {
      const data = await hackerNewsApi();
      setJobData(data);
      setFilteredJobs(data);
    } catch (e) {
      setError(e.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  //initial fetch
  useEffect(() => {
    async function fetchJobs() {
      setIsLoading(true);
      setError("");
      try {
        const data = await hackerNewsApi();
        setJobData(data);
        setFilteredJobs(data);
      } catch (e) {
        setError(e.message || "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    }
    fetchJobs();
  }, []);

  const value = {
    jobData,
    error,
    isLoading,
    filteredJobs,
    setFilteredJobs,
    fetchJobs,
  };

  return <JobContext.Provider value={value}>{children}</JobContext.Provider>;
}

export {JobContext, JobProvider}
