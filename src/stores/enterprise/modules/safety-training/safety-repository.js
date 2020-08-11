import merge from 'lodash/merge'
import request from '@/modules/request'
import listBase from '@/stores/list'

const baseURL = '/api/v2/msds'
const list = listBase({
  url: `${baseURL}/knowledgeBase`
})

export default merge(list, {
  namespaced: true,

  actions: {
    // 知识库详情
    async safetyRepositoryDetailsById({}, {params}) {
      try {
        return await request.get(`${baseURL}/knowledgeBaseDetails/`, {params})
      } catch (err) {}
    },
    // 获取MSDS数据库化学品名称
    async getMsds() {
      try {
        return await request.get(`${baseURL}/getMsds`)
      } catch (err) {}
    },
  }
})
