import merge from 'lodash/merge'
import request from '@/modules/request'
import listBase from '@/stores/list'

const baseURL = '/api/v2/majorHazard'
const list = listBase({ url: baseURL })

export default merge(list, {
  namespaced: true,

  state: {
    recordsList: {
      items: [],
      loading: false
    }
  },

  mutations: {
    setRecordsList (state, { list }) {
      state.recordsList.items = list
    },

    recordsListLoading(state) {
      state.recordsList.loading = true
    },

    recordsListLoaded(state) {
      state.recordsList.loading = false
    }
  },

  actions: {
    async load({ commit }, id) {
      return await request.get(`${baseURL}/${id}`)
    },

    async loadRecord({ commit }, params) {
      commit('recordsListLoading')
      const result = await request.get(`${baseURL}/getRecord`, {
          params: params
        })
      commit('recordsListLoaded')
      commit('setRecordsList', {
        list: result
      })
    },

    async loadCancel({ commit }, id) {
      return await request.get(`${baseURL}/showCancelAfterVerification/${id}`)
    },

    async riskList ({ commit }) {
      return await request.get('/api/v2/majorHazard/getCoRiskAssessment')
    },

    async create({ dispatch }, formData) {
      try {
        await request.post(`${baseURL}/addMajorHazard`, formData)
        await dispatch('loadListData', { reset: true })
      } catch (err) {}
    },

    async createCancel({ dispatch }, formData) {
      try {
        await request.post(`${baseURL}/addCancelAfterVerification`, formData)
        await dispatch('loadListData', { reset: true })
      } catch (err) {}
    },

    async update({ dispatch }, { id, formData }) {
      try {
        await request.put(`${baseURL}/${id}`, formData)
        await dispatch('loadListData', { reset: true })
      } catch (err) {}
    },

    async delete({ dispatch }, id) {
      try {
        await request.delete(`${baseURL}/${id}`)
        await dispatch('loadListData', { reset: true })
      } catch (err) {}
    }
  }
})
