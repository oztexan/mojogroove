<template>
  <div>
    <!--pre>
      {{this.lowerSongs}}
    </pre-->
    <v-row align="center">
        <v-expansion-panels 
          accordion
          inset
          focusable>
        <v-expansion-panel v-for="(s,i) in lowerSongs" :key="i">
          <v-expansion-panel-header style="text-transform: capitalize"><h3>{{i+1}}. {{s}}</h3></v-expansion-panel-header>
          <v-expansion-panel-content>
            <song :song="songs[s]" :hideChords="hideChords" :hideLyrics="hideLyrics" :hideDirectives="hideDirectives"></song>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-row>
  </div>
</template>

<script>
import Song from "./Song.vue";

// import {  } from '../../vuex/getters'
// import {  } from '../../vuex/actions'
export default {
  props: {
    list: {
      type: Array
    },
    songs: {
      type: Object
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
  components: {
    Song
  },
  data() {
    return {};
  },
  computed: {
    lowerSongs: function() {
      return this.list.map(e => e.toLowerCase());
    }
  },
  methods: {
    getTitle: function(s) {
      const title = s.parseResult.find(e => {
        return e.value === "t";
        //        return false;
      });
      return title ? title.children[0].value : "Unnamed";
    }
  }
};
</script>

<style scoped>
.song-title {
  font-size: x-large;
  font-weight: bold;
}

.song-subtitle {
  font-size: large;
  font-weight: bold;
}

.song-lyrics {
  white-space: pre;
  display: block;
  /* display: none; */
}

.song-lyrics-whitespace {
  font-family: monospace;
  display: inline-block;
  /* display: none; */
}

.song-line {
  overflow: auto;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  flex-wrap: wrap;
}

.song-linesegment {
  display: inline-block;
}

.song-chord {
  font-weight: bold;
  white-space: pre;
  display: block;
}

.song-chord-nolyrics {
  font-weight: bold;
  white-space: pre;
  display: inline-block;
}

.song-comment {
  background: lightgray;
  margin: 10px;
}

.song-soc {
  padding-left: 10px;
  position: relative;
}

.song-soc:after {
  content: "";
  position: absolute;
  z-index: -1;
  top: 3px;
  bottom: 3px;
  left: 0%;
  border-left: 7px solid gray;
}

.song-sot {
  font-family: monospace;
}

.song-soh {
  padding-left: 10px;
  position: relative;
}

.song-soh:after {
  content: "";
  position: absolute;
  z-index: -1;
  top: 3px;
  bottom: 3px;
  left: 0%;
  border-left: 7px solid red;
}
</style>
