<template>
  <div>
    <ul class="ul-table-container-detail">
      <li v-if="labelData && labelData.info" v-for="(items, index) in labelData.info"
        :key="index" :class="liClass(items)"
        :style="(items.minHeight ? `min-height: ${items.minHeight};` : '') + (items.marginTop ? `margin-top: ${items.marginTop};` : '')">
        <div v-if="items.title" :style="'width: auto;' + (items.style ? items.style : '')">
          {{items.title}}
        </div>
        <div v-else-if="items.content" style="width: auto;">
          {{(items.join ? items.join : '') + data[items.content]}}
          <div v-if="items.code" class="code">
            {{data[items.code]}}
          </div>
        </div>
        <div v-else-if="items.info && items.info.length" v-for="(item, idx) in items.info"
          :class="{'li-item-first': idx < items.info.length - 1}"
          :style="items.info.length === 1 ? {width: '100%'} : item.width ? {width: item.width} : {}">
          <div class="li-item-name"
            :class="`justify-content-${labelData.labelPosition}`"
            :style="item.labelWidth ? { width: item.labelWidth } : labelData.labelWidth ? { width: labelData.labelWidth } : {}">
            {{item.labelName ? data[item.labelName] : item.label}}
          </div>
          <div v-if="item.slot" class="li-item-content"
            :style="item.labelWidth ? { width: `calc(100% - ${item.labelWidth})` } : labelData.labelWidth ? { width: `calc(100% - ${labelData.labelWidth})`} : {}">
            <slot v-if="item.slot" :name="item.slot"></slot>
          </div>
          <div v-else-if="item.info" class="li-item-content"
            :style="item.labelWidth ? { width: `calc(100% - ${item.labelWidth})`, 'padding': 0 } : labelData.labelWidth ? { width: `calc(100% - ${labelData.labelWidth})`, 'padding': 0 } : {padding: 0}">
            <div class="li-item-content" style="width: 100px; border-right: 1px solid #E4F1FD;">
              {{data[item.name]}}
            </div>
            <div class="li-item-name" style="width: 100px">
              {{item.info.labelName ? data[item.info.labelName] : item.info.label}}
            </div>
            <div class="li-item-content" style="width: calc(100% - 200px);">
              {{item.info.type === 'date' ? dayDesc(data[item.info.name]) : item.info.type === 'dateTime' ? dayTimeDesc(data[item.info.name]) : data[item.info.name]}}
            </div>
          </div>
          <div v-else-if="item.imgShow && !item.singleImg" class="li-item-content"
            :style="item.labelWidth ? { width: `calc(100% - ${item.labelWidth})`, 'padding': 0 } : labelData.labelWidth ? { width: `calc(100% - ${labelData.labelWidth})`, 'padding': 0 } : {padding: 0}">
              <div v-if="data[item.name] && data[item.name].length > 10" v-for="(i, idx) in imgDesc(data[item.name])" :key="idx" class="item-img" :class="idx === 0 ? 'li-item-first' : ''">
                <img :src="i" v-if="i" @click.stop="$refs.imageShowDialog.show(i)">
              </div>
          </div>
          <div v-else-if="item.imgShow && item.singleImg" class="li-item-content"
            :style="item.labelWidth ? { width: `calc(100% - ${item.labelWidth})`} : labelData.labelWidth ? { width: `calc(100% - ${labelData.labelWidth})`} : {}">
              <div class="item-img" style="justify-content: flex-start;">
                <img :src="data[item.name]" v-if="data[item.name]" @click.stop="$refs.imageShowDialog.show(data[item.name])">
              </div>
          </div>
          <div v-else-if="item.name" class="li-item-content" :class="{'text-indent': item.textIndent}"
            :style="item.labelWidth ? { width: `calc(100% - ${item.labelWidth})` } : labelData.labelWidth ? { width: `calc(100% - ${labelData.labelWidth})` } : {}">
              {{item.type === 'date' ? dayDesc(data[item.name]) : item.type === 'dateTime' ? dayTimeDesc(data[item.name]) : data[item.name]}}
          </div>
          <div v-else class="li-item-content">
            -
          </div>
        </div>
        <slot v-else :name="items.slot"></slot>
      </li>
      <slot name="configData"></slot>
    </ul>

    <image-show-dialog ref="imageShowDialog"></image-show-dialog>
  </div>
</template>

<script>
  import ImageShowDialog from '@/components/ImageShowDialog'
  import dayjs from 'dayjs'
  /* *
  * data: 实时data {}
  * labelData { 模版data
  *   labelWidth: label的宽度 默认 '34%' 配置为 固定形式: '具体的px宽度'时 info的labelWidth 尽量不配置
  *   labelPosition labelName的排列方式 'left'、'right'、默认 居中显示
  *   info [ 行数据
  *     {
  *       minHeight 每一行的最低高度
  *       title 标题
  *       style 标题的样式
  *       join 拼接内容
  *       content 独行内容
  *       center: 内容居中
  *       code 编码 独行内容 才可配置
  *       slot 对应的插槽name
  *       info [ 每一行的数据
  *         {
  *           label 显示的key
  *           labelName 根据实时数据显示key 配置该属性label无效
  *           name 对应的实时valve
  *           type 时间类型valve 'date' 表示 'YYYY-MM-DD' 'dateTime' 表示 'hh-mm'
  *           textIndent 首行缩进2em
  *           imgShow 该内容为图片显示
  *           singleImg: true url为单张图片 false url为两张图片
  *           width 该组数据的整体宽度
  *           labelWidth label的宽度 配置后 labelData的labelWidth 无效
  *           slot 对应的插槽name
  *           info {
  *             label
  *             labelName
  *             name
  *           }
  *         }
  *       ]
  *     }
  *   ]
  * }
  * configData 指定插槽名称 <template slot="configData"></template>
  */
  export default {
    name: 'UlLiDetail',

    components: {
      ImageShowDialog
    },

    props: {
      data: {
        type: Object,
        default() { return {} }
      },
      labelData: {
        type: Object,
        default() { return {} }
      }
    },

    computed: {

    },

    created () {
    },

    methods: {
      liClass (item) {
        if (item.center) return 'li-item-title center'

        if (item.content) return 'li-item-title'

        if (item.info && item.info.length === 3) return 'li-three-content'

        if (item.info && item.info.length === 4) return 'li-four-content'

        return ''
      },

      imgDesc (imgs) {
        if (imgs) {
          return imgs.split(',').slice(0, 2)
        } else {
          return []
        }
      },

      dayDesc (t) {
        if (t === '/') return t

        return t ? dayjs(t).format('YYYY-MM-DD') : '/'
      },

      dayTimeDesc (t) {
        if (t === '/') return t

        return t ? dayjs(t).format('YYYY-MM-DD HH:mm') : '/'
      }
    }
  }
</script>

<style lang="scss" scoped>
  .ul-table-container-detail {
    list-style: none;
    margin: 0;
    padding: 0;
    border: 1px solid #E4F1FD;
    font-size: 14px;
    >:last-child {
      border-bottom: 0;
    }
    .li-item-title {
      position: relative;
      padding: 10px 20px;
      /*font-size: 16px;*/
      box-sizing: border-box;
      &.center {
        justify-content: center;
      }
      &.weight {
        font-weight: 800;
      }
      .code {
        position: absolute;
        right: 23px;
        top: 5px;
        font-size: 12px;
        width: auto;
      }
    }
    li {
      width: 100%;
      display: flex;
      border-bottom: 1px solid #E4F1FD;
      &:last-child {
        border-bottom: 0;
      }
      .li-item-first {
        border-right: 1px solid #E4F1FD;
      }

      >div {
        width: 50%;
        display: flex;
        align-items: center;
        .li-item-name {
          width: 34%;
          height: 100%;
          color: #666;
          box-sizing: border-box;
          padding: 5px 10px;
          border-right: 1px solid #E4F1FD;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: right;
          background-color: rgba(249,253,255,1);
          &.justify-content-right {
            justify-content: flex-end
          }
          &.justify-content-left {
            justify-content: flex-start
          }
        }
        .li-item-content {
          width: 66%;
          height: 100%;
          box-sizing: border-box;
          padding: 5px 10px;
          color: #333;
          display: flex;
          align-items: center;
          &.text-indent {
            text-indent: 2em;
          }
          >img {
            width: 120px;
            height: auto;
          }
          .item-img {
            width: 50%;
            text-align: center;
            box-sizing: border-box;
            padding: 10px;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            img {
              width: 260px;
              max-height: 180px;
            }
          }
        }
      }
    }
    .li-two-content {
      >div {
        width: 50%;
        box-sizing: border-box;
      }
    }
    .li-three-content {
      >div {
        width: calc(100% / 3);
        box-sizing: border-box;
      }
    }
    .li-four-content {
      >div {
        width: 25%;
        box-sizing: border-box;
      }
    }
  }
</style>
