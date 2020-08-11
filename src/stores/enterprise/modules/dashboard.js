import request from '@/modules/request'

const baseURL = '/api/v2/home'
const riskUrl = 'api/v2/dataAnalysis'

export default {
  namespaced: true,

  mutations: {
  },

  actions: {
    async getRiskHiddenDangerData({}, day){
        return await request.get(`${riskUrl}/riskHiddenDangerTendency?num=${day}`)
    },

    async getHiddenStatisticalData(){
        return await request.get(`${riskUrl}/hiddenStatistical`)
    },

    async getProgressData(){
        return await request.get(`${riskUrl}/progress`)
    },

    async getRiskStatisticalData(){
        return await request.get(`${riskUrl}/riskStatistical`)
    },

    async getNumStatistics(){
        return await request.get(`${baseURL}/numStatistics`)
    },

    async getMessage(){
        return await request.get(`${baseURL}/message`)
    }
  }
}
