import request from '@/modules/request'

const baseURL = '/api/v2/web/home/banner'

export default {
  namespaced: true,

  state: {
    items: []
  },

  mutations: {
    setItems(state, items) {
      state.items = items
    },

    removeItem(state, id) {
      const itemIndex = state.items.findIndex(item => item.id === id)
      if (itemIndex !== -1) state.items.splice(itemIndex, 1)
    },

    updateItemSelected(state, { id, selected }) {
      const item = state.items.find(item => item.id === id)
      item.isShow = selected ? 'Y' : 'N'
    }
  },

  actions: {
    async create({ dispatch }, formData) {
      try {
        await request.post(baseURL, formData)
        await dispatch('loadItems', { reset: true })
      } catch (err) {}
    },

    async update({}, formData) {
      return await request.put(baseURL, formData)
    },

    async delete({ commit }, id) {
      await request.delete(`${baseURL}/${id}`)
      commit('removeItem', id)
    },

    async loadItems({ commit }) {
      let items = await request.get(baseURL)
      items = items.sort((a, b) => a.sort - b.sort)
      commit('setItems', items)
    }
  }
}
