const { lexer, parser, transformer } = require("../src/index");

const code = "Line 10 10 10 10";

const AST = parser(lexer(code));

const svgAST = transformer(AST);

console.log(JSON.stringify(svgAST, null, 2));
