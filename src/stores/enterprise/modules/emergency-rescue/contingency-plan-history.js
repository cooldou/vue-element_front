import merge from 'lodash/merge'
import request from '@/modules/request'
import listBase from '@/stores/list'
import { cloneDeep } from 'lodash'

const list = listBase({url: '/api/v2/HistoricalRevisionRecord/erPlanFileRecordList' })

const baseURL = '/api/v2/HistoricalRevisionRecord'

export default merge(list, {
  namespaced: true,

  state: {
    planList: {
      loading: false,
      total: 0,
      pageSize: 20,
      currentPage: 1,
      params: {},
      filterParams: {},
      items: []
    }
  },

  mutations: {
    setPlanListFilterParams(state, params = {}) {
      state.planList.filterParams = cloneDeep(params)
    },

    setPlanListPageSize(state, pageSize) {
      state.planList.pageSize = pageSize
    },

    planListLoading(state) {
      state.planList.loading = true
    },

    planListLoaded(state) {
      state.planList.loading = false
    },

    setPlanListData(state, { total, currentPage, items }) {
      state.planList = Object.assign({}, state.planList, {
        total, currentPage, items
      })
    }
  },

  actions: {
    // 预案历史记录
    async planHistory ({ state, commit }, { page = 1, reset = false } = {}) {
      commit('planListLoading')
      if (reset) commit('setPlanListFilterParams', {})
      const result = await request.get(`${baseURL}/erPlanRecordList`, {
        params: Object.assign({
          current: page,
          size: state.planList.pageSize
        }, state.planList.params, state.planList.filterParams)
      })
      commit('planListLoaded')
      commit('setPlanListData', {
        total: result.total,
        currentPage: page,
        items: result.records
      })
    },

    async filterPlanListData({ commit, dispatch }, filterParams = {}) {
      commit('setPlanListFilterParams', filterParams)
      await dispatch('planHistory')
    },

    // 历史预案文件详情
    async fileDetail ({}, id) {
      return await request.get(`${baseURL}/showErPlanFileRecord/${id}`)
    },

    // 历史预案详情
    async planDetail ({}, id) {
      return await request.get(`${baseURL}/showErPlanRecord/${id}`)
    },
  }
})
