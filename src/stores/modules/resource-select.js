import Vue from 'vue'
import uniqBy from 'lodash/uniqBy'
import request from '@/modules/request'

const resourceUrls = {
  sysControlLevel: '/sysControlLevel',
  sysRole: '/sysRole',
  multidimensional: '/api/v2/dropDownChoice/multidimensional'
}

export default {
  namespaced: true,

  state: {
    stores: {}
  },

  mutations: {
    setResources(state, { resourceName, resources }) {
      Vue.set(state.stores, resourceName, resources)
    }
  },

  actions: {
    async loadResources({ commit }, resourceName) {
      const url = resourceUrls[resourceName] || `/dropDownChoice/${resourceName}`;
      let resources = await request.get(url);
      resources = uniqBy(resources.map(item => {
        return {
          value: item.id || item.name,
          label: item.name
        }
      }), 'value')

      commit('setResources', { resourceName, resources })
    }
  }
}
