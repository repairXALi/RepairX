const express = require("express");
const mongoose = require("mongoose");
const Troubleshooting = require("../models/Troubleshooting");

const router = express.Router();


// =====================================================
// GET ALL TROUBLESHOOTING PROBLEMS
// =====================================================

router.get("/", async (req, res) => {
  try {
    const problems = await Troubleshooting.find().sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      count: problems.length,
      data: problems,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch troubleshooting data",
      error: error.message,
    });
  }
});


// =====================================================
// GET ONE TROUBLESHOOTING PROBLEM
// =====================================================

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid troubleshooting ID",
      });
    }

    const problem = await Troubleshooting.findById(id);

    if (!problem) {
      return res.status(404).json({
        success: false,
        message: "Troubleshooting problem not found",
      });
    }

    res.json({
      success: true,
      data: problem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch troubleshooting problem",
      error: error.message,
    });
  }
});


// =====================================================
// ADD NEW TROUBLESHOOTING PROBLEM
// =====================================================

router.post("/", async (req, res) => {
  try {
    const problem = await Troubleshooting.create(req.body);

    res.status(201).json({
      success: true,
      message: "Troubleshooting problem added successfully",
      data: problem,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to add troubleshooting problem",
      error: error.message,
    });
  }
});


// =====================================================
// UPDATE TROUBLESHOOTING PROBLEM
// =====================================================

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid troubleshooting ID",
      });
    }

    const updatedProblem =
      await Troubleshooting.findByIdAndUpdate(
        id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

    if (!updatedProblem) {
      return res.status(404).json({
        success: false,
        message: "Troubleshooting problem not found",
      });
    }

    res.json({
      success: true,
      message:
        "Troubleshooting problem updated successfully",
      data: updatedProblem,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        "Failed to update troubleshooting problem",
      error: error.message,
    });
  }
});


// =====================================================
// DELETE TROUBLESHOOTING PROBLEM
// =====================================================

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid troubleshooting ID",
      });
    }

    const deletedProblem =
      await Troubleshooting.findByIdAndDelete(id);

    if (!deletedProblem) {
      return res.status(404).json({
        success: false,
        message: "Troubleshooting problem not found",
      });
    }

    res.json({
      success: true,
      message:
        "Troubleshooting problem deleted successfully",
      data: deletedProblem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        "Failed to delete troubleshooting problem",
      error: error.message,
    });
  }
});


module.exports = router;