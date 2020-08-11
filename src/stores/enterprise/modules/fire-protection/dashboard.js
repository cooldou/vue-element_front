import request from '@/modules/request'

const baseUrl = '/api/v2/fireLightningProtectionHomePage'

export default {
  namespaced: true,
  state: {
    fireEquipmentData: {
      columns: ['equipment', 'controlled', 'Uncontrolled'],
      rows: []
    },
    lightningProtectionData: {
      columns: ['equipment', 'controlled', 'Uncontrolled'],
      rows: []
    },
  },
  mutations: {
    setFireEqumipmentData(state, data) {
      state.fireEquipmentData.rows = data.map(e => {
        return {
          equipment: e['thingsName'],
          controlled: e['controllableNumber'],
          Uncontrolled: e['uncontrolledNumber']
        }
      })
    },
    setLightningProtectionData(state, data) {
      state.lightningProtectionData.rows = data.map(e => {
        return {
          equipment: e['thingsName'],
          controlled: e['controllableNumber'],
          Uncontrolled: e['uncontrolledNumber']
        }
      })
    }
  },
  actions: {
    //隐患和巡检统计
    async hiddenDanger() {
      return await request.get(`${baseUrl}/hiddenDangerPatrolInspectionStatistics`)
    },
    //防雷设施设备
    async lightningProtection() {
      return await request.get(`${baseUrl}/lightningProtectionEquipmentStatistics`)
    },
    //消防设备设施
    async fireProtection() {
      return await request.get(`${baseUrl}/fireEquipmentStatistics`)
    },
    //建筑物统计
    async buildData() {
      return await request.get(`${baseUrl}/flpBuildingInformationStatistics`)
    }
  }
}
