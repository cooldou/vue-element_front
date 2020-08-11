import Vue from 'vue'
import request from '@/modules/request'
import _ from 'lodash'

const baseURL = '/api/v2/emergencyRescue/getMapByRescue'

function guid () {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8)
    return v.toString(16)
  })
}

export default {
  namespaced: true,

  state: {
    items: [{longitude: 0, latitude: 0}],
    erExperts: [],
    queryList: [],
    queryListItems: []
  },

  getters: {
    filteredEnterprises: (state) => (keyword) => {
      return state.queryListItems.filter(item => {
        return item.label.includes(keyword)
      })
    }
  },

  mutations: {
    setItems(state, data) {
      let items = []

      if (data.company) {
        items.push({
          id: 'enterprise',
          type: 'enterprise',
          name: data.company.enterpriseName,
          latitude: data.company.latitude,
          longitude: data.company.longitude
        })
      }

      if (data.erRescueTeamList) {
        _.each(Object.keys(data.erRescueTeamList), (i) => {
          if (i.length > 4) {
            items.push({
              id: 'rescueTeam' + i,
              type: 'rescueTeam',
              name: '救援队伍',
              latitude: i.split(',')[0],
              longitude: i.split(',')[1],
              itemList: data.erRescueTeamList[i]
            })
          }
        })
      }

      if (data.equipmentMaterialList) {
        _.each(Object.keys(data.equipmentMaterialList), (i) => {
          if (i.length > 4) {
            items.push({
              id: 'equipmentMaterial' + i,
              type: 'equipmentMaterial',
              name: '救援物资',
              latitude: i.split(',')[0],
              longitude: i.split(',')[1],
              itemList: data.equipmentMaterialList[i]
            })
          }
        })
      }
      state.items = items
    },

    setQueryList(state, data) {
      const list = []
      let queryListItems = []
      if (data.erRescueTeamList) {
        const firstLevel = { label: '救援队伍', children: [] }
        _.each(Object.keys(data.erRescueTeamList), (i) => {
          if (i.length > 2) {
            data.erRescueTeamList[i].forEach(item => {
              firstLevel.children.push({
                id: 'rescueTeam' + i,
                label: item.rescueTeamName,
                isClick: true,
                key: guid()
              })
            })
          }
        })
        list.push(firstLevel)
        queryListItems = queryListItems.concat(firstLevel.children)
      }

      if (data.equipmentMaterialList) {
        const firstLevel = { label: '救援物资', children: [] }
        _.each(Object.keys(data.equipmentMaterialList), (i) => {
          if (i.length > 2) {
            data.equipmentMaterialList[i].forEach(item => {
              firstLevel.children.push({
                id: 'equipmentMaterial' + i,
                label: item.equipmentName,
                isClick: true,
                key: guid()
              })
            })
          }
        })
        list.push(firstLevel)
        queryListItems = queryListItems.concat(firstLevel.children)
      }

      state.queryList = list
      state.queryListItems = queryListItems
    },

    setExperts(state, data) {
      state.erExperts = data
    },

    showMapItemInfoWindow(state, id) {
      const index = state.items.findIndex(item => item.id === id)
      if (index !== -1) {
        const item = state.items[index]
        Vue.set(item, 'infoWindowShow', true)
        state.items.splice(index, 1, item)
      }

      return state.items[index]
    },

    hideMapItemInfoWindow(state, id) {
      const index = state.items.findIndex(item => item.id === id)
      if (index !== -1) {
        const item = state.items[index]
        Vue.set(item, 'infoWindowShow', false)
        state.items.splice(index, 1, item)
      }
    },
  },

  actions: {
    async getMapRescue({ commit }) {
      let result = await request.get(baseURL)

      commit('setItems', result)
      commit('setQueryList', result)
      commit('setExperts', result.erExperts)
    }
  }
}
