import dayjs from 'dayjs'
import request from '@/modules/request'

export default {
  namespaced: true,

  state: {
    loading: false,
    enterprise: {},
    chartData: {}
  },

  mutations: {
    setLoading(state, loading = true) {
      state.loading = loading
    },

    setEnterpriseData(state, data) {
      state.enterprise = {
        id: data.id,
        name: data.enterpriseName
      }
    },

    setChartData(state, data) {
      const columns = ['date', 'risk', 'hiddenDanger']
      const rows = data.map(item => {
        return {
          date: dayjs(item.dayDate).format('MM-DD'),
          risk: item.riskCount,
          hiddenDanger: item.hiddenCount
        }
      })

      state.chartData = { columns, rows }
    }
  },

  actions: {
    async loadData({ commit }) {
      commit('setLoading')

      const result = await request.get(
        '/api/v2/home/riskHiddenDangerTendency?num=30'
      )
      commit('setLoading', false)
      commit('setChartData', result)
    }
  }
}
