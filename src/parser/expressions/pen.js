const { isNumberToken } = require("../tokenValidation");

const generatePenExpression = tokenGenerator => {
  const { done, value: token } = tokenGenerator.next();
  if (!done && isNumberToken(token)) {
    return {
      type: "CallExpression",
      name: "Pen",
      arguments: [
        {
          type: "NumberLiteral",
          value: token.value
        }
      ]
    };
  } else {
    throw new Error(
      `Expected a NUMBER token for Pen expression, but got ${
        !done ? token.type : "none"
      }`
    );
  }
};

module.exports = { generatePenExpression };
