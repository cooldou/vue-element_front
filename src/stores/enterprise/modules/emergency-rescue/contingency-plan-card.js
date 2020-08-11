import merge from 'lodash/merge'
import request from '@/modules/request'

const baseUrl = '/api/v2/ERDisposalCard'

export default {
  namespaced: true,

  state: {
    structureId: null,
    cardList: []
  }, 

  mutations: {
    setStructureId (state, data) {
      state.structureId = data
    },
    setCardList (state, data) {
      state.cardList = data
    }
  },

  actions: {
    // 岗位选择
    async loadStructure({ commit }) {
      return await request.get(`${baseUrl}/structureAll`)
    },
     // 获取人员
    async loadUsers({ commit }, params) {
      return await request.get(`${baseUrl}/getUserAll`, {params:{structureList: params}})
    },
     // 新增处置卡
    async create({ commit, dispatch }, params) {
      let result = await request.post(`${baseUrl}`, params)
      dispatch('getStationCard')
      return result
    },
    // 处置卡列表
    async loadList({ commit }) {
      return await request.get(`${baseUrl}`)
    },
     // 获取处置卡
    async detail({ commit }, id) {
      return await request.get(`${baseUrl}/${id}`)
    },
    // 更新处置卡
    async update({ commit, dispatch }, {params, id}) {
      let result = await request.put(`${baseUrl}/${id}`, params.erDisposalCard)
      dispatch('getStationCard')
      return result
    },
    // 更新处置卡与人员关系
    async updateRelate({ commit }, {params, id}) {
      await request.put(`${baseUrl}/updateUserAndDisposalCard/${id}`, params)
    },
    // 删除处置卡
    async delete({ commit, dispatch },{id}) {
      await request.delete(`${baseUrl}/${id}`)
      dispatch('getStationCard')
    },
    // 获取部门处置卡数量
    async cardNumber({ commit }, id) {
      return await request.get(`${baseUrl}/getCardByStructureId`, {params: {structureId: id}})
    },
    // 根据部门id查看该部门及以下工位处置卡列表
    async getStationCard({ state, commit }, id) {
      const result = await request.get(`${baseUrl}/selectCardsByStructureId`, {params: {structureId: state.structureId}})
      commit('setCardList', result)
    },
    //根据卡的ID查看详情
    async showCardById({ commit }, params) {
      return await request.get(`${baseUrl}/showCardById`, {params: params})
    }
  }
}
