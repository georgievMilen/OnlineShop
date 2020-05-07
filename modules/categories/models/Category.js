const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 20,
  },
  subCategories: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Categories",
    },
  ],
});

module.exports = mongoose.model("Categories", CategorySchema);
