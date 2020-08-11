import merge from 'lodash/merge'
import listBase from '@/stores/list'
// import { create } from 'parchment/dist/src/registry';
import request from '@/modules/request'
// import listCrud from './emergency-rescue-crud'

const baseUrl = '/api/v2/ERExercisePlan'
const recordUrl = '/api/v2/ERExerciseRecord'
const assessmentUrl = '/api/v2/ERExerciseAssessment'
const summaryUrl = '/api/v2/ERExerciseConclusion'
const list = listBase({ url: baseUrl })
// const crud= listCrud({ url: baseURL })

export default merge(list,{
  namespaced: true,
  actions: {
    //生成计划
    async create ({ dispatch }, formData) {
      let result = await request.post(`${baseUrl}`, formData)
      await dispatch('loadListData')
      return result
    },
    //查看单条计划
    async detail ({},id) {
      return await request.get(`${baseUrl}/${id}`)
    },
    //删除单条计划
    async delete ({ dispatch }, id) {
      await request.delete(`${baseUrl}/${id}`)
      await dispatch('loadListData')
    },
    //更新单条计划
    async update ({ dispatch },{formData, id}) {
      let result = await request.put(`${baseUrl}/${id}`, formData)
      await dispatch('loadListData')
      return result
    },
    //更新单条计划状态
    async getStatus ({ dispatch }, id) {
      return await request.get(`${baseUrl}/getStatus/${id}`)
    },
    //开始演练
    async startPlan ({ dispatch }, id) {
      await request.put(`${baseUrl}/start/${id}`)
      await dispatch('loadListData')
    },
    //根据计划id查看记录列表
    async recordList ({},id) {
      return await request.get(`${recordUrl}/listByPlanId/${id}`)
    },
    //根据计划id查看记录总详情
    async recordTotalDetail ({},id) {
      return await request.get(`${recordUrl}/showByPlanId/${id}`)
    },
    //根据计划id查看评估展开列表
    async assessmentList ({},id) {
      return await request.get(`${assessmentUrl}/listByplanId/${id}`)
    },
    //根据计划id查看记录详情
    async oneRecordDetail ({},id) {
      return await request.get(`${recordUrl}/${id}`)
    },
    //根据计划id查看评估总详情
    async assessmentTotalDetail ({},id) {
      return await request.get(`${assessmentUrl}/${id}`)
    },
    //根据计划id查看单条评估详情
    async oneAssessmentDetail ({},id) {
      return await request.get(`${assessmentUrl}/showById/${id}`)
    },
    //进行单条评估
    async oneAssessmentEdit ({}, {id, formData}) {
      return await request.put(`${assessmentUrl}/recordRating/${id}`, formData)
    },
    //进行总评估
    async totalAssessmentEdit ({}, {id, formData}) {
      return await request.put(`${assessmentUrl}/overallRating/${id}`, formData)
    },
    //根据计划id查看总结
    async summaryTotalDetail ({},id) {
      return await request.get(`${summaryUrl}/showByPlanId/${id}`)
    },
    //进行总结编辑
    async totalSummaryEdit ({}, {id, formData}) {
      return await request.put(`${summaryUrl}/${id}`, formData)
    },
  }
})
