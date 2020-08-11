import request from '@/modules/request'
// 企业安全生产主体责任清单
const baseUrl = 'api/v2/listMainRespons'
export default {
  namespaced: true,

  state: {
    fileList: {},
    selectList: []
  },

  mutations: {
    setFileList (state, data) {
      state.fileList = data
    },
    setSelectList (state, data) {
      state.selectList = data
    }
  },
  actions: {
    // 获取所有文件
    async loadFileList({ commit }) {
      const result = await request.get(`${baseUrl}/getListMainRespons`)
      commit('setFileList', result)
    },

    // 获取树状
    async getDataTree({ commit }) {
      return await request.get(`${baseUrl}/treeCatalog`)
    },

    // 获取上传文件下拉选
    async getSelectList({ commit }) {
      const result = await request.get(`${baseUrl}/showResponsibilities`)
      commit('setSelectList', result)
    },

    // 新版上传文件
    async newAddAndUpdateFile ({ dispatch }, params) {
      const result = await request.put(`${baseUrl}/updateOrInsertFile`, params)
      dispatch('getSelectList')
      return result
    },

    // 删除文件
    async deleteFile ({ dispatch }, id) {
      const result = await request.delete(`${baseUrl}/${id}`)
      dispatch('getSelectList')
      return result
    },

    async addAndUpdateFile ({ dispatch }, params) {
      const result = await request.put(`${baseUrl}/updateListMainRespons`, params)
      dispatch('loadFileList')
      return result
    }
  }
}
