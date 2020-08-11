import { merge, omit } from 'lodash'
import request from '@/modules/request'
import listBase from '@/stores/list'

export default merge(listBase(), {
  namespaced: true,

  actions: {
    async loadListData({ state, commit }, { page = 1 } = {}) {
      commit('listLoading')

      const result = await request.get(
        `/api/v2/companyConfiguration/jobsList/${state.list.params.jobId}`,
        {
          params: Object.assign({
            current: page,
            size: state.list.pageSize
          }, omit(state.list.params, 'jobId'), state.list.filterParams)
        }
      )

      commit('listLoaded')
      commit('setListData', {
        total: result.total,
        currentPage: page,
        items: result.records
      })
    },

    async delete({ dispatch }, { id }) {
      await request.delete(`/api/v2/companyConfiguration/jobsList/${id}`)
      await dispatch('loadListData')
    },

    async loadAssignableChildren(_, { jobId, hierarchy }) {
      return await request.get(`/api/v2/companyConfiguration/assignJobs/${jobId}/${hierarchy}`)
    },

    async assignChildren({ dispatch }, { jobId, ids }) {
      await request.put(
        `/api/v2/companyConfiguration/assignJobs/${jobId}`, ids
      )
      dispatch('loadListData')
    }
  }
})
