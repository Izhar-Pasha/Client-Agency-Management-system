import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useCallback, useState } from "react";
import {
  createClient,
  deleteClient,
  getClient,
  updateClient,
} from "../../api/clientsApi.js";
import toast from "react-hot-toast";
import ClientList from "./ChildCompo/ClientList.jsx";
import ClientForm from "./ChildCompo/ClientForm.jsx";
import { getAgencies } from "../../api/agenciesApi.js";
import "../Styles/style.scss";

const Client = () => {
  const [view, setView] = useState("list");
  const [selectedClient, setSelectedClient] = useState(null);

  //   AGENCY DATA FOR CLIENT-AGENCY RELATION...
  const { data: AgencyData } = useQuery({
    queryKey: ["Agencies"],
    queryFn: getAgencies,
  });

  //   GET REQUEST FOR ALL CLIENT DATA.
  const { data, isLoading } = useQuery({
    queryKey: ["clients"],
    queryFn: getClient,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 8,
    onSuccess: () => {
      toast.success("Client fetched successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const queryClient = useQueryClient();

  //   POST REQUEST FOR CREATING NEW CLIENTS...
  const createClients = useMutation({
    mutationFn: createClient,
    onSuccess: () => {
      toast.success("Client creadted successfully");
      queryClient.invalidateQueries({ queryKey: ["clients"] });
      setView("list");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  //   PUT REQUEST FOR UPDATING EXISTING CLIENT DATA..
  const updateClients = useMutation({
    mutationFn: updateClient,
    onSuccess: () => {
      toast.success("Client updated successfully");
      queryClient.invalidateQueries({ queryKey: ["clients"] });
      setView("list");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  //  DELETE REQUEST FOR DELETING CLIENT DATA.
  const deleteClients = useMutation({
    mutationFn: deleteClient,
    onSuccess: () => {
      toast.success("Client deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["clients"] });
      setView("list");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  //   handles data edit
  const handleEdit = useCallback(
    (client) => {
      setSelectedClient(client);
      setView("edit");
    },
    [setSelectedClient]
  );

  //   handles creating client
  const handleSubmit = useCallback(
    (data) => {
      createClients.mutate(data);
    },
    [createClients]
  );

  //   handles deleting client
  const handleDelete = useCallback(
    (id) => {
      deleteClients.mutate(id);
    },
    [deleteClients]
  );

  //   handles client data updation
  const handleUpdate = useCallback(
    (data) => {
      if (selectedClient?._id) {
        updateClients.mutate({ id: selectedClient._id, data });
      }
    },
    [selectedClient, updateClients]
  );

  // useCallback - Cancel button
  const handleCancel = useCallback(() => {
    setView("list");
  }, []);

  if (isLoading) return <p>Loading...!</p>;

  return (
    <>
      {view === "list" && (
        <div className="list">
          <div className="btns">
            <button onClick={() => setView("create")} className="btn">
              Create New Client
            </button>
          </div>
          <ClientList
            clients={data}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      )}

      {view === "create" && (
        <ClientForm
          AgencyData={AgencyData}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      )}

      {view === "edit" && (
        <ClientForm
          initialData={selectedClient}
          AgencyData={AgencyData}
          onSubmit={handleUpdate}
          onCancel={handleCancel}
        />
      )}
    </>
  );
};

export default Client;
