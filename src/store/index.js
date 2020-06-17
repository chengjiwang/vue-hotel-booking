import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoading: false,
    rooms: [],
    room: {},
    disabledDate: [],
  },
  mutations: {
    LOADING(state, loading) {
      state.isLoading = loading;
    },
    ALL_ROOMS(state, rooms) {
      state.rooms = rooms;
    },
    ROOM(state, room) {
      state.room = room;
    },
    DISABLE_DATE(state, date) {
      state.disabledDate.push(date);
    },
    CLEAR_RESERVATION(state, value) {
      state.disabledDate = value;
    },
  },
  actions: {
    getAllRooms({ commit }) {
      const url = `${process.env.VUE_APP_APIPATH}/rooms`;
      commit('LOADING', true);
      axios.get(url).then((res) => {
        commit('ALL_ROOMS', res.data.items);
        commit('LOADING', false);
      });
    },
    getRoom({ commit }, roomId) {
      commit('ROOM', {});
      commit('LOADING', true);
      const url = `${process.env.VUE_APP_APIPATH}/room/${roomId}`;
      axios.get(url).then((res) => {
        commit('ROOM', res.data.room[0]);
        if (res.data.booking.length > 0) {
          commit('CLEAR_RESERVATION', []);
          res.data.booking.forEach((item) => {
            commit('DISABLE_DATE', item.date);
          });
        }
        commit('LOADING', false);
      });
    },
    clearReservation({ commit }, { vm }) {
      const url = `${process.env.VUE_APP_APIPATH}/rooms`;
      axios.delete(url).then((res) => {
        if (res.data.success) {
          commit('CLEAR_RESERVATION', []);
          vm.$snotify.success('清除預約成功', {
            timeout: 2000,
            showProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
          });
        }
      });
    },
  },
});
