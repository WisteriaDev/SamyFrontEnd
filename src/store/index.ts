import { createStore } from 'vuex'

const axios = require('axios');
const instance = axios.create({
  baseURL: 'http://localhost:3000/api/'
});

let token = localStorage.getItem('token');
if (!token) {
 token = ''
 console.log('No token')
} else {
  console.log('Token assign at store')
}

export default createStore({
  state: {
    status: '',
    token: token,
  },
  getters: {
  },
  mutations: {
    setStatus: function (state, status) {
      state.status = status;
    },
    setToken: function (state, token) {
      state.token = token;
    },
  },
  actions: {
    createAccount: ({commit}, userInfos) =>{
      commit('setStatus', 'loading');
      return new Promise ((resolve, reject) => {
        console.log(userInfos);
        instance.post('/user/register', userInfos)
        .then(function (response: any) {
          commit('setStatus', '');
          resolve(response);
        })
        .catch(function (error: any) {
          reject(error);
        });
      });
    }
  },
  modules: {
  }
})
