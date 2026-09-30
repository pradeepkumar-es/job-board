import { useContext } from "react";
import { JobContext } from "../context/JobContext";
export function useJobContext(){
    const context = useContext(JobContext)
    if(!context){
        throw new Error("useJobContext must be used inside JobProvider")
    }else{
        return context;
    }
}