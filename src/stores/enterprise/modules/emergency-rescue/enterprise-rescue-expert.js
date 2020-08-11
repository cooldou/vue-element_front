import merge from 'lodash/merge'
import listBase from '@/stores/list'
import request from '@/modules/request'

const list = listBase()
const baseUrl = '/api/v2/ERExperts'

export default merge(list,{
  namespaced: true,
  state: {
    url: '/api/v2/ERExperts/erExpertsListBySigning'
  },

  mutations: {
    setURL (state, url) {
      state.url = url
    }
  },

  actions: {
    async loadListData({ state, commit }, { page = 1, reset = false } = {}) {
      if (reset) commit('setListFilterParams', {})
      const result = await request.get(state.url, {
        params: Object.assign({
          current: page,
          size: state.list.pageSize
        }, state.list.params, state.list.filterParams)
      })
      commit('listLoaded')
      commit('setListData', {
        total: result.total,
        currentPage: page,
        items: result.records
      })
    },

    async create({ dispatch }, formData) {
      try {
        let result = await request.post(`${baseUrl}`, formData)
        await dispatch('loadListData', { reset: true })
        return result
      } catch (err) {}
    },

    async delete({ dispatch }, id) {
      try {
        await request.delete(`${baseUrl}/${id}`)
        await dispatch('loadListData', { reset: true })
      } catch (err) {}
    },

    async update({ dispatch }, { id, formData }) {
      try {
        let result = await request.put(`${baseUrl}/${id}`, formData)
        await dispatch('loadListData', { reset: true })
        return result
      } catch (err) {}
    },

    async detail({ commit }, id) {
      return await request.get(`${baseUrl}/${id}`)
    },
    //专家库
    async loadLibraryExperts({ commit, dispatch }) {
      try {
        let baseLibraryUrl = '/api/v2/ERExperts/erExpertsListByLibrary'
        await request.get(`${baseLibraryUrl}`)
        commit('setURL', baseLibraryUrl)
        await dispatch('loadListData', { reset: true })
      } catch (err) {}
    },
    //本企业专家
    async loadSigningExperts({ commit, dispatch }) {
      try {
        let baseSigningUrl = '/api/v2/ERExperts/erExpertsListBySigning'
        await request.get(`${baseSigningUrl}`)
        commit('setURL', baseSigningUrl)
        await dispatch('loadListData', { reset: true })
      } catch (err) {}
    },
    //解除协议
    async relieve({ dispatch }, id) {
      try {
        await request.delete(`${baseUrl}/${id}`)
        await dispatch('loadListData', { reset: true })
      } catch (err) {}
    },

    //与政府专家库专家绑定协议
    async binding({ dispatch }, {id, agreement}) {
      try {
        let result = await request.post(`/api/v2/ERExperts/addAgreement`, {
          id: id,
          agreement: agreement
        })
        await dispatch('loadListData', { reset: true })
        return result
      } catch (err) {}
    }
  }
})
