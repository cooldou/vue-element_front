import dcsRemotely from './modules/real-time-monitoring/dcs-remotely/dcs-remotely' // 工艺监控 工艺监控预警
import warningRecords from './modules/real-time-monitoring/dcs-remotely/warning-records' // 风险感知预警-工艺监控预警-报警记录
import historicalRecords from './modules/real-time-monitoring/dcs-remotely/historical-records' // 风险感知预警-工艺监控预警-历史记录
import bindMeter from './modules/real-time-monitoring/bind-meter' // 风险感知预警-绑定仪表

export default {
  bindMeter,
  warningRecords,
  historicalRecords,
  dcsRemotely
}
