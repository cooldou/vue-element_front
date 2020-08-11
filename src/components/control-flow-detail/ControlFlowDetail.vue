<template>
  <div class="control-flow-detail" v-loading="loading">
    <div class="detail-info-content" id="detail-info-content">
      <ul-li-detail-show :label-data="dataDetails"
        :data="detailInfo"
        :padding-li="true" :content-bg-show="true">
        <template slot="riskLevel">
          {{riskLevelDesc(detailInfo.riskLevel)}}
        </template>
        <template slot="minimumR">
          {{detailInfo.riskAssessmentS * detailInfo.minimumL}}
        </template>
        <template slot="minimumD">
          {{detailInfo.riskAssessmentE * detailInfo.riskAssessmentC * detailInfo.minimumL}}
        </template>
      </ul-li-detail-show>

      <!-- 风险管控流程 -->
      <div class="flow-info-container" v-if="isRisk">
        <div v-for="(item, index) in detailInfo.riskList" :key="index"
          class="flow-info-item">
          <div class="info-time">{{dateTimeDesc(item.createDate)}}</div>
          <div class="item-info-detail">
            <div class="date-line-container">
              <div class="date-line" :class="colorDesc(item.results)"></div>
              <div class="date-line-2"></div>
            </div>
            <div class="info-title">
              {{item.isDanger === 1 ? '隐患上报' : item.controlOrReview === 1 ? '风险管控' : '管控复核'}}
            </div>
            <ul-li-detail-show :label-data="controlLabelDesc(item.controlOrReview, item.results)" :data="item" :padding-li="true" :content-bg-show="true">
              <template slot="controlLevelId">
                {{controlLevelDesc(item.controlLevelId)}}
              </template>
            </ul-li-detail-show>
          </div>
        </div>
      </div>
        <!-- 隐患流程 -->
      <div class="flow-info-container" v-else>
        <div v-for="(item, index) in detailInfo.riskList"
          :key="index" class="flow-info-item">
          <div class="info-time">{{dateTimeDesc(item.createDate)}}</div>
          <div class="item-info-detail">
            <div class="date-line-container">
              <div class="date-line" :class="colorDesc(item.results)"></div>
              <div class="date-line-2"></div>
            </div>
            <div class="info-title">
              {{item.isDanger === 1 ? '隐患上报' : item.controlOrReview === 1 ? '隐患排查' : '排查复核'}}
            </div>
            <ul-li-detail-show :label-data="controlLabelDesc(item.controlOrReview, item.results, detailInfo.controlMeans)" :data="item" :padding-li="true" :content-bg-show="true">
            </ul-li-detail-show>
          </div>
        </div>
        <div v-for="(item, index) in hiddenFlow"
          :key="index + detailInfo.riskList.length" class="flow-info-item">
          <div class="info-time">{{dateTimeDesc(item.createDate)}}</div>
          <div class="item-info-detail">
            <div class="date-line-container">
              <div class="date-line" :class="colorDesc(item.isDetermine)"></div>
              <div class="date-line-2"></div>
            </div>
            <div class="info-title">
              {{determineDesc(item.isDetermine)}}
            </div>
            <ul-li-detail-show :label-data="hiddenLabelDesc(item.isDetermine, detailInfo.controlMeans)" :data="item" :padding-li="true" :content-bg-show="true">
              <template slot="hiddenDangerLevel">
                {{item.hiddenDangerLevel === 1 ? '重大隐患' : '一般隐患'}}
              </template>
            </ul-li-detail-show>
            <div v-if="item.isDetermine === 'Y'" class="plan-title">隐患治理计划</div>
            <ul-li-detail-show v-if="item.isDetermine === 'Y'" :label-data="hiddenLabelPlan" :data="item" :padding-li="true" :content-bg-show="true">
            </ul-li-detail-show>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapMutations, mapActions } from 'vuex'
  import UlLiDetailShow from '@/components/component/UlLiDetailShow'
  import controlFlowDetail from './control-flow-detail'

  export default {
    name: 'ControlFlowDetail',

    components: {
      UlLiDetailShow
    },

    props: {
      isRedirect: {
        type: Boolean,
        default: false
      },
      isRisk: {
        type: Boolean,
        default: true
      },
      isWork: {
        type: Boolean,
        default: false
      },
      bookId: {
        type: Number,
        default: 0
      }
    },

    data() {
      return {
        loading: false,
        detailInfo: {
          minimumL: 0,
          minimumD: 0,
          minimumR: 0,
          riskAssessmentL: 0,
          riskAssessmentC: 0,
          riskAssessmentE: 0,
          riskAssessmentD: 0,
          riskAssessmentR: 0,
          riskAssessmentS: 0
        },
        id: null
      }
    },

    computed: {
      dataDetails () {
        return this.isWork ? controlFlowDetail.workDataDetails : controlFlowDetail.dataDetails
      },

      hiddenLabelPlan () {
        return controlFlowDetail.hiddenLabelPlan
      },

      hiddenFlow () {
        if (this.detailInfo.hiddenInfo && this.detailInfo.hiddenInfo.hiddenFlow)
          return this.detailInfo.hiddenInfo.hiddenFlow
        return []
      }
    },

    methods: {
      ...mapActions('publicControlLedger', ['loadControlFlow']),

      async show (id) {
        document.getElementById('detail-info-content').scrollTop = 0
        this.id = id
        this.loading = true
        this.loadData()
      },

      async loadData () {
        this.detailInfo = await this.loadControlFlow({bookId: this.id})
        this.loading = false
      },

      riskLevelDesc (level) {
        switch (level) {
          case 1:
            return '重大风险责任'
            break;
          case 2:
            return '较大风险责任'
            break;
          case 3:
            return '一般风险责任'
            break;
          case 4:
            return '低风险责任'
            break;
          default:
            return '无'
        }
      },

      controlLevelDesc (level) {
        switch (level) {
          case 1:
            return '岗位'
            break;
          case 2:
            return '班组'
            break;
          case 3:
            return '部门'
            break;
          case 4:
            return '公司'
            break;
          default:
            return ''
        }
      },

      determineDesc (v) {
        if (v === 'Y') return '确认隐患'
        if (v === 'Z') return '隐患驳回'
        if (v === 'N') return '隐患验收'
        return '确认隐患'
      },

      colorDesc (result) {
        if (result === '正常' || result === '复核通过' || result === 'N') return 'bg-color-1'
        if (result === '驳回' || result === '待确定隐患' || result === 'Y' || result === 'Z') return 'bg-color-2'
        return 'bg-color-0'
      },

      controlLabelDesc (level, results, controlMeans) {
        if (controlMeans === '台账') {
          if (level === 1) return controlFlowDetail.controlLabelDataLedger
          if (results === '驳回') return controlFlowDetail.controlLabelDataLedger2
        } else {
          if (level === 1) return controlFlowDetail.controlLabelData
          if (results === '驳回') return controlFlowDetail.controlLabelData2
        }
        return controlFlowDetail.controlLabelData1
      },

      hiddenLabelDesc (v, controlMeans) {
        if (controlMeans === '台账') {
          if (v === 'N') return controlFlowDetail.hiddenLabelDataLedger1
          if (v === 'Z') return controlFlowDetail.hiddenLabelDataLedger2
        } else {
          if (v === 'N') return controlFlowDetail.hiddenLabelData1
          if (v === 'Z') return controlFlowDetail.hiddenLabelData2
        }
        return controlFlowDetail.hiddenLabelData
      }
    },

    async created() {
    },

    watch: {
      bookId (v) {
        console.log(v)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .control-flow-detail {
    box-sizing: border-box;
    padding: 10px;
    height: 100%;
    width: 100%;
    .detail-info-content {
      height: 100%;
      width: 100%;
      box-sizing: border-box;
      padding-right: 10px;
      padding-bottom: 20px;
      overflow: hidden;
      overflow-y: auto;
      background-color: white;
      .flow-info-container {
        width: 100%;
        margin-top: 20px;
        .flow-info-item {
          display: flex;
          .info-time {
            font-size: 14px;
            box-sizing: border-box;
            padding-left: 10px;
            width: 150px;
          }
          .item-info-detail {
            box-sizing: border-box;
            padding: 0 20px 20px;
            width: calc(100% - 150px);
            position: relative;
            .date-line-container {
              position: absolute;
              top: 3px;
              left: -5px;
              bottom: 0;
              .date-line {
                width: 15px;
                height: 15px;
                border-radius: 50%;
                z-index: 1;
              }
              .date-line-2 {
                position: absolute;
                border-left: 4px solid #EBF5FF;
                top: 15px;
                left: 5px;
                bottom: -5px;
              }
            }
            .info-title {
              font-size: 16px;
              font-weight: bold;
              color: #666;
            }
          }
          &:last-child {
            .date-line-2 {
              bottom: 0px !important;
            }
          }
        }
        .bg-color-0 {
          background-color: #eee;
        }
        .bg-color-1 {
          background-color: #67C23A;
        }
        .bg-color-2 {
          background-color: #EE553C;
        }
      }
      .plan-title {
        font-size: 16px;
        font-weight: bold;
        width: 100%;
        text-align: center;
        color: #666;
      }
    }
  }
</style>
