export default {
  // 风险辨识评估
  path: "risk-assessment",
  redirect: "risk-assessment/risk-assessments",
  component: require("@/pages/enterprise/risk-lassification-control/risk-identification-assessment/Layout")
    .default,
  children: [
    {
      // 区域风险
      path: "risk-assessments",
      name: "risk-assessments-area-risk",
      component: require("@/pages/enterprise/risk-lassification-control/risk-identification-assessment/RiskAssessments")
        .default
    },
    {
      // 作业风险列表
      path: "real-time-risk-assessment",
      name: "real-time-risk-assessment",
      component: require("@/pages/enterprise/risk-lassification-control/risk-identification-assessment/real-time-risk/RealTimeRisk")
        .default
    }
  ]
};
