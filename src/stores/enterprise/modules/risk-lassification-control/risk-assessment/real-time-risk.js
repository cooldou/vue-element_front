import request from '@/modules/request'
// 作业风险
const baseURL = '/api/v2/workRisk/'

function transformItems(subjects) {
  const result = []

  subjects.forEach(subject => {
    subject.threeSubprojects.forEach(item => {
      result.push(Object.assign({}, subject, item))
    })
  })

  return result
}

export default {
  namespaced: true,

  state: {
    list: {
      loading: false,
      total: 0,
      pageSize: 20,
      currentPage: 1,
      params: {},
      filterParams: {},
      items: []
    },
    flattenedSCLItems: []
  },

  mutations: {
    listLoading(state) {
      state.list.loading = true
    },

    listLoaded(state) {
      state.list.loading = false
    },

    setListData(state, { total, currentPage, items }) {
      state.list = Object.assign({}, state.list, {
        total, currentPage, items
      })
    },

    setRiskDangerItems(state, items) {
      // state.sclItems = items
      state.flattenedSCLItems = transformItems(items)
    }
  },

  actions: {
    async loadListData({ state, commit }) {
      commit('listLoading')
      const result = await request.get(`${baseURL}/workTypeList`)

      commit('listLoaded')
      commit('setListData', { items: result })
    },

    async load({ commit }, id) {
      return await request.get(`${baseURL}/${id}`)
    },

    async loadRiskDetail({}, params) {
      return await request.get(`${baseURL}/getWorkRiskDetail`, {
        params: params
      })
    },

    async loadLedger({ commit }, params) {
      const result = await request.get(`${baseURL}/getWorkJHARisk`, {
        params: params
      })
      commit('setRiskDangerItems', result)
    },
    //删除作业类型
    async deleteTyper({ commit }, workType) {
      await request.delete(`${baseURL}/deleteWorkRisk`,{ params: { workType }})
    },
  }
}
