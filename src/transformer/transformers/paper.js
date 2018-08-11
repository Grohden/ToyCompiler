const {} = require("ramda");

function paperTransformer(paperColor) {
  return {
    tag: "rect",
    attr: {
      x: 0,
      y: 0,
      width: 100,
      height: 100,
      fill: `rgb(${paperColor}%, ${paperColor}%, ${paperColor}%)`
    }
  };
}

module.exports = { paperTransformer };
