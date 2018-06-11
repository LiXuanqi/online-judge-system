let mongoose = require("mongoose");
let ProblemSchema = mongoose.Schema({
  id: Number,
  name: String,
  desc: String,
  difficulty: String,
  acceptance: String
});

let problemModel = mongoose.model("ProblemModel", ProblemSchema);

module.exports = problemModel;