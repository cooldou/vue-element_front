// 数据分析
import riskDashboard from './modules/risk-lassification-control/risk-dashboard'

// .......风险辨识评估
// 区域风险
import regionalRisk from './modules/risk-lassification-control/risk-assessment/regional-risk'
import riskSecondItem from './modules/risk-lassification-control/risk-second-item'
import riskThirdItem from './modules/risk-lassification-control/risk-third-item'
// 作业风险
import realTimeRisk from './modules/risk-lassification-control/risk-assessment/real-time-risk'
import realTimeRiskThird from './modules/risk-lassification-control/risk-assessment/real-time-risk-third'
import realTimeRiskSecond from './modules/risk-lassification-control/risk-assessment/real-time-risk-second'

// .........风险管控台帐
// 区域风险台帐
import riskControlLedger from './modules/risk-lassification-control/risk-ledger/risk-control-ledger'
// 作业风险台帐
import realTimeRiskLedger from './modules/risk-lassification-control/risk-ledger/real-time-risk-ledger'
// 共用接口
import publicControlLedger from './modules/risk-lassification-control/risk-ledger/public-control-ledger'

// 隐患排查清单
import hiddenInspectList from './modules/risk-lassification-control/hidden-inspect-list'
// 隐患治理台帐
import hiddenCheckControlBook from './modules/risk-lassification-control/check-control-book'
// 风控承诺进度
import riskPromiseProgress from './modules/risk-lassification-control/risk-promise-progress'
// 历史承诺台帐
import historyPromiseBook from './modules/risk-lassification-control/history-promise-book'
// .........风险四色图列
// 四色分布图
import riskPlanarGraph from './modules/risk-lassification-control/enterprise-planar-graph/risk-planar-graph'
// 作业比较图
import riskPlanarGraphJob from './modules/risk-lassification-control/enterprise-planar-graph/risk-planar-graph-job'
// 3D图
import riskFourColor3d from './modules/risk-lassification-control/risk-four-color-3d'
//导出接口
import riskOutPut from './modules/risk-lassification-control/risk-output'

export default {
    riskDashboard,

    regionalRisk,

    realTimeRisk,
    realTimeRiskThird,
    realTimeRiskSecond,

    riskSecondItem,
    riskThirdItem,

    riskControlLedger,
    realTimeRiskLedger,
    publicControlLedger,

    hiddenInspectList,
    hiddenCheckControlBook,
    riskPromiseProgress,
    historyPromiseBook,

    riskPlanarGraph,
    riskPlanarGraphJob,
    riskFourColor3d,

    riskOutPut
}
