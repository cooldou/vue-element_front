import request from '@/modules/request'
import dayjs from 'dayjs'

const baseURL = '/api/v2/modelFourColor'

export default {
  namespaced: true,

  state: {

  },

  mutations: {

  },


  actions: {
    // 风险统计
    async getModelRiskPoint ({ commit }, params) {
        return await request.get(`${baseURL}/listByModel`, {
          params: params
        })
    }
  }
}
