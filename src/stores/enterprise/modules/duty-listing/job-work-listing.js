import request from '@/modules/request'
// 安全生产岗位作业清单

const baseUrl = '/api/v2/workListing'

export default {
  namespaced: true,
  state: {
    treeData: []
  },

  mutations: {
    setTreeData (state, data) {
      state.treeData = data
    }
  },

  actions: {
    // 根据工位查看该工位负责的作业
    async getListingTree ({ commit }, params) {
      const result = await request.get(`${baseUrl}/workByStructureTree`, {
        params: params
      })
      if (result && result instanceof Array) {
        commit('setTreeData', result)
      } else {
        commit('setTreeData', [])
      }
    },

    // 作业岗位树状
    async getJobTree ({ commit }, params) {
      return await request.get(`${baseUrl}/workStructureTree`)
    }
  }
}
