import request from '@/modules/request'
import { getAPIBaseURL } from '@/modules/utils'
import storage from '@/modules/storage'
import axios from 'axios'

export default {
  namespaced: true,

  state: {
    model: {},
    sysName: '应急管理综合平台'
  },

  mutations: {
    setAccount(state, data) {
      state.model = data
      state.sysName = data.city + '应急管理综合平台'
    },
    setSystemName (state) {
      state.sysName = '应急管理综合平台'
    }
  },

  actions: {
    async loadData({ commit }) {
      const result = await request.get('/api/v2/companyUser/getUserInfo')
      commit('setAccount', result)
    },

    async updatePassword({ state }, formData) {
      return await request
        .post('/api/v2/companyUser/updateUserPassword', formData)
    },

    async getConfigPath ({}, params) {
      await axios.get(getAPIBaseURL() + '/getPath', {
        params: params
      }).then ((res) => {
        storage.set('configPath', res.data.data)
      })
    },

    async getSystemName({ commit }) {
      // axios.get(getAPIBaseURL() + '/getSysName')
      //   .then ((res) => {
      //     const result = res.data.data
      //     // commit('setSystemName', result)
      //   })
    }
  }
}
