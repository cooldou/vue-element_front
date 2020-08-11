import request from '@/modules/request'

export default {
  namespaced: true,

  state: {
    loaded: false,
    items: []
  },

  mutations: {
    setItems(state, items) {
      state.loaded = true
      state.items = items.map(item => {
        return {
          name: item.name,
          address: item.jobSite,
          structureName: item.structureName,
          item: {
            oneRisk: item.oneRisk,
            twoRisk: item.twoRisk,
            threeRisk: item.threeRisk,
            fourRisk: item.fourRisk
          }
        }
      })
    }
  },

  actions: {
    async loadData({ commit }) {
      const items = await request.get('/api/v2/web/home/special')
      commit('setItems', await request.get('/api/v2/web/home/special'))
    }
  }
}
