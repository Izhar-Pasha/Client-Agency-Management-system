import mongoose from "mongoose";

const ClientModel = new mongoose.Schema({
  Name: {
    type: String,
    required: [true, "Name is required"],
  },
  Email: {
    type: String,
    required: [true, "Email is required"],
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    unique: true,
  },
  Phone: {
    type: Number,
    required: [true, "Phone Number is required"],
    validate: {
      validator: function (v) {
        return v.toString().length === 10;
      },
      message: "Phone number must be exactly 10 digits",
    },
  },
  TotalBill: {
    type: Number,
    required: [true, "Bill is required"],
  },
  AgencyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Agency",
  },
});

export const Client = mongoose.model("Client", ClientModel);
