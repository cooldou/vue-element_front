<template>
  <div class="ul-table-container-detail-show-container">
    <ul class="ul-table-container-detail-show" :style="(fontSize ? `font-size: ${fontSize};` : '')">
      <li style="height: 10px;" v-if="paddingLi"></li>
      <li v-if="labelData && labelData.info" v-for="(items, index) in labelData.info"
        :key="index" :class="liClass(items)"
        :style="(items.minHeight ? `min-height: ${items.minHeight};` : '') + (items.marginTop ? `margin-top: ${items.marginTop};` : '')">
        <div v-if="items.title" :style="'width: auto;' + (items.titleStyle ? items.titleStyle : '')">
          {{items.title}}
        </div>
        <div v-else-if="items.info && items.info.length" v-for="(item, idx) in items.info"
          :class="{'li-item-first': idx < items.info.length - 1}"
          :style="item.width ? {width: item.width} : items.info.length === 1 ? {width: '100%'} : {}">
          <div class="li-item-name"
            :class="labelData.labelPosition ? `justify-content-${labelData.labelPosition}` : ''"
            :style="item.labelWidth ? { width: item.labelWidth } : labelData.labelWidth ? { width: labelData.labelWidth } : {}">
            <slot :name="item.labelSlot"></slot>
            {{item.labelSlot ? '' : item.labelName ? data[item.labelName] : item.label}}
          </div>
          <div v-if="item.slot" class="li-item-content"
            :class="{'content-bg-show': contentBgShow}"
            :style="item.labelWidth ? { width: `calc(100% - ${item.labelWidth})` } : labelData.labelWidth ? { width: `calc(100% - ${labelData.labelWidth})`} : {}">
            <slot v-if="item.slot" :name="item.slot"></slot>
          </div>
          <div v-else-if="item.info" class="li-item-content"
            :style="item.labelWidth ? { width: `calc(100% - ${item.labelWidth})`, padding: 0} : labelData.labelWidth ? { width: `calc(100% - ${labelData.labelWidth})`, padding: 0} : {padding: 0}">
            <div class="li-item-content li-item-first" style="width: 100px;"
              :class="{'content-bg-show': contentBgShow}">
              {{data[item.name]}}
            </div>
            <div class="li-item-name" style="width: 100px">
              {{item.info.labelName ? data[item.info.labelName] : item.info.label}}
            </div>
            <div class="li-item-content" style="width: calc(100% - 200px);"
              :class="{'content-bg-show': contentBgShow}">
              {{item.info.type === 'date' ? dayDesc(data[item.info.name]) : item.info.type === 'dateTime' ? dayTimeDesc(data[item.info.name]) : data[item.info.name]}}
            </div>
          </div>
          <div v-else-if="item.imgShow && !item.singleImg" class="li-item-content"
            :class="{'content-bg-show': contentBgShow}"
            :style="item.labelWidth ? { width: `calc(100% - ${item.labelWidth})`, 'padding': 0 } : labelData.labelWidth ? { width: `calc(100% - ${labelData.labelWidth})`, 'padding': 0 } : { 'padding': 0 }">
            <div v-if="data[item.name] && data[item.name].length > 10" v-for="(i, idx) in imgDesc(data[item.name])" :key="idx" class="item-img" :class="idx === 0 ? 'li-item-first' : ''">
              <img :src="i" v-if="i" @click.stop="$refs.imageShowDialog.show(i)">
            </div>
          </div>
          <div v-else-if="item.imgShow && item.singleImg" class="li-item-content"
            :class="{'content-bg-show': contentBgShow}"
            :style="item.labelWidth ? { width: `calc(100% - ${item.labelWidth})`} : labelData.labelWidth ? { width: `calc(100% - ${labelData.labelWidth})`} : {}">
            <div class="item-img" style="justify-content: flex-start;">
              <img :src="data[item.name]" v-if="data[item.name]" @click.stop="$refs.imageShowDialog.show(data[item.name])">
            </div>
          </div>
          <div v-else-if="item.name" class="li-item-content"
            :class="{'text-indent': item.textIndent, 'content-bg-show': contentBgShow}"
            :style="item.labelWidth ? { width: `calc(100% - ${item.labelWidth})` } : labelData.labelWidth ? { width: `calc(100% - ${labelData.labelWidth})` } : {}">
              {{item.type === 'date' ? dayDesc(data[item.name]) : item.type === 'dateTime' ? dayTimeDesc(data[item.name]) : data[item.name]}}
          </div>
          <div v-else-if="item.value" class="li-item-content"
            :class="{'text-indent': item.textIndent, 'content-bg-show': contentBgShow}"
            :style="item.labelWidth ? { width: `calc(100% - ${item.labelWidth})` } : labelData.labelWidth ? { width: `calc(100% - ${labelData.labelWidth})` } : {}">
              {{item.value}}
          </div>
          <div v-else class="li-item-content" :class="{'content-bg-show': contentBgShow}">
            -
          </div>
        </div>
        <slot v-else :name="items.slot"></slot>
      </li>
      <slot name="configData"></slot>
      <li style="height: 10px;" v-if="paddingLi"></li>
    </ul>

    <image-show-dialog ref="imageShowDialog"></image-show-dialog>
  </div>
</template>

<script>
  import ImageShowDialog from '@/components/ImageShowDialog'
  import dayjs from 'dayjs'
  /* *
  * data: 实时data {}
  * fontSize: 整体字体大小 默认 '14px'
  * paddingLi: 布尔类型 是否头、尾加占位li 默认 false
  * contentBgShow: 布尔类型 实时valve li-item-content 添加背景色 默认 flase
  * labelData { 模版data
  *   labelWidth: label的宽度 默认 '34%' 配置为 固定形式: '具体的px宽度'时 info的labelWidth 尽量不配置
  *   labelPosition labelName的排列方式 'left'、'right'、默认 居中显示
  *   info [ 行数据
  *     {
  *       minHeight 每一行的最低高度
  *       title 标题
  *       titleStyle 标题的样式
  *       slot 对应的插槽name
  *       info [ 每一行的数据
  *         {
  *           label 显示的key
  *           labelName 根据实时数据显示key 配置该属性label无效
  *           name 对应的实时valve
  *           type 时间类型valve 'date' 表示 'YYYY-MM-DD' 'dateTime' 表示 'hh-mm' 默认 ''
  *           textIndent 布尔类型 首行缩进2em 默认 false
  *           imgShow 布尔类型 该内容为图片显示 默认 false
  *           singleImg: 布尔类型 true url为单张图片 false url为两张图片 默认 false
  *           width 该组数据的整体宽度
  *           labelWidth label的宽度 配置后 labelData的labelWidth 无效
  *           slot 对应的插槽name
  *           info {
  *             label: 固定key
  *             labelName: 实时获取的key
  *             labelSlot: key的插槽
  *             name: 实时获取的值
  *             value: 固定值
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
      },
      fontSize: {
        type: String,
        default: '14px'
      },
      paddingLi: {
        type: Boolean,
        default: false
      },
      contentBgShow: {
        type: Boolean,
        default: false
      }
    },

    computed: {

    },

    created () {
    },

    methods: {
      liClass (item) {
        let className = ''
        if (item.center) className = 'li-item-title center'

        if (item.content) className = 'li-item-title'

        if (item.info && item.info.length === 3) className = 'li-three-content'

        if (item.info && item.info.length === 4) className = 'li-four-content'

        if (this.contentBgShow) className += ' padding-4-0'
        return className
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
  .ul-table-container-detail-show-container {
    width: 100%;
    .ul-table-container-detail-show {
      list-style: none;
      margin: 0;
      padding: 0;
      /*border: 1px solid #E4F1FD;*/
      /*font-size: 14px;*/
      >:last-child {
        border-bottom: 0;
      }
      li {
        width: 100%;
        display: flex;
        box-sizing: border-box;
        /*border-bottom: 1px solid #E4F1FD;*/
        background-color: white;
        &:last-child {
          border-bottom: 0;
        }
        .li-item-first {
          /*border-right: 1px solid #E4F1FD;*/
        }

        &.padding-4-0 {
          padding: 4px 10px 4px 0;
        }

        >div {
          width: 50%;
          display: flex;
          align-items: center;
          .li-item-name {
            width: 34%;
            height: 100%;
            // color: #cccfd2;
            color: #888;
            box-sizing: border-box;
            padding: 5px;
            /*border-right: 1px solid #E4F1FD;*/
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: right;
            /*background-color: rgba(249,253,255,1);*/
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
            color: #444;
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
            /*.content-div {
              box-sizing: border-box;
              height: 100%;
              width: 100%;
              display: flex;
              align-items: center;
              &.content-paading-div {
                padding: 5px;
              }
            }*/
            &.content-bg-show {
              background-color: #FCFBFB;
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
  }
</style>
