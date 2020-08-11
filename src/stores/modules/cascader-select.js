import Vue from 'vue'
import request from '@/modules/request'

const urls = {
  nationalEconomy: {
    root: '/dropDownChoice/nationalEconomy',
    children: '/dropDownChoice/nationalEconomyChild'
  }
}

export default {
  namespaced: true,

  state: {
    stores: {}
  },

  getters: {
    items: (state) => (resourceName) => {
      return state.stores[resourceName] || []
    }
  },

  mutations: {
    setRootItems(state, { resourceName, items }) {
      items = items.map(item => Object.assign({ children: [] }, item))
      Vue.set(state.stores, resourceName, items)
    },

    setChildItems(state, { resourceName, parentCode, items }) {
      const rootItems = state.stores[resourceName]
      const parentIndex = rootItems.findIndex(item => item.code === parentCode)

      if (parentIndex !== -1) {
        const parent = Object.assign(
          { childrenLoaded: true }, rootItems[parentIndex], { children: items }
        )
        rootItems.splice(parentIndex, 1, parent)
      }
    }
  },

  actions: {
    async loadRootItems({ commit }, resourceName) {
      const result = await request.get(urls[resourceName].root)
      commit('setRootItems', { resourceName, items: result })
    },

    async loadChildItems({ state, commit }, { resourceName, parentCode }) {
      const parent = state.stores[resourceName].find(item => item.code === parentCode)
      if (parent && parent.childrenLoaded) return parent.children
      
      const result = await request
        .get(urls[resourceName].children, { params: { parentCode } })
      commit('setChildItems', { resourceName, parentCode, items: result })
      return result
    }
  }
}