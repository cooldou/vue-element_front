import merge from 'lodash/merge'
import request from '@/modules/request'
import listBase from '@/stores/list'

const baseURL = '/api/v2/historicalCommitment'
const list = listBase({url: `${baseURL}/historyCommitment`})

// 历史承诺台帐
export default merge(list, {
  namespaced: true,

  state: {
    tableLoading: false,
    userBookAllByDate: [],
    overdueByDate: [],
    dateParams: {}
  },

  mutations: {
    setDateParams (state, dateParams) {
      state.dateParams = dateParams
    },

    setTableLoading(state) {
      state.tableLoading = true
    },

    setTableLoaded(state) {
      state.tableLoading = false
    },

    setUserBookAllByDate(state, data) {
      state.userBookAllByDate = data
    },

    setOverdueByDate(state, data) {
      state.overdueByDate = data
    }
  },

  actions: {
    // 根据日期查看对应日期的岗位人员管控信息
    async selectUserBookAllByDate ({ commit }, params = {}) {
      commit('setTableLoading')
      const result = await request.get(`${baseURL}/selectUserBookAllByDate`, {
        params: params
      })
      commit('setTableLoaded')
      commit('setUserBookAllByDate', result)
    },

    // 查看所选日期所有工位因为未操作导致逾期的数量
    async selectOverdueByDate ({ commit }, params = {}) {
      commit('setTableLoading')
      const result = await request.get(`${baseURL}/selectOverdueByDate`, {
        params: params
      })
      commit('setTableLoaded')
      commit('setOverdueByDate', result)
    },

    // 根据工作人员id查看详情
    async showBookByUserId ({ state, commit }, params = {}) {
      return await request.get(`${baseURL}/showBookByUserId`, {
        params: Object.assign(params, state.dateParams)
      })
    },

    // 根据日期查看承诺岗位
    async showIscommitment ({ state, commit }, data) {
      return await request.get(`${baseURL}/isCommitment`, {
        params: {
          date: data
        }
      })
    },
  }
})
