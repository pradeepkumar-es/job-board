import Styles from "./header.module.css";
import resetIcon from "../../assets/resetIcon.png"
import { useJobContext } from "../../hooks/useJobContext";
export function Header(){
    const {fetchJobs} = useJobContext();
    return (
        <div className={Styles.header}>
            <div className={Styles.brandWrapper}>
                <h1>Job Board</h1>
                <p>Latest jobs from Hacker News</p>
            </div>
            <button className={Styles.refresh} title="Refresh Jobs">
                <img onClick={()=>fetchJobs()} src={resetIcon} alt="Refresh Icon" />
            </button>
        </div>
    )
}