const cpg = require('./ChordProGrammar');


module.exports = function (source) {
  return `module.exports = ${JSON.stringify(cpg(source))}`;
}
