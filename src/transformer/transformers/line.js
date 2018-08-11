const { pluck } = require("ramda");

function lineTransformer(node, penColor) {
  const [x1, y1, x2, y2] = pluck("value", node.arguments);
  return {
    tag: "line",
    attr: {
      x1,
      y1,
      x2,
      y2,
      "stroke-linecap": "round",
      stroke: `rgb(${penColor}%, ${penColor}%, ${penColor}%)`
    }
  };
}

module.exports = { lineTransformer };
