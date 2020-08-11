import merge from 'lodash/merge'
import request from '@/modules/request'
import listBase from '@/stores/list'
import { each } from 'lodash'
import axios from 'axios'
import { getSession, clearSession } from '@/modules/authentication'
import { getAPIBaseURL } from '@/modules/utils'
import { MessageBox } from 'element-ui'

// 双控导出
const baseURL = '/api/v2/listExport'
const detailURl = '/api/v2/detailsExport'
const list = listBase({ url: `${baseURL}` })

// 隐患治理台账批量导出
// const exportURL = '/api/v2/listExport/checkGovernanceRecordListExport'

export default merge(list, {
  namespaced: true,

  state: {
    publicParams: {},
    baseConfig: {
      // headers: {'Authorization': getSession().token},
      baseURL: getAPIBaseURL()
    },
    isloading: false
  },

  mutations: {
    interceptors (state) {
      axios.interceptors.response.use(function (response) {
        return response;
      }, (response) => {
        MessageBox.alert('没有找到您需要导出的数据', '错误提示')
      });
    },
    setLoading (state) {
      state.isloading = true
    },
    setLoaded (state) {
      state.isloading = false
    }
  },

  actions: {
    //隐患类型下拉选
    async getRiskType({}) {
      return await request.get(`${baseURL}/gethiddenTypesAll`)
    },
    //节假日下拉选
    async getHoliday({}) {
      return await request.get(`${baseURL}/getHolidayTimeAll`)
    },
    //隐患治理台账导出
    async outPutFile({state, commit},{url, data}) {
      const {startAt, endAt, holidayTime, riskId, type, hiddenTypes, status} = data
      commit('setLoading')
      commit('interceptors')
      const response = await axios.get(`${baseURL}/${url}`, merge({
        headers: {'Authorization': getSession().token},
        params: {startAt, endAt, holidayTime, riskId, type, hiddenTypes, status}
      }, state.baseConfig))
      commit('setLoaded')
      return response
    },
    // 隐患治理台账批量导出
    async batchExport({ commit }, params) {
      commit('setLoading')
      const result = await request.get('/api/v2/listExport/checkGovernanceRecordListExport', {
        params: params
      })
      commit('setLoaded')
      return result
    },

    //岗位人员下拉选
    async getStaff({}) {
      return await request.get(`${baseURL}/getUserAll`)
    },

    //风控承诺进度导出
    async promiseFile({state, commit},{url, params}) {
      commit('setLoading')
      commit('interceptors')
      const response = await axios.get(`${baseURL}/${url}`, merge({
        headers: {'Authorization': getSession().token},
        params: params
      }, state.baseConfig))
      commit('setLoaded')
      return response
    },

    //历史承诺台账导出
    async historyFile({state, commit}, params) {
      commit('setLoading')
      commit('interceptors')
      const response = await axios.get(`${baseURL}/commitmentStatistical`, merge({
        params: params,
        headers: {'Authorization': getSession().token},
      }, state.baseConfig))
      commit('setLoaded')
      return response
    },

    //岗位下拉选
    async getStructure({}) {
      return await request.get(`${baseURL}/getStructureAll`)
    },

    //区域风险管控台账导出
    async areaFile({state, commit},{url,data}) {
      const {startAt, endAt, structureId, riskId, status, threeId} = data
      commit('setLoading')
      commit('interceptors')
      const response = await axios.get(`${baseURL}/${url}`, merge({
        headers: {'Authorization': getSession().token},
        params: {startAt, endAt, structureId, riskId, status, threeId}
      }, state.baseConfig))
      commit('setLoaded')
      return response
    },

    //作业风险管控台账导出
    async workFile({state, commit},{url,data}) {
      const {startAt, endAt, workType, riskId, status} = data
      commit('setLoading')
      commit('interceptors')
      const response =  await axios.get(`${baseURL}/${url}`, merge({
        headers: {'Authorization': getSession().token},
        params: {startAt, endAt, workType, riskId, status}
      }, state.baseConfig))
      commit('setLoaded')
      return response
    },

    //各页面详情导出
    async detailFile({state, commit},{url, bookId, threeId}) {
      commit('interceptors')
      const response = await axios.get(`${detailURl}/${url}`, merge({
        headers: {'Authorization': getSession().token},
        params: {bookId, threeId}
      }, state.baseConfig))
      return response
    },

    //风险辨识评估列表导出
    async assessmentFile({state, commit}, data) {
      commit('setLoading')
      commit('interceptors')
      const response = await axios.get(`/api/v2/regionalRisk/RiskExcel`, merge({
        headers: {'Authorization': getSession().token},
        responseType: 'blob',
        params: data
      }, state.baseConfig))
      commit('setLoaded')
      return response
    },
  }
})
