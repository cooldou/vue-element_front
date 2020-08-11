<template>
  <div class="strip-type-items-page" @click.stop="$emit('current', actionKeywords ? data[actionKeywords] : data)">
    <slot name="leftData"></slot>
    <div class="strip-type-items-container"
      :style="secondWidth ? `width: calc(100% - ${secondWidth})` : 'width: 100%;'">
      <div v-if="titleShow" class="item-title">
        <slot :name="labelData.titleSlot" v-if="labelData.titleSlot"></slot>
        {{labelData.titleSlot ? '' : data[labelData.title]}}
      </div>
      <div class="item-content" :style="{'font-size': fontSize}">
        <div class="item-info" v-for="(items, index) in labelData.items" :key="index">
          <div v-for="(item, idx) in items" :key="idx + '-' + index" :style="item.width ? {'width': item.width, 'flex': '0 0 auto'} : {}">
            <slot :name="item.slot" v-if="item.slot"></slot>
            <div v-else style="display: flex;">
              <div style="color: #BABEC1;">
                {{item.label}}：
              </div>
              <div style="color: #666;">
                <slot :name="item.valueSlot" v-if="item.valueSlot"></slot>
                {{item.valueSlot ? '' : item.type === 'date' ? dateDesc(data[item.value]) : data[item.value]}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="second-container" :style="`width: ${secondWidth}`" v-if="secondWidth">
      <slot></slot>
    </div>
    <div v-if="actionShow" class="action-button">
      <el-button type="text" size="medium" @click.stop="$emit('update', actionKeywords ? data[actionKeywords] : data)">
        <i class="el-icon-edit-outline" style="color: #717171"></i>
      </el-button>
      <el-button type="text" size="medium" @click.stop="$emit('remove', actionKeywords ? data[actionKeywords] : data)">
        <i class="el-icon-delete" style="color: #F56C6C"></i>
      </el-button>
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

      actionKeywords: {
        type: String,
        default: ''
      },

      secondWidth: {
        type: String,
        default: ''
      },

      fontSize: {
        type: String,
        default: '13px'
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
    &:hover {
      .action-button {
        display: block;
      }
    }
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
      color: #555;
    }
    .item-content {
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      .item-info {
        display: flex;
        justify-content: space-around;
        box-sizing: border-box;
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
  .action-button {
    display: none;
    position: absolute;
    top: 0px;
    right: 10px;
    .el-button {
      padding: 0;
    }
  }
</style>
