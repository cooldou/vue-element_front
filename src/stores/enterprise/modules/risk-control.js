import merge from 'lodash/merge'
import request from '@/modules/request'
import listBase from '@/stores/list'

const baseURL = '/api/v2/elementArgument/getRiskManagementStandingBook'
const list = listBase()

export default merge(list, {
  namespaced: true,

  state: {
    upCount: 0,
    downCount: 0
  },

  mutations: {
    setCount(state, { upCount, downCount }) {
      state.upCount = upCount
      state.downCount = downCount
    }
  },

  actions: {
    async loadListData({ state, commit }, { page = 1, reset = false } = {}) {
      commit('listLoading')

      if (reset) commit('setListFilterParams', {})

      const result = await request.get(baseURL, {
        params: Object.assign({
          current: page,
          size: state.list.pageSize
        }, state.list.params, state.list.filterParams)
      })

      commit('listLoaded')
      commit('setCount', {
        upCount: result.up, downCount: result.down
      })
      commit('setListData', {
        total: result.riskManagementStandingBook.total,
        currentPage: page,
        items: result.riskManagementStandingBook.records
      })
    },

    async loadData({}, id) {
      return await request(`${baseURL}/${id}`)
    },

    async loadRiskNames({}) {
      return await request('/api/v2/elementArgument/riskNameList')
    }
  }
})
