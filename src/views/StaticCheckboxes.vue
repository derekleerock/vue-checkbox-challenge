<template>
  <div class="static-checkbox-example">
    <h1>Static Checkbox List Example</h1>

    <div>
      <!-- Check/uncheck all checkboxes -->
      <input type="checkbox" id="check-all-id" v-model="allOptionsChecked" @change="checkAllChanged">
      <label for="check-all-id"><b>Check All</b></label>
      <br>

      <!-- Events fired in order: click, input, change.  -->
      <input
        type="checkbox"
        id="jane-id"
        value="jane"
        v-model="staticCheckboxesStatus['jane']"
        @change="didChangeCheckboxValue"
      >
      <label for="jane-id">Jane</label>
      <br>

      <input
        type="checkbox"
        id="jen-id"
        value="jen"
        v-model="staticCheckboxesStatus['jen']"
        @change="didChangeCheckboxValue"
      >
      <label for="jen-id">Jen</label>
      <br>

      <input
        type="checkbox"
        id="nat-id"
        value="nat"
        v-model="staticCheckboxesStatus['nat']"
        @change="didChangeCheckboxValue"
      >
      <label for="nat-id">Nat</label>

      <br>
      <span>Checkbox Status: {{ staticCheckboxesStatus }}</span>
    </div>

  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: 'Static Checkboxes',

    components: {},

    data: () => {
      return {
        // Local data boolean to manage the on/off status for the "Check All" checkbox:
        allOptionsChecked: false,

        // Local data object to manage the on/off status for all individual checkbox options
        staticCheckboxesStatus: {},
      }
    },

    computed: {
      ...mapGetters([
        'getStaticCheckboxStatus'
      ]),
    },

    methods: {
      // Event used for when the "Check All" checkbox value is changed
      checkAllChanged: function (event) {
        // Loop through all options and mark them as checked or unchecked based on the
        //    value of the "Check All" checked attribute.
        for (let key in this.staticCheckboxesStatus) {
          this.staticCheckboxesStatus[key] = event.target.checked
        }
      },

      // Event used for anytime a checkbox value is changed
      didChangeCheckboxValue: function (event) {
        console.log(`didChangeCheckboxValue: name/value = ${event.target.name}/${event.target.value} (checked: ${event.target.checked})`)

        // Based on this checkbox being checked, should the "Check All" checkbox be updated?
        this.setAllOptionsChecked()

        // Send the data to the Vuex store.
        this.$store.dispatch('saveStaticCheckboxesStatusAction', this.staticCheckboxesStatus)
      },

      // Loop through all options and check to see if they are all on or off and
      //    update the 'all' checkbox to match.
      setAllOptionsChecked: function () {
        // Start with the assumption that we should check the "Check All" checkbox
        let areAllOptionsCheckedNowOrNot = true

        // Loop through all checkbox options and if we find any that are not checked,
        //    then we should set the `areAllOptionsCheckedNowOrNot` value to false.
        for (let key in this.staticCheckboxesStatus) {
          if (this.staticCheckboxesStatus[key] === false) {
            areAllOptionsCheckedNowOrNot = false
          }
        }

        // Set the value for the "Check All" checkbox based on this logic.
        this.allOptionsChecked = areAllOptionsCheckedNowOrNot
      }
    },

    beforeMount: function () {
      // When we first initialize this component, get the current values from the store.
      this.staticCheckboxesStatus = this.getStaticCheckboxStatus

      // Based on the initial checkbox statuses, should the "Check All" checkbox be on or off?
      this.setAllOptionsChecked()
    },
  }

</script>
