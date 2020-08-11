import merge from 'lodash/merge'
import request from '@/modules/request'

const baseUrl = '/api/v2/complianceHomePage'

export default {
  namespaced: true,

  actions: {
    // 证书统计
    async loadCertificate({ commit }) {
      return await request.get(`${baseUrl}/certificateStatistics`)
    },
    // 根据证书类型查看详情
    async loadCertificateDetail({ commit }, params) {

      return await request.get(`${baseUrl}/certificateAlarmStatistics`, {
        params: params
      })
    },
    // 预警信息
    async loadWarningData({ commit }) {
      return await request.get(`${baseUrl}/corporateComplianceWarning`)
    },
    // 特种设备统计
    async loadEquipmentData({ commit }) {
      return await request.get(`${baseUrl}/equipmentStatistics`)
    },
    // 企业评分、风险值
    async loadServiceScoreValueRisk({ commit }) {
      return await request.get(`${baseUrl}/serviceScoreValueRisk`)
    },
  }
}
