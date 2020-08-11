import request from '@/modules/request'

const baseURL = '/api/v2/web/home/notice'

export default {
  namespaced: true,

  state: {
    notice: {}
  },

  mutations: {
    setNotice(state, notice) {
      state.notice = notice
    }
  },

  actions: {
    async load({ commit }) {
      commit('setNotice', await request.get(baseURL))
    },

    async update({ dispatch }, { id, formData }) {
      await request.post(`${baseURL}/${id}`, formData)
      dispatch('load')
    }
  }
}
