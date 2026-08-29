import Styles from "./errorCard.module.css";
import errorIcon from "../../assets/errorIcon.png";
import loadingIcon from "../../assets/loadingIcon.png";
export function ErrorCard({ err, reFetch }) {
  return (
    <div className={Styles.errorCard}>
      <div className={Styles.icon}>
        <img src={errorIcon} alt="Error Icon" />
      </div>
      <h3>{err}</h3>
      <p>Failed to fetch jobs. Please check your connection and try again.</p>
      <button onClick={()=>reFetch()}><img src={loadingIcon} alt="load icon" /> <span>Try Again</span></button>
    </div>
  );
}
