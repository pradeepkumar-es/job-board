import Styles from "./footer.module.css";
export function Footer(){
    return (
        <div className={Styles.footer}>
            <p>&copy; 2026 Job Board. Powered by Hacker News API.</p>
            <div className={Styles.action}>
                <p>API</p>
                <p>Guidelines</p>
                <p>FAQs</p>
                <p>Support</p>
            </div>
        </div>
    )
}