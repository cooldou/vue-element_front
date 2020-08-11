export default {
  // 企业三证
  enterpriseCertificateData: {
    labelWidth: '110px',
    info: [
      {
        info: [
          { label: '类型', name: 'workType', width: '40%' },
          { label: '责任项目', name: 'controlProject', width: '60%' }
        ]
      },
      {
        minHeight: '100px',
        info: [
          { label: '风险描述', name: 'riskDescription' }
        ]
      },
      {
        minHeight: '200px',
        info: [
          { label: '辨识评估依据', name: 'identifyEvaluationStandard' }
        ]
      },
      {
        minHeight: '100px',
        info: [
          { label: '风险管控措施', name: 'measures' }
        ]
      },
      {
        info: [
          { label: '初始评估（L）', value: '0.5' },
          { label: '实时评估（L）', value: '0.5' }
        ]
      },
      {
        info: [
          { label: '初始评估（E）', value: '2' },
          { label: '实时评估（E）', value: '2' }
        ]
      },
      {
        info: [
          { label: '初始评估（C）', value: '40' },
          { label: '实时评估（C）', value: '40' }
        ]
      },
      {
        info: [
          { label: '初始评估（D）', value: '40' },
          { label: '实时评估（D）', value: '40' }
        ]
      },
      {
        info: [
          { label: '初始风险', value: '低风险' },
          { label: '实时风险', value: '低风险' }
        ]
      },
      {
        info: [
          { label: '持证对象', name: 'holderObject' },
          { label: '批准文号', name: 'certificateNumber' }
        ]
      },
      {
        info: [
          { label: '发证机关', name: 'licenseOrg' },
          { label: '发证时间', name: 'licenseDate', type: 'date' },
          { label: '生效时间', name: 'takeEffectTime', type: 'date' }
        ]
      },
      {
        info: [
          { label: '到期时间', slot: 'expirationTime' },
          { label: '责任级别', value: '公司' },
          { label: '管控手段', value: '更新证照' }
        ]
      },
      {
        info: [
          { label: '责任岗位', slot: 'controlMeans' },
          { label: '更换时间', name: 'inspectionTime', type: 'date' },
          { label: '操作人员', name: 'inspectionName' }
        ]
      },
      {
        minHeight: '150px',
        info: [
          { label: '更换证照影像资料', name: 'inspectionUrl', imgShow: true }
        ]
      }
    ]
  },

  // 定时台帐详情
  dataDetails: {
    labelWidth: '110px',
    info: [
      {
        info: [
          { label: '责任区域', name: 'riskName', width: '70%' },
          { label: '风险等级', slot: 'riskLevel', width: '30%' }
        ]
      },
      {
        info: [
          { label: '责任项目', name: 'controlProject' }
        ]
      },
      {
        minHeight: '100px',
        info: [
          { label: '责任描述', name: 'riskDescription' }
        ]
      },
      {
        minHeight: '200px',
        info: [
          { label: '辨识评估依据', name: 'identifyEvaluationStandard' }
        ]
      },
      {
        minHeight: '100px',
        info: [
          { label: '责任落实要求', name: 'measures' }
        ]
      },
      {
        info: [
          { label: '初始评估（L）', name: 'minimumL' },
          { label: '实时评估（L）', name: 'riskAssessmentL' }
        ]
      },
      {
        info: [
          { label: '初始评估（S）', name: 'riskAssessmentS' },
          { label: '实时评估（S）', name: 'riskAssessmentS' }
        ]
      },
      {
        info: [
          { label: '初始评估（R）', slot: 'minimumR' },
          { label: '实时评估（R）', name: 'riskAssessmentR' }
        ]
      },
      {
        info: [
          { label: '工程技术', name: 'projectTechnology' },
          { label: '管理措施', name: 'managementMeasure' },
          { label: '导致后果', name: 'resultIn' }
        ]
      },
      {
        info: [
          { label: '培训教育', name: 'trainingEducation' },
          { label: '个体防护', name: 'individualProtection' },
          { label: '应急处理', name: 'emergencyProcessing' }
        ]
      },
      {
        info: [
          { label: '痕迹管理', name: 'controlMeans' },
          { label: '责任层级', name: 'controlLevel' },
          { label: '管控周期', name: 'controlPeriod' }
        ]
      }
    ]
  },
  // 作业台帐详情
  workDataDetails: {
    labelWidth: '110px',
    info: [
      {
        info: [
          { label: '作业类型', name: 'workType', width: '70%' },
          { label: '管控级别', name: 'controlLevel', width: '30%' }
        ]
      },
      {
        info: [
          { label: '作业项目', name: 'twoName' }
        ]
      },
      {
        info: [
          { label: '管控内容', name: 'controlProject' }
        ]
      },
      {
        minHeight: '100px',
        info: [
          { label: '风险描述', name: 'riskDescription' }
        ]
      },
      {
        minHeight: '200px',
        info: [
          { label: '辨识评估依据', name: 'identifyEvaluationStandard' }
        ]
      },
      {
        minHeight: '100px',
        info: [
          { label: '风险管控措施', name: 'measures' }
        ]
      },
      {
        info: [
          { label: '初始评估（L）', name: 'minimumL' },
          { label: '实时评估（L）', name: 'riskAssessmentL' }
        ]
      },
      {
        info: [
          { label: '初始评估（E）', name: 'riskAssessmentE' },
          { label: '实时评估（E）', name: 'riskAssessmentE' }
        ]
      },
      {
        info: [
          { label: '初始评估（C）', name: 'riskAssessmentC' },
          { label: '实时评估（C）', name: 'riskAssessmentC' }
        ]
      },
      {
        info: [
          { label: '初始评估（D）', slot: 'minimumD' },
          { label: '实时评估（D）', name: 'riskAssessmentD' }
        ]
      },
      {
        info: [
          { label: '痕迹管理', name: 'controlMeans' },
          { label: '作业风险等级', slot: 'riskLevel' }
        ]
      }
    ]
  },
  // 管控
  controlLabelData: {
    labelWidth: '100px',
    info: [
      {
        info: [
          { label: '排查结果', name: 'results' }
        ]
      },
      {
        info: [
          { label: '管控责任人', name: 'nickName' },
          { label: '所在工位', name: 'jobs' }
        ]
      },
      {
        info: [
          { label: '管控意见', name: 'controlMsg' }
        ]
      },
      {
        minHeight: '150px',
        info: [
          { label: '现场排查影像资料', name: 'url', imgShow: true }
        ]
      }
    ]
  },
  // 管控 台账类型
  controlLabelDataLedger: {
    labelWidth: '100px',
    info: [
      {
        info: [
          { label: '排查结果', name: 'results' }
        ]
      },
      {
        info: [
          { label: '管控责任人', name: 'nickName' },
          { label: '所在工位', name: 'jobs' }
        ]
      },
      {
        info: [
          { label: '管控意见', name: 'controlMsg' }
        ]
      }
    ]
  },
  // 正常复核
  controlLabelData1: {
    labelWidth: '100px',
    info: [
      {
        info: [
          { label: '复核结果', name: 'results' }
        ]
      },
      {
        info: [
          { label: '复核责任人', name: 'nickName' },
          { label: '所在工位', name: 'jobs' },
          { label: '工位层级', slot: 'controlLevelId' }
        ]
      }
    ]
  },
  // 复核驳回
  controlLabelData2: {
    labelWidth: '100px',
    info: [
      {
        info: [
          { label: '复核结果', name: 'results' }
        ]
      },
      {
        info: [
          { label: '复核责任人', name: 'nickName' },
          { label: '所在工位', name: 'jobs' },
          { label: '工位层级', slot: 'controlLevelId' }
        ]
      },
      {
        info: [
          { label: '驳回意见', name: 'controlMsg' }
        ]
      },
      {
        minHeight: '150px',
        info: [
          { label: '驳回影像资料', name: 'url', imgShow: true }
        ]
      }
    ]
  },
  // 复核驳回 台账类型
  controlLabelDataLedger2: {
    labelWidth: '100px',
    info: [
      {
        info: [
          { label: '复核结果', name: 'results' }
        ]
      },
      {
        info: [
          { label: '复核责任人', name: 'nickName' },
          { label: '所在工位', name: 'jobs' },
          { label: '工位层级', slot: 'controlLevelId' }
        ]
      },
      {
        info: [
          { label: '驳回意见', name: 'controlMsg' }
        ]
      }
    ]
  },
  // 隐患治理计划
  hiddenLabelPlan: {
    labelWidth: '100px',
    info: [
      {
        info: [
          { label: '工程技术', name: 'projectTechnology' },
          { label: '管控措施', name: 'managementMeasure' }
        ]
      },
      {
        info: [
          { label: '培训教育', name: 'trainingEducation' },
          { label: '个体防护', name: 'individualProtection' }
        ]
      },
      {
        info: [
          { label: '应急处理', name: 'emergencyProcessing' }
        ]
      },
      {
        info: [
          { label: '整改责任人', name: 'rectificationPeople' },
          { label: '整改期限', name: 'rectificationDate', type: 'date' },
          { label: '整体资金', name: 'rectificationPrice' }
        ]
      },
      {
        info: [
          { label: '整改措施', name: 'rectificationMeasures' }
        ]
      }
    ]
  },
  // 确认隐患
  hiddenLabelData: {
    labelWidth: '100px',
    info: [
      {
        info: [
          { label: '确认结果', name: 'results' }
        ]
      },
      {
        info: [
          { label: '确认人', name: 'nickname' },
          // { label: '所在工位', name: 'jobs' },
          { label: '工位层级', slot: 'controlLevelId' }
        ]
      },
      {
        info: [
          { label: '隐患等级', slot: 'hiddenDangerLevel' },
          { label: '隐患分类', name: 'hiddenDangerType' }
        ]
      }
    ]
  },
  // 隐患整改完成
  hiddenLabelData1: {
    labelWidth: '100px',
    info: [
      {
        info: [
          { label: '验收结果', name: 'results' }
        ]
      },
      {
        info: [
          { label: '验收责任人', name: 'nickname' },
        ]
      },
      {
        info: [
          { label: '验收意见', name: 'remark' },
        ]
      },
      {
        minHeight: '150px',
        info: [
          { label: '验收影像资料', name: 'url', imgShow: true }
        ]
      }
    ]
  },
  // 隐患整改完成 台账类型
  hiddenLabelDataLedger1: {
    labelWidth: '100px',
    info: [
      {
        info: [
          { label: '验收结果', name: 'results' }
        ]
      },
      {
        info: [
          { label: '验收责任人', name: 'nickname' },
        ]
      },
      {
        info: [
          { label: '验收意见', name: 'remark' },
        ]
      }
    ]
  },
  // 隐患驳回
  hiddenLabelData2: {
    labelWidth: '100px',
    info: [
      {
        info: [
          { label: '确认结果', name: 'results' }
        ]
      },
      {
        info: [
          { label: '确认人', name: 'nickname' },
          { label: '工位层级', slot: 'controlLevelId' }
        ]
      },
      {
        info: [
          { label: '驳回意见', name: 'remark' },
        ]
      },
      {
        minHeight: '150px',
        info: [
          { label: '驳回影像资料', name: 'url', imgShow: true }
        ]
      }
    ]
  },
  // 隐患驳回 台账类型
  hiddenLabelDataLedger2: {
    labelWidth: '100px',
    info: [
      {
        info: [
          { label: '确认结果', name: 'results' }
        ]
      },
      {
        info: [
          { label: '确认人', name: 'nickname' },
          { label: '工位层级', slot: 'controlLevelId' }
        ]
      },
      {
        info: [
          { label: '驳回意见', name: 'remark' },
        ]
      }
    ]
  }
}
