import merge from 'lodash/merge'
import request from '@/modules/request'
import listBase from '@/stores/list'
import Vue from 'vue'

const baseURL = '/api/v2/fourColorPicture'
const list = listBase({ url: baseURL })

export default merge(list, {
  namespaced: true,
  state:{
    imageUrl : '',
    mapId:'',
    markups:[],
    mapList: [],
    riskLists: [],
    elementArgumentList: [],
    chartid: ''
  },

  riskAndElementDataArray:[],

  mutations: {
    setMapList(state, data) {
      state.mapList = data
    },

    showImg(state, imageUrl) {
      state.imageUrl = imageUrl
    },

    setGraphId(state, mapId){
      state.mapId = mapId
    },

    setRiskList(state, data){
      state.riskLists = data.riskList

      state.markups = data.elementArgumentList.map(item => {
        return {
          x: parseFloat(item.leftValue) || 0,
          y: parseFloat(item.topValue) || 0,
          w: parseFloat(item.widthValue) || 200,
          h: parseFloat(item.heightValue) || 100,
          angle: parseFloat(item.angleValue) || 0,
          id: item.id,
          riskAssessmentId: item.riskAssessmentId,
          level: item.riskLevel
        }
      })
    },

    removeMarkup (state,id){
      state.markups.findIndex((value , index)=>{
        if(value.id == id) {
          state.markups.splice(index, 1)
        }
      })
    },

    syncMarkup (state, data) {
      state.markups.findIndex((value , index)=>{
        if(value.id == data.id) {
          state.markups[index] = Object.assign(state.markups[index], data)
        }
      })
    },

    addMarkup(state, markup) {
      state.markups.push(markup)
    },

    // 点击风险点 增加样式
    selectRisk(state, risk) {
      state.riskLists.forEach(risk => {
        Vue.set(risk, 'selected', false)
      })

      const riskIndex = state.riskLists.findIndex(r => r.id === risk.id)
      if (riskIndex !== -1) {
        const risk = state.riskLists[riskIndex]
        Vue.set(risk, 'selected', true)
        state.riskLists.splice(riskIndex, 1, risk)
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
  },

  actions: {
    // 初始四色分布图、删除四色分布图时 获取四色分布图列表，并默认展示第一张图
    async map ({ commit, dispatch }) {
      const result = await request.get(`${baseURL}`)
      commit('setMapList', result)
      if (result && result.length) {
        commit('showImg', result[0].url)
        commit('setGraphId', result[0].id)
        dispatch('listRiskAndElementData')
      } else if (result && !result.length) {
        commit('setRiskList', {
          elementArgumentList: [],
          riskList: []
        })
      }
    },

    // 修改、添加四色分布图时重新获取列表
    async getNewMap ({ commit, dispatch }) {
      const result = await request.get(`${baseURL}`)
      commit('setMapList', result)
      if (result && result.length === 1) {
        commit('showImg', result[0].url)
        commit('setGraphId', result[0].id)
        dispatch('listRiskAndElementData')
      }
    },

    // 根据四色分布图id获取元素、风险点列表
    async listRiskAndElementData({ commit, state}){
      let restElementDataList = await request.get(`${baseURL}/showRiskAndElement?mapId=`+ state.mapId)
      commit('setRiskList', restElementDataList)
    },

    // 新增四色分布图
    async create({ dispatch }, formData) {
      await request.post(baseURL, formData)
      dispatch('getNewMap')
    },

    //修改四色分布图
    async updateImage({ commit, dispatch }, formData) {
      await request.put(`${baseURL}/${formData.id}`,formData)
      commit('showImg', formData.url)
      dispatch('getNewMap')
    },

    // 删除四色分布图
    async delete({ commit, dispatch }, id) {
      await request.delete(`${baseURL}/${id}`)
      commit('showImg', '')
      commit('setGraphId', '')
      dispatch('map')
    },

    // 添加元素
    async addRiskElement({ dispatch , commit , state }, formData) {
      let elementId = await request.post(`${baseURL}/insertElement`, formData)
      let resultData = JSON.parse(
        JSON.stringify(formData)
          .replace(/widthValue/g, 'width')
          .replace(/leftValue/g, 'left')
          .replace(/topValue/g, 'top')
          .replace(/heightValue/g, 'height')
          .replace(/angleValue/g, 'angle')
      )

      commit('addMarkup', Object.assign(
          { id: elementId },
          {
            x: resultData.left,
            y: resultData.top,
            w: resultData.width,
            h: resultData.height,
            riskAssessmentId: resultData.riskAssessmentId,
            level: resultData.riskLevel,
            mapId: resultData.mapId
          }
        )
      )

    },

    // 修改元素
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
        `${baseURL}/updateElement/${id}`,
        Object.assign({ mapId: state.mapId }, resultData)
      )

      commit('syncMarkup', Object.assign({ id }, data))
    },

    // 删除元素
    async deleteMarkup({ commit }, id) {
      await request.delete(`${baseURL}/deleteElement/${id}`)
      commit('removeMarkup', id)
    }
  }
})
