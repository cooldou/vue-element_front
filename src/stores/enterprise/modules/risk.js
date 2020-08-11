import orderBy from 'lodash/orderBy'
import axios from 'axios'
import request from '@/modules/request'
import { getSession } from '@/modules/authentication'
import { getAPIBaseURL } from '@/modules/utils'

function transformItems(subjects) {
  const result = []

  subjects.forEach(subject => {
    subject.threeSubprojects.forEach(item => {
      result.push(Object.assign({}, subject, item))
    })
  })

  return result
}

function generateJHAStatistics(subjects) {
  const result = []

  subjects.forEach(subject => {
    const items = orderBy(subject.threeSubprojects, (item) => -item.riskLevel)
      .map(item => ({ riskLevel: item.riskLevel }))

    result.push(Object.assign({ items }, subject))
  })

  return result
}

export default {
  namespaced: true,

  state: {
    jhaItems: [],
    flattenedJHAItems: [],
    jhaStatistics: [],
    sclItems: [],
    flattenedSCLItems: []
  },

  mutations: {
    setJHAItems(state, items) {
      state.jhaItems = items
      state.flattenedJHAItems = transformItems(items)
      state.jhaStatistics = generateJHAStatistics(items)
    },

    setSCLItems(state, items) {
      state.sclItems = items
      state.flattenedSCLItems = transformItems(items)
    }
  },

  actions: {
    async loadRisk({}, id) {
      return await request.get('/api/v2/elementArgument/getRiskDetail', {
        params: { riskAssessmentId: id }
      })
    },

    async loadRiskSCL({ commit }, id) {
      const result = await request.get('/api/v2/elementArgument/getSCLRisk', {
        params: { riskAssessmentId: id }
      })

      commit('setSCLItems', result)
    },

    async loadRiskJHA({ commit }, id) {
      const result = await request.get('/api/v2/elementArgument/getJHARisk', {
        params: { riskAssessmentId: id }
      })

      commit('setJHAItems', result)
    },

    async export({}, { riskAssessmentId, type }) {
      return await axios.post(
        `/api/v2/elementArgument/exportWord/${riskAssessmentId}?type=${type}`, {},
        {
          baseURL: getAPIBaseURL(),
          responseType: 'blob',
          headers: {
            'Authorization': getSession().token
          }
        }
      )
    }
  }
}
