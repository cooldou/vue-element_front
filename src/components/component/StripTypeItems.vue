<template>
  <div class="strip-type-items-page" @click="$emit('current', actionKeywords ? data[actionKeywords] : data)">
    <div class="left-info-container" :style="`width: ${leftWidth}`">
      <slot name="leftData"></slot>
    </div>
    <div class="strip-type-items-container"
      :style="`width: calc(100% - ${leftWidth} - ${secondWidth})`">
      <div v-if="titleShow" class="item-title">
        <slot :name="labelData.titleSlot" v-if="labelData.titleSlot"></slot>
        {{labelData.titleSlot ? '' : data[labelData.title]}}
      </div>
      <div class="item-content" :style="{'font-size': fontSize}">
        <div class="item-info" v-for="(items, index) in labelData.items" :key="index">
          <div v-for="(item, idx) in items" :key="idx + '-' + index" :style="item.width ? {'width': item.width, 'flex': '0 0 auto'} : {}">
            <slot :name="item.slot" v-if="item.slot"></slot>
            <div v-else style="display: flex; width: 100%;">
              <div :style="'color: #BABEC1;' + (itemLabelWidth ? `width: ${itemLabelWidth}` : '')">
                {{item.label ? item.label + '：' : ''}}
              </div>
              <div :style="'color: #666;' + (itemLabelWidth ? `width: calc(100% - ${itemLabelWidth})` : '')">
                <slot :name="item.valueSlot" v-if="item.valueSlot"></slot>
                {{item.valueSlot ? '' : item.type === 'date' ? dateDesc(data[item.value]) : item.type === 'dateTime' ? dateTimeDesc(data[item.value]) : data[item.value]}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="second-container" :style="`width: ${secondWidth}`" v-if="secondWidth">
      <slot></slot>
    </div>
    <div v-if="actionShow" class="action-button" :style="actionConstShow ? {display: 'block'} : {}">
      <el-button type="text" size="medium" @click.stop="$emit('update', actionKeywords ? data[actionKeywords] : data)">
        <i class="el-icon-edit-outline" style="color: #717171"></i>
      </el-button>
      <el-button type="text" size="medium" @click.stop="$emit('remove', actionKeywords ? data[actionKeywords] : data)">
        <i class="el-icon-delete" style="color: #F56C6C"></i>
      </el-button>
    </div>
    <div v-if="!actionShow" class="right-top-info-show">
      <slot name="rightTopInfo"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'StripTypeItems',

    components: {
    },

    props: {
      labelData: {
        type: Object,
        default () { return {} }
      },

      data: {
        type: Object,
        default () { return {} }
      },

      titleShow: {
        type: Boolean,
        default: true
      },

      actionShow: {
        type: Boolean,
        default: true
      },

      actionConstShow: {
        type: Boolean,
        default: false
      },

      actionKeywords: {
        type: String,
        default: ''
      },

      secondWidth: {
        type: String,
        default: '0px'
      },

      fontSize: {
        type: String,
        default: '13px'
      },
      leftWidth: {
        type: String,
        default: '0px'
      },
      itemLabelWidth: {
        type: String,
        default: ''
      }
    },

    methods: {
    }
  }
</script>
<style lang="scss" scoped>
  .strip-type-items-page {
    position: relative;
    width: 100%;
    height: 100%;
    font-size: 13px;
    display: flex;
    padding: 10px 5px;
    border-radius: 4px;
    align-items: center;
    box-sizing: border-box;
    &:hover {
      .action-button {
        display: block;
      }
    }
  }
  .left-info-container {
    box-sizing: border-box;
  }
  .strip-type-items-container {
    height: 100%;
    box-sizing: border-box;
    .item-title {
      box-sizing: border-box;
      padding: 0 5px;
      margin-bottom: 5px;
      font-size: 15px;
      font-weight: 500;
      color: #666;
    }
    .item-content {
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      .item-info {
        display: flex;
        justify-content: space-around;
        box-sizing: border-box;
        margin-bottom: 5px;
        &:last-child {
          margin-bottom: 0;
        }
        >div {
          padding: 0px 5px;
          box-sizing: border-box;
          color: #666;
          flex: 1;
        }
      }
    }
  }
  .second-container {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .action-button, .right-top-info-show {
    position: absolute;
    top: 5px;
    right: 10px;
    .el-button {
      padding: 0;
    }
  }
  .action-button {
    display: none;
  }
</style>
