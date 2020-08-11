import Vue from 'vue'
import request from '@/modules/request'

export default {
  namespaced: true,

  state: {
    loading: false,
    enterpriseId: '',
    monitorEquipmentsMarkups: [],
    monitorEquipments: [],
    planarGraph: {
      id: '',
      url: ''
    },
    markups: []
  },

  mutations: {
    // setEnterpriseId(state, enterpriseId) {
    //   state.enterpriseId = enterpriseId
    // },

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

      state.monitorEquipmentsMarkups = data.equipmentElementArgumentList.map(item => {
        return {
          x: parseFloat(item.left) || 0,
          y: parseFloat(item.top) || 0,
          w: parseFloat(item.width) || 200,
          h: parseFloat(item.height) || 100,
          angle: parseFloat(item.angle) || 0,
          id: item.id,
          riskId: item.riskId,
          equipmentType: item.equipmentType,
          mapId: item.mapId,
          equipmentId: item.equipmentId,
          status: 1
        }
      })

      state.monitorEquipments = data.equipmentList.slice(0)
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

    selectEquipment(state, equipment) {
      state.monitorEquipments.forEach(equipment => {
        Vue.set(equipment, 'selected', false)
      })

      const equipmentIndex = state.monitorEquipments.findIndex(r => r.id === equipment.id)
      if (equipmentIndex !== -1) {
        const equipment = state.monitorEquipments[equipmentIndex]
        Vue.set(equipment, 'selected', true)
        state.monitorEquipments.splice(equipmentIndex, 1, equipment)
      }

      state.monitorEquipmentsMarkups.forEach(markup => {
        Vue.set(markup, 'selected', false)
      })
      if (equipment.equipmentType !== 1) {

        const markupIndex = state.monitorEquipmentsMarkups.findIndex(
          m => m.equipmentType === equipment.equipmentType && m.riskId === equipment.riskId
        )
        if (markupIndex !== -1) {
          const markup = state.monitorEquipmentsMarkups[markupIndex]
          Vue.set(markup, 'selected', true)
          state.monitorEquipmentsMarkups.splice(markupIndex, 1, markup)
        }
      } else {
        const markupIndex = state.monitorEquipmentsMarkups.findIndex(
          m => m.equipmentId === equipment.id
        )
        if (markupIndex !== -1) {
          const markup = state.monitorEquipmentsMarkups[markupIndex]
          Vue.set(markup, 'selected', true)
          state.monitorEquipmentsMarkups.splice(markupIndex, 1, markup)
        }
      }
    },

    addMarkup(state, equipmentMarkup) {
      state.monitorEquipmentsMarkups.push(equipmentMarkup)
    },

    syncMarkup(state, data) {
      const markupIndex = state.monitorEquipmentsMarkups.findIndex(m => m.id === data.id)
      if (!markupIndex === -1) return

      const markup = Object.assign({}, state.monitorEquipmentsMarkups[markupIndex], {
        x: data.left,
        y: data.top,
        w: data.width,
        h: data.height,
        angle: data.angle
      })
      state.monitorEquipmentsMarkups.splice(markupIndex, 1, markup)
    },

    removeMarkup(state, id) {
      const index = state.monitorEquipmentsMarkups.findIndex(m => m.id === id)
      state.monitorEquipmentsMarkups.splice(index, 1)
    }
  },

  actions: {
    async loadData({ state, commit }, equipmentType = null) {
      commit('setLoading')
      const result = await request.get(`/api/v2/equipmentElementArgument`, {
        params: {
          equipmentType: equipmentType ? equipmentType : null
        }
      })
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

    async createEquipmentMarkup({ state, commit }, data) {
      let resultData = JSON.parse(
        JSON.stringify(data)
          .replace(/width/g, 'widthValue')
          .replace(/left/g, 'leftValue')
          .replace(/top/g, 'topValue')
          .replace(/height/g, 'heightValue')
          .replace(/angle/g, 'angleValue')
      )

      const result = await request.post('/api/v2/equipmentElementArgument', resultData)

      commit(
        'addMarkup',
        Object.assign(
          { id: result },
          {
            x: data.left,
            y: data.top,
            w: data.width,
            h: data.height,
            riskId: data.riskId,
            mapId: data.mapId,
            equipmentId: data.equipmentId,
            equipmentType: data.equipmentType
          }
        )
      )
    },

    async updateEquipmentMarkup({ state, commit }, { id, data }) {
      let resultData = JSON.parse(
        JSON.stringify(data)
          .replace(/width/g, 'widthValue')
          .replace(/left/g, 'leftValue')
          .replace(/top/g, 'topValue')
          .replace(/height/g, 'heightValue')
          .replace(/angle/g, 'angleValue')
      )

      await request.put(`/api/v2/equipmentElementArgument/${id}`, resultData)

      commit('syncMarkup', Object.assign({ id }, data))
    },

    async deleteEquipmentMarkup({ commit }, id) {
      await request.delete(`/api/v2/equipmentElementArgument/${id}`)
      commit('removeMarkup', id)
    }
  }
}
