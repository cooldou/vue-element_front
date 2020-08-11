import request from '@/modules/request'
// 现场应急处置清单
const baseUrl = '/api/v2/emergencyList'
export default {
  namespaced: true,

  actions: {
    // 根据工位id查看应急处置卡
    async loadCardList({}, params) {
      return await request.get(`${baseUrl}/listByStructureId`, {
        params: params
      })
    },
    // 根据处置卡id查看应急处置卡
    async loadCardInfo({}, params) {
      return await request.get(`${baseUrl}/showByCardId`, {
        params: params
      })
    },
  }
}
