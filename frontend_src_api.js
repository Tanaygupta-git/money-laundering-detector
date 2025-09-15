import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:8000/api"
});

export const uploadFile = (file) => {
  const formData = new FormData();
  formData.append('file', file);
  return API.post("/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });
};

export const sendContact = (data) => API.post("/contact", data);

export const fetchAnalyses = (auth) => API.get("/analyses", { auth });
export const fetchLogs = (auth) => API.get("/logs", { auth });