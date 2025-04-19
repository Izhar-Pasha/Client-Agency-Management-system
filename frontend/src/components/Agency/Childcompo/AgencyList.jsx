import React from "react";
import AgencyCard from "./AgencyCard.jsx";

const AgencyList = ({ agencies, onEdit, onDelete }) => {
  return (
    <div className="content">
      {agencies?.map((agency) => (
        <AgencyCard
          key={agency._id}
          agency={agency}
          onEdit={() => onEdit(agency)}
          onDelete={() => onDelete(agency._id)}
        />
      ))}
    </div>
  );
};

export default AgencyList;
