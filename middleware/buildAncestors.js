const Category = require("../modules/categories/models/Category");

const buildAncestors = async (id, parent_id) => {
  let ancest = [];
  try {
    let parent_category = await Category.findById(parent_id);
    if (parent_category) {
      const { _id, name, slug } = parent_category;
      const ancest = [...parent_category.ancestors];
      ancest.unshift({ _id, name, slug });
      const category = await Category.findByIdAndUpdate(
        { _id: id },

        { ancestors: ancest }
      );
    }
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = buildAncestors;
