import request from '@/modules/request'

export default {
  namespaced: true,

  state: {
    
  },

  mutations: {},

  actions: {
    async getDetailTable ({}) {
      return request.get('')
    }
  }
}
