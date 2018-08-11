const { propEq } = require("ramda");
module.exports = {
  isNumberToken: propEq("type", "number"),
  isWordToken: propEq("type", "word")
};
