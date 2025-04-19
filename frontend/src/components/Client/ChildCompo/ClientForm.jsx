import React, { useCallback, useEffect, useState } from "react";

const ClientForm = ({ initialData = {}, AgencyData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    Phone: "",
    TotalBill: "",
    AgencyId: AgencyData._id,
  });

  //   RENDER IF THE FORM IS FOR UPDATE.
  useEffect(() => {
    if (initialData && initialData._id) {
      setFormData({
        Name: initialData.Name || "",
        Email: initialData.Email || "",
        Phone: initialData.Phone || "",
        TotalBill: initialData.TotalBill || "",
        AgencyId: initialData._id,
      });
    }
  }, [initialData, AgencyData]);

  //   HANDLES FIELDS CHANGES.
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

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
          placeholder="Enter your Name"
          value={formData.Name}
          onChange={handleChange}
        />

        <input
          type="email"
          name="Email"
          placeholder="Enter your Email"
          value={formData.Email}
          onChange={handleChange}
        />

        <input
          type="number"
          name="Phone"
          placeholder="Enter your Phone Number"
          value={formData.Phone}
          onChange={handleChange}
        />

        <input
          type="number"
          name="TotalBill"
          placeholder="Enter your Total Bill"
          value={formData.TotalBill}
          onChange={handleChange}
        />

        <select
          name="AgencyId"
          value={formData.AgencyId}
          onChange={handleChange}
        >
          <option>Select Agency</option>
          {AgencyData?.map((agency) => (
            <option key={agency._id} value={agency._id}>
              {agency.Name}
            </option>
          ))}
        </select>

        <button type="submit">{initialData._id ? "Update" : "Create"}</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default React.memo(ClientForm);
