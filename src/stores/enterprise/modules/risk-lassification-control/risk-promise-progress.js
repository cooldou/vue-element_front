import merge from 'lodash/merge'
import request from '@/modules/request'
import listBase from '@/stores/list'

const baseURL = '/api/v2/riskControlCommitmentSchedule'
const list = listBase({url: `${baseURL}/bookList`})

// 风险承诺进度
export default merge(list, {
  namespaced: true,

  state: {
    treeData: [],
    treeLoading: false,
    tableLoading: false,
    promiseTableData: [],
    noPromiseTableData: []
  },

  mutations: {
    setTreeLoading(state) {
      state.treeLoading = true
    },

    setTreeLoaded(state) {
      state.treeLoading = false
    },

    setTreeData(state, data) {
      state.treeData = data
    },

    setTableLoading(state) {
      state.tableLoading = true
    },

    setTableLoaded(state) {
      state.tableLoading = false
    },

    setPromiseTableData(state, data) {
      state.promiseTableData = data
    },

    setNoPromiseTableData(state, data) {
      state.noPromiseTableData = data
    }
  },

  actions: {
    async getTree ({ commit }) {
      commit('setTreeLoading')
      const result = await request.get(`${baseURL}/CoStructureTree`)
      commit('setTreeLoaded')
      commit('setTreeData', result)
    },

    // 已处理的数据
    async selectUserBookByUid ({ commit }, params = {}) {
      const result = await request.get(`${baseURL}/selectUserBookByUid`, {
        params: params
      })
      commit('setTableLoaded')
      commit('setPromiseTableData', result)
    },

    // 需要处理的数据
    async selectNoBooksByUid ({ commit }, params = {}) {
      const result = await request.get(`${baseURL}/selectNoBooksByUid`, {
        params: params
      })
      commit('setTableLoaded')
      commit('setNoPromiseTableData', result)
    },

    async showBookByUserId ({ commit }, params = {}) {
      return await request.get(`${baseURL}/showBookByUserId`, {
        params: params
      })
    },

    async showBookByUid ({ commit }, params = {}) {
      return await request.get(`${baseURL}/showBookByUid`, {
        params: params
      })
    }
  }
})
