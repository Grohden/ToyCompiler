const { any, all, prop, map, ifElse, always, pluck } = require("ramda");
const { isNumberToken } = require("../tokenValidation");

const isDone = prop("done");
const missingAny = any(isDone);
const areAllNumbers = all(isNumberToken);
const argumentsFrom = map(({ value }) => ({
  type: "NumberLiteral",
  value
}));

const generateLineExpression = tokenGenerator => {
  const generated = [
    tokenGenerator.next(), //X
    tokenGenerator.next(), //Y
    tokenGenerator.next(), //Starting from
    tokenGenerator.next() //Ending at
  ];

  const isMissingArguments = missingAny(generated);
  const tokensList = pluck("value", generated);

  if (!isMissingArguments && areAllNumbers(tokensList)) {
    return {
      type: "CallExpression",
      name: "Paper",
      arguments: argumentsFrom(tokensList)
    };
  } else {
    const message = ifElse(
      () => isMissingArguments,
      always("Missing arguments for LINE expression"),
      always("LINE expression expects all arguments to be NUMBERS")
    )();

    throw new Error(message);
  }
};

module.exports = { generateLineExpression };
