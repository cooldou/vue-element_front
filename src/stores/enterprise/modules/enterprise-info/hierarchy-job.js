import request from '@/modules/request'

const state = {
  loading: false,
  items: []
}

const mutations = {
  setListData(state, { items }) {
    Object.assign(state, { items, loading: false })
  },

  setLoading(state, loading) {
    state.loading = loading
  },

  updateItem(state, item) {
    const itemIndex = state.items.findIndex(i => i.id === item.id)
    if (itemIndex !== -1) {
      Object.assign(state.items[itemIndex], item)
    }
  }
}

const actions = {
  async loadListData({ commit }, { hierarchy }) {
    commit('setLoading', true)
    const result = await request.get(`/api/v2/companyConfiguration/jobs/${hierarchy}`)
    commit('setListData', { items: result })
  },

  async create({ dispatch }, { hierarchy, formData }) {
    let result = await request.post(
      '/api/v2/companyConfiguration/jobs',
      Object.assign({ controlLevelId: hierarchy }, formData)
    )
    dispatch('loadListData', { hierarchy })
    return result
  },

  async update({ commit }, { id, formData }) {
    const result = await request.put(`/api/v2/companyConfiguration/jobs/${id}`, formData)
    if (result.status === 0) commit('updateItem', { id, ...formData })
    return result
  },

  async delete({ dispatch }, { id, hierarchy }) {
    await request.delete(`/api/v2/companyConfiguration/jobs/${id}`)
    dispatch('loadListData', { hierarchy })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
