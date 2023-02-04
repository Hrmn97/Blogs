const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timeStamps: true }
);

const Category = mongoose.model("Category", CategorySchema);

module.exports = Category;
