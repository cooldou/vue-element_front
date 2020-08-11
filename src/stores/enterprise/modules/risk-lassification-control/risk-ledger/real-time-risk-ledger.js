import merge from 'lodash/merge'
import cloneDeep from 'lodash/cloneDeep'
import request from '@/modules/request'
import listBase from '@/stores/list'

const baseURL = '/api/v2/workRecord'
const list = listBase({url: `${baseURL}/certificateList`})

// 作业风险管控台帐
export default merge(list, {
  namespaced: true,

  state: {
    twoId: '',
    workType: ''
  },

  mutations: {
    ledgerDataChange (state, data) {
      state.ledgerData = data
    },

    enterpriseledgerData (state, data){
      state.enterpriseLedgerData = data
    },

    timeLedgerData (state,data) {
      state.timeData = data
    },

    twoIdData(state,data) {
      state.twoId = data
    },

    worktypeData(state,data) {
      state.workType = data
    },

    listPath (state, data) {
      state.listPath = data
    }
  },

  actions: {
      //作业风险台账 - 树状结构数据
    async getRealTimeTree () {
      return await request.get(`${baseURL}/workRecordTree`)
    },

    async loadListData({ state, commit }, { page = 1, reset = false, workType } = {}) {
      if (reset) commit('setListFilterParams', {})
      const result = await request.get(`${baseURL}/${state.listPath}`, {
        params: Object.assign({
          current: page,
          size: state.list.pageSize,
          twoId: state.twoId,
          workType: workType
        }, state.list.params, state.list.filterParams)
      });
      commit('listLoaded');
      commit('setListData', {
        total: result.total,
        currentPage: page,
        items: result.records
      })
    },

    // //企业合规性列表
    // async certificateList ({state, commit}, params) {
    //   const data = await request.get(`${baseURL}/certificateList`,{
    //     params:merge({size:state.size,current:1},params)
    //   })
    //   commit('enterpriseledgerData',data)
    // },

    // //其他作业和特种作业列表
    // async realTimeList ({state,commit},params) {
    //   const data = await request.get(`${baseURL}/realTimeList`,{
    //     params:merge({size:state.size,current:1},params)
    //   })
    //   commit('enterpriseledgerData','')
    //   commit('ledgerDataChange',data)
    // },

    // //定时作业列表
    // async bookListByTwo ({state,commit},params) {
    //   const data = await request.get(`${baseURL}/bookListByTwo`,{
    //     params:merge({size:state.size,current:1},params)
    //   })
    //   commit('enterpriseledgerData','')
    //   commit('ledgerDataChange','')
    //   commit('timeLedgerData',data)
    // },

    //企业合规性列表每行数据展开列表
    async loadListDataDetails ({}, params) {
      return await request.get(`${baseURL}/certificateDetailsList`, {
        params: params
      })
    },

    //其他作业特种作业展开列表
    async otherLoadListDataDetails ({}, params) {
      return await request.get(`${baseURL}/realTimeDetailsList`, {
        params: params
      })
    },

    //企业合规性根据管控数据查看详情
    async showControlDetails ({}, params) {
      return await request.get(`${baseURL}/certificateDetails`, {
        params: params
      })
    },

    //其他作业和特种作业查看详情
    async loadLedgerDetails ({}, params) {
      return await request.get(`${baseURL}/workBookDetails`, {
        params: params
      })
    },

    //其他作业和特殊作业风险区域下拉选
    async riskAreaSelect () {
      return await request.get(`${baseURL}/getRiskAll`)
    },

    //其他作业和特殊作业岗位下拉选
    async jobSelect () {
      return await request.get(`${baseURL}/getStructureAll`)
    }
  }
})
