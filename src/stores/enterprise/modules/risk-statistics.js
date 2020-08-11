import request from '@/modules/request'

export default {
  namespaced: true,

  state: {
    loaded: false,

    summary: {
      totalCount: 0,
      runningCount: 0,
      shutdownCount: 0
    },

    items: []
  },

  mutations: {
    setSummary(state, summary) {
      state.loaded = true
      Object.assign(state.summary, summary)
    },

    setItems(state, items) {
      state.items = items.map(item => {
        const { oneRisk, twoRisk, threeRisk, fourRisk, riskToBeDetermined } = item
        const { majorHazard, generalHazard, hiddenToBeDetermined } = item
        const total = item.finished + item.unfinished

        return {
          name: item.riskName,
          progress: total > 0 ? parseFloat((item.finished * 100 / total).toFixed(2)) : 100,
          shutdown: item.status === 0,
          riskData: {
            oneRisk, twoRisk, threeRisk, fourRisk, toBeDetermined: riskToBeDetermined
          },
          hiddenDangerData: {
            majorHazard, generalHazard, toBeDetermined: hiddenToBeDetermined
          }
        }
      })
    }
  },

  actions: {
    async loadData({ commit }) {
      const result = await request.get('/api/v2/web/home/noticeDetail')

      commit('setSummary', {
        totalCount: result.totalCount,
        runningCount: result.run,
        shutdownCount: result.shutdown
      })
      commit('setItems', result.riskList)
    }
  }
}
