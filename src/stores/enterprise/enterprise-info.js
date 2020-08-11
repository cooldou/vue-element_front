import enterpriseDashboard from './modules/enterprise-info/dashboard' // 企业总览
import enterprise from './modules/enterprise-info/enterprise' // 企业基本信息
import enterpriseSafetyInfo from './modules/enterprise-info/enterprise-safety-info' // 企业安全生产信息
import enterpriseCertification from './modules/enterprise-info/certification' // 企业证照
import enterpriseEquipment from './modules/enterprise-info/enterprise-equipment' // 设备管理
import enterpriseUser from './modules/enterprise-info/enterprise-user' // 人员配置
import enterpriseRiskGrade from './modules/enterprise-info/risk-grade' // 整体风险

// 企业配置相关
import hierarchyCount from './modules/enterprise-info/hierarchy-count'
import hierarchyJob from './modules/enterprise-info/hierarchy-job'
import hierarchyJobEmployee from './modules/enterprise-info/hierarchy-job-employee'
import hierarchyJobRisk from './modules/enterprise-info/hierarchy-job-risk'
import hierarchyJobChild from './modules/enterprise-info/hierarchy-job-child'
import hierarchyTree from './modules/enterprise-info/hierarchy-tree'

import enterpriseWarningInfo from './modules/enterprise-info/enterprise-warning-info' // 企业预警
import threeSimultaneousConstruction from './modules/enterprise-info/three-simultaneous-construction' // 三同时建设


export default {
  enterpriseDashboard,
  enterprise,
  enterpriseSafetyInfo,
  enterpriseCertification,
  enterpriseEquipment,
  enterpriseUser,
  enterpriseRiskGrade,

  hierarchyCount,
  hierarchyJob,
  hierarchyJobEmployee,
  hierarchyJobRisk,
  hierarchyJobChild,
  hierarchyTree,

  enterpriseWarningInfo,
  threeSimultaneousConstruction
}
