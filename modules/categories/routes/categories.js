const express = require("express");

const {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  changeAncestryOfACategory,
  deleteCategory,
} = require("../controllers/categories");

const Categories = require("../models/Category");

const router = express.Router();

const advancedResults = require("../../../middleware/advancedResults");
const { protect, authorize } = require("../../../middleware/auth");

router.route("/").get(advancedResults(Categories), getCategories);

router
  .route("/")
  .get(advancedResults(Categories), getCategory)
  .post(createCategory);

router
  .route("/:id")
  .get(advancedResults(Categories), getCategory)
  .put(updateCategory)
  .delete(deleteCategory);

router.route("/descendants/:id").put(changeAncestryOfACategory);

module.exports = router;
