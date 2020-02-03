<template>
  <div v-if="show">
    <v-switch color="green" v-model="debug" label="Debug">hello</v-switch>
    <pre v-if="debug">
      {{song.parseResult}}
    </pre>
    <div v-for="(t,ti) in song.parseResult" :key="ti">
      <div v-if="t.type === 'directive' && t.value === 'c' && t.children.length && !hideDirectives">
          <span v-for="(c,ci) in t.children" v-bind:key="ci" class='directive' >{{c.value}}</span>
      </div>
      <pre v-if="t.type === 'sot' && t.children.length && !hideChords">
          <p v-for="(c,ci) in t.children" :key="ci">{{c.value}}</p>
      </pre>
      <div v-if="t.type === 'comment' && t.children.length">
          <span v-for="(c,ci) in t.children" :key="ci" class="comment">{{c.value}}</span>
      </div>
      <div v-if="t.type === 'chordline' && t.children.length && !hideChords"
        class='chordline'>
          <span class="chord">{{fatten(t)}}</span>
      </div>
      <div v-if="t.type === 'lyricline' && t.children.reduce((a,cv) => a.concat(cv.value),'').trim().length>0 && !hideLyrics"
      class='lyricline'>
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
    show: {
      type: Boolean
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
  data() {
    return {
      debug: false
    };
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
pre {
  margin: 0;
  padding: 0;
}
pre p {
  margin: 0;
  padding: 0;
  line-height: 0.5;
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

.lyricline {
  font-size: medium;
  overflow: auto;
  margin: 0;
  padding: 0;
}

.chordline {
  margin: 0;
  padding: 0;
  display: inline-block;
}

.chord {
  font-weight: bold;
  white-space: pre;
  color: blue;
  /*  display: block;*/
}

.directive {
  /*  margin-top: 20px;*/
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
