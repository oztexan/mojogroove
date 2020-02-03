const moo = require('moo');

const mosttext = /[^\n]+/;

// const abbdir = t => {
//   t = t.trim().toLowerCase();
//   return norm[t] ? norm[t] : t;
// };


const lexer = moo.states({
  main: {
    myError: moo.error,
    /*    chord_line: {
        match: /(?:\s*(?:[A-Ga-g])(?:#|[bB])?(?:[dD][iI][mM]|[mM][aA][jJ]|[sS][uU][sS]|[mM])?\d*(?:\/[A-Ga-g][#|[bB]]?)?\s*)+/,
          value: x => x.trim()
        },*/
    empty_line: {
      match: /^\s*\n/,
      value: () => ' \n',
      lineBreaks: true,
    },
    // Because "A" is also a word
    chord_a_alone: {
      match: /^\s*[Aa]\s*\n/,
      lineBreaks: true,
      value: x => x.trim()
    },
    // Because "A" is also a word
    chord_apair: {
      //      match: /^\s*[Aa]\s+(?=(?:[A-Ga-g])(?:#|[bB])?\d*s(?:[dD][iI][mM]|[mM][aA][jJ]|[sS][uU][sS]|[mM])?\d*(?:\/(?:[A-Ga-g](?:#|[bB])?)?)?\s+)+/,
      match: /(?:^\s*[Aa]\s+)(?:\s*(?:[A-Ga-g])(?:#|[bB])?(?:[dD][iI][mM]|[mM][aA][jJ]|[sS][uU][sS]|[aA][uU][gG]|[mM])?\d*(?:\/[A-Ga-g][#|[bB]]?)?\s*)/,
      lineBreaks: true,
      value: x => x.trim()
    },
    lyric: {
      match: /^\s*[Aa]\s+.*\n/,
      lineBreaks: true,
      value: x => x.trim()
    },
    NL: {
      match: /\n/,
      value: () => '',
      lineBreaks: true,
    },
    WS: {
      match: /[ t]+/,
      value: () => '',
    },
    chord: {
      match: /(?:[A-Ga-g])(?:#|[bB])?\d*(?:[dD][iI][mM]|[mM][aA][jJ]|[sS][uU][sS]|[aA][uU][gG]|[mM])?\d*(?:\/(?:[A-Ga-g](?:#|[bB])?)?)?[ t\n]/,
      lineBreaks: true,
      value: x => x.trim()
    },
    comment: {
      match: /\[.*\]/,
      value: x => '{c: ' + x.substring(1, x.length - 1) + "}",
    },
    lyrics: {
      match: mosttext,
      value: x => x.trim()
    }
  }
});

const parse = (chordsheet, transform) => {
  lexer.reset(chordsheet);

  if (!transform) transform = t => t;
  let rawtokens = Array.from(lexer);
  //  console.log(JSON.stringify(rawtokens,null,2));
  let valuetokens = rawtokens.filter(t => t.value);
  //console.log(JSON.stringify(valuetokens,null,2));

  let cstack = [];
  let cpstack = [];
  let cpstring = '';
  valuetokens.forEach(t => {
    if (t.type.substring(0, 11) === 'chord_apair') {
      //console.log(t);
      let at = JSON.parse(JSON.stringify(t));
      at.col = at.text.search(/[Aa]/) + 1;
      at.value = 'A';
      at.text = 'A';
      at.type = 'chord';
      cstack.push(at);
      let ct = JSON.parse(JSON.stringify(t));
      ct.text = ct.text.substring(at.col);
      ct.col = ct.text.search(/\S/);
      ct.value = ct.text.substring(ct.col).trim();
      ct.col += at.col + 1;
      ct.type = 'chord';
      cstack.push(ct);
      //console.log(cstack);
    } else if (t.type.substring(0, 5) === 'chord') {
      cstack.push(t);
    } else {
      let es = '';
      for (let i = cstack.length - 1; i >= 0; i--) {
        let c = cstack.pop();
        if (c.col >= t.value.length) {
          es = '[' + c.value + ']' + es;
        } else {
          t.value = t.value.substring(0, c.col - t.col) + '[' + c.value + ']' + t.value.substring(c.col - t.col);
        }
      }
      let line = (t.value + es).trim();
      cpstring = cpstring + '\n' + line;
      cpstack.push(line);
    }
  });
  if (cstack.length > 0) {
    let line = '';
    cstack.forEach(c => {
      line = line + '[' + c.value + ']';
    });
    cpstack.push(line);
    cpstring = cpstring + '\n' + line;
  }
  //  console.log('----------------------------------------------------');
  //  console.log(JSON.stringify(cpstack,null,2));

  return cpstring;
}

module.exports = function (source) {
  return parse(source)
}
