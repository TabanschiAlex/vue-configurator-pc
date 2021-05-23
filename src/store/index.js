import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    configList: undefined
  },
  mutations: {
    SET_CONFIGS (state, payload) {
      state.configList = payload
    }
  },
  actions: {
    async loadConfigs ({ commit }) {
      commit('SET_CONFIGS', await this.$api.config.getConfigs())
    }
  },
  modules: {
  }
})
