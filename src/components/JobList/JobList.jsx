import Styles from "./jobList.module.css";
import { JobCard } from "../JobCard/JobCard.jsx";
export function JobList({jobData}) {
  return (
    <div className={Styles.jobList}>
      {
        jobData.map((job)=>(
                <JobCard 
                key={job.id}
                job={job}
                />))
      }
    </div>
  );
}
