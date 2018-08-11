const { isWordToken } = require("./tokenValidation");
const { generatePaperExpression } = require("./expressions/paper");
const { generatePenExpression } = require("./expressions/pen");
const { generateLineExpression } = require("./expressions/line");
const { cond, propSatisfies, test, prepend } = require("ramda");

//Expression types
const isPaper = propSatisfies(test(/paper/i), "value");
const isLine = propSatisfies(test(/line/i), "value");
const isPen = propSatisfies(test(/pen/i), "value");

const parser = tokenGenerator => {
  const next = tokenGenerator.next();

  if (!next.done) {
    const token = next.value;

    if (isWordToken(token)) {
      const newExpression = cond([
        //Paper takes one argument
        [isPaper, () => generatePaperExpression(tokenGenerator)],
        //Line takes four argument
        [isLine, () => generateLineExpression(tokenGenerator)],
        //Pen takes one argument
        [isPen, () => generatePenExpression(tokenGenerator)]
      ])(token);

      return prepend(newExpression, parser(tokenGenerator));
    } else {
      throw new Error(
        `Expected a WORD token, but got ${token.type} with value ${
          token.value
        } `
      );
    }
  } else {
    return [];
  }
};

module.exports = parser;
