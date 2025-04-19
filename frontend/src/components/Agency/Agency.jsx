import React, { useCallback, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAgencies,
  createAgency,
  updateAgency,
  deleteAgency,
} from "../../api/agenciesApi.js";
import AgencyList from "./Childcompo/AgencyList.jsx";
import toast from "react-hot-toast";
import CreateAgency from "./Childcompo/CreateAgency.jsx";
import "../Styles/style.scss";

const Agency = () => {
  const [view, setView] = useState("list");
  const [selectedAgency, setSelectedAgency] = useState(null);

  // Query for all agencies.
  const { data, isLoading } = useQuery({
    queryKey: ["Agencies"],
    queryFn: getAgencies,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 8,
    onSuccess: () => {
      toast.success("Agencies fetched successfully!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // UseMutation: For POST request.
  const queryClient = useQueryClient();

  const createAgencies = useMutation({
    mutationFn: createAgency,
    onSuccess: () => {
      toast.success("Agency created successfully");
      queryClient.invalidateQueries({ queryKey: ["Agencies"] });
      setView("list");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  // For PUT request.
  const updateAgencies = useMutation({
    mutationFn: updateAgency,
    onSuccess: () => {
      toast.success("Agency updated successfully");
      queryClient.invalidateQueries({ queryKey: ["Agencies"] });
      setView("list");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  // For DELETE request.
  const deleteAgencies = useMutation({
    mutationFn: deleteAgency,
    onSuccess: () => {
      toast.success("Agency deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["Agencies"] });
      setView("list");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  //   handles data edit
  const handleEdit = useCallback(
    (client) => {
      setSelectedAgency(client);
      setView("edit");
    },
    [setSelectedAgency]
  );

  //   handles creating client
  const handleSubmit = useCallback(
    (data) => {
      createAgencies.mutate(data);
    },
    [createAgencies]
  );

  //   handles deleting client
  const handleDelete = useCallback(
    (id) => {
      deleteAgencies.mutate(id);
    },
    [deleteAgencies]
  );

  //   handles client data updation
  const handleUpdate = useCallback(
    (data) => {
      if (selectedAgency?._id) {
        updateAgencies.mutate({ id: selectedAgency._id, data });
      }
    },
    [selectedAgency, updateAgencies]
  );

  // useCallback - Cancel button
  const handleCancel = useCallback(() => {
    setView("list");
  }, []);

  if (isLoading) return <p>Loading....!</p>;

  return (
    <>
      {view === "list" && (
        <div className="list">
          <div className="btns">
            <button onClick={() => setView("create")} className="btn">
              Create New Agency
            </button>
          </div>
          <AgencyList
            agencies={data}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      )}

      {view === "create" && (
        <CreateAgency onSubmit={handleSubmit} onCancel={handleCancel} />
      )}

      {view === "edit" && (
        <CreateAgency
          initialData={selectedAgency}
          onSubmit={handleUpdate}
          onCancel={handleCancel}
        />
      )}
    </>
  );
};

export default Agency;
