import merge from 'lodash/merge'
import request from '@/modules/request'
import listBase from '@/stores/list'

const baseURL = '/api/v2/elementArgument/getHiddenDangerManagement'
const list = listBase({ url: baseURL })

export default merge(list, {
  namespaced: true,

  actions: {
    async loadData({}, id) {
      return await request(`${baseURL}/${id}`)
    }
  }
})
