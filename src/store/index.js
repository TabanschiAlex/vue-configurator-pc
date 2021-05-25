import Vue from "vue";
import Vuex from "vuex";
import api from "@/api/index";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    configList: [],
    selectedConfig: {},
    token: localStorage.getItem('token')
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
    },
    updateAuthorization(state, payload) {
      if (!payload || payload.status === 401 || payload.status === 422) {
        localStorage.clear();
        return state.token = undefined;
      }

      localStorage.setItem('token', payload.token);
      localStorage.setItem('username', payload.username);
      return state.token = payload.token;
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
        console.log(response)
      } catch (e) {
        console.log(e);
      }
    },
    async createConfig(context) {
      try {
        const response = await api.config.createConfig();
        context.commit("updateConfigList", response);
      } catch (e) {
        console.log(e)
      }
    },
    async makeLoginRequest(context, payload) {
      try {
        console.log(payload)
        const response = await api.auth.login(payload);
        context.commit("updateAuthorization", response);
      } catch (e) {
        console.log(e)
      }
    },
    async makeRegisterRequest(context, payload) {
      try {
        const response = await api.auth.register(payload);
        context.commit("updateAuthorization", response);
      } catch (e) {
        console.log(e)
      }
    },
    async logout(context) {
      context.commit("updateAuthorization", '');
    }
  },
  getters: {
    getConfigList(state) {
      return state.configList;
    },
    getSelectedConfig(state) {
      return state.selectedConfig;
    },
    getToken(state) {
      return state.token;
    }
  }
});
