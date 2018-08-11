const { propEq } = require("ramda");
module.exports = {
  isPaperNode: propEq("name", "Paper"),
  isLineNode: propEq("name", "Line"),
  isPenNode: propEq("name", "Pen")
};
