import Vue from 'vue'
import Vuex from 'vuex'

import district from '@/stores/modules/district'
import resourceSelect from '@/stores/modules/resource-select'
import cascaderSelect from '@/stores/modules/cascader-select'

// 从四色分布图点击进去的接口
import risk from './modules/risk'
import riskControl from './modules/risk-control'
import hiddenDangerControl from './modules/hidden-danger-control'

import account from './modules/account'

import enterpriseRiskGraph from './modules/risk-graph'

import policy from './modules/policy'
import enterpriseRiskTrend from './modules/risk-trend'
import dashboardCarousel from './modules/carousel'
import dashboardNotice from './modules/notice'
import dashboardProgressStatistics from './modules/progress-statistics'
import dashboardRiskStatistics from './modules/risk-statistics'
import dashboardSpecialJobStatistics from './modules/special-job-statistics'

import liaison from './modules/liaison'

// 2.0版本 新增
import majorHazard from './modules/major-hazard/major-hazard'
import majorHazardGraph from './modules/major-hazard/major-hazard-graph'
import securityRepository from './modules/security-repository'

import managerTraining from './modules/manager-training'
import dashboard from './modules/dashboard'
import getDropdownOption from './modules/get-dropdown-option'

import contingencyAccidentReport from './modules/contingency-accident-report'
import contingencyAccidentStatistics from './modules/contingency-accident-statistics'
import monitorGraph from './modules/monitor-graph'
import contingencyPlanCardNew from './modules/contingency-plan-card-new'

// 三级项示例图片
import enterpriseRiskThirdItem from './modules/enterprise-risk-third-item'

// -------------------企业合规性
import enterpriseInfo from './enterprise-info'

// -------------------双控概览
import riskLassificationControl from './risk-lassification-control'

// 安全生产标准化
import productionStandardization from './production-standardization'

// -------------------消防
import fireProtection from './fire-protection'

// -------------------应急救援
import emergencyRescue from './emergency-rescue'

// -------------------责任清单
import dutyListing from './duty-listing'

import realTimeMonitoring from './real-time-monitoring'

import jianghui from './jianghui'


Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    ...jianghui,

    ...enterpriseInfo,
    ...riskLassificationControl,
    ...productionStandardization,
    ...fireProtection,
    ...emergencyRescue,
    ...dutyListing,
    ...realTimeMonitoring,

    district,
    resourceSelect,
    cascaderSelect,

    risk,
    riskControl,
    hiddenDangerControl,

    account,
    policy,

    enterpriseRiskGraph,

    enterpriseRiskTrend,

    dashboardCarousel,
    dashboardNotice,
    dashboardProgressStatistics,
    dashboardRiskStatistics,
    dashboardSpecialJobStatistics,

    liaison,

    majorHazard,
    majorHazardGraph,
    securityRepository,


    managerTraining,
    dashboard,
    getDropdownOption,

    contingencyAccidentReport,
    contingencyAccidentStatistics,
    monitorGraph,
    contingencyPlanCardNew,

    // 后期移除
    enterpriseRiskThirdItem
  }
})
