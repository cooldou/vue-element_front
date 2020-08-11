import merge from 'lodash/merge'
import request from '@/modules/request'
import listBase from '@/stores/list'

const baseURL = '/api/v2/regionalRecord'
const list = listBase({url: `${baseURL}/regionalRecordList`})

// 区域风险管控台帐
export default merge(list, {
  namespaced: true,

  state: {
    list: {
      pageSize: 10
    }
  },

  mutations: {

  },

  actions: {
    async getTree () {
      //风险管控台账 - 树状结构数据
      return await request.get(`${baseURL}/regionalRecordTree`)
    }
  }
})
