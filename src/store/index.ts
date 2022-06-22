import { createStore, Store } from 'vuex'

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
    username: '',
    wins: '',
    losses: '',
    games: '',
    id: '',
    date: ''
  },
  getters: {
    getUsername: function (state) {
      return state.username
    }
  },
  mutations: {
    setStatus: function (state, status) {
      state.status = status
    },
    setToken: function (state, token) {
      state.token = token
    },
    setUsername: function (state, username) {
      state.username = username
    },
    setWins: function (state, wins) {
      state.wins = wins
    },
    setLosses: function (state, losses) {
      state.losses = losses
    },
    setGames: function (state, games) {
      state.games = games
    },
    setId: function (state, id) {
      state.id = id
    },
    setDate: function (state, date) {
      state.date = date
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
    },
    renameAccount: ({commit}, userInfos) =>{
      commit('setStatus', 'loading');
      return new Promise ((resolve, reject) => {
        var config = {headers:{'auth-token': localStorage.getItem('token')}}
        console.log(userInfos);
        instance.post('/user/rename', userInfos, config)
        .then(function (response: any) {
          commit('setStatus', '');
          resolve(response);
        })
        .catch(function (error: any) {
          reject(error);
        });
      });
    },
    getInfos: ({commit}) => {
      return new Promise ((resolve, reject) => {
        var config = {headers:{'auth-token': localStorage.getItem('token')}}
        instance.get('/user/info', config)
        .then(function (response: any) {
        commit('setUsername', response.data.username);
        commit('setWins', response.data.wins);
        commit('setLosses', response.data.losses);
        commit('setGames', response.data.games);
        commit('setId', response.data._id);
        commit('setDate', response.data.date);
        resolve(response);
        })
        .catch(function (error: any) {
          reject(error);
        });
      });
      
    },
    deleteAccount: ({commit}) => {
      return new Promise ((resolve, reject) => {
        var config = {headers:{'auth-token': localStorage.getItem('token')}}
        instance.get('/user/delete', config)
        .then(function (response: any) {
        commit('setUsername', '');
        commit('setWins', '');
        commit('setLosses', '');
        commit('setGames', '');
        commit('setId', '');
        commit('setDate', '');
        commit('setToken', '');
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
