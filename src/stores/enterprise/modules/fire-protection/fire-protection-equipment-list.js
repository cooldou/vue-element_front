import merge from 'lodash/merge'
import request from '@/modules/request'
import listBase from '@/stores/list'

const list = listBase()

const baseURL = '/api/v2/equipmentFacilitiesListing'

export default merge(list, {
  namespaced: true,

  state: {
  },

  mutations: {
  },

  actions: {
    async loadTree () {
      return request.get(`${baseURL}/treeList`)
    },
    async loadEquipment ({state}, {keywords='', twoId='', riskId=''}) {
      return request.get(`${baseURL}`, { params: {keywords, twoId, riskId} })
    }
  }
})
