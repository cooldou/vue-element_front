import merge from 'lodash/merge'
import request from '@/modules/request'
import listBase from '@/stores/list'

const baseURL = '/api/v2/educationTraining/TrainingEducation'
const list = listBase({ url: baseURL })

export default merge(list, {
  namespaced: true,

  actions: {
    async load({ commit }, id) {
      return await request.get(`${baseURL}/${id}`)
    }
  }
})
