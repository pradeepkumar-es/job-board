import Styles from "./endCard.module.css";
import Icon from "../../assets/Icon.png";
export function EndCard(){
    return (
        <div className={Styles.endCard}>
            <div className={Styles.line}></div>
            <div className={Styles.icon}>
                <img src={Icon} alt="all content loaded icon" />
            </div>
            <p>You've reached end of the list. No more jobs</p>
        </div>
    )
}