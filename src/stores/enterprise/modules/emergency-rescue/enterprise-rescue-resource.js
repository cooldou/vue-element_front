import merge from 'lodash/merge'
import listBase from '@/stores/list'
import request from '@/modules/request'

const baseUrl = '/api/v2/EREquipmentMaterial'
const list = listBase({ url: '/api/v2/EREquipmentMaterial/erEquipmentMaterialList' })

export default merge(list,{
  namespaced: true,
  state: {
    leftMaterialId:'',
    MaterialData: []
  },

  mutations: {
    setLeftMaterialId(state,id) {
      state.leftMaterialId = id
    },

    setMaterialData(state,data) {
      state.MaterialData = data
    }

  },
  

  actions: {

    //应急【装备物资信息】删除
    async delete({ dispatch }, id) {
      try {
        await request.delete(`${baseUrl}/${id}`)
        await dispatch('loadListData', { reset: true })
      } catch (err) {}
    },

    //应急【装备物资信息】修改
    async update({ dispatch }, { id, erEquipmentMaterial }) {
      try {
        let result = await request.put(`${baseUrl}/${id}`, erEquipmentMaterial)
        await dispatch('loadListData', { reset: true })
        return result
      } catch (err) {}
    },
   
   //查看单条 应急【装备物资信息】
    async detail({ commit }, id) {
      return await request.get(`${baseUrl}/showErEquipmentMaterial/${id}`)
    },




   //下面是右边列表
   
   //应急【装备物资库】列表
    async loadMaterialData({commit},id) {
      // return await request.get(`${baseUrl}/erEquipmentMaterialLibraryList?id=${id}`)
      let MaterialData = await request.get(`${baseUrl}/erEquipmentMaterialLibraryList?id=${id}`)
      commit('setMaterialData',MaterialData)
    },

   //新增物资
   async createLibrary({state, dispatch }, {id, erEquipmentMaterialLibrary}) {
      let result = await request.post(`${baseUrl}/addLibrary/${id}`, erEquipmentMaterialLibrary)
      await dispatch('loadMaterialData',state.leftMaterialId)
      return result
  },
   
   //应急【装备物资】删除
    async deleteLibrary({state, dispatch }, id) {
       await request.delete(`${baseUrl}/deleteByLibraryId/${id}`)
       await dispatch('loadMaterialData',state.leftMaterialId)
    },

   //查看单条应急【装备物资】
    async detailLibrary({ commit }, id) {
      return await request.get(`${baseUrl}/showErEquipmentMaterialLibrary/${id}`)
    },

   //应急【装备物资】修改
   async updateLibrary({state, dispatch }, { id, erEquipmentMaterialLibrary }) {
      let result = await request.put(`${baseUrl}/listByLibraryId/${id}`, erEquipmentMaterialLibrary)
      await dispatch('loadMaterialData',state.leftMaterialId)
      return result
   }
  }
})

