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
  slug: {
    type: String,
    index: true,
  },
  parent: {
    type: mongoose.Types.ObjectId,
    ref: "Categories",
    default: null,
  },
  ancestors: [
    {
      _id: {
        type: mongoose.Types.ObjectId,
        ref: "Categories",
        index: true,
      },
      name: String,
      slug: String,
    },
  ],
});

module.exports = mongoose.model("Categories", CategorySchema);
