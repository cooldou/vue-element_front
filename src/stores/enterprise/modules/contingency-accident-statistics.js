import merge from 'lodash/merge'
import listBase from '@/stores/list'
import request from '@/modules/request'

const baseURL = '/api/v2/ERAccident'
const list = listBase({ url: baseURL })
const params = {}
export default merge(list, {
  namespaced: true,
  actions: {
    async loadData({ state, commit }, {reset = false } = {}) {
      commit('listLoading')
      if (reset) commit('setListFilterParams', {})
      const result = await request.get(baseURL, {
        params: Object.assign(
          params,
          state.list.params,
          state.list.filterParams
        )
      })

      commit('listLoaded')
      commit('setListData', {
        items: result
      })
    },
    async filterData({ commit, dispatch }, filterParams = {}) {
      commit('setListFilterParams', filterParams)
      await dispatch('loadData')
    }
  }
})
