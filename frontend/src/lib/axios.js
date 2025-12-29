import axios from "axios";

//REVIEW   for deployement ! 

export const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/api",
  withCredentials: true, //Sends cookies with every request  and allow backend to read token in cookie (req.cookie) , session cookie !!
});
