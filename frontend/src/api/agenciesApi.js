import axios from "axios";

export const API = axios.create({
  baseURL: "http://localhost:3000",
});

// GET REQ: GET ALL THE CLIENTS DATA
export const getAgencies = async () => {
  const response = await API.get("/api/agencies");
  return response.data?.data;
};

// POST REQ: CREATING CLIENT
export const createAgency = async (data) => {
  const response = await API.post("/api/agencies", data);
  return response;
};

// PUT REQ: UPDATING THE CLIENT
export const updateAgency = async ({ id, data }) => {
  const response = await API.put(`/api/agencies/${id}`, data);
  return response;
};

// DELETE REQ: DELETING THE CLIENT
export const deleteAgency = async (id) => {
  const response = await API.delete(`/api/agencies/${id}`);
  return response;
};
