import React, { useEffect, useState } from "react";
import "../../Styles/style.scss";

const CreateAgency = ({ initialData = {}, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    Name: "",
    Address: "",
    Phone: "",
  });

  //   RENDER IF THE FORM IS FOR UPDATE.
  useEffect(() => {
    if (initialData && initialData._id) {
      setFormData({
        Name: initialData.Name || "",
        Address: initialData.Address || "",
        Phone: initialData.Phone || "",
      });
    }
  }, [initialData]);

  //   HANDLES FIELDS CHANGES.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //   FORM SUBMISSION.
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="Name"
          placeholder="Agency Name"
          value={formData.Name}
          onChange={handleChange}
        />

        <input
          type="text"
          name="Address"
          placeholder="Agency Address"
          value={formData.Address}
          onChange={handleChange}
        />

        <input
          type="number"
          name="Phone"
          placeholder="Phone Number"
          value={formData.Phone}
          onChange={handleChange}
        />

        <button type="submit">{initialData?._id ? "Update" : "Create"}</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default CreateAgency;
