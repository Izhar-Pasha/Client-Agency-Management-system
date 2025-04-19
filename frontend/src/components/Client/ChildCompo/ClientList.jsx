import React from "react";
import ClientCard from "./ClientCard.jsx";

const ClientList = ({ clients, onEdit, onDelete }) => {
  return (
    <div className="content">
      {clients?.map((client) => (
        <ClientCard
          key={client._id}
          client={client}
          onEdit={() => onEdit(client)}
          onDelete={() => onDelete(client._id)}
        />
      ))}
    </div>
  );
};

export default React.memo(ClientList);
