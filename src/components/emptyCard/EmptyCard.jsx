import Styles from "./emptyCard.module.css";
import notFoundIcon from "../../assets/notFoundIcon.png";
export function EmptyCard({clearFilter}) {
  return (
    <div className={Styles.emptyCard}>
      <div className={Styles.icon}>
        <img src={notFoundIcon} alt="No Result found icon" />
      </div>
      <h3>No Results Found</h3>
      <p>No jobs found for your search criteria. Try adjusting your filters.</p>
      <button onClick={()=>clearFilter()}>Clear Filters</button>
    </div>
  );
}
