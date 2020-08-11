import { merge, omit } from 'lodash'
import request from '@/modules/request'
import listBase from '@/stores/list'

export default merge(listBase(), {
  namespaced: true,

  actions: {
    async loadListData({ state, commit }, { page = 1 } = {}) {
      commit('listLoading')

      const result = await request.get(
        `/api/v2/companyConfiguration/threeList/${state.list.params.jobId}`,
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

    async delete({ dispatch }, { jobId, id }) {
      await request.delete(`/api/v2/companyConfiguration/threeList/${id}/${jobId}`)
      await dispatch('loadListData')
    },

    async deleteAll({ dispatch }, { jobId }) {
      await request.delete(`/api/v2/companyConfiguration/removeAllThree/${jobId}`)
      await dispatch('loadListData')
    },

    async loadAssignableRisks(_, { jobId, screening }) {
      return await request.get(`/api/v2/companyConfiguration/allocationRiskList/${jobId}?screening=${screening}`)
    },

    async assignRisks({ dispatch }, { jobId, ids }) {
      await request.put(
        `/api/v2/companyConfiguration/allocationRiskList/${jobId}`, ids
      )
      dispatch('loadListData')
    }
  }
})
