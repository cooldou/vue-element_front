import merge from 'lodash/merge'
import request from '@/modules/request'
import listBase from '@/stores/list'

const baseURL = '/api/v2/hardware'
const list = listBase({ url: baseURL })

export default merge(list, {
  namespaced: true,

  actions: {
    async loadListData({ state, commit }, { reset = false } = {}) {
      if (reset) commit('setListFilterParams', {})
      const result = await request.get(baseURL, {
        params: Object.assign(state.list.params, state.list.filterParams)
      })
      commit('listLoaded')
      commit('setListData', {
        items: result
      })
    },


    async create({ dispatch }, formData) {
      try {
        const result = await request.post(`${baseURL}`, formData)
        await dispatch('loadListData', { reset: true })
        return result
      } catch (err) {}
    },

    async load({ commit }, id) {
      return await request.get(`${baseURL}/${id}`)
    },

    // 仪表类型带icon的
    async loadMeterType () {
      return await request.get(`${baseURL}/hardwareTypeList`)
    },

    //查看三级项树状结构数据
    async loadTree ({}, threeId) {
      return await request.get(`${baseURL}/threeTree`, {
        params: threeId ? {threeId: threeId} : {}
      })
    },

    async update({ dispatch }, { id, formData }) {
      try {
        const result = await request.put(`${baseURL}/update/${id}`, formData)
        await dispatch('loadListData')
        return result
      } catch (err) {}
    },

    async delete({ dispatch }, id) {
      try {
        await request.delete(`${baseURL}/${id}`)
        await dispatch('loadListData')
      } catch (err) {}
    },
    //筛选树状结构
    async loadRiskPoint ({},) {
      return await request.get(`/api/v2/regionalRecord/regionalRecordTree`)
    },
  }
})
