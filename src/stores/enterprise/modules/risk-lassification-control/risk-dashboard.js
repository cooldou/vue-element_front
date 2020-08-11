import request from '@/modules/request'
import dayjs from 'dayjs'

const baseURL = '/api/v4/statisticalChart'

export default {
  namespaced: true,

  state: {
    total: {
      riskNum: 0,
      hiddenNum: 0,
      promiseProgress: 0,
      controlProgress: 0,
    },
    riskData: {
      columns: ['title', 'num'],
      rows: []
    },
    riskInfoData: {},
    hiddenInfoData: {},
    hiddenDangerData: {
      columns: ['title', 'num'],
      rows: []
    },
    controlData: {
      columns: ['title', 'num'],
      rows: []
    },
    promiseData: {
      columns: ['title', 'num'],
      rows: []
    },
    riskHistogramChartData: {
      columns: ['riskName', 'oneRisk', 'twoRisk', 'threeRisk', 'fourRisk', 'toBeDetermined'],
      rows: []
    },
    riskHistogramTotalNum: {
      oneRiskNum: 0,
      twoRiskNum: 0,
      threeRiskNum: 0,
      fourRiskNum: 0,
      toBeDeterminedNum: 0
    },
    hiddenHistogramChartData: {
      columns: ['riskName', 'majorHidden', 'generalHidden', 'toBeDetermined'],
      rows: []
    },
    hiddenHistogramTotalNum: {
      generalHiddenNum: 0,
      majorHiddenNum: 0,
      toBeDeterminedNum: 0,
    },
    riskHiddenchartXAxisData: [],
    riskHiddenDangerData: {
      columns: ['dayDate', 'riskCount', 'hiddenCount'],
      rows: []
    },
    jobRiskChartData: {
      columns: ['riskName', 'oneRisk', 'twoRisk', 'threeRisk', 'fourRisk'],
      rows: []
    },
    jobRiskTotalNum: {
      oneRiskNum: 0,
      twoRiskNum: 0,
      threeRiskNum: 0,
      fourRiskNum: 0
    },
    jobRiskXAxisData: [],
    specialData: [],
    warnData: []
  },

  mutations: {
    setRiskData (state, data) {
      state.riskInfoData = data
      state.riskData.rows = [
        { title: '重大风险', num: data['oneRisk'] },
        { title: '较大风险', num: data['twoRisk'] },
        { title: '一般风险', num: data['threeRisk'] },
        { title: '低风险', num: data['fourRisk'] },
        { title: '待确定', num: data['toBeDetermined'] }
      ]

      let totalNum = 0
      for (let key in data) {
        totalNum += data[key]
      }
      state.total.riskNum = totalNum
    },

    setHiddenData (state, data) {
      state.hiddenInfoData = data
      state.hiddenDangerData.rows = [
        { title: '重大隐患', num: data['majorHazard'] },
        { title: '一般隐患', num: data['generalHazard'] },
        { title: '待确定隐患', num: data['toBeDetermined'] }
      ]

      let totalNum = 0
      for (let key in data) {
        totalNum += data[key]
      }
      state.total.hiddenNum = totalNum
    },

    setControlAndPromise (state, data) {
      let sumControlData = data['unfinished'] + data['finished'] === 0 ? 0 : (
        data['finished'] / (data['unfinished'] + data['finished'])).toFixed(2)
      state.controlData.rows = [
        { title: '已管控', num: sumControlData*100 },
      ]
      let sumPromiseData = data['hasPromised'] + data['noPromised'] === 0 ? 0 : (
        data['hasPromised'] / (data['hasPromised'] + data['noPromised'])).toFixed(2)
      state.promiseData.rows = [
        { title: '承诺', num: sumPromiseData*100 },
      ]
    },

    setRiskHiddenTotalData (state, data) {
      let riskRows = []
      let hiddenRows = []
      let riskHiddenchartXAxisData = []

      let riskHistogramTotalNum = {
        oneRiskNum: 0,
        twoRiskNum: 0,
        threeRiskNum: 0,
        fourRiskNum: 0,
        toBeDeterminedNum: 0
      }

      let hiddenHistogramTotalNum = {
        generalHiddenNum: 0,
        majorHiddenNum: 0,
        toBeDeterminedNum: 0,
      }

      if (data && data.length) {
        for (let a of data) {
          riskRows.push({
            riskName: a.riskName,
            oneRisk: a.oneRisk,
            twoRisk: a.twoRisk,
            threeRisk: a.threeRisk,
            fourRisk: a.fourRisk,
            toBeDetermined: a.riskToBeDetermined
          })
          hiddenRows.push({
            riskName: a.riskName,
            majorHidden: a.majorHidden,
            generalHidden: a.generalHidden,
            toBeDetermined: a.hiddenToBeDetermined
          })
          riskHiddenchartXAxisData.push(a.riskName)
          riskHistogramTotalNum.oneRiskNum += a.oneRisk
          riskHistogramTotalNum.twoRiskNum += a.twoRisk
          riskHistogramTotalNum.threeRiskNum += a.threeRisk
          riskHistogramTotalNum.fourRiskNum += a.fourRisk
          riskHistogramTotalNum.toBeDeterminedNum += a.riskToBeDetermined

          hiddenHistogramTotalNum.majorHiddenNum += a.majorHidden
          hiddenHistogramTotalNum.generalHiddenNum += a.generalHidden
          hiddenHistogramTotalNum.toBeDeterminedNum += a.hiddenToBeDetermined
        }
      }

      state.riskHistogramChartData.rows = riskRows
      state.riskHistogramTotalNum = riskHistogramTotalNum

      state.hiddenHistogramChartData.rows = hiddenRows
      state.hiddenHistogramTotalNum = hiddenHistogramTotalNum
      state.riskHiddenchartXAxisData = riskHiddenchartXAxisData
    },

    setRiskHiddenTrendData (state, data) {
      state.riskHiddenDangerData.rows = data.map((item) => {
        // 代廷盘要求赋为0
        // item.riskCount = 0
        return Object.assign({}, item, { dayDate: dayjs(item['dayDate']).format('M月D日') })
      })
    },

    setJobRiskData (state, data) {
      let riskChartData = []
      let jobRiskTotalNum = {
        oneRiskNum: 0,
        twoRiskNum: 0,
        threeRiskNum: 0,
        fourRiskNum: 0
      }

      Object.keys(data).forEach(key => {
        data[key].riskName = key
        jobRiskTotalNum.oneRiskNum += data[key].oneRisk
        jobRiskTotalNum.twoRiskNum += data[key].twoRisk
        jobRiskTotalNum.threeRiskNum += data[key].threeRisk
        jobRiskTotalNum.fourRiskNum += data[key].fourRisk
        riskChartData.push(data[key])
      })

      state.jobRiskChartData.rows = JSON.parse(
        JSON.stringify(riskChartData)
          .replace(/hot/g, '动火作业')
          .replace(/high/g, '高处作业')
          .replace(/electricity/g, '临时用电作业')
          .replace(/space/g, '受限空间作业')
          .replace(/lifting/g, '吊装作业')
          .replace(/blindFlange/g, '盲板抽堵作业')
          .replace(/digging/g, '动土作业')
          .replace(/openCircuit/g, '断路作业')
      )
      state.jobRiskTotalNum = jobRiskTotalNum
      state.jobRiskXAxisData = state.jobRiskChartData.rows.map(item => {return item.riskName})
    },

    setBroadcastData (state, data) {
      if (data && data.length) {
        let specialPageCount = 0

        if ((data.length / 4) > parseInt(data.length / 4)) {
          specialPageCount = parseInt(data.length / 4) + 1
        } else {
          specialPageCount = parseInt(data.length / 4)
        }

        const specialItems = []
        for (let index = 0; index < specialPageCount; index++) {
          const items = data.slice(index * 4, index * 4 + 4)

          specialItems.push({
            id: index + 1,
            rows: items
          })
        }

        state.specialData = specialItems
      } else {
        state.specialData = []
      }
    },

    setWarnData (state, data) {
      state.warnData = data
    }
  },


  actions: {
    // 风险统计
    async getRiskStatisticalData ({ commit }) {
        const result = await request.get(`${baseURL}/allRisk`)
        commit('setRiskData', result)
    },

    // 隐患统计
    async getHiddenStatisticalData ({ commit}) {
      const result = await request.get(`${baseURL}/hiddenStatistical`)
      commit('setHiddenData', result)
    },

    // 管控、承诺进度
    async getProgressData ({ commit }) {
      const result = await request.get(`${baseURL}/progress`)
      commit('setControlAndPromise', result)
    },

    // 区域风险统计-区域隐患统计
    async getRiskHiddenTotal ({ commit }) {
      const result = await request.get(`${baseURL}/regionRisk`)
      commit('setRiskHiddenTotalData', result)
      // return await request.get(`${baseURL}/coRiskAssessmentAll`)
    },

    // 风险隐患趋势图
    async getRiskHiddenTrend ({ commit }, day) {
      const result = await request.get(`${baseURL}/riskHiddenDangerTendency`, {
        params: {
          num: day
        }
      })
      commit('setRiskHiddenTrendData', result)
    },

    // 作业风险柱状图
    async getJobRisk ({ commit }) {
      const result = await request.get(`${baseURL}/realTimeRiskStatistical`)
      commit('setJobRiskData', result)
    },

    // 特殊作业实时播报
    async getSpecialJobBroadcast ({ commit }) {
      const result = await request.get(`${baseURL}/special`)
      commit('setBroadcastData', result)
    },

    // 预警信息
    async getDoubleControlWarning ({ commit }) {
      const result = await request.get(`${baseURL}/doubleControlWarning`)
      commit('setWarnData', result)
    }
  }
}
