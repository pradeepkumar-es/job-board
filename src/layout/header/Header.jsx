import Styles from "./header.module.css";
import resetIcon from "../../assets/resetIcon.png"
export function Header({reload}){
    return (
        <div className={Styles.header}>
            <div className={Styles.brandWrapper}>
                <h1>Job Board</h1>
                <p>Latest jobs from Hacker News</p>
            </div>
            <div className={Styles.refresh}>
                <img onClick={()=>reload()} src={resetIcon} alt="Refresh Icon" />
            </div>
        </div>
    )
}