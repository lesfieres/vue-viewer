import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);
const url = process.env.VUE_APP_ORIENT_EXPRESS_URL;

const state = {
  login: {
    user: null,
    token: null,
  },
};

const mutations = {
  SET_USER(state, payload) {
    state.login.user = payload.user;
    state.login.token = payload.token;
  },
};

const actions = {
  login({ commit }, { username, password }) {
    return axios
      .post(`${url}/login`, { username, password })
      .then(response => {
        commit('SET_USER', { user: username, token: response.data.token });
      })
      .catch(err => {
        console.error('Error logging in', err);
        throw new Error(err);
      });
  },
  register({ dispatch }, { username, password }) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${url}/register`, { username, password })
        .then(() => {
          dispatch('login', { username, password }).then(resolve);
        })
        .catch(reject);
    });
  },
  logout({ commit, state }) {
    return axios
      .get(`${url}/logout`, {
        headers: { Authorization: `Bearer ${state.login.token}` },
      })
      .catch(err => {
        console.error('Error logging out', err);
        throw new Error(err);
      })
      .finally(() => {
        commit('SET_USER', { user: null, token: null });
      });
  },
  users({ state }) {
    return axios
      .get(`${url}/users`, {
        headers: { Authorization: `Bearer ${state.login.token}` },
      })
      .then(response => {
        return response.data;
      })
      .catch(err => {
        console.error('Error getting users', err);
        throw new Error(err);
      });
  },
};

const getters = {
  loggedIn: state => state.login.user !== null,
  username: state => state.login.user,
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
});
