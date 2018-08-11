const { isNumberToken } = require("../tokenValidation");

const generatePaperExpression = tokenGenerator => {
  const { done, value: token } = tokenGenerator.next();
  if (!done && isNumberToken(token)) {
    return {
      type: "CallExpression",
      name: "Paper",
      arguments: [
        {
          type: "NumberLiteral",
          value: token.value
        }
      ]
    };
  } else {
    throw new Error(
      `Expected a NUMBER token for Paper expression, but got ${
        !done ? token.type : "none"
      }`
    );
  }
};

module.exports = { generatePaperExpression };
