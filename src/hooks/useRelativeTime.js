import { useState, useEffect } from "react";
export function useRelativeTime(timeStampSec) {
  const [relativeTime, setRelativeTime] = useState();

  useEffect(() => {
    function updateRelativeTime() {
      const now = Date.now(); //or const date = new Date(); date.getTime() //in ms
      const timeMs = timeStampSec * 1000; //time given on particular job from hacker news api
      const diffMs = now - timeMs;
      const diffSec = Math.floor(diffMs / 1000);

      let timeString = "";
      if (diffSec < 60) {
        timeString = "Just Now";
      } else if (diffSec < 3600) {
        timeString = `${Math.floor(diffSec / 60)} minute ago`;
      } else if (diffSec < 86400) {
        const hrs = Math.floor(diffSec / 3600);
        timeString = `${hrs} hour${hrs > 1 ? "s" : ""} ago`;
      } else if (diffSec < 86400 * 30) {
        const days = Math.floor(diffSec / 86400);
        timeString = `${days} day${days > 1 ? "s" : ""} ago`;
      } else if (diffSec < 86400 * 365) {
        const months = Math.floor(diffSec / (86400 * 30));
        timeString = `${months} month${months > 1 ? "s" : ""} ago`;
      } else if (diffSec > 86400 * 365) {
        const years = Math.floor(diffSec / (86400 * 365));
        timeString = `${years} year${years > 1 ? "s" : ""} ago`;
      } else {
        timeString = "Something went wrong";
      }

      setRelativeTime(timeString);
    }
    updateRelativeTime();
    const intervalId = setInterval(updateRelativeTime, 60 * 1000); //update time in every 1 minute
    return () => clearInterval(intervalId);
  }, [timeStampSec]);

  return relativeTime;
}
