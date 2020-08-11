import request from '@/modules/request'
// const baseUrl = '/api/v2/EREesponse'
export default {
  namespaced: true,
  actions: {
    async loadData({ commit }) {
      return await request.get(`/api/v2/EREesponse`)
    },

    async update({ dispatch }, erResponse) {
      console.log('1111111')
      let result = await request.put(`/api/v2/EREesponse`, erResponse)
      // await dispatch('loadData')
      return result
    }
  }
}
