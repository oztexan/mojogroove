<template>
    <v-container fluid>
      <v-row>
        <v-col cols="12" md="6">
          <v-textarea
            filled
            name="Chord Pro Input"
            label="Chord Pro Input"
            hint="Edit Chord Pro Song"
            v-model="chordpro"
            auto-grow
            clearable
            solo
          ></v-textarea>
        </v-col>
        <v-col cols="12" md="6">
          <song :show=true :song="song" :state="state"></song>
        </v-col>
      </v-row>
    </v-container>

</template>

<script>
import cpg from "../ChordProGrammar";
import Song from "./Song.vue";
// import {  } from '../../vuex/getters'
// import {  } from '../../vuex/actions'
export default {
  components: {
    Song
  },

  /*
  vuex: {
        getters: {
        },
        actions: {
        }
    },
    data () {
        return {
        }
    },
  */
  data() {
    return {
      chordpro: ""
    };
  },
  props: {
    state: {
      type: Object
    }
  },
  computed: {
    song: function() {
      return cpg(this.chordpro);
    }
  }
  /*
  watch: {
  },
  computed: {
  },
  events: {
  },
  ready () {
  },
  components: {
  }
  */
};
</script>

