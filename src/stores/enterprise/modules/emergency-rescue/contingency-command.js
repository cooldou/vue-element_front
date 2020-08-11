import merge from 'lodash/merge'
import request from '@/modules/request'
import listBase from '@/stores/list'

const list = listBase({url: '/api/v2/ERHeadquartersRescueTeam'})
const baseUrl = '/api/v2/ERHeadquartersRescueTeam'
const baseUrl1 = '/api/v2/EREmergencyHeadquarters'

export default merge(list, {
  namespaced: true,
  state: {
    headquarters: {},
    headquartersUser: [],
    officeInfo: {},
    officeUser: []
  },

  mutations: {
    setHeadquarters (state, data) {
      state.headquarters = data.erHeadquartersAndOffice
      state.headquartersUser = data.sysCompanyUsers
    },

    setOffice (state, data) {
      state.officeInfo = data.erHeadquartersAndOffice
      state.officeUser = data.sysCompanyUsers
    }
  },

  actions: {
     // 新增指挥-救援队伍
    async create({ commit, dispatch }, params) {
      const result = await request.post(`${baseUrl}`, params)
      dispatch('loadListData')
      return result
    },
     // 获取指挥-救援队伍信息
    async detail({ commit }, id) {
      return await request.get(`${baseUrl}/${id}`)
    },
    // 更新指挥-救援队伍
    async update({ commit, dispatch }, {params, id}) {
      const result = await request.put(`${baseUrl}/${id}`, params)
      dispatch('loadListData')
      return result
    },
    // 删除指挥-救援队伍
    async delete({ commit, dispatch },id) {
      await request.delete(`${baseUrl}/${id}`)
      dispatch('loadListData')
    },
    // 新增、编辑指挥部
    async createHead({ commit, dispatch }, params) {
      const result = await request.post(`${baseUrl1}`, params)
      dispatch('getHead', {type: 1})
      dispatch('getHead', {type: 2})
      return result
    },
    // 获取指挥部
    async getHead({ commit, dispatch }, params) {
      const result = await request.get(`${baseUrl1}`, {params})
      if (params.type === 1) {
        commit('setHeadquarters', result)
      }
      if (params.type === 2) {
        commit('setOffice', result)
      }
      // dispatch('loadListData')
    },
    // 发送消息
    async send({ commit, dispatch }, params) {
      await request.post(`${baseUrl1}/beingPushed`, params)
    },
  }
})
