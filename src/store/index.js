import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  actions: {
    saveCheckboxStatusAction: (context, checkedObject) => {
      context.commit('saveCheckboxStatusMutation', checkedObject)
    },
  },

  mutations: {
    saveCheckboxStatusMutation: (state, checkedObject) => {
      state.checkedObject = checkedObject
    }
  },

  state: {
    checkedObject: {
      jane: false,
      jen: false,
      nat: false,
    },
  },

  getters: {
    getCheckedObject: (state) => {
      return state.checkedObject
    }
  },

  modules: {
  }
})
