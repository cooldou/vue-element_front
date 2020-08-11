import merge from 'lodash/merge'
import request from '@/modules/request'
import listBase from '@/stores/list'

const list = listBase({url: '/api/v2/ERPlan'})

const baseURL = '/api/v2/ERPlan'

export default merge(list, {
  namespaced: true,

  state: {
    docUrl: '',
    planInfo: {},
    showUpload: true
  },

  mutations: {
    setUrl (state,url) {
      state.docUrl = 'https://view.officeapps.live.com/op/view.aspx?src=' + url
    },
    setPlanInfo (state, data) {
      state.planInfo = data
      if (data.companyId) {
        state.showUpload = false
      }
    }
  },

  actions: {
    async create ({ dispatch }, formData) {
      let result = await request.post(`${baseURL}`, formData)
      dispatch('loadListData')
      return result
    },
    //应急【预案信息】查看
    async detail ({}, id) {
      return await request.get(`${baseURL}/${id}`)
    },
    //应急【预案信息】删除
    async delete ({dispatch}, id) {
      await request.delete(`${baseURL}/${id}`)
      dispatch('loadListData')
    },
    //应急【预案信息】更新
    async update ({dispatch}, {id, formData}) {
      let result = await request.put(`${baseURL}/${id}`, formData)
      dispatch('loadListData')
      return result
    },
    //应急【预案文件】
    async upload ({dispatch}, formData) {
      const result = await request.post(`${baseURL}/planFile`, formData)
      dispatch('getPlanInfo')
      return result
    },
    //获取【预案文件】所有信息
    async getPlanInfo ({ commit }) {
      const result = await request.get(`${baseURL}/planFile`)
      commit('setPlanInfo', result)
      return result
    },
    //所有不分页预案
    async all ({}) {
      return await request.get(`${baseURL}/all`)
    },
    async totalPlan ({dispatch}) {
      return await request.put(`${baseURL}/submittedPlan`)
    },
    async totalRevise ({dispatch}) {
      return await request.put(`${baseURL}/StartRevision`)
    },
    // 应急预案备案表 修订方法
    async reviseFile ({dispatch}, formData) {
      const result = await request.put(`${baseURL}/revision`, formData)
      dispatch('getPlanInfo')
      dispatch('loadListData')
      return result
    }
  }
})
