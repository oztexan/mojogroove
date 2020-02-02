<template>
  <v-app id="inspire">
    <v-container grid-list-md text-xs-center>
      <v-toolbar fixed>
      <h1>Mojo Groove Set Lists</h1>
      <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn color="primary" @click="hideC">Chords</v-btn>
          <v-btn color="primary" @click="hideL">Lyrics</v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </v-container>
    <br><br>
    <v-container text-xs-center>
      <setLists :songs="songs" :setlists="setlists"></setLists>
    </v-container>
  </v-app>
</template>

<script>
import SetLists from "./SetLists.vue";

const songs = {};
const setlists = {};

function importAll(r, cache) {
  r.keys().forEach(key => (cache[key] = r(key)));
}

importAll(require.context("../assets/SongBook", true, /\.pro$/), songs);
importAll(require.context("../assets/SongBook", true, /\.lst$/), setlists);

export default {
  components: {
    SetLists
  },
  data() {
    return {
      hideChords: false,
      hideLyrics: false,
      hideDirectives: false,
      songs: songs,
      setlists: setlists
    };
  },
  methods: {
    hideC: function() {
      this.hideChords = !this.hideChords;
    },
    hideL: function() {
      this.hideLyrics = !this.hideLyrics;
    }
  }
};
</script>
