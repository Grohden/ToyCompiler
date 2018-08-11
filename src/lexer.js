const { assoc, split, pipe, ifElse, propSatisfies } = require("ramda");

const asType = assoc("type");

const createLexerToken = pipe(
  value => ({ value }),
  ifElse(propSatisfies(isNaN, "value"), asType("word"), asType("number"))
);

function* lexer(code) {
  const rawCode = split(/\s+/g, code);

  for (const rawToken of rawCode) {
    yield createLexerToken(rawToken);
  }
}
module.exports = lexer;
