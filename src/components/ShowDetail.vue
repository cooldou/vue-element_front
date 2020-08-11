<template>
  <div>
    <table style="" class="show-table-container">
      <tr v-if="labelData && labelData.info"
        v-for="(items, index) in labelData.info" :key="index"
        :style="(items.height ? `height: calc(${items.height});` : '')">
        <td v-if="items.content" colspan="48" class="items-content">
          {{items.noAssign ? items.content : data[items.content]}}
          <div v-if="items.code" class="code-container">
            {{data[items.code]}}
          </div>
        </td>
        <td v-else-if="items.info && items.info.length"
          v-for="(item, idx) in items.info"
          :class="{'text-indent': item.textIndent, 'font-size-12': idx % 2 !== 0, 'bg-color': idx % 2 === 0}"
          :colspan="item.colspan ? item.colspan : labelData.colspan" :key="index + '-' + idx">
          <!-- (item.colspan ? `width: ${item.colspan * 16}px;` : `width: ${labelData.colspan * 16}px;`) -->
          <img v-if="item.imgShow && imgDesc(data[item.labelName], item.num)" :src="imgDesc(data[item.labelName], item.num)" :style="`width: calc((${items.height} - 10px) * 16 / 9); height: calc(${items.height} - 10px)`">
          <!-- <img v-if="item.imgShow && imgDesc(data[item.labelName], item.num)" :src="imgDesc(data[item.labelName], item.num)" :style="`height: calc(${items.height} - 10px)`"> -->
          <!-- {{!item.imgShow ? item.labelName ? data[item.labelName] : item.label : ''}} -->
          <slot v-else-if="item.slot" :name="item.slot"></slot>
          {{itemInfo(item)}}
        </td>
        <td v-else colspan="48" class="items-content">
          <slot v-if="items.titelSlot" :name="items.titelSlot"></slot>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
  /* *
  * 所有数据默认居中模式
  * td 最大colspan为48
  * data: 实时data {}
  * labelData { 模版data
  *   colspan 统配td的宽度 一般配置为6
  *   info [ 行数据
  *     {
  *       content 独行内容
  *       code data返回值 独行内容 才可配置
  *       noAssign boolean类型 true 表示 content为直接显示的string值，false 表示为data返回值
  *       height 每一行的最小高度
  *       titelSlot 标题slot
  *       info [ 每一行的数据
  *         {
  *           label 显示的key
  *           labelName 根据实时数据显示key 配置该属性label无效
  *           colspan 改行td的宽度配置 最大值为48 不配置 默认为 labelData
  *           textIndent 表示 该td内容 首行空2格
  *           imgShow 表示该td显示为图片
  *           num 表示取第几张图片
  *           type 时间类型valve 'date' 表示 'YYYY-MM-DD' 'dateTime' 表示 'YYYY-MM-DD hh-mm'
  *           slot 对应的插槽name
  *         }
  *       ]
  *     }
  *   ]
  * }
  */
  import dayjs from 'dayjs'

  export default {
    name: 'ShowDetail',

    components: {
    },

    props: {
      labelData: {
        type: Object,
        default() { return {} }
      },
      data: {
        type: Object,
        default() { return {} }
      }
    },

    data () {
      return {

      }
    },

    computed: {
    },

    created () {
    },

    methods: {
      imgDesc (imgs, num) {
        if (imgs) {
          const list = imgs.split(',').slice(0, 2)
          if (list && list.length >= num) {
            return list[num - 1].length > 20 ? list[num - 1] : ''
          }
        }
        return ''
      },

      dayDesc (t) {
        if (t === '/') return t

        return t ? dayjs(t).format('YYYY-MM-DD') : '/'
      },

      dayTimeDesc (t) {
        if (t === '/') return t

        return t ? dayjs(t).format('YYYY-MM-DD HH:mm') : '/'
      },

      itemInfo (item) {
        if (item.imgShow || item.slot) return ''

        if (item.type === 'date') return this.dayDesc(this.data[item.labelName])

        if (item.type === 'dateTime') return this.dayTimeDesc(this.data[item.labelName])

        if (item.labelName) return this.data[item.labelName]

        if (item.label) return item.label

        return ''
      }
    }
  }
</script>


<style lang="scss" scoped>
 .show-table-container {
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
    box-sizing: border-box;
    td {
      font-size: 13px;
      border: 1px solid #E4F1FD;
      text-align: center;
      height: 26px;
      padding: 0 10px;
      &.text-indent {
        text-align: left;
        text-indent: 2em;
      }
      &.font-size-12 {
        font-size: 12px;
      }
      &.bg-color {
        background-color: rgba(249,253,255,1);
      }
      &:last-child {
        background-color: transparent;
      }
      &.items-content {
        position: relative;
        .code-container {
          position: absolute;
          top: 2px;
          right: 15px;
          font-size: 12px;
        }
      }
      /*&.display-center {
        display: flex;
        justify-content: center;
        align-items: center;
      }*/
    }
 }
</style>
