<template>
  <div>
    <v-row align="center">
      <v-expansion-panels  
      accordion
      popout
      focusable 
    >
        <v-expansion-panel v-for="(s,i) in sortedSetLists" :key="i">
          <v-expansion-panel-header style="text-transform: capitalize"><h2>{{s}}</h2></v-expansion-panel-header>
          <v-expansion-panel-content>
            <songList :list="state.setlists[s].songs" :state="state"></songList>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-row>
  </div>
</template>

<script>
import SongList from "./SongList.vue";

// import {  } from '../../vuex/getters'
// import {  } from '../../vuex/actions'
export default {
  props: {
    state: {
      type: Object
    }
  },
  components: {
    SongList
  },
  data() {
    return {};
  },
  computed: {
    sortedSetLists: function() {
      return Object.keys(this.state.setlists).sort(
        (a, b) => parseInt(b) - parseInt(a)
      );
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

