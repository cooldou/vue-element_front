import merge from 'lodash/merge'
import request from '@/modules/request'
import listBase from '@/stores/list'

const baseURL = '/api/v2/fourColorPicture'
const list = listBase({ url: baseURL })

export default merge(list, {
  namespaced: true,
  state:{
    imageUrl :""
  },
  actions: {
    //多张请求
    async map () {
      return await request.get(`${baseURL}`)
    },
    
    async create({ dispatch }, formData) {
      await request.post(baseURL, formData)
    },


    
    
   
    // async update({ dispatch }, { id, formData }) {
    //   try {
    //     await request.put(`${baseURL}/${id}`, formData)
    //     await dispatch('loadListData', { reset: true })
    //   } catch (err) {}
    // },

    // async delete({ dispatch }, id) {
    //   try {
    //     await request.delete(`${baseURL}/${id}`)
    //     await dispatch('loadListData', { reset: true })
    //   } catch (err) {}
    // }
  },
  mutations:{
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

    setLoading(state, loading = true) {
      state.loading = loading
    },

    showImg(state,imageurl) {
      state.imageUrl = imageurl
    },
  }
})
