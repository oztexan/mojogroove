<template>
  <div>
    <v-container grid-list-md text-xs-center>
      <v-expansion-panels>
        <v-expansion-panel v-for="(s,i) in songs" :key="i">
          <v-expansion-panel-header>{{getTitle(s)}}</v-expansion-panel-header>
          <v-expansion-panel-content>
            <!--div style="font-size:48px" slot="header">{{i+1}}. {{getTitle(s)/* s.parseResult.parsedLines[0][0].directive.value */}}</div-->
            <v-card>
              <v-card-text class="grey lighten-3">
                <song :song="s" :hideChords="hideChords" :hideLyrics="hideLyrics" :hideDirectives="hideDirectives"></song>
              </v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-container>
  </div>
</template>

<script>
import Song from "./Song.vue";

const songs = [];
songs.push(require("../assets/SongBook/The Chain.pro"));
songs.push(require("../assets/SongBook/Do You See What I See.pro"));
songs.push(require("../assets/SongBook/blister in the sun.pro"));
songs.push(require("../assets/SongBook/Nutbush.pro"));
songs.push(require("../assets/SongBook/Love Rears Its Ugly Head.pro"));
songs.push(require("../assets/SongBook/Sex on fire.pro"));
songs.push(require("../assets/SongBook/Rush You.pro"));
songs.push(require("../assets/SongBook/Seven Nation Army.pro"));
songs.push(require("../assets/SongBook/Ive Got You On My Mind.pro"));
songs.push(require("../assets/SongBook/Smoke On the Water.pro"));
songs.push(require("../assets/SongBook/Whole Lotta Love.pro"));
songs.push(require("../assets/SongBook/Enter The Sandman.pro"));
songs.push(require("../assets/SongBook/Rebel Yell.pro"));
songs.push(require("../assets/SongBook/Killing In The Name Of.pro"));
songs.push(
  require("../assets/SongBook/am i ever gonna see your face again.pro")
);

// songs[1] = require("../assets/SongBook/Brass In Pocket.pro");
// songs[2] = require("../assets/SongBook/Passionfruit.pro");
// songs[3] = require("../assets/SongBook/Faith.pro");
// songs[4] = require("../assets/SongBook/Feeler.pro");
// songs[5] = require("../assets/SongBook/All About That Bass.pro");
// songs[6] = require("../assets/SongBook/exs and ohs.pro");
// songs[7] = require("../assets/SongBook/Is This Love.pro");
// songs[8] = require("../assets/SongBook/never tear us apart.pro");
// songs[9] = require("../assets/SongBook/Valerie.pro");
// songs[10] = require("../assets/SongBook/Mercy.pro");
// songs[11] = require("../assets/SongBook/Cry In Shame.pro");
// songs[12] = require("../assets/SongBook/Wonderwall.pro");
// songs[13] = require("../assets/SongBook/I Got A Feeling.pro");
// songs[14] = require("../assets/SongBook/are you gonna go my way.pro");
// songs[15] = require("../assets/SongBook/Hey Joe.pro");
// songs[16] = require("../assets/SongBook/Pleasure and Pain.pro");
// songs[17] = require("../assets/SongBook/Summer of '69.pro");
// songs[18] = require("../assets/SongBook/Boys In Town.pro");
// songs[19] = require("../assets/SongBook/Proud Mary.pro");
// songs[20] = require("../assets/SongBook/Come Together.pro");
// songs[21] = require("../assets/SongBook/Babe I'm Gonna Leave You Pink Version.pro");
// songs[22] = require("../assets/SongBook/Love Rears Its Ugly Head.pro");
// songs[23] = require("../assets/SongBook/Always On The Run.pro");
// songs[24] = require("../assets/SongBook/Mr Brightside.pro");
// songs[25] = require("../assets/SongBook/Hit Me With Your Best Shot.pro");
// songs[26] = require("../assets/SongBook/Sympathy and Entertain You.pro");
// songs[27] = require("../assets/SongBook/Uptown Funk.pro");
// songs[28] = require("../assets/SongBook/am i ever gonna see your face again.pro");
// songs[29] = require("../assets/SongBook/The Chain.pro");
// songs[30] = require("../assets/SongBook/Another Brick In The Wall.pro");
// songs[31] = require("../assets/SongBook/Play That Funky Music.pro");
// songs[32] = require("../assets/SongBook/Lonely Boy.pro");
// songs[33] = require("../assets/SongBook/My Hero.pro");
// songs[34] = require("../assets/SongBook/Sex on fire.pro");
// songs[35] = require("../assets/SongBook/blister in the sun.pro");
// songs[36] = require("../assets/SongBook/Ive Got You On My Mind.pro");
// songs[37] = require("../assets/SongBook/Higher Ground.pro");
// songs[38] = require("../assets/SongBook/Superstition.pro");
// songs[39] = require("../assets/SongBook/Nutbush.pro");
// songs[40] = require("../assets/SongBook/Long Train Runnin.pro");
// songs[41] = require("../assets/SongBook/Smoke On the Water.pro");
// songs[42] = require("../assets/SongBook/Seven Nation Army.pro");
// songs[43] = require("../assets/SongBook/Whole Lotta Love.pro");
// songs[44] = require("../assets/SongBook/Rebel Yell.pro");
// songs[45] = require("../assets/SongBook/Rush You.pro");
// songs[46] = require("../assets/SongBook/Killing In The Name Of.pro");
// songs[47] = require("../assets/SongBook/One.pro");
// songs[48] = require("../assets/SongBook/Mustang Sally.pro");
// songs[49] = require("../assets/SongBook/Enter The Sandman.pro");
// songs[50] = require("../assets/SongBook/Sweet Home Alabama.pro");
// songs[51] = require("../assets/SongBook/Sympathy For The Devil.pro");
// songs[52] = require("../assets/SongBook/Hold The Line.pro");

//const jsongs = songs.map(v => JSON.parse(v));
/*
  //Load all the songs in the directory
  const r = require.context('../assets/SongBook/', true, /\.pro$/);
  r.keys().forEach(k => {
    songs[`${k}`] = r(k);
  });
  */

// import {  } from '../../vuex/getters'
// import {  } from '../../vuex/actions'
export default {
  props: {
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
    return {
      songs: songs
      // hideChords: false,
      // hideLyrics: false,
      // hideDirectives: false
    };
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
