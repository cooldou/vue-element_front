import merge from 'lodash/merge'
import request from '@/modules/request'
import listBase from '@/stores/list'

const baseURL = '/api/v2/sysCompanyUser'
const list = listBase({ url: baseURL })

export default merge(list, {
  namespaced: true,

  actions: {
    async create({ dispatch }, formData) {
      try {
        const result = await request.post(baseURL, formData)
        await dispatch('loadListData', { reset: true })
        return result
      } catch (err) {}
    },

    async load({ commit }, id) {
      return await request.get(`${baseURL}/${id}`)
    },

    async update({ dispatch }, { id, formData }) {
      try {
        const result = await request.put(`${baseURL}/${id}`, formData)
        await dispatch('loadListData')
        return result
      } catch (err) {}
    },

    async delete({ dispatch }, id) {
      try {
        await request.delete(`${baseURL}/${id}`)
        await dispatch('loadListData')
      } catch (err) {}
    }
  }
})
