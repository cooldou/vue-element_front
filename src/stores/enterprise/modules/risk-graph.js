import Vue from 'vue'
import request from '@/modules/request'

export default {
  namespaced: true,

  state: {
    loading: false,
    enterpriseId: '',
    markups: [],
    risks: [],
    planarGraph: {
      id: '',
      url: ''
    }
  },

  mutations: {
    setEnterpriseId(state, enterpriseId) {
      state.enterpriseId = enterpriseId
    },

    setLoading(state, loading = true) {
      state.loading = loading
    },

    setPlanarGraphData(state, data) {
      state.markups = data.elementArgumentList.map(item => {
        return {
          x: parseFloat(item.left) || 0,
          y: parseFloat(item.top) || 0,
          w: parseFloat(item.width) || 200,
          h: parseFloat(item.height) || 100,
          angle: parseFloat(item.angle) || 0,
          id: item.id,
          riskAssessmentId: item.riskAssessmentId,
          level: item.riskLevel
        }
      })
      state.risks = data.riskList.slice(0)
      Object.assign(
        state.planarGraph,
        data.map || {
          id: '',
          url: ''
        }
      )
    },

    setPlanarGraphURL(state, data) {
      Object.assign(state.planarGraph, data || {})
    },

    selectRisk(state, risk) {
      state.risks.forEach(risk => {
        Vue.set(risk, 'selected', false)
      })

      const riskIndex = state.risks.findIndex(r => r.id === risk.id)
      if (riskIndex !== -1) {
        const risk = state.risks[riskIndex]
        Vue.set(risk, 'selected', true)
        state.risks.splice(riskIndex, 1, risk)
      }

      state.markups.forEach(markup => {
        Vue.set(markup, 'selected', false)
      })

      const markupIndex = state.markups.findIndex(
        m => m.riskAssessmentId === risk.id
      )
      if (markupIndex !== -1) {
        const markup = state.markups[markupIndex]
        Vue.set(markup, 'selected', true)
        state.markups.splice(markupIndex, 1, markup)
      }
    },

    addMarkup(state, markup) {
      state.markups.push(markup)
    },

    syncMarkup(state, data) {
      const markupIndex = state.markups.findIndex(m => m.id === data.id)
      if (!markupIndex === -1) return

      const markup = Object.assign({}, state.markups[markupIndex], {
        x: data.left,
        y: data.top,
        w: data.width,
        h: data.height,
        angle: data.angle
      })
      state.markups.splice(markupIndex, 1, markup)
    },

    removeMarkup(state, id) {
      const index = state.markups.findIndex(m => m.id === id)
      state.markups.splice(index, 1)
    }
  },

  actions: {
    async loadData({ state, commit }) {
      commit('setLoading')

      const result = await request.get(`/api/v2/elementArgument`)
      commit('setLoading', false)

      let resultData = JSON.parse(
        JSON.stringify(result)
          .replace(/widthValue/g, 'width')
          .replace(/leftValue/g, 'left')
          .replace(/topValue/g, 'top')
          .replace(/heightValue/g, 'height')
          .replace(/angleValue/g, 'angle')
      )

      commit('setPlanarGraphData', resultData)
    },

    async savePlanarGraph({ state, commit }, formData) {
      let requestURL = '/api/v2/elementArgument/insertOrUpdateMap'
      let method = 'post'

      const result = await request[method](requestURL, {
        companyId: state.enterpriseId,
        ...formData
      })

      if (state.planarGraph.id) commit('setPlanarGraphURL', formData)
      else commit('setPlanarGraphURL', { ...formData, id: result })
    },

    async createMarkup({ state, commit }, data) {
      let resultData = JSON.parse(
        JSON.stringify(data)
          .replace(/width/g, 'widthValue')
          .replace(/left/g, 'leftValue')
          .replace(/top/g, 'topValue')
          .replace(/height/g, 'heightValue')
          .replace(/angle/g, 'angleValue')
      )

      const result = await request.post(
        '/api/v2/elementArgument',
        Object.assign({ mapId: state.planarGraph.id }, resultData)
      )

      commit(
        'addMarkup',
        Object.assign(
          { id: result },
          {
            x: data.left,
            y: data.top,
            w: data.width,
            h: data.height,
            riskAssessmentId: data.riskAssessmentId,
            level: data.riskLevel
          }
        )
      )
    },

    async updateMarkup({ state, commit }, { id, data }) {
      let resultData = JSON.parse(
        JSON.stringify(data)
          .replace(/width/g, 'widthValue')
          .replace(/left/g, 'leftValue')
          .replace(/top/g, 'topValue')
          .replace(/height/g, 'heightValue')
          .replace(/angle/g, 'angleValue')
      )

      await request.put(
        `/api/v2/elementArgument/${id}`,
        Object.assign({ mapId: state.planarGraph.id }, resultData)
      )
      commit('syncMarkup', Object.assign({ id }, data))
    },

    async deleteMarkup({ commit }, id) {
      await request.delete(`/api/v2/elementArgument/${id}`)
      commit('removeMarkup', id)
    }
  }
}
