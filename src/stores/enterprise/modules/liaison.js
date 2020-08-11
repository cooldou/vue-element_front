import request from '@/modules/request'

const baseURL = '/api/v2/GEDialogue'
export default {
  namespaced: true,
  state: {
    items: []
  },

  mutations: {
    setData (state, data) {
      state.items = data
    }
  },

  actions: {
    async loadListData({ state, commit }) {
      const result = await request.get(baseURL)
      commit('setData', result)
    },

    async create({ dispatch }, formData) {
      try {
        await request.post(baseURL, formData)
        await dispatch('loadListData')
      } catch (err) {}
    }
  }
}
