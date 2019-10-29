const state = {
  token:'',
}
const mutations = {
  setToken:(state,data) => {
    state.token = data
  },
  deleteToken:(state,data) => {
    state.token = ''
  }
}
const actions = {

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}