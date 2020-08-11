import merge from 'lodash/merge'
import listBase from '@/stores/list'
import listCrud from './emergency-rescue-crud'
import request from '@/modules/request'

const baseURL = '/api/v2/emergencyRescue/erExerciseRecord'
const list = listBase({ url: baseURL })
const crud= listCrud({ url: baseURL })

export default merge(list, crud,{
  namespaced: true,

  actions: {
    async relatedPlans({}) {
      return await request.get('/api/v2/emergencyRescue/erExerciseSchemeAll')
    },

    async loadInfo({}, id) {
      return await request.get(`/api/v2/emergencyRescue/erExerciseSchemeAll/${id}`)
    },

    async loadAll({}) {
      return await request.get('api/v2/emergencyRescue/erExerciseRecordAll')
    }
  }
})
