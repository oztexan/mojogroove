<template>
  <v-app id="inspire">
    <v-container grid-list-md text-xs-center>
      <v-toolbar fixed>
      <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn color="primary" @click="hideC">Chords</v-btn>
          <v-btn color="primary" @click="hideL">Lyrics</v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </v-container>
    <br><br>
    <v-container text-xs-center>
      <songList :hideChords="hideChords" :hideLyrics="hideLyrics" :hideDirectives="hideDirectives"></songList>
    </v-container>
  </v-app>
</template>

<script>
  import SongList from './SongList.vue';

  export default {
    components: {
      SongList
    },
    data() {
      return {
        hideChords: false,
        hideLyrics: false,
        hideDirectives: false,
      }
    },
    methods: {
      hideC: function() {
        this.hideChords = !this.hideChords;
      },
      hideL: function() {
        this.hideLyrics = !this.hideLyrics;
      }
    }
  }
</script>
