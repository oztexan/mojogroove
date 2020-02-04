<template>
    <v-container fluid>
      <v-row>
        <v-col cols="12" md="6">
          <v-textarea
            filled
            name="Chord Sheet Input"
            label="Chord Sheet Input"
            hint="Input Chord Sheet Song"
            v-model="chordsheet"
            auto-grow
            clearable
            solo
          ></v-textarea>
        </v-col>
        <v-col cols="12" md="6">
          <v-textarea
            filled
            name="Chordpro Output"
            label="Chordpro Output"
            v-model="chordpro"
            auto-grow
            readonly
            solo
          ></v-textarea>
        </v-col>
      </v-row>
    </v-container>

</template>

<script>
import csg from "../ChordSheetGrammar";
// import {  } from '../../vuex/getters'
// import {  } from '../../vuex/actions'
export default {
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
      chordsheet: ""
    };
  },
  props: {
    state: {
      type: Object
    }
  },
  computed: {
    chordpro: function() {
      return csg(this.chordsheet);
    }
  },
  methods: {}
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

