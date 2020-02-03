<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list dense>
        <!-- <i href='https://materialdesignicons.com'>https://materialdesignicons.com</i> -->
        <v-list-item @click="showSongs">
          <v-list-item-action>
            <v-icon>mdi-library-music</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Songs</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="showSetLists">
          <v-list-item-action>
            <v-icon>mdi-playlist-music</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Set Lists</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="showChordPro">
          <v-list-item-action>
            <v-icon>mdi-pencil</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Edit Chord Pro</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="showChordSheet">
          <v-list-item-action>
            <v-icon>mdi-flash</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Convert Chord Sheet</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>


      <v-app-bar 
        app
        color="indigo darken-2"
        fixed
        dark
      >
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>Mojo Groove Setlists</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-switch color="green" v-model="chords" label="Chords">hello</v-switch>
        <v-switch color="green" v-model="lyrics" label="Lyrics"></v-switch>
      </v-app-bar>
      <br/>
      <br/>
      <br/>
      <br/>
      <!--pre>
        {{Object.keys(songs)}}
      </pre>
      <pre>
        {{setlists}}
      </pre-->
      <v-row v-if="mode === 'setlists'" align="center">
        <setLists :songs="songs" :setlists="setlists" :hideChords="!chords" :hideLyrics="!lyrics" :hideDirectives="!directives"></setLists>
      </v-row>
      <v-row v-if="mode === 'songs'" align="center">
        <songList :list="allSongs" :songs="songs" :hideChords="!chords" :hideLyrics="!lyrics" :hideDirectives="!directives"></songList>
        <!-- <allSongs :songs="songs" :hideChords="hideChords" :hideLyrics="hideLyrics" :hideDirectives="hideDirectives"></allSongs> -->
      </v-row>
      <v-row v-if="mode === 'chordsheet'" align="center">
        <chordSheet></chordSheet>
      </v-row>
      <v-row v-if="mode === 'chordpro'" align="center">
        <chordPro :hideChords="!chords" :hideLyrics="!lyrics" :hideDirectives="!directives"></chordPro>
      </v-row>
  </v-app>
</template>

<script>
import SetLists from "./SetLists.vue";
// import AllSongs from "./AllSongs.vue";
import SongList from "./SongList.vue";
import ChordSheet from "./ChordSheet.vue";
import ChordPro from "./ChordPro.vue";

const songs = {};
const setlists = {};

function importAll(r, cache) {
  r.keys().forEach(key => {
    const name = key.replace(/.(pro|cho|chordpro|lst|\/)/gi, "");
    if (name !== r(key)) cache[name.toLowerCase()] = r(key);
  });
}

importAll(require.context("../assets/SongBook", true, /\.pro$/), songs);
importAll(require.context("../assets/SongBook", true, /\.lst$/), setlists);

export default {
  components: {
    SetLists,
    SongList,
    ChordSheet,
    ChordPro
  },
  data() {
    return {
      drawer: false,
      chords: true,
      lyrics: true,
      directives: true,
      songs: songs,
      setlists: setlists,
      mode: "setlists"
    };
  },
  computed: {
    allSongs: function() {
      return Object.keys(this.songs).sort((a, b) => a > b);
    }
  },
  methods: {
    showSongs: function() {
      this.mode = "songs";
      this.drawer = false;
    },
    showSetLists: function() {
      this.mode = "setlists";
      this.drawer = false;
    },
    showChordSheet: function() {
      this.mode = "chordsheet";
      this.drawer = false;
    },
    showChordPro: function() {
      this.mode = "chordpro";
      this.drawer = false;
    }
  }
};
</script>

<style scoped>
.v-application {
  font-family: "Courier", Courier, serif, sans-serif !important;
  .title {
    font-family: "Courier", Courier, serif, sans-serif !important;
  }
}
</style>
