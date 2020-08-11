<template>
  <div style="width: 100%;" id="print-html-container">
    <div style="font-family: '黑体'; padding: 0 15px 0 40px; width: 100%; box-sizing: border-box;">
      <table style="border-collapse: collapse; table-layout: fixed; width: 100%; box-sizing: border-box;">
        <tr style="width: 100%;">
          <td colspan="48" style="text-align: center; font-size: 18px; color: #333; padding: 5px 0; width:100%; font-weight: 900;">
            {{riskName ? data.riskName + ' - ' : ''}}{{labelData.detailName}}（{{data[labelData.code]}}）
            <!-- {{data.riskName}} - {{labelData.detailName}}（{{data[labelData.code]}}） -->
          </td>
        </tr>
        <tr v-if="labelData && labelData.info"
          v-for="(items, index) in labelData.info" :key="index"
          :style="(items.printHeight ? `height: ${items.printHeight};` : '')">
          <td v-if="items.content" colspan="48" style="border: 1px solid; text-align: center; width: 100%; font-size: 10px;">
            {{items.noAssign ? items.content : data[items.content]}}
          </td>
          <td v-else-if="items.info && items.info.length"
            v-for="(item, idx) in items.info"
            :style="'border: 1px solid; font-size: 10px; text-align: center;' + (item.textIndent ? 'text-align: left; text-indent: 2em;' : '') + (idx % 2 !== 0 ? 'font-size: 8px;' : '')"
            :colspan="item.colspan ? item.colspan : labelData.colspan" :key="index + '-' + idx">
            <img v-if="item.imgShow && imgDesc(data[item.labelName], item.num)" :src="imgDesc(data[item.labelName], item.num)" :style="`width: calc((${items.printHeight} - 10px) * 16 / 9); height: calc(${items.printHeight} - 10px)`">
            <!-- {{!item.imgShow ? item.labelName ? data[item.labelName] : item.label : ''}} -->
            <slot v-else-if="item.slot" :name="item.slot"></slot>
            {{itemInfo(item)}}
          </td>
          <td v-else colspan="48" style="border: 1px solid; text-align: center; width: 100%; font-size: 10px;">
            <slot v-if="items.titelSlot" :name="items.titelSlot"></slot>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
  import dayjs from 'dayjs'
  import FileSaver from 'file-saver'
  import htmlDocx from 'html-docx-js/dist/html-docx'

  export default {
    name: 'PrintModel',

    components: {
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
      riskName: {
        type: Boolean,
        default: true
      },
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
            return list[num - 1].length > 10 ? list[num - 1] : ''
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
      },

      printOrder () {
        let w = window.open('打印窗口', '_blank')
        // console.log(document.getElementById('print-html-container').innerHTML)
        w.document.write(document.getElementById('print-html-container').innerHTML)
        w.document.close()
        w.print()
        w.close()
      }
    }
  }
</script>
