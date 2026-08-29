import  Styles  from "./preloader.module.css";
export function Preloader() {
  return (<div className={Styles.loader}>
  <LoaderCard/>
  <LoaderCard/>
  <LoaderCard/>
  <LoaderCard/>
  <LoaderCard/>
  </div>);
}
function LoaderCard() {
  return (
    <div className={Styles.loaderCard}>
      <div className={Styles.main}>
        <div className={Styles.biggerLine}></div>
        <div className={Styles.shortLine}></div>
      </div>
      <div className={Styles.actionLine}></div>
    </div>
  );
}
