import request from '@/modules/request'

let baseURL = '/api/v2/sysRiskDistrict/getAllArea'
if (window.__APP_EDITION__ === 'ENTERPRISE')
  baseURL = '/sysRiskDistrict/getAllArea'

function transformItems(items) {
  items.forEach(item => {
    if (item.children.length > 0) {
      item.children.forEach(child => {
        child.parentId = item.id

        if (child.children.length > 0) {
          child.children.forEach(leaf => {
            leaf.parentId = child.id
            leaf.children = null
          })
        } else {
          child.children = null
        }
      })
    } else {
      item.children = null
    }
  })

  return items
}

function flattenItems(items) {
  let result = []

  items.forEach(item => {
    result.push(item)
    item.children && item.children.forEach(child => {
      result.push(child)
      result = result.concat(child.children || [])
    })
  })

  return result
}

export default {
  namespaced: true,

  state: {
    loading: false,
    items: [],
    flattedItems: []
  },

  mutations: {
    setItems(state, items) {
      state.items = items
      state.flattedItems = flattenItems(items)
    },

    setLoading(state, loading = true) {
      state.loading = loading
    }
  },

  actions: {
    async loadItems({ commit }) {
      commit('setLoading')
      const result = await request.get(baseURL)

      commit('setItems', transformItems(result))
      commit('setLoading', false)
    }
  }
}