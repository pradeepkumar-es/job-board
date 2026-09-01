import Styles from "./jobToolbar.module.css"
import searchIcon from "../../assets/searchIcon.png";
export function JobToolbar({handleJobSearch, handleSort, sortOrder, searchInput}){
    return (
        <div className={Styles.jobToolbar}>
            <div className={Styles.jobSearch}>
              <span> <img src={searchIcon} alt="search icon" /></span> <input value={searchInput} placeholder="Search jobs, companies,..." type="text" onChange = {(e)=>handleJobSearch(e)} />
            </div>
            <div className={Styles.jobSort}>
                <select value={sortOrder} onChange={(e)=>handleSort(e)}>
                    <option value = "newToOld">Newest First</option>
                    <option value = "oldToNew">Oldest First</option>
                </select>
            </div>
        </div>
    )
}