import React from "react";

const AgencyCard = ({ agency, onEdit, onDelete }) => {
  return (
    <div className="cards">
      <div className="card-info">
        <h1>{agency.Name}</h1>
        <h6>{agency.Phone}</h6>
        <h4>{agency.Address}</h4>
      </div>
      <div className="buttons">
        <button onClick={onEdit}>Edit</button>
        <button onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
};

export default AgencyCard;
