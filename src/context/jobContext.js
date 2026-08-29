import { createContext } from "react";
import { hackerNewsApi } from "../services/hackerNewsApi";
let data = hackerNewsApi()
export const JobContext = createContext(data);
