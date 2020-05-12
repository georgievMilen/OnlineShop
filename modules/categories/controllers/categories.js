const buildAncestors = require("../../../middleware/buildAncestors");
const buildHierarchyAncestors = require("../../../middleware/buildHierarchyAncestors");
const slugify = require("../../../middleware/slugify");
const Categories = require("../models/Category");
const asyncHandler = require("../../../middleware/asyncHandler");
const ErrorResponse = require("../../../utils/errorResponse");

// @route    POST /api/categories
exports.createCategory = asyncHandler(async (req, res, next) => {
  let category = await Categories.create(req.body);
  category.slug = slugify(category.name);
  await buildAncestors(category._id, category.parent);
  category = await category.save();

  res.status(201).json({
    success: true,
    data: category,
  });
});

// @route     GET /api/categories
exports.getCategories = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @route     GET /api/categories/:id
exports.getCategory = asyncHandler(async (req, res, next) => {
  const category = await Categories.findById(req.params.id);

  if (!category) {
    return next(
      new ErrorResponse(`Category not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: category });
});

// @route     PUT /api/categories/:id
exports.changeAncestryOfACategory = asyncHandler(async (req, res, next) => {
  const category = await Categories.findByIdAndUpdate(req.params.id, {
    $set: { parent: req.body.new_parent_id },
  });

  if (!category) {
    return next(
      new ErrorResponse(`Category not found with id of ${req.params.id}`, 404)
    );
  }

  buildHierarchyAncestors(category._id, req.body.new_parent_id);

  res.status(200).json({ success: true, data: category });
});

exports.updateCategory = asyncHandler(async (req, res, next) => {
  let category = await Category.findById(req.params.id);

  if (!category) {
    return next(
      new ErrorResponse(`Category not found with id of ${req.params.id}`, 404)
    );
  }

  category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
});

// @route     DELETE /api/category/:id
exports.deleteCategory = asyncHandler(async (req, res, next) => {
  const category = await Categories.findByIdAndRemove(req.params.id);
  if (category)
    result = await Categories.deleteMany({ "ancestors._id": req.params.id });

  res.status(200).json({ success: true, data: result });
});
