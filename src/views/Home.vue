<template>
  <div class="home">
    <h1>Home Page</h1>

    <div id='checkbox-example'>
      <!-- Check/uncheck all checkboxes -->
      <input type="checkbox" id="check-all-id" v-model="allOptionsChecked" @change="checkAllChanged">
      <label for="check-all-id"><b>Check All</b></label>
      <br>

      <!-- Events fired in order: click, input, change.  -->
      <input type="checkbox" id="jane-id" value="jane" v-model="checkedObject['jane']" @change="ex3Changed">
      <label for="jane-id">Jane</label>
      <br>

      <input type="checkbox" id="jen-id" value="jen" v-model="checkedObject['jen']" @change="ex3Changed">
      <label for="jen-id">Jen</label>
      <br>

      <input type="checkbox" id="nat-id" value="nat" v-model="checkedObject['nat']" @change="ex3Changed">
      <label for="nat-id">Nat</label>

      <br>
      <span>Checked names: {{ checkedObject }}</span>
    </div>

  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: 'home',

    components: {},

    data: () => {
      return {
        allOptionsChecked: false,
        checkedObject: {},
      }
    },

    computed: {
      ...mapGetters([
        'getCheckedObject'
      ]),
    },

    methods: {
      checkAllChanged: function (event) {
        console.log(`checkAllChanged: name/value = ${event.target.name}/${event.target.value} (checked: ${event.target.checked})`)
        for (let key in this.checkedObject) {
          const value = this.checkedObject[key]
          console.log(`key/value: ${key}/${value}`)
          this.checkedObject[key] = event.target.checked
        }
      },

      ex3Changed: function (event) {
        console.log(`ex3Changed: name/value = ${event.target.name}/${event.target.value} (checked: ${event.target.checked})`)

        this.setAllOptionsChecked()

        this.$store.dispatch('saveCheckboxStatusAction', this.checkedObject)
      },

      setAllOptionsChecked: function () {
        // Loop through all options and check to see if they are all on or off and update the 'all' checkbox the same.

        if (Object.keys(this.checkedObject).length === 0) {
          this.allOptionsChecked = false
          return
        }

        let areAllOptionsCheckedNowOrNot = true
        for (let key in this.checkedObject) {
          if (this.checkedObject[key] === false) {
            areAllOptionsCheckedNowOrNot = false
          }
        }
        this.allOptionsChecked = areAllOptionsCheckedNowOrNot
      }
    },

    beforeMount: function () {
      this.checkedObject = this.getCheckedObject

      this.setAllOptionsChecked()
    },
  }


</script>
