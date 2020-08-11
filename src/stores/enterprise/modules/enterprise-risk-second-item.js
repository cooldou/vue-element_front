import merge from 'lodash/merge'
import request from '@/modules/request'
import listBase from '@/stores/list'

const listBaseURL = '/api/v2/coRiskAssessment/coRiskAssessmentType'
const list = listBase()

const baseURL = '/api/v2/twoSubproject'

export default merge(list, {
  namespaced: true,

  state: {
    risk: {}
  },

  mutations: {
    setRiskData(state, data) {
      state.risk = data
    },

    updateItemStatus(state, { id, status }) {
      const item = state.list.items.find(item => item.id === id)
      if (item) item.status = status
    }
  },

  actions: {
    async loadListData({ state, commit }, { page = 1, reset = false } = {}) {
      commit('listLoading')

      if (reset) commit('setListFilterParams', {})

      const result = await request.get(`${listBaseURL}/${state.list.params.riskId}`, {
        params: Object.assign({
          current: page,
          size: state.list.pageSize
        }, state.list.params, state.list.filterParams)
      })

      commit('listLoaded')
      commit('setRiskData', result.coRiskAssessment)
      commit('setListData', {
        total: result.twoSubprojects.total,
        currentPage: page,
        items: result.twoSubprojects.records
      })
    },

    async create({ dispatch }, formData) {
      try {
        await request.post(baseURL, formData)
        await dispatch('loadListData', { reset: true })
      } catch (err) {}
    },

    async load({}, id) {
      return await request.get(`${baseURL}/${id}`)
    },

    async update({ dispatch }, { id, formData }) {
      try {
        await request.put(`${baseURL}/${id}`, formData)
        await dispatch('loadListData', { reset: true })
      } catch (err) {}
    },

    async updateStatus({ commit }, { id, status }) {
      await request.put(`${baseURL}/${id}`, { status })
      commit('updateItemStatus', { id, status })
    },

    async delete({ dispatch }, id) {
      try {
        await request.delete(`${baseURL}/${id}`)
        await dispatch('loadListData', { reset: true })
      } catch (err) {}
    }
  }
})
