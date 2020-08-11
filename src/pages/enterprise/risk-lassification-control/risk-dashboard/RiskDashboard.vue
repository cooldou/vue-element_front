<template>
  <div class="risk-dashboard-container">

    <el-row :gutter="20" class="show-big-screen">
      <el-col :span="4">
        <risk-hidden-danger-ring-total></risk-hidden-danger-ring-total>
      </el-col>
      <el-col :span="4">
        <risk-hidden-danger-ring-total :data-info="{type: 'hiddenDanger', name: '隐患统计'}"></risk-hidden-danger-ring-total>
      </el-col>
      <el-col :span="4">
        <control-promise-total></control-promise-total>
      </el-col>
      <el-col :span="4">
        <control-promise-total :data-info="{type: '承诺', name: '当前承诺进度', color: '#37A9FA'}"></control-promise-total>
      </el-col>
      <el-col :span="8">
        <waring-carousel></waring-carousel>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="show-small-screen">
      <el-col :span="6">
        <risk-hidden-danger-ring-total></risk-hidden-danger-ring-total>
      </el-col>
      <el-col :span="6">
        <risk-hidden-danger-ring-total :data-info="{type: 'hiddenDanger', name: '隐患统计'}"></risk-hidden-danger-ring-total>
      </el-col>
      <el-col :span="12">
        <waring-carousel></waring-carousel>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="show-small-screen">
      <el-col :span="12">
        <control-promise-total></control-promise-total>
      </el-col>
      <el-col :span="12">
        <control-promise-total :data-info="{type: '承诺', name: '当前承诺进度', color: '#37A9FA'}"></control-promise-total>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="24">
        <risk-hidden-danger-histogram-total></risk-hidden-danger-histogram-total>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="24">
        <risk-hidden-danger-histogram-total :data-info="{type: 'hidden', name: '区域隐患统计'}"></risk-hidden-danger-histogram-total>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="24">
        <risk-hidden-danger-trend></risk-hidden-danger-trend>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="show-big-screen" style="height: 400px; margin-bottom: 0;">
      <el-col :span="12">
        <job-risk-total></job-risk-total>
      </el-col>
      <el-col :span="12">
        <special-job-carousel></special-job-carousel>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="show-small-screen" style="height: 400px;">
      <el-col :span="24">
        <job-risk-total></job-risk-total>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="show-small-screen" style="height: 400px;">
      <el-col :span="24">
        <special-job-carousel></special-job-carousel>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { mapState, mapMutations, mapActions } from 'vuex'

  import RiskHiddenDangerRingTotal from './RiskHiddenDangerRingTotal'
  import ControlPromiseTotal from './ControlPromiseTotal'
  import WaringCarousel from './WaringCarousel'
  import RiskHiddenDangerHistogramTotal from './RiskHiddenDangerHistogramTotal'
  import RiskHiddenDangerTrend from './RiskHiddenDangerTrend'
  import JobRiskTotal from './JobRiskTotal'
  import SpecialJobCarousel from './SpecialJobCarousel'

  export default {
    name: 'RiskDashboard',

    components: {
      RiskHiddenDangerRingTotal,
      ControlPromiseTotal,
      WaringCarousel,
      RiskHiddenDangerHistogramTotal,
      RiskHiddenDangerTrend,
      JobRiskTotal,
      SpecialJobCarousel
    },

    data () {
      return {
        loading: true
      }
    },

    methods: {
      ...mapActions('riskDashboard', ['getRiskStatisticalData', 'getHiddenStatisticalData', 'getProgressData', 'getRiskHiddenTotal', 'getRiskHiddenTrend', 'getJobRisk', 'getDoubleControlWarning'])
    },

    async created () {
      await this.getRiskHiddenTrend(6)
      await this.getRiskStatisticalData()
      await this.getHiddenStatisticalData()
      await this.getProgressData()
      await this.getRiskHiddenTotal()
      await this.getJobRisk()
      await this.getDoubleControlWarning()
      this.loading = false
    }
  }
</script>

<style lang="scss">
  .risk-dashboard-container {
    box-sizing: border-box;
    padding: 20px;
    >.el-row {
      height: 324px;
      margin-bottom: 20px;
      &:last-child {
        margin-bottom: 0;
      }
      .el-col {
        height: 100%;
      }
    }
    .show-small-screen {
      display: none;
    }
    @media screen and (max-width: 1500px) {
      .show-big-screen {
        display: none;
      }
      .show-small-screen {
        display: block;
      }
    }
  }
</style>
