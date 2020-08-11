import merge from 'lodash/merge'
import request from '@/modules/request'
import { cloneDeep } from 'lodash'

const baseURL = '/api/v2/importantEquipment/equipmentManagement'

export default {
  namespaced: true,

  state: {
    treeData: [],
    listData: [],
    params: {},
    filterParams: {}
  },

  mutations: {
    setTreeData(state, data) {
      state.treeData = data
    },

    setListData(state, data) {
      state.listData = data
    },

    setTreeFilterParams(state, params = {}) {
      state.filterParams = cloneDeep(params)
    },

    setListParams(state, params = {}) {
      state.params = Object.assign({}, state.params, params)

    }
  },

  actions: {
    async loadTree({ commit, state }, { reset = false } = {}) {
      if (reset) commit('setTreeFilterParams', {})
      const result = await request.get(baseURL, {
        params: Object.assign({}, state.params, state.filterParams, {isAll: 0})
      })
      commit('setTreeData', result)
    },

    async loadList({ commit, state }, { reset = false } = {}) {
      if (reset) commit('setTreeFilterParams', {})
      const result = await request.get(baseURL, {
        params: Object.assign({}, state.params, state.filterParams, {isAll: 1})
      })
      commit('setListData', result)
    },

    async filterListData({ commit, dispatch }, filterParams = {}) {
      commit('setListParams', filterParams)
      await dispatch('loadTree','loadList')
    }
  }
}
