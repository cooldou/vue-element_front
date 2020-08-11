import merge from 'lodash/merge'
import request from '@/modules/request'
import listBase from '@/stores/list'
import Vue from 'vue'

const listURL = '/api/v2'
const menuURl = '/api/v2/menu'
const list = listBase()

export default merge(list, {
  namespaced: true,

  state: {
    twoMenuList: [],
    threeMenuParams: {},
    threeMenuList: [],
    listPath: ''
  },

  mutations: {
    selectThreeMenu (state, item) {
      state.threeMenuList.forEach(i => {
        Vue.set(i, 'selected', false)
      })

      const menuIndex = state.threeMenuList.findIndex(r => r.id === item.id)
      if (menuIndex !== -1) {
        const menu = state.threeMenuList[menuIndex]
        Vue.set(menu, 'selected', true)
        state.threeMenuList.splice(menuIndex, 1, item)
      }
    },

    setThreeMenuParams (state, data) {
      state.threeMenuParams = data
    },

    setTwoMenu (state, data) {
      state.twoMenuList = data
    },

    setThreeMenu (state, data) {
      state.threeMenuList = data
    },

    setListPath (state, data) {
      state.listPath = data
    }
  },

  actions: {
    // 获取二级菜单
    async getTwoMenus ({ commit }) {
      const result = await request.get(`${menuURl}/twoMenu`)
      commit('setTwoMenu', result)
    },

    // 获取三级菜单
    async getThreeMenu ({ commit, state }) {
      const result = await request.get(`${menuURl}`, {
        params: state.threeMenuParams
      })
      commit('setThreeMenu', result)
    },

    async loadMenu ({}, id) {
      return await request.get(`${menuURl}/${id}`)
    },

    async addMenu ({ commit, dispatch }, formData) {
      const result = await request.post(`${menuURl}`, formData)
      dispatch('getThreeMenu')
      return result
    },

    async updateMenu ({ commit, dispatch }, { id, formData }) {
      console.log(formData)
      const result = await request.put(`${menuURl}/${id}`, formData)
      dispatch('getThreeMenu')
      return result
    },

    async deleteMenu ({ commit, dispatch }, id) {
      const result = await request.delete(`${menuURl}/${id}`)
      dispatch('getThreeMenu')
      return result
    },

    //获取表格数据
    async loadListData({ commit, state }, { page = 1, reset = false } = {}){
      if (reset) commit('setListFilterParams', {})
        const result = await request.get(`${listURL}/${state.listPath}`, {
          params: Object.assign({
            current: page,
            size: state.list.pageSize
          }, state.list.params, state.list.filterParams)
        });
        commit('listLoaded')
        commit('setListData', {
          total: result.total,
          currentPage: page,
          items: result.records
        })
    },

    //根据ID查看表格单个数据
    async load({ state }, id){
      return await request.get(`${listURL}/${state.listPath}/${id}`)
    },

    //添加表格数据
    async create({ dispatch, state }, formData) {
      let result = await request.post(`${listURL}/${state.listPath}`, formData)
      dispatch('loadListData')
      return result
    },

    //修改表格单个数据
    async update({ dispatch, state }, {id, formData}){
      let result = await request.put(`${listURL}/${state.listPath}/update/${id}`, formData)
      dispatch('loadListData')
      return result
    },

    //删除表格单个数据
    async delete({ dispatch, state }, id){
      await request.delete(`${listURL}/${state.listPath}/${id}`,)
      dispatch('loadListData')
    }
  }
})
