import { merge, omit } from 'lodash'
import request from '@/modules/request'
import listBase from '@/stores/list'

export default merge(listBase(), {
  namespaced: true,

  actions: {
    async loadListData({ state, commit }, { page = 1 } = {}) {
      commit('listLoading')

      const result = await request.get(
        `/api/v2/companyConfiguration/employeesList/${state.list.params.jobId}`,
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
      await request.delete(`/api/v2/companyConfiguration/employeesList/${id}/${jobId}`)
      await dispatch('loadListData')
    },

    async deleteAll({ dispatch }, { jobId }) {
      await request.delete(`/api/v2/companyConfiguration/removeAllEmployees/${jobId}`)
      await dispatch('loadListData')
    },

    async loadAssignableEmployees(_, { jobId }) {
      return await request.get(`/api/v2/companyConfiguration/employees/${jobId}`)
    },

    async assignEmployees({ dispatch }, { jobId, ids }) {
      await request.put(
        `/api/v2/companyConfiguration/employees/${jobId}`, ids
      )
      dispatch('loadListData')
    }
  }
})
