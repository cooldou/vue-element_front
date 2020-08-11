import merge from 'lodash/merge'
import listBase from '@/stores/list'
import listCrud from './emergency-rescue-crud'

const baseURL = '/api/v2/ERRescueTeam'
const list = listBase({ url: baseURL })
const crud= listCrud({ url: baseURL })

export default merge(list, crud,{
  namespaced: true,
})
