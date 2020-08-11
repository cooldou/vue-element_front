import merge from 'lodash/merge'
import request from '@/modules/request'
import listBase from '@/stores/list'

const baseURL = '/api/v2/educationTraining/answerList'
const list = listBase({ url: baseURL })

export default merge(list, {
  namespaced: true,
})
