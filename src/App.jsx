import { useState, useEffect } from "react";
import { hackerNewsApi } from "./services/hackerNewsApi";
import { JobBoard } from "./pages/JobBoard/JobBoard";
import { Header } from "./layout/header/Header";
import { Footer } from "./layout/footer/Footer";
function App() {
  const [jobData, setJobData] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [filteredJobs, setFilteredJobs] = useState([]);

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

  async function fetchJobs() {
    setIsLoading(true);
    setError(""); //make it empty show that old error message state updated which trigger screen refresh
    try {
      const data = await hackerNewsApi();
      setJobData(data);
      setFilteredJobs(data);
    } catch (e) {
      setError(e.message || "Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <>
      <Header reload={fetchJobs} />
      <JobBoard
        jobData={jobData}
        error={error}
        isLoading={isLoading}
        filteredJobs={filteredJobs}
        setFilteredJobs={setFilteredJobs}
        fetchJobs={fetchJobs}
      />
      <Footer />
    </>
  );
}

export default App;
