const mongoose = require("mongoose");

const troubleshootingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    symptoms: {
      type: [String],
      default: [],
    },

    possibleCauses: {
      type: [String],
      default: [],
    },

    diagnosticSteps: {
      type: [String],
      default: [],
    },

    recommendedSolution: {
      type: [String],
      default: [],
    },

    requiredParts: {
      type: [String],
      default: [],
    },

    estimatedPrice: {
      type: String,
      default: "Contact technician",
    },

    technicianNotes: {
      type: [String],
      default: [],
    },

    warnings: {
      type: [String],
      default: [],
    },

    customerNotice: {
      type: String,
      default:
        "RepairX provides troubleshooting guidance. Actual diagnosis and repair results may vary depending on the device condition.",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Troubleshooting", troubleshootingSchema);