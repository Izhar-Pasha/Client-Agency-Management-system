import mongoose from "mongoose";

const AgencyModel = new mongoose.Schema({
  Name: {
    type: String,
    required: [true, "Name is required"],
  },
  Address: {
    type: String,
    required: [true, "Address is required"],
  },
  Phone: {
    type: Number,
    required: [true, "Number is required"],
    validate: {
      validator: function (v) {
        return v.toString().length === 10;
      },
      message: "Phone number must be exactly 10 digits",
    },
  },
});

export const Agency = mongoose.model("Agency", AgencyModel);
