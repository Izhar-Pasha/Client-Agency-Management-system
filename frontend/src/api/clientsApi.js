import { API } from "./agenciesApi.js";

// GET REQ: GET ALL THE CLIENTS DATA
export const getClient = async () => {
  const res = await API.get("/api/clients");
  return res.data?.data;
};

// POST REQ: CREATING CLIENT
export const createClient = async (data) => {
  const res = await API.post("/api/clients", data);
  return res;
};

// PUT REQ: UPDATING THE CLIENT
export const updateClient = async ({ id, data }) => {
  const res = await API.put(`/api/clients/${id}`, data);
  return res;
};

// DELETE REQ: DELETING THE CLIENT
export const deleteClient = async (id) => {
  // try {
  const res = await API.delete(`/api/clients/${id}`);
  return res;
  // } catch (error) {
  //   console.log(error);
  // }
};
