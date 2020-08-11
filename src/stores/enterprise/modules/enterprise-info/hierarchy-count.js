import request from '@/modules/request'

const state = {
  hierarchyCount: null
}

const mutations = {
  setHierarchyCount(state, hierarchyCount) {
    state.hierarchyCount = hierarchyCount
  }
}

const actions = {
  async loadHierarchyCount({ commit }) {
    const result = await request.get('/api/v2/companyConfiguration')
    commit('setHierarchyCount', result)
  },

  async updateHierarchyCount({ commit }, hierarchyCount) {
    await request.post(`/api/v2/companyConfiguration?hierarchical=${hierarchyCount}`)
    commit('setHierarchyCount', hierarchyCount)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
