import merge from 'lodash/merge'
import request from '@/modules/request'
import listBase from '@/stores/list'

const baseUrl = '/api/v2/recordGeneralAPI'
// 区域风险管控台帐
export default {
  namespaced: true,

  mutations: {

  },

  actions: {
    //风险管控台账 - 管控详情(只争对定时作业)
    async load ({}, params) {
      return await request.get(`${baseUrl}/riskTimingBookShow`, {
        params: params
      })
    },
    //风险管控台账 - 导出接口
    async exportLoad ({}, params) {
      return await request.get(`${baseUrl}/exportDetails`, {
        params: params
      })
    },
    // 带工作流的详情
    async loadControlFlow ({}, params) {
      return await request.get(`${baseUrl}/detailsByBookId`, {
        params: params
      })
    }
  }
}
