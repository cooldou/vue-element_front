import request from '@/modules/request'
import { each } from 'lodash'
// 责任清单概览

const baseUrl = '/api/v2/listingHomePage'

export default {
  namespaced: true,
  state: {
    mainListingStatisticsTotal: 0,
    mainListingStatisticsData: {
      columns: ['title', 'num'],
      rows: []
    },
    dailyInspectionStatisticsData: {
      columns: ['title', 'num'],
      rows: [
        { title: '已落实', num: 0 }
      ]
    },
    emergencyDisposalStatistics: {
      columns: ['name', 'accidentNum'],
      rows: []
    },
    emergencyDisposalStatisticsTotal: 0,
    locationInspectionStatistics: {
      columns: ['title', 'num'],
      rows: [
        { title: '已落实', num: 0 }
      ]
    },
    stationListStatistics: {
      columns: ['structureName', 'riskLevelOne', 'riskLevelTwo', 'riskLevelThree', 'riskLevelFour'],
      rows: []
    },
    stationListStatisticsTotal: {
      riskLevelOneNum: 0,
      riskLevelTwoNum: 0,
      riskLevelThreeNum: 0,
      riskLevelFourNum: 0
    },
    structureStatistics: {
      columns: ['companyLevel', 'num'],
      rows: []
    },
    structureStatisticsTotal: 0,
    workListStatistics: {
      columns: ['name', 'riskLevelOne', 'riskLevelTwo', 'riskLevelThree', 'riskLevelFour'],
      rows: []
    },
    workListStatisticsTotal: {
      riskLevelOneNum: 0,
      riskLevelTwoNum: 0,
      riskLevelThreeNum: 0,
      riskLevelFourNum: 0
    },
  },
  mutations: {
    setMainListingStatistics (state, data) {
      state.mainListingStatisticsTotal = data.total
      state.mainListingStatisticsData.rows = [
        {
          title: '已落实', num: data.total - data.unfinished
        },
        {
          title: '未落实', num: data.unfinished
        }
      ]
    },
    setDailyInspectionStatistics (state, data) {
      let completeNum = data.completeNum === 0 ? 0 : (
        data.completeNum / data.totalNum).toFixed(4)

      state.dailyInspectionStatisticsData.rows = [
        { title: '已落实', num: completeNum * 100 }
      ]
    },
    setEmergencyDisposalStatistics (state, data) {
      state.emergencyDisposalStatistics.rows = data
      let emergencyDisposalStatisticsTotal = 0
      each(data, (item) => {
        if (item.accidentNum > 0) {
          emergencyDisposalStatisticsTotal += item.accidentNum
        }
      })
      state.emergencyDisposalStatisticsTotal = emergencyDisposalStatisticsTotal
    },
    setLocationInspectionStatistics (state, data) {
      let completeNum = data.completeNum === 0 ? 0 : (
        data.completeNum / data.totalNum).toFixed(4)
      state.locationInspectionStatistics.rows = [
        { title: '已落实', num: completeNum * 100 }
      ]
    },
    setStationListStatistics (state, data) {
      state.stationListStatistics.rows = data
      let stationListStatisticsTotal = {
        riskLevelOneNum: 0,
        riskLevelTwoNum: 0,
        riskLevelThreeNum: 0,
        riskLevelFourNum: 0
      }
      each(data, (item) => {
        stationListStatisticsTotal.riskLevelOneNum += item.riskLevelOne
        stationListStatisticsTotal.riskLevelTwoNum += item.riskLevelTwo
        stationListStatisticsTotal.riskLevelThreeNum += item.riskLevelThree
        stationListStatisticsTotal.riskLevelFourNum += item.riskLevelFour
      })
      state.stationListStatisticsTotal = Object.assign({}, stationListStatisticsTotal)
    },
    setStructureStatistics (state, data) {
      // state.emergencyDisposalStatistics.rows = data
      let structureStatisticsTotal = 0
      const updateData = each(data, (item) => {
        if (item.num > 0) {
          structureStatisticsTotal += item.num
        }
        if (item.companyLevel === 4) item.companyLevel = '公司级'
        if (item.companyLevel === 3) item.companyLevel = '部门级'
        if (item.companyLevel === 2) item.companyLevel = '班组级'
        if (item.companyLevel === 1) item.companyLevel = '岗位级'
      })

      state.structureStatistics.rows = updateData
      state.structureStatisticsTotal = structureStatisticsTotal
    },
    setWorkListStatistics (state, data) {
      state.workListStatistics.rows = data
      let workListStatisticsTotal = {
        riskLevelOneNum: 0,
        riskLevelTwoNum: 0,
        riskLevelThreeNum: 0,
        riskLevelFourNum: 0
      }
      const updateData = each(data, (item) => {
        let finalNum = item.num / (item.riskLevelOne + item.riskLevelTwo + item.riskLevelThree + item.riskLevelFour)
        if (finalNum > parseInt(finalNum)) {
          finalNum = parseInt(finalNum) + 1
        } else {
          finalNum = parseInt(finalNum)
        }
        item.name = item.name + ' ' + finalNum + '次'
        workListStatisticsTotal.riskLevelOneNum += item.riskLevelOne
        workListStatisticsTotal.riskLevelTwoNum += item.riskLevelTwo
        workListStatisticsTotal.riskLevelThreeNum += item.riskLevelThree
        workListStatisticsTotal.riskLevelFourNum += item.riskLevelFour
      })
      state.workListStatistics.rows = updateData
      state.workListStatisticsTotal = Object.assign({}, workListStatisticsTotal)
    },
  },

  actions: {
    // 主体责任清单统计
    async mainListingStatistics({ commit }, params) {
      const result = await request.get(`${baseUrl}/principalLiabilityStatistics`)
      commit('setMainListingStatistics', result)
    },
    // 日常检查进度统计
    async dailyInspectionStatistics({ commit }, params) {
      const result = await request.get(`${baseUrl}/dailyInspectionStatistics`)

      commit('setDailyInspectionStatistics', result)
    },

    // 现场应急处置清单
    async emergencyDisposalStatistics({ commit }, params) {
      const result = await request.get(`${baseUrl}/emergencyDisposalStatistics`)

      commit('setEmergencyDisposalStatistics', result)
    },

    // 岗位责任完成进度统计
    async locationInspectionStatistics({ commit }, params) {
      const result = await request.get(`${baseUrl}/locationInspectionStatistics`)

      commit('setLocationInspectionStatistics', result)
    },

    // 工位责任清单详情统计(按实际工位)
    async stationListStatistics({ commit }, params) {
      const result = await request.get(`${baseUrl}/stationListStatistics`)

      commit('setStationListStatistics', result)
    },

    // 工位数统计
    async structureStatistics({ commit }, params) {
      const result = await request.get(`${baseUrl}/structureStatistics`)

      commit('setStructureStatistics', result)
    },

    // 岗位安全作业清单统计
    async workListStatistics({ commit }, params) {
      const result = await request.get(`${baseUrl}/workListStatistics`)

      commit('setWorkListStatistics', result)
    }
  }
}
