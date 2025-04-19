import React from "react";

const ClientCard = ({ client, onEdit, onDelete }) => {
  return (
    <div className="cards">
      <div className="card-info">
        <h1>{client.Name}</h1>
        <h6>{client.Email}</h6>
        <h4>{client.AgencyId.Name}</h4>
      </div>
      <div className="buttons">
        <button onClick={onEdit}>Edit</button>
        <button onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
};

export default React.memo(ClientCard);
