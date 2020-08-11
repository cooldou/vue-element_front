import request from '@/modules/request'
// 日常安全检查清单
const baseUrl = '/api/v2/dailyChecklist'
export default {
  namespaced: true,

  actions: {
    async loadListData({}, params) {
      return await request.get(baseUrl)
    }
  }
}
