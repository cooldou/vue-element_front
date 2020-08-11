import request from '@/modules/request'
import { each, remove } from 'lodash'

const baseURL = '/api/v2/flpBuildingInformation'

export default {
  namespaced: true,

  state: {
    tableData:[],
    treeData: [],
    listParams: {}
  },

  mutations: {
    setDataList (state, data) {
      state.tableData = data
    },

    setTreeData (state, data) {
      state.treeData = each(data, (i) => {
        if (i.children && i.children.length) {
          i.children = remove(i.children, (d) => {
            return d.name
          })
        }
      })
    },

    setListParams (state, data) {
      state.listParams = data
    }
  },

  actions: {
    //树状图
    async loadTree ({ commit }, ) {
      const result = await request.get(`${baseURL}/treeList`)
      commit('setTreeData', result)
    },
    //建筑物基础信息新增
    async create ({ dispatch, commit }, formData) {
      let result = await request.post(`${baseURL}`, formData)
      if (formData.twoId) {
        commit('setListParams', {twoId: formData.twoId})
      } else {
        commit('setListParams', {riskId: formData.riskId})
      }

      dispatch('loadList')
      dispatch('loadTree')
      return result
    },
     //根据区域id或二级项id查看列表
    async loadList ({ commit, state }) {
      const result = await request.get(`${baseURL}/listByRiskIdOrTwoId`, {
        params: state.listParams
      })
      commit('setDataList', result)
    },

    //建筑物信息查看
    async load ({}, id) {
      return await request.get(`${baseURL}/${id}`)
    },

    //建筑物信息修改
    async update ({ dispatch }, {id, formData}) {
      let result = await request.put(`${baseURL}/${id}`, formData)
      dispatch('loadList')
      dispatch('loadTree')
      return result
    },

    //建筑物信息删除
    async delete ({ dispatch }, id) {
      await request.delete(`${baseURL}/${id}`)
      dispatch('loadList')
      dispatch('loadTree')
    },
  }
}
