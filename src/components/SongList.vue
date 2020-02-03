<template>
  <div>
    <!--pre>
      {{this.lowerSongs}}
    </pre-->
    <v-row align="center">
        <v-expansion-panels 
          accordion
          inset
          focusable
          v-model='openSong'>
        <v-expansion-panel v-for="(s,i) in lowerSongs" :key="i">
          <v-expansion-panel-header style="text-transform: capitalize"><h3>{{i+1}}. {{s}}</h3></v-expansion-panel-header>
          <v-expansion-panel-content>
            <song :show="i===openSong" :song="songs[s]" :hideChords="hideChords" :hideLyrics="hideLyrics" :hideDirectives="hideDirectives"></song>
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
    return {
      openSong: null
    };
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

