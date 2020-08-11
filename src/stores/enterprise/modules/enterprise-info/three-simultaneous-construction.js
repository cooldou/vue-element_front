import merge from 'lodash/merge'
import request from '@/modules/request'
import listBase from '@/stores/list'

const list = listBase({url: '/api/v2/threeSameTime'})
const baseUrl = '/api/v2/threeSameTime'

export default merge(list, {
  namespaced: true,

  state: {
    projectData: {},
    threeProjectData: {},
    oneLevelId: ''
  },

  mutations: {
    setProjectData(state, data) {
      state.projectData = data
    },
    setThreeProjectData(state, data) {
      state.threeProjectData = data
    },
    setOneLevelId(state, data) {
      state.oneLevelId = data
    }
  },

  actions: {
    //获取一级项目列表
    async loadProjectData({ commit }) {
      const result = await request.get(`${baseUrl}`)
      commit('setProjectData', result)
    },
     // 新增项目
    async create({ commit, dispatch }, {threeSameTime}) {
      let result = await request.post(`${baseUrl}`, threeSameTime)
      dispatch('loadProjectData')
      return result
    },
     // 根据项目id查看详情(修改项目信息用)
    async detail({ commit }, id) {
      return await request.get(`${baseUrl}/${id}`)
    },


    // 修改项目
    async update({ commit, dispatch }, {threeSameTime, id}) {
      let result = await request.put(`${baseUrl}/${id}`, threeSameTime)
      dispatch('loadProjectData', result)
      return result
    },


    // 删除项目
    async delete({ commit, dispatch },id) {
      await request.delete(`${baseUrl}/${id}`)
      dispatch('loadProjectData')
    },


    //根据项目id查看详情(查看二级及以下菜单用)
    async loadThreeMenu({ commit,state }) {
      const result = await request.get(`${baseUrl}/showThreeSameTimeDetailsList/${state.oneLevelId}`)
      commit('setThreeProjectData', result)
    },


    //新增三级菜单
    async createThreeMenu({ commit, dispatch }, threeSameTimeDetails) {
      let result = await request.post(`${baseUrl}/addThreeSameTimeDetails`, threeSameTimeDetails)
      dispatch('loadThreeMenu')
      return result
    },


    //删除三级菜单
    async deleteThreeMenu({ commit, dispatch },id) {
      await request.delete(`${baseUrl}/deleteThreeSameTimeDetails/${id}`)
      dispatch('loadThreeMenu')
    },

   //三级菜单详情
    async detailThreeMenu({ commit },id) {
      return await request.get(`${baseUrl}/showThreeSameTimeDetails/${id}`)
    },

  //修改三级菜单
    async updateThreeMenu({ commit, dispatch }, {threeSameTimeDetails, id}) {
      let result = await request.put(`${baseUrl}/updateThreeSameTimeDetails/${id}`, threeSameTimeDetails)
      dispatch('loadThreeMenu')
      return result
    }
  }
})