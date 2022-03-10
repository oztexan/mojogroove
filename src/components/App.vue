<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="state.drawer"
      app
    >
      <v-list dense>
        <!-- <i href='https://materialdesignicons.com'>https://materialdesignicons.com</i> -->
        <v-list-item @click="mode('songs')">
          <v-list-item-action>
            <v-icon>mdi-library-music</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Songs</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="mode('setlists')">
          <v-list-item-action>
            <v-icon>mdi-playlist-music</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Set Lists</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="mode('chordpro')">
          <v-list-item-action>
            <v-icon>mdi-pencil</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Edit Chord Pro</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="mode('chordsheet')">
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
        <v-app-bar-nav-icon @click.stop="state.drawer = !state.drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>Mojo Groove Setlists</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-switch color="green" v-model="state.showChords" label="Chords">hello</v-switch>
        <v-switch color="green" v-model="state.showLyrics" label="Lyrics"></v-switch>
        <v-switch color="green" v-model="state.showDirectives" label="Directives"></v-switch>
        <v-switch color="green" v-model="state.showDebug" label="Debug"></v-switch>
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
      <v-row v-if="state.mode === 'setlists'" align="center">
        <setLists :state="state"></setLists>
      </v-row>
      <v-row v-if="state.mode === 'songs'" align="center">
        <songList :list="allSongs" :state="state"></songList>
      </v-row>
      <v-row v-if="state.mode === 'chordsheet'" align="center">
        <chordSheet></chordSheet>
      </v-row>
      <v-row v-if="state.mode === 'chordpro'" align="center">
        <chordPro :state="state"></chordPro>
      </v-row>
  </v-app>
</template>

<script>
import SetLists from "./SetLists.vue";
import SongList from "./SongList.vue";
import ChordSheet from "./ChordSheet.vue";
import ChordPro from "./ChordPro.vue";

const songs = {};
const setlists = {};

function importAll(r, cache) {
  r.keys().forEach((key) => {
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
    ChordPro,
  },
  data() {
    return {
      state: {
        showChords: true,
        showLyrics: true,
        showDirectives: true,
        showDebug: false,
        songs: songs,
        setlists: setlists,
        mode: "setlists",
        drawer: false,
      },
    };
  },
  computed: {
    allSongs: function () {
      return Object.keys(this.state.songs).sort((a, b) => a > b);
    },
  },
  methods: {
    mode: function (mode) {
      this.state.mode = mode;
      this.state.drawer = false;
    },
  },
};
</script>

<style scoped>
.v-application {
  font-family: "Courier", Courier, serif, sans-serif !important;
  .title {
    font-family: "Verdana", Verdana, serif, sans-serif !important;
  }
}
</style>
