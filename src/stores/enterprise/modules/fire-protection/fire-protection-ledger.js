import merge from 'lodash/merge'
import request from '@/modules/request'
import listBase from '@/stores/list'
import axios from 'axios'
import { getSession, clearSession } from '@/modules/authentication'
import { getAPIBaseURL } from '@/modules/utils'
import { MessageBox } from 'element-ui'


const list = listBase({ url: '/api/v2/fireInspectionLedger/fireInspectionLedgerList' })

const baseURL = '/api/v2/fireInspectionLedger'

export default merge(list, {
  namespaced: true,

  state: {
    baseConfig: {
      // headers: {'Authorization': getSession().token},
      baseURL: getAPIBaseURL()
    },
  },

  mutations: {
    interceptors (state) {
      axios.interceptors.response.use(function (response) {
        return response;
      }, (response) => {
        MessageBox.alert('没有找到您需要导出的数据', '错误提示')
      });
    },
  },

  actions: {
    //树状图
    async loadTree () {
      return request.get(`${baseURL}/treeList`)
    },
    //列表详情
    async loadDetail ({},{ bookId }) {
      return request.get(`${baseURL}/riskTimingBookShow`, { params: { bookId: bookId } })
    },
    async exportDetail ({state, commit},{ bookId }) {
      // return request.get(`${baseURL}/inspectionDetails`, { params: { bookId: bookId } })
      commit('interceptors')
      const response = await axios.get(`${baseURL}/inspectionDetails`, merge({
        headers: {'Authorization': getSession().token},
        params: {bookId}
      }, state.baseConfig))
      return response
    },
  }
})