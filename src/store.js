import Vue from 'vue'
import Vuex from 'vuex'
import { login, logout, getInfo } from './api/user'
import { getToken, setToken, removeToken, setUserInfo, removeUserInfo } from './utils/auth'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        token: getToken(),
        name: '',
        avatar: ''
    },
    getters: {
        token: state => state.token,
        avatar: state => state.avatar,
        name: state => state.name
    },
    mutations: {
        RESET_STATE: (state) => {
            state.token = ''
            state.name = ''
            state.avatar = ''
        },
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        SET_USERINFO: (state, userInfo) => {
            state.name = userInfo.name
            state.avatar = userInfo.avatar
        },
    },
    actions: {
        login({ commit }, loginForm) {
            const { username, password } = loginForm
            return new Promise((resolve, reject) => {
                login({ username: username.trim(), password: password }).then(response => {
                    const { data } = response
                    commit('SET_TOKEN', data.token)
                    setToken(data.token)
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },
        getInfo({ commit, state }) {
            return new Promise((resolve, reject) => {
                getInfo(state.token).then(response => {
                    const { data } = response

                    if (!data) {
                        reject('Verification failed, please Login again.')
                    }

                    const { userInfo } = data
                    commit('SET_USERINFO', userInfo)
                    setUserInfo(userInfo)
                    resolve(data)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        logout({ commit, state }) {
            return new Promise((resolve, reject) => {
                logout(state.token).then(() => {
                    removeToken() // must remove  token  first
                    removeUserInfo()
                    commit('RESET_STATE')
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },
        // remove token
        resetToken({ commit }) {
            return new Promise(resolve => {
                removeToken() // must remove  token  first
                commit('RESET_STATE')
                resolve()
            })
        }
    }
})

export default store