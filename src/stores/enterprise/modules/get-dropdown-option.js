import request from '@/modules/request'


export default {
  namespaced: true,

  actions: {
    async getDropdown({ commit },dropdown={}) {
        return await request.get('/api/v2/emergencyRescue/getOption', {
            params: dropdown
        })
      },
  }
}
