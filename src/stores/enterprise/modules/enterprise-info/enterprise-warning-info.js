import merge from 'lodash/merge'
import request from '@/modules/request'
import listBase from '@/stores/list'
const baseURL = '/api/v2/corporateComplianceWarning'
const list = listBase({ url: `${baseURL}/enterpriseWarningInformation` })

export default merge(list, {   //企业合规性预警
  namespaced: true,

  state: {
  },

  mutations: {
  },

  actions: {

    async loadTree({ commit }) { //获取预警信息树状数据
      return await request.get(`${baseURL}/enterpriseWarningInformationTree`)
    },

    async load({}, id) {
      return await request.get(`${baseURL}/showById/${id}`)
    }
  }
})
