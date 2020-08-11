import merge from 'lodash/merge'
import request from '@/modules/request'
import listBase from '@/stores/list'

const baseUrl = '/api/v2/dropEvent'
const list = listBase({url: baseUrl})

export default merge(list, {
  namespaced: true,
  state: {
    eventList: [],
    eventTypeTree: []
  },

  mutations: {
    setEventList (state, data) {
      state.eventList = data
    },

    setEventTypeTree (state, data) {
      state.eventTypeTree = data
    }
  },

  actions: {
    // 事件列表（没有结束的）
    async loadList ({ commit }) {
      const result = await request.get(`${baseUrl}/eventList`)
      commit('setEventList', result)
    },
    // 事件类型树状
    async loadEventTypeTree ({ commit }) {
      const result = await request.get(`${baseUrl}`)
      commit('setEventTypeTree', result)
    },
    // 处理事件
    async eventOperate ({ dispatch }, formData) {
      const result = await request.put(`${baseUrl}/handleEvents?id=${formData.id}`, formData)
      dispatch('loadList')
      return result
    },
  }
})
