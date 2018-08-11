const { cond, prepend } = require("ramda");
const listToGenerator = require("../listToGenerator");
const { paperTransformer } = require("./transformers/paper");
const { lineTransformer } = require("./transformers/line");
const { isPaperNode, isLineNode, isPenNode } = require("./nodeValidation");

function generateASTBody(generator) {
  const next = generator.next();

  if (!next.done) {
    const node = next.value;
    let penColor = 100;

    const newExpression = cond([
      [isPenNode, node => (penColor = node.value)],
      [isPaperNode, () => paperTransformer(penColor)],
      [isLineNode, () => lineTransformer(generator, penColor)]
    ])(node);

    if (isPenNode(node)) {
      return generateASTBody(generator);
    } else {
      return prepend(newExpression, generateASTBody(generator));
    }
  } else {
    return [];
  }
}

function transformer(AST) {
  const generator = listToGenerator(AST.body);
  const body = generateASTBody(generator);

  return {
    tag: "svg",
    attr: {
      width: 100,
      height: 100,
      viewBox: "0 0 100 100",
      xmlns: "http://www.w3.org/2000/svg",
      version: "1.1"
    },
    body
  };
}

module.exports = transformer;
