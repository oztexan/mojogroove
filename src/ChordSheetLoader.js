const csg = require('./ChordSheetGrammar');

module.exports = function (source) {
  return `module.exports = ${JSON.stringify(csg(source))}`;
}
