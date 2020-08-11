import request from '@/modules/request'

const baseURL = '/api/v2/coCompanyInfo'

export default {
  namespaced: true,

  state :{
    productsList: [],
  },

  mutations: {

    setProductsList(state, data) {
      state.productsList = data
    }
  },

  actions: {
    async load({}) {
      return await request.get(baseURL)
    },

    async update({ dispatch }, { id, formData }) {
      try {
        return await request.put(`${baseURL}`, formData)
      } catch (err) {
        return false
      }
    },

    // 国民经济行业下拉树
    async loadNationalEconomy () {
      return await request.get(`${baseURL}/nationalEconomyTree`)
    },

    // 主要产品相关
    async loadProductsList ({ commit }) {
      const result = await request.get(`${baseURL}/companyProductsList`)
      commit('setProductsList', result)
    },

    async loadProduct ({ commit }, id) {
      return await request.get(`${baseURL}/showCompanyProducts/${id}`)
    },

    async createProduct ({ dispatch }, formData) {
      await request.post(`${baseURL}/addCompanyProducts`, formData)
      dispatch('loadProductsList')
    },

    async updateProduct ({ dispatch }, {id, formData}) {
      await request.put(`${baseURL}/updateCompanyProducts/${id}`, formData)
      dispatch('loadProductsList')
    },

    async deleteProduct ({ dispatch }, id) {
      await request.delete(`${baseURL}/deleteCompanyProducts/${id}`)
      dispatch('loadProductsList')
    }
  }
}
