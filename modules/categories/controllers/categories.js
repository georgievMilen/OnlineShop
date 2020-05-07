const Categories = require("../models/Category");
const asyncHandler = require("../../../middleware/asyncHandler");
const ErrorResponse = require("../../../utils/errorResponse");

// @route    POST /api/categories
exports.createCategory = asyncHandler(async (req, res, next) => {
  const category = await Categories.create(req.body);
  console.log({ ...res });

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

  res.status(200).json({ success: true, data: category });
});

// @route     DELETE /api/category/:id
exports.deleteCategory = asyncHandler(async (req, res, next) => {
  const category = await Categories.findById(req.params.id);

  if (!category) {
    return next(
      new ErrorResponse(`Category not found with id of ${req.params.id}`, 404)
    );
  }

  await DeleteSubcategories(category);
  res.json({ success: true });
});

async function DeleteSubcategories(category) {
  try {
    if (category.subCategories) {
      category.subCategories.map(async (sub) => {
        await DeleteSubcategories(sub);
      });
    }
    await Categories.findByIdAndDelete(category._id);
  } catch (error) {
    throw Error(error);
  }
}
