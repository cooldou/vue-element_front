import request from '@/modules/request'

export default {
  namespaced: true,

  state: {
    loaded: false,

    riskChart: {
      columns: ['level', 'count'],
      rows: []
    },

    hiddenDangerChart: {
      columns: ['level', 'count'],
      rows: []
    },

    controlProgress: {
      finished: 0,
      unfinished: 0
    },

    personalProgress: {
      finished: 0,
      unfinished: 0
    }
  },

  mutations: {
    setData(state, data) {
      state.loaded = true
      
      state.riskChart.rows = [
        { level: '重大', count: data.risk.oneRisk },
        { level: '较大', count: data.risk.twoRisk },
        { level: '一般', count: data.risk.threeRisk },
        { level: '低', count: data.risk.fourRisk },
        { level: '待确定', count: data.risk.toBeDetermined }
      ]

      state.hiddenDangerChart.rows = [
        { level: '重大', count: data.hidden.majorHazard },
        { level: '一般', count: data.hidden.generalHazard },
        { level: '待确定', count: data.hidden.toBeDetermined }
      ]

      Object.assign(state.controlProgress, data.controls)
      Object.assign(state.personalProgress, data.commitment)
    }
  },

  actions: {
    async loadData({ commit }) {
      commit('setData', await request.get('/api/v2/web/home/progress'))
    }
  }
}
