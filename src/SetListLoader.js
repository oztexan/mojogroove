
module.exports = function (source) {
  const value = {
    songs: source.split('\n')
  };

  return `module.exports = ${JSON.stringify(value)}`;
}
