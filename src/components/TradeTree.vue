<template>
  <div class="search-data-container-public">
    <div class="search-data-tree">
      <el-tree style="width: 100%; margin: auto;"
        :data="treeData"
        :show-checkbox="showCheckbox"
        :props="defaultProps"
        @check="handleTree">
      </el-tree>
    </div>
    <div class="search-data-total" v-if="totalData.length">
      <div style="color: #666; font-weight: 900;">当前筛选条件下信息统计(单位：企业数)</div>
      <div>
        <ul class="ul-total-container">
          <li v-if="show">
            <div class="li-item-first">
              <div class="li-item-name">所选行业：</div>
              <div class="li-item-content">{{industryNumber}}</div>
            </div>
            <div>
              <div class="li-item-name">所选企业：</div>
              <div class="li-item-content">{{enterpriseNumber}}</div>
            </div>
          </li>
          <li v-for="items in totalData">
            <div v-for="(item, idx) in items" v-if="items.length > 1" :class="{'li-item-first': idx === 0}">
              <div class="li-item-name">{{item.name}}：</div>
              <div class="li-item-content">{{item.num}}</div>
            </div>
            <div v-for="(item, idx) in items" v-if="items.length === 1" :class="{'independent-item': item.independent, 'single-item': !item.independent}">
              <div class="li-item-name">{{item.name}}：</div>
              <div class="li-item-content">{{item.num}}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import { uniq, compact } from 'lodash'
  import { mapState, mapMutations, mapActions } from 'vuex'

  export default {
    name: 'PageCard',

    components: {

    },

    props: {
      tradeData: {
        type: Array,
        default: () => []
      },
      totalData: {
        type: Array,
        default: () => []
      },
      showCheckbox: {
        type: Boolean,
        default: true
      },
      show: {
        type: Boolean,
        default: true
      },
      isIndustryEnterprise: {
        type: Boolean,
        default: true
      }
    },

    data() {
      return {
        industryNumber: 0,
        enterpriseNumber: 0
      }
    },

    computed: {
      ...mapState('account', ['model', 'industryEnterpriseTree', 'companyUuIds']),

      treeData () {
        return this.isIndustryEnterprise ? this.industryEnterpriseTree : this.model.departmentTree
      },

      defaultProps () {
        return this.isIndustryEnterprise ? { label: 'name' } : {}
      }
    },

    methods: {
      ...mapActions('account', ['loadIndustryEnterpriseTree']),

      handleTree (checkedNodes, checkedKeys) {
        if (this.isIndustryEnterprise) {
          let industryList = checkedKeys.checkedNodes.map((i) => {
            return i.industryName
          })
          let enterpriseList = checkedKeys.checkedNodes.map((i) => {
            if (i.isEnterprise === true) {
              return i.companyUuId
            }
          })
          this.$emit('handleTree', compact(enterpriseList).join('|'))
          this.industryNumber = compact(uniq(industryList)).length
          this.enterpriseNumber = compact(enterpriseList).length
        }
      }
    },

    async created () {
      if (this.isIndustryEnterprise) {
        await this.loadIndustryEnterpriseTree()
        this.$emit('handleTree', this.companyUuIds)
      }
    }
  }
</script>
<style lang="scss">
  .search-data-container-public {
    .search-data-tree {
      .el-tree-node__label {
        font-size: 12px;
      }
    }
  }
</style>
<style lang="scss" scoped>
  .search-data-container-public {
    box-sizing: border-box;
    padding: 20px 0;
    overflow: hidden;
    overflow-y: auto;
    width: 30%;
    height: 100%;
    border-right: 1px solid #ebeef5;
    /*position: relative;*/
    .search-data-tree {
      width: 100%;
      height: 70%;
      overflow: hidden;
      overflow-y: auto;
      box-sizing: border-box;
      padding: 0 20px;
      /*position: absolute;
      height: calc(70% - 40px);*/
    }
    .search-data-total {
      height: 30%;
      width: 100%;
      box-sizing: border-box;
      border-top: 1px solid #ebeef5;
      padding: 10px 20px 0;
      /*position: absolute;
      bottom: 0px;
      padding: 10px 20px;*/
      >:nth-child(1) {
        height: 26px;
        margin-bottom: 10px;
      }
      >:nth-child(2) {
        height: calc(100% - 36px);
        overflow: hidden;
        overflow-y: auto;
        box-sizing: border-box;
        min-height: 47px;
      }
      .ul-total-container {
        list-style: none;
        margin: 0;
        padding: 0;
        border: 1px solid #E4F1FD;
        font-size: 12px;
        box-sizing: border-box;
        >:last-child {
          border-bottom: 0;
        }
        li {
          width: 100%;
          display: flex;
          border-bottom: 1px solid #E4F1FD;
          .li-item-first {
            border-right: 1px solid #E4F1FD;
          }

          >div {
            width: 50%;
            display: flex;
            align-items: center;
            .li-item-name {
              width: 50%;
              height: 100%;
              display: flex;
              align-items: center;
            }
            .li-item-content {
              width: 50%;
              flex-wrap: wrap;
            }
          }
          .li-item-name {
            text-align: right;
            background-color: rgba(249,253,255,1);
            box-sizing: border-box;
            border-right: 1px solid #E4F1FD;
            padding: 5px 10px;
            justify-content: flex-end;
            color: #666;
          }
          .li-item-content {
            box-sizing: border-box;
            padding: 5px 10px;
            color: #333;
          }
          .independent-item {
            width: 100%;
            /*.li-item-name {
              width: calc(50% + 1px);
            }
            .li-item-content {
              width: calc(50% - 1px);
            }*/
          }
          .single-item {
            /*.li-item-name {
              width: calc(50% - 1px);
            }
            .li-item-content {
              width: calc(50% + 1px);
            }*/
          }
        }
      }
    }
  }
</style>
