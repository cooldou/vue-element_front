import merge from 'lodash/merge'
import request from '@/modules/request'
import listBase from '@/stores/list'

const baseURL = '/api/v2/workPicture'
const list = listBase({ url: baseURL })

export default merge(list, {
  namespaced: true,

  state: {
    chartData: {
      columns: ['name', 'oneRisk', 'twoRisk', 'threeRisk', 'fourRisk'],
      rows: []
    },
    chartDataDetail: {
      columns: ['twoName', 'oneRisk', 'twoRisk', 'threeRisk', 'fourRisk'],
      rows: []
    }
  },

  mutations: {
    setChartData(state, data) {
      state.chartData.rows = data
    },

    setChartDataDetail(state, data) {
      state.chartDataDetail.rows = data
    }
  },

  actions: {
    async dataLoad({ commit }) {
      const result = await request.get(`${baseURL}`)
      commit('setChartData', result)
    },

    async typeData({ commit }, params = {}){
      const result = await request.get(`${baseURL}/workPictureByWorkType`, {
        params : params
      })
      commit('setChartDataDetail', result)
    }
  }
})
