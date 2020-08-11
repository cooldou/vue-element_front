import request from '@/modules/request'
import { each, map } from 'lodash'
import dayjs from 'dayjs'

const baseURL = '/api/v2/processMonitoringWarning'

function dateTime (date) {
  return date ? dayjs(date).format('YYYY-MM-DD') : ''
}

export default {
  namespaced: true,
  state: {
    statisticalHardware: [],
    abnormalData: {},
    treeData: [],
    deviceIds: '',
    deviceList: [],
    warningtrendData: {
      columns: ['instrumentTime', 'total', 'hasNum', 'notNum'],
      rows: []
    }
  },

  mutations: {
    setTreeData (state, data) {
      state.treeData = data
      let dataList = []
      each(data, (item) => {
        if (item.children && item.children.length) {
          each(item.children, (i) => {
            if (i.children && i.children.length) {
              dataList.push(...i.children)
            }
          })
        }
      })
      state.deviceList = dataList
      state.deviceIds = map(dataList, 'deviceId').join(',')
    },

    setStatisticalHardware (state, data) {
      state.statisticalHardware = JSON.parse(
        JSON.stringify(data)
          .replace(/deviceType/g, 'name')
          .replace(/num/g, 'value')
      )
    },

    setAbnormalData (state, data) {
      state.abnormalData = data
    },

    setWarningtrendData (state, data) {
      state.warningtrendData.rows = each(data, item => {
        item.instrumentTime = dateTime(item.instrumentTime)
      })
    }
  },

  actions: {
    // 设备树状
    async loadHardwareTree ({ commit }, location) {
      const result = await request.get(`${baseURL}/hardwareTree`, {
        params: {location: location}
      })
      commit('setTreeData', result)
    },
    // 饼图按类型统计仪表数量
    async loadStatisticalHardware ({ commit }) {
      const result = await request.get(`${baseURL}/statisticalHardware`)
      commit('setStatisticalHardware', result)
    },
    // 按仪表类型查看仪表状态比例
    async loadStatisticalByType ({ commit }, deviceType) {
      const result = await request.get(`${baseURL}/statisticalByType` ,{
        params: deviceType ? {deviceType: deviceType} : {}
      })
      commit('setAbnormalData', result)
    },
    // 报警数趋势图
    async loadTrendChart ({ commit },) {
      const result = await request.get(`${baseURL}/trendChart`)
      commit('setWarningtrendData', result)
    }
  }
}
