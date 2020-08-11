import merge from 'lodash/merge'
import request from '@/modules/request'
import listBase from '@/stores/list'

const baseURL = '/api/v2/safeManagementInfo'
const list = listBase({ url: baseURL })

export default merge(list, {
  namespaced: true,

  state :{
    infoData: {}
  },

  mutations: {
    setInfoData(state, data) {
      state.infoData = data
    }
  },

  actions: {
    async getInfo({ commit }) {
      return await request.get(`${baseURL}`)
    },

    async update({}, {id, formData}) {
      return await request.put(`${baseURL}/${id}`, formData)
    }
  }
})
