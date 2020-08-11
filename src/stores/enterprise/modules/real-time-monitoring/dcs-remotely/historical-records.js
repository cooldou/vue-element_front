import merge from 'lodash/merge'
import request from '@/modules/request'
import listBase from '@/stores/list'

const baseURL = '/api/v2/HardwareHistory/abnormalDataList'
// const list = listBase({ url: baseURL })

export default ( {
  namespaced: true,
  state: {
    historyData: {
      columns: ['createDate', 'result'],
      rows: []
    }
  },
  mutations: {
    setHistoryData (state, data) {
      state.historyData.rows = data
    }
  },
  actions: {
    //根据报警或预警设备编号查看该设备相关数据
    async loadData({ commit }, params) {
      const result = await request.get(baseURL, {
        params: params
      })
      // commit('setHistoryData', result)
      return result
    }
  }
})
