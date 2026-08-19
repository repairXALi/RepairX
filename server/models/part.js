const mongoose = require("mongoose");

const partSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    compatibleDevices: {
      type: [String],
      default: [],
    },

    estimatedPrice: {
      type: String,
      required: true,
      trim: true,
    },

    availability: {
      type: String,
      default: "Available",
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    technicianNotes: {
      type: [String],
      default: [],
    },

    customerNotice: {
      type: String,
      default:
        "Actual part availability and pricing may vary depending on the mobile model and part quality.",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Part", partSchema);