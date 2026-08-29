import Styles from "./JobCard.module.css"
import { extractCompanyName } from "../../utils/extractCompanyName"
import { useRelativeTime } from "../../hooks/useRelativeTime";
export function JobCard({job}){
    const timeAgo = useRelativeTime(job.time);
    // console.log(Styles);
    const comapanyName =  extractCompanyName(job.title);
    return (
        <div className={Styles.card}>
            <div className={Styles.main}>
                <h3 className={Styles.title}>{job.title}</h3>
                <div className={Styles.companyDetails}>
                    <span>{comapanyName}</span>
                    <span>Posted by @{job.by}</span>
                    <span>{timeAgo}</span>
                </div>
            </div>
            <div className={Styles.action}>
                    <a href={job.url} target="_blank">Apply</a>
            </div>
        </div>
    )
}