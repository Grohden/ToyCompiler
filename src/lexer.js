const { assoc, split, pipe, ifElse, propSatisfies } = require("ramda");
const listToGenerator = require("./listToGenerator");

const asType = assoc("type");

const createLexerToken = pipe(
  value => ({ value }),
  ifElse(propSatisfies(isNaN, "value"), asType("word"), asType("number"))
);

function* lexer(code) {
  const rawCode = split(/\s+/g, code);
  const listGenerator = listToGenerator(rawCode);

  let x = listGenerator.next();
  // noinspection CommaExpressionJS
  do {
    yield createLexerToken(x.value);
  } while (((x = listGenerator.next()), !x.done));
}
module.exports = lexer;
