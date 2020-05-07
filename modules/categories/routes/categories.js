const express = require("express");

const {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categories");

const Categories = require("../models/Category");

const router = express.Router();

const advancedResults = require("../../../middleware/advancedResults");
const { protect, authorize } = require("../../../middleware/auth");

router
  .route("/")
  .get(advancedResults(Categories, "subCategories"), getCategories);

router
  .route("/")
  .get(advancedResults(Categories, "subCategories"), getCategory)
  .post(createCategory);

router
  .route("/:id")
  .get(advancedResults(Categories, "subCategories"), getCategory)
  .put(updateCategory)
  .delete(deleteCategory);

module.exports = router;
