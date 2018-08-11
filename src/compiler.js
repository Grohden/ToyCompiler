const {
  assoc,
  propEq,
  split,
  isEmpty,
  propSatisfies,
  ifElse,
  pipe,
  reject,
  compose
} = require("ramda");
const isNumberToken = propEq("type", "number");
const isWordToken = propEq("type", "word");

const parser = tokens => {
  const AST = {
    type: "Drawing",
    body: []
  };

  while (tokens.length > 0) {
    const currentToken = tokens.shift();

    if (isWordToken(currentToken)) {
      switch (currentToken.value) {
        case "Paper":
          const argument = tokens.shift();
          if (isNumberToken(argument)) {
            AST.body.push({
              type: "CallExpression",
              name: "Paper",
              arguments: [
                {
                  type: "NumberLiteral",
                  value: argument.value
                }
              ]
            });
          } else {
            throw "Paper command must be followed by a number.";
          }
          break;
        case "Pen":
        case "Line":
      }
    }
  }

  return AST;
};
