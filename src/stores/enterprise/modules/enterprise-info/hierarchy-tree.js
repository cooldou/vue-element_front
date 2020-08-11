import request from '@/modules/request'

export default {
  namespaced: true,

  state: {
    loading: true,
    items: []
  },

  mutations: {
    updateItems(state, items) {
      Object.assign(state, { items, loading: false })
    }
  },

  actions: {
    async loadItems({ commit }) {
      const result = await request.get('/api/v2/companyConfiguration/CoStructureTree')
      commit('updateItems', result)
    },

    async loadList() {
      return await request.get('/api/v2/companyConfiguration/listStructureAll')
    }
  }
}
