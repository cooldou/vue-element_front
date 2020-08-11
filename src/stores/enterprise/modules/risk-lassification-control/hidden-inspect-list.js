import merge from 'lodash/merge'
import request from '@/modules/request'
import listBase from '@/stores/list'
// 隐患排查清单
const baseURL = '/api/v2/hiddenDangerListing'
const baseRiskURL = '/api/v2/regionalRisk'
const list = listBase({url: `${baseURL}/coRiskAssessment`})


export default merge(list, {
  namespaced: true,

  state: {

  },

  mutations: {
    updateItemStatus(state, { id, status }) {
      const item = state.list.items.find(item => item.id === id)
      if (item) item.status = status
    }
  },

  actions: {
    async updateStatus({ commit }, { id, status }) {
      await request.put(`${baseRiskURL}/updateCoRiskAssessment/${id}`, { status })
      commit('updateItemStatus', { id, status })
    },
  }
})
