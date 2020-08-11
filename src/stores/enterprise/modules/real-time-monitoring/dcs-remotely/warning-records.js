import merge from 'lodash/merge'
import request from '@/modules/request'
import listBase from '@/stores/list'

const baseURL = '/api/v2/deviceWarningAlarm'
const list = listBase({ url: baseURL })

export default merge(list, {
  namespaced: true,

  actions: {
    async loadListData({ state, commit }, { reset = false } = {}) {
      if (reset) commit('setListFilterParams', {})
      const result = await request.get(baseURL, {
        params: Object.assign(state.list.params, state.list.filterParams)
      })
      commit('listLoaded')
      commit('setListData', {
        items: result
      })
    },

    //根据预警报警id查看详情
    async loadDetail({}, id) {
      return await request.get(`${baseURL}/${id}`)
    }
  }
})
