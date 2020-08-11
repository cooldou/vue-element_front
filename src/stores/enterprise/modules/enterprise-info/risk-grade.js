import request from '@/modules/request'

function transformItems(data) {
  const items = []

  data.securityRiskTypes.forEach(type => {
    type.securityRiskProject.forEach(project => {
      project.securityRiskContent.forEach(content => {
        items.push(Object.assign({
          typeId: type.id,
          typeName: type.name,
          projectId: project.id,
          projectName: project.name
        }, content))
      })
    })
  })

  return items
}

export default {
  namespaced: true,

  state: {
    loading: false,
    items: [],
    editable: false,
    totalScore: 0
  },

  mutations: {
    setItems(state, items) {
      state.items = items
    },

    updateItemScore(state, { itemId, score }) {
      const item = state.items.find(item => item.id === itemId)
      item.score = score
    },

    setTotalScore(state, score) {
      state.totalScore = score
    },

    setEditable(state, editable) {
      state.editable = editable
    },

    setLoading(state, loading = true) {
      state.loading = loading
    }
  },

  actions: {
    async loadData({ commit }) {
      commit('setLoading')
      const result = await request.get('/api/v2/securityRiskContent')

      commit('setItems', transformItems(result))
      commit('setTotalScore', result.countScope)
      commit('setEditable', result.isEdit)
      commit('setLoading', false)
    },

    async updateScore({ state, commit }) {
      const data = state.items.map(item => {
        return {
          riskContentId: item.id,
          scorePoints: item.score
        }
      })

      const result = await request.post('/api/v2/securityRiskContent', {
        securityAnswerQuestions: data
      })
      commit('setEditable', false)

      return result
    },

    async updateTotalScore({ commit }, { totalScore }) {
      await request.post('/api/v2/securityRiskContent/totalScore', {
        scope: totalScore
      })
      commit('setTotalScore', totalScore)
    },

    async updateScoreIsManagement({ state, commit }) {
      const data = state.items.map(item => {
        return {
          riskContentId: item.id,
          scorePoints: item.score
        }
      })

      const result = await request.put('/api/v2/securityRiskContent', {
        securityAnswerQuestions: data
      })
      commit('setEditable', false)

      return result
    }
  }
}
