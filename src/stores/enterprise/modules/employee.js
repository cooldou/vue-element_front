import axios from 'axios'
import merge from 'lodash/merge'
import request from '@/modules/request'
import { getSession } from '@/modules/authentication'
import { getAPIBaseURL } from '@/modules/utils'
import listBase from '@/stores/list'

const baseURL = '/api/v2/coPersonInfo'
const list = listBase({ url: baseURL })

export default merge(list, {
  namespaced: true,

  actions: {
    async create({ dispatch }, formData) {
      try {
        await request.post(baseURL, formData)
        await dispatch('loadListData', { reset: true })
      } catch (err) {}
    },

    async load({ commit }, id) {
      return await request.get(`${baseURL}/${id}`)
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
    },

    async export({}) {
      return await axios.post(`${baseURL}/exportCoPerson`, {}, {
        baseURL: getAPIBaseURL(),
        responseType: 'blob',
        headers: {
          'Authorization': getSession().token
        }
      })
    }
  }
})
