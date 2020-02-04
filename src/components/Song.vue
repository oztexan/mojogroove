<template>
  <div v-if="show">
    <div v-for="(t,ti) in song.parseResult" :key="ti">
      <div v-if="t.type === 'directive' && t.value === 'c' && t.children.length && state.showDirectives" class='directiveline'>
          <span v-for="(c,ci) in t.children" :key="ci" class='directive' >{{c.value}}</span>
      </div>
      <pre v-if="t.type === 'sot' && t.children.length && state.showChords">
          <p v-for="(c,ci) in t.children" :key="ci">{{c.value}}</p>
      </pre>
      <div v-if="t.type === 'comment' && t.children.length">
          <span v-for="(c,ci) in t.children" :key="ci" class="comment">{{c.value}}</span>
      </div>
      <div v-if="t.type === 'chordline' && t.children.length && state.showChords"
        class='chordline'>
          <span class="chord">{{fatten(t)}}</span>
      </div>
      <div v-if="t.type === 'lyricline' && t.children.reduce((a,cv) => a.concat(cv.value),'').trim().length>0 && state.showLyrics"
      class='lyricline'>
          <span v-for="(c,ci) in t.children" :key="ci" class="lyric">{{c.value}}</span>
      </div>
    </div>
    <pre v-if="state.showDebug">
      {{song.parseResult}}
    </pre>
    <!--pre>{{JSON.stringify(song.parseResult,null,2)}}</pre-->
  </div>
</template>

<script>
// import {  } from '../../vuex/getters'
// import {  } from '../../vuex/actions'
export default {
  /*
  vuex: {
        getters: {
        },
        actions: {
        }
    },
    data () {
        return {
        }
    },
  */
  props: {
    song: {
      type: Object,
      validator: function(value) {
        return value.html && value.parseResult;
      }
    },
    show: {
      type: Boolean
    },
    state: {
      type: Object
    }
  },
  methods: {
    fatten: function(t) {
      //position is base base 1
      let line = "";
      let braces = 2;
      if (t.children && t.children.length) {
        t.children.forEach((c, i) => {
          if (this.state.showLyrics) {
            const rpt = c.col - (line.length + braces);
            line += (rpt > 0 ? " ".repeat(rpt) : i > 0 ? " " : "") + c.value;
            braces += 2 + c.value.length;
          } else {
            line += " " + c.value;
          }
        });
      }
      return line;
    }
  }
  /*
  watch: {
  },
  computed: {
  },
  events: {
  },
  ready () {
  },
  components: {
  }
  */
};
</script>

<style scoped>
pre {
  margin: 0;
  padding: 0;
}
pre p {
  margin: 0;
  padding: 0;
  line-height: 1.2;
}

.t {
  font-size: x-large;
  font-weight: bold;
}

.st {
  font-size: large;
  font-weight: bold;
}

.lyric {
  white-space: pre;
  display: inline-block;
  /* display: none; */
}

.song-lyrics-whitespace {
  font-family: monospace;
  display: inline-block;
  /* display: none; */
}

.directiveline {
  font-size: medium;
  overflow: auto;
  margin: 0;
  padding: 100;
  line-height: 2;
}

.lyricline {
  font-size: medium;
  overflow: auto;
  padding: 0;
  line-height: 1.2;
}

.chordline {
  margin: 0;
  padding: 0;
  line-height: 1;
  margin-bottom: -10px;
  display: inline-block;
}

.chord {
  font-weight: bold;
  white-space: pre;
  color: blue;
}

.directive {
  font-size: large;
  background-color: lightgray;
  font-style: italic;
}

.comment {
  font-size: large;
  background-color: lightgray;
  font-style: italic;
}

.c {
  font-size: large;
  background-color: lightgray;
  font-style: italic;
}

.soc {
  padding-left: 10px;
  position: relative;
}

.soc:after {
  content: "";
  position: absolute;
  z-index: -1;
  top: 3px;
  bottom: 3px;
  left: 0%;
  border-left: 7px solid gray;
}

.sot {
  font-family: monospace;
}

.soh {
  padding-left: 10px;
  position: relative;
}

.soh:after {
  content: "";
  position: absolute;
  z-index: -1;
  top: 3px;
  bottom: 3px;
  left: 0%;
  border-left: 7px solid red;
}
</style>
