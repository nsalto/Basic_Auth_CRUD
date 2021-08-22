import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    users: [
    ],
    user: "",
    chatroomMessages: [],
  },
  mutations: {
    ADD_MESSAGE(state, payload) {
      state.chatroomMessages.push(payload)
    },
    REGISTER_USER(state, user){
      state.user = user
    },
    CONNECTED_USERS(state, users){
      state.users = users
    }
  },
});
