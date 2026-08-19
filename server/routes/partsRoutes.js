const express = require("express");
const mongoose = require("mongoose");
const Part = require("../models/part");

const router = express.Router();


// =====================================================
// GET ALL PARTS
// =====================================================

router.get("/", async (req, res) => {
  try {
    const parts = await Part.find().sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      count: parts.length,
      data: parts,
    });
  } catch (error) {
    console.error("Parts fetch error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch parts",
      error: error.message,
    });
  }
});


// =====================================================
// GET PARTS BY CATEGORY
// =====================================================

router.get("/category/:category", async (req, res) => {
  try {
    const parts = await Part.find({
      category: req.params.category,
    });

    res.json({
      success: true,
      count: parts.length,
      data: parts,
    });
  } catch (error) {
    console.error(
      "Category fetch error:",
      error.message
    );

    res.status(500).json({
      success: false,
      message: "Failed to fetch parts by category",
      error: error.message,
    });
  }
});


// =====================================================
// SEARCH PARTS
// =====================================================

router.get("/search/:term", async (req, res) => {
  try {
    const term = req.params.term;

    const parts = await Part.find({
      $or: [
        {
          name: {
            $regex: term,
            $options: "i",
          },
        },
        {
          category: {
            $regex: term,
            $options: "i",
          },
        },
        {
          compatibleDevices: {
            $regex: term,
            $options: "i",
          },
        },
      ],
    });

    res.json({
      success: true,
      count: parts.length,
      data: parts,
    });
  } catch (error) {
    console.error(
      "Parts search error:",
      error.message
    );

    res.status(500).json({
      success: false,
      message: "Failed to search parts",
      error: error.message,
    });
  }
});


// =====================================================
// GET ONE PART BY ID
// =====================================================

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid part ID",
      });
    }

    const part = await Part.findById(id);

    if (!part) {
      return res.status(404).json({
        success: false,
        message: "Part not found",
      });
    }

    res.json({
      success: true,
      data: part,
    });
  } catch (error) {
    console.error(
      "Part fetch error:",
      error.message
    );

    res.status(500).json({
      success: false,
      message: "Failed to fetch part",
      error: error.message,
    });
  }
});


// =====================================================
// ADD NEW PART
// =====================================================

router.post("/", async (req, res) => {
  try {
    const part = await Part.create(req.body);

    res.status(201).json({
      success: true,
      message: "Part added successfully",
      data: part,
    });
  } catch (error) {
    console.error(
      "Part creation error:",
      error.message
    );

    res.status(400).json({
      success: false,
      message: "Failed to add part",
      error: error.message,
    });
  }
});


// =====================================================
// UPDATE PART
// =====================================================

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid part ID",
      });
    }

    const updatedPart =
      await Part.findByIdAndUpdate(
        id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

    if (!updatedPart) {
      return res.status(404).json({
        success: false,
        message: "Part not found",
      });
    }

    res.json({
      success: true,
      message: "Part updated successfully",
      data: updatedPart,
    });
  } catch (error) {
    console.error(
      "Part update error:",
      error.message
    );

    res.status(400).json({
      success: false,
      message: "Failed to update part",
      error: error.message,
    });
  }
});


// =====================================================
// DELETE PART
// =====================================================

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid part ID",
      });
    }

    const deletedPart =
      await Part.findByIdAndDelete(id);

    if (!deletedPart) {
      return res.status(404).json({
        success: false,
        message: "Part not found",
      });
    }

    res.json({
      success: true,
      message: "Part deleted successfully",
      data: deletedPart,
    });
  } catch (error) {
    console.error(
      "Part deletion error:",
      error.message
    );

    res.status(500).json({
      success: false,
      message: "Failed to delete part",
      error: error.message,
    });
  }
});


module.exports = router;