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
          v-model='openSong'
          multiple
        >
        <v-expansion-panel v-for="(s,i) in lowerSongs" :key="i">
          <v-expansion-panel-header style="text-transform: capitalize"><h3>{{i+1}}. {{s}}</h3></v-expansion-panel-header>
          <v-expansion-panel-content>
            <song :show="openSong.includes(i)" :song="state.songs[s]" :state="state"></song>
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
    state: {
      type: Object
    }
  },
  components: {
    Song
  },
  data() {
    return {
      openSong: []
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

