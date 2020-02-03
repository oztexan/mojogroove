<template>
  <v-app id="inspire">
    <v-card class="overflow-hidden">
      <v-app-bar 
        color="indigo darken-2"
        fixed
        dark
      >
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
      <v-row align="center">
        <setLists :songs="songs" :setlists="setlists" :hideChords="!chords" :hideLyrics="!lyrics" :hideDirectives="!directives"></setLists>
      </v-row>
    </v-card>
  </v-app>
</template>

<script>
import SetLists from "./SetLists.vue";

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
    SetLists
  },
  data() {
    return {
      chords: true,
      lyrics: true,
      directives: true,
      songs: songs,
      setlists: setlists
    };
  }
};
</script>
