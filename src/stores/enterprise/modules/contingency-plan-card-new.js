import merge from 'lodash/merge'
import request from '@/modules/request'
import listBase from '@/stores/list'
import listCrud from './emergency-rescue-crud'

const baseURL = ''
const list = listBase({ url: baseURL })
const crud= listCrud({ url: baseURL })


export default merge(list,crud, {
  namespaced: true,

  state: {
    treeDate: {},
    tableDate:{}
  },

  mutations: {
    setTreeDate(state, data) {
      state.risk = data
    },
  },

  actions: {


  },
})
