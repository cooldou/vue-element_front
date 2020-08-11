import merge from 'lodash/merge'
import request from '@/modules/request'
import listBase from '@/stores/list'

const baseURL = '/api/v2/enCoPostCertificate'
const list = listBase({ url: baseURL });

export default merge(list, {
  namespaced: true,

  state: {
    certificateTaskList: [],
  },

  mutations: {
    setTaskList(state, data) {
      state.certificateTaskList = data
    },
  },

  actions: {
    async load({ commit }, id) {
      return await request.get(`${baseURL}/${id}`)
    },

    // 获取证书任务列表
    async loadTaskList({ commit, state }) {
      const result = await request.get(`${baseURL}/getCoCertificateTasksByType`, {
        params: {
          certificateType: state.list.params.certificateType
        }
      })
      commit('setTaskList', result)
    },

    // 根据所选证书获取字段
    async loadCertificateField({ commit }, { certificateTemplateId }) {
      return await request.get(`${baseURL}/getFieldsByTemplateId`, {
        params: {
          certificateTemplateId: certificateTemplateId
        }
      })
    },

    // 获取人员下拉选
    async loadUserList({ commit }) {
      return await request.get(`${baseURL}/userAll`)
    },

    async create({ dispatch }, formData) {
      try {
        const result = await request.post(baseURL, formData)
        await dispatch('loadListData', { reset: true })
        await dispatch('loadTaskList')
        return result
      } catch (err) {}
    },

    async update({ dispatch }, { id, formData }) {
      try {
        const result = await request.put(`${baseURL}/${id}`, formData)
        await dispatch('loadListData', { reset: true })
        await dispatch('loadTaskList')
        return result
      } catch (err) {}
    },

    // 管控证书
    async control({ dispatch }, { id, formData }) {
      try {
        const result = await request.put(`${baseURL}/controls/${id}`, formData)
        await dispatch('loadListData', { reset: true })
        await dispatch('loadTaskList')
        return result
      } catch (err) {}
    },

    async delete({ dispatch }, id) {
      try {
        await request.delete(`${baseURL}/${id}`)
        await dispatch('loadListData', { reset: true })
        await dispatch('loadTaskList')
      } catch (err) {}
    }
  }
})
