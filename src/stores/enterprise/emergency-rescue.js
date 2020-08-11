import contingencyPlan from './modules/emergency-rescue/contingency-plan' // 企业预案
import contingencyPlanHistory from './modules/emergency-rescue/contingency-plan-history'
import contingencyPlanCard from './modules/emergency-rescue/contingency-plan-card' //应急处置卡
import contingencyCommand from './modules/emergency-rescue/contingency-command' //应急指挥
import contingencyResponse from './modules/emergency-rescue/contingency-response' // 应急救援-应急响应
import enterpriseRescueTeam from './modules/emergency-rescue/enterprise-rescue-team' // 应急救援物资-救援队伍
import enterpriseRescueExpert from './modules/emergency-rescue/enterprise-rescue-expert' // 应急救援物资-救援专家
import emergencyRescueMap from './modules/emergency-rescue/emergency-rescue-map' // 应急救援一张图
import enterpriseRescueResource from './modules/emergency-rescue/enterprise-rescue-resource'
import contingencyDrillRecord from './modules/emergency-rescue/contingency-drill-record'
import contingencyDrillPlan from './modules/emergency-rescue/contingency-drill-plan'
import contingencyDrillSummary from './modules/emergency-rescue/contingency-drill-summary'
import eventReceive from './modules/emergency-rescue/emergency-duty-system/event-receive' // 值守系统事件处置

export default {
  contingencyPlan,
  contingencyPlanCard,
  contingencyCommand,
  contingencyPlanHistory,
  contingencyResponse,
  enterpriseRescueTeam,
  enterpriseRescueExpert,
  emergencyRescueMap,
  enterpriseRescueResource,
  contingencyDrillRecord,
  contingencyDrillPlan,
  contingencyDrillSummary,
  eventReceive
}
