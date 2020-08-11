import merge from 'lodash/merge'
import request from '@/modules/request'
import listBase from '@/stores/list'
// 共用接口
const baseUrl = '/api/v2/listingGeneral'

const list = listBase({url: `${baseUrl}/showParameterByThree`})

export default merge(list, {
  namespaced: true,

  actions: {

  // 岗位责任清单、作业责任清单 listData()也是
  // 岗位责任清单、作业责任清单 详情
    async load ({}, params) {
      return await request.get(`${baseUrl}/listingDetails`, {
        params: params
      })
    },
    // 清单通用 台账详情
    async loadLedgerDetail({}, params) {
      return await request.get(`${baseUrl}/show`, {
        params: params
      })
    }
  }
})
