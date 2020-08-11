import dutyListingPublic from './modules/duty-listing/public-interface' // 公共接口
import dutyListingDashboard from './modules/duty-listing/duty-listing-dashboard' // 首页
import mainDutyListing from './modules/duty-listing/main-duty-listing' // 企业安全生产主体责任清单
import dailyCheckListing from './modules/duty-listing/daily-check-listing' // 日常安全检查清单及台账
import jobDutyListing from './modules/duty-listing/job-duty-listing' // 安全生产岗位责任清单
import jobWorkListing from './modules/duty-listing/job-work-listing' // 安全生产岗位作业台账
import sceneDisposalListing from './modules/duty-listing/scene-disposal-listing' // 现场应急处置清单

export default {
  dutyListingPublic,
  dutyListingDashboard,
  mainDutyListing,
  dailyCheckListing,
  jobDutyListing,
  jobWorkListing,
  sceneDisposalListing
}
