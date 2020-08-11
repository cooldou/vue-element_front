import request from '@/modules/request'
// 安全生产岗位责任清单

const baseUrl = '/api/v2/dutyListParameter'

export default {
  namespaced: true,
  state: {
    treeData: [],
    hiddenTreeData: []
  },

  mutations: {
    setTreeData (state, data) {
      state.treeData = data
    },
    setHiddenTreeData (state, data) {
      state.hiddenTreeData = data
    },
  },

  actions: {
    // 管控清单
    async getControlListingTree ({ commit }, params) {
      const result = await request.get(`${baseUrl}/responsibilityList`, {
        params: params
      })
      if (result && result instanceof Array) {
        commit('setTreeData', result)
      } else {
        commit('setTreeData', [])
      }
    },
    // 隐患清单
    async getHiddenListingTree ({ commit }, params) {
      const result = await request.get(`${baseUrl}/hiddenList`, {
        params: params
      })
      if (result && result instanceof Array) {
        commit('setHiddenTreeData', result)
      } else {
        commit('setHiddenTreeData', [])
      }
    },

    async getUserByStructureId ({}, params) {
      return await request.get(`${baseUrl}/getUserByStructureId`, {
        params: params
      })
    }
  }
}
