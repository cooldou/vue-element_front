import merge from 'lodash/merge'
import request from '@/modules/request'
import listBase from '@/stores/list'

const baseURL = '/api/v2/conference'
const list = listBase({
  url: `${baseURL}/structureId`
})

export default merge(list, {
  namespaced: true,

  actions: {
    // 新增
    async create({
      dispatch
    }, formData) {
      try {
        const result = await request.post(baseURL, formData)
        await dispatch('loadListData', {
          reset: true
        })
        return result
      } catch (err) {}
    },
    // 修改
    async update({
      dispatch
    }, {
      id,
      formData
    }) {
      try {
        const result = await request.put(`${baseURL}/${id}`, formData)
        await dispatch('loadListData')
        return result
      } catch (err) {}
    },
    // 删除
    async delete({
      dispatch
    }, id) {
      try {
        await request.delete(`${baseURL}/${id}`)
        await dispatch('loadListData')
      } catch (err) {}
    },
    // 卡片详情
    async showDetailsById({
      dispatch
    }, id) {
      try {
        return await request.get(`${baseURL}/details/${id}`)
        await dispatch('loadListData')
      } catch (err) {}
    },
    // 详情编辑用 
    async editDetailsById({
      dispatch
    }, id) {
      try {
        return await request.get(`${baseURL}/${id}`)
        await dispatch('loadListData')
      } catch (err) {}
    },
  }
})
