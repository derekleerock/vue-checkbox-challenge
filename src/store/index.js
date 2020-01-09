import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  actions: {
    saveStaticCheckboxesStatusAction: (context, staticCheckboxesStatus) => {
      context.commit('saveStaticCheckboxesStatusMutation', staticCheckboxesStatus)
    },
  },

  mutations: {
    saveStaticCheckboxesStatusMutation: (state, staticCheckboxesStatus) => {
      state.staticCheckboxesStatus = staticCheckboxesStatus
    }
  },

  state: {
    // Maintains the status of all static checkboxes. It's important that we initialize
    //    this object with all possible keys otherwise the logic for selecting/unselecting
    //    all checkboxes will not work properly.
    staticCheckboxesStatus: {
      jane: false,
      jen: false,
      nat: false,
    },
  },

  getters: {
    // Allows the component to get this value when the component is initialized in order to
    //    ensure that the UI displays the most up-to-date data when navigating back to a page
    //    that needs to display this information.
    getStaticCheckboxStatus: (state) => {
      return state.staticCheckboxesStatus
    }
  },

  modules: {
  }
})
