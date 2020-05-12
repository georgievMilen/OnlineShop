const Category = require("../modules/categories/models/Category");
const buildAncestors = require("../middleware/buildAncestors");

const buildHierarchyAncestors = async (category_id, parent_id) => {
  if (category_id && parent_id) buildAncestors(category_id, parent_id);
  const result = await Category.find({ parent: category_id }).exec();
  if (result)
    result.forEach((doc) => {
      buildHierarchyAncestors(doc._id, category_id);
    });
};

module.exports = buildHierarchyAncestors;
