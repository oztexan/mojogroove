<template>
  <div>
    <div v-for="(t,ti) in song.parseResult" v-bind:key="ti">
      <div v-if="t.type === 'directive' && t.children.length"
        class='directive' v-bind:class="{hideDirectives: hideDirectives}">
          <span v-for="(c,ci) in t.children" v-bind:key="ci" v-bind:class="t.value">{{c.value}}</span>
      </div>
      <div v-if="t.type === 'comment' && t.children.length" class='comment'>
          <span v-for="(c,ci) in t.children" v-bind:key="ci" class="comment">{{c.value}}</span>
      </div>
      <div v-if="t.type === 'chordline' && t.children.length"
        class='chordline' v-bind:class="{hideChords: hideChords}">
          <span class="chord">{{fatten(t)}}</span>
      </div>
      <div v-if="t.type === 'lyricline' && t.children.length"
      class='lyricline'  v-bind:class="{hideLyrics: hideLyrics}">
          <span v-for="(c,ci) in t.children" v-bind:key="ci" class="lyric">{{c.value}}</span>
      </div>
    </div>
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
    hideChords: {
      type: Boolean
    },
    hideLyrics: {
      type: Boolean
    },
    hideDirectives: {
      type: Boolean
    }
  },
  methods: {
    fatten: t => {
      let cursor = 0;
      let line = "";
      if (t.children && t.children.length) {
        t.children.forEach(c => {
          const dt = c.col - cursor;
          if (dt > 0) {
            line += " ".repeat(dt - 1) + c.value;
            cursor = line.length;
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

<style>
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

.lyricline {
  font-size: medium;
  overflow: auto;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  flex-wrap: wrap;
}

.chordline {
  display: inline-block;
}

.chord {
  font-weight: bold;
  white-space: pre;
  /*  display: block;*/
}

.directive {
  margin-top: 20px;
}

.comment {
  font-size: large;
  background: lightgray;
  font-style: italic;
}

.c {
  font-size: large;
  background: lightgray;
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

.hideChords {
  display: none;
}
.hideLyrics {
  display: none;
}
.hideDirectives {
  display: none;
}
</style>
