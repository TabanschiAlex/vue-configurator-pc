import Vue from "vue";
import Vuex from "vuex";
import api from "@/api/index";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    configList: [],
    selectedConfig: {}
  },
  mutations: {
    updateConfigList(state, payload) {
      state.configList = payload;
    },
    updateSelectedConfig(state, payload) {
      const elementsName = [
        "case",
        "mouse",
        "keyboard",
        "monitor",
        "motherboard",
        "psu"
      ];

      for (const elem of elementsName) {
        if (payload[elem] == null) {
          payload[elem] = [];
          continue;
        }

        payload[elem] = [payload[elem]];
      }

      state.selectedConfig = payload;
    }
  },
  actions: {
    async loadConfigList(context) {
      try {
        const response = await api.config.getConfigsList();
        context.commit("updateConfigList", response);
      } catch (e) {
        console.log(e);
      }
    },
    async loadSelectedConfig(context, id) {
      try {
        const response = await api.config.getConfigById(id);
        context.commit("updateSelectedConfig", response);
      } catch (e) {
        console.log(e);
      }
    }
  },
  getters: {
    getConfigList(state) {
      return state.configList;
    },
    getSelectedConfig(state) {
      return state.selectedConfig;
    }
  }
});
