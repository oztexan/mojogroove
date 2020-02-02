<template>
  <div>
    <v-container grid-list-md text-xs-center>
      <v-expansion-panels>
        <v-expansion-panel v-for="(s,i) in setlists" :key="i">
          <v-expansion-panel-header>{{i}}</v-expansion-panel-header>
          <v-expansion-panel-content>
            <!--div style="font-size:48px" slot="header">{{i+1}}. {{getTitle(s)/* s.parseResult.parsedLines[0][0].directive.value */}}</div-->
            <v-card>
              <v-card-text class="grey lighten-3">
                <songList :list="s.songs" :songs="songs" :hideChords="hideChords" :hideLyrics="hideLyrics" :hideDirectives="hideDirectives"></songList>
              </v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-container>
  </div>
</template>

<script>
import SongList from "./SongList.vue";

// import {  } from '../../vuex/getters'
// import {  } from '../../vuex/actions'
export default {
  props: {
    songs: {
      type: Object
    },
    setlists: {
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
    SongList
  },
  data() {
    return {};
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

<style>
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
