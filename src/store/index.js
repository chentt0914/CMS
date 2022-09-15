import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    menuList:'',
    userList:[],
    editUserInfo:{},

    goodsCount:[],
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {},
});
