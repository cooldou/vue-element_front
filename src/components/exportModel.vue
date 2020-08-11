<template>
  <div style="width: 100%;" id="export-html-container">
    <div style="font-family: '黑体';">
      <table v-if="dataList && dataList.length" v-for="(dataItem, dataIdx) in dataList" style="border-collapse: collapse; table-layout: fixed; width: 100%; box-sizing: border-box;" :key="dataIdx">
        <tr>
          <td colspan="48" style="text-align: center; font-size: 18px; color: #333; padding: 5px 0; width:100%; font-weight: 900;">
            {{riskName ? dataItem.riskName + ' - ' : ''}}{{labelData.detailName}}（{{dataItem[labelData.code]}}）
            <!-- {{dataItem.riskName}} - {{labelData.detailName}}（{{dataItem[labelData.code]}}） -->
          </td>
        </tr>
        <tr v-if="labelData && labelData.info"
          v-for="(items, index) in labelData.info" :key="index"
          :style="(items.height ? `height: ${items.height};` : '')">
          <td v-if="items.content" colspan="48" style="border: 1px solid; text-align: center; width: 100%; font-size: 12px;">
            {{items.noAssign ? items.content : dataItem[items.content]}}
          </td>
          <td v-else-if="items.info && items.info.length"
            v-for="(item, idx) in items.info"
            :style="'padding: 0; border: 1px solid; font-size: 12px; text-align: center;' + (item.textIndent ? 'text-align: left; text-indent: 2em;' : '') + (idx % 2 !== 0 ? 'font-size: 8px;' : '') + (item.colspan ? `width: ${item.colspan * 15}px;` : `width: ${labelData.colspan * 15}px;`)"
            :colspan="item.colspan ? item.colspan : labelData.colspan" :key="index + '-' + idx">
            <!-- (item.colspan ? `width: ${item.colspan * 16}px;` : `width: ${labelData.colspan * 16}px;`) -->
            <img v-if="item.imgShow && imgDesc(dataItem[item.labelName], item.num)" :src="imgDesc(dataItem[item.labelName], item.num)" :style="`width: calc((${items.height} - 10px) * 16 / 9); height: calc(${items.height} - 10px)`">
            <!-- <img v-if="item.imgShow && imgDesc(dataItem[item.labelName], item.num)" :src="imgDesc(dataItem[item.labelName], item.num)" :style="`height: calc(${items.height} - 10px)`"> -->
            <!-- {{!item.imgShow ? item.labelName ? dataItem[item.labelName] : item.label : ''}} -->
            <slot v-else-if="item.slot" :name="item.slot" :row="dataItem"></slot>
            {{itemInfo(dataItem, item)}}
          </td>
          <td v-else colspan="48" style="border: 1px solid; text-align: center; width: 100%; font-size: 10px;">
            <slot v-if="items.titelSlot" :row="dataItem" :name="items.titelSlot"></slot>
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
    name: 'ExportModel',

    components: {
    },

    props: {
      labelData: {
        type: Object,
        default() { return {} }
      },
      dataList: {
        type: Array,
        default() { return [] }
      },
      riskName: {
        type: Boolean,
        default: true
      },
      imgHeight: {
        type: Number,
        default: 80
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

      itemInfo (dataItem, item) {
        if (item.imgShow || item.slot) return ''

        if (item.type === 'date') return this.dayDesc(dataItem[item.labelName])

        if (item.type === 'dateTime') return this.dayTimeDesc(dataItem[item.labelName])

        if (item.labelName) return dataItem[item.labelName]

        if (item.label) return item.label

        return ''
      },

      exportOut () {
        setTimeout(() => {
          this.convertImagesToBase64()
          let exportHTML = document.getElementById('export-html-container')
          let converted = htmlDocx.asBlob(
            exportHTML.outerHTML,
            {margins: {top: 600, bottom: 500, right: 800}}
          )
          FileSaver.saveAs(converted, '隐患治理台账详情导出.docx')
        }, 1000)

      },

      convertImagesToBase64 () {
        let regularImages = document.getElementById('export-html-container').querySelectorAll('img')
        let canvas = document.createElement('canvas')
        let ctx = canvas.getContext('2d')
        _.each(regularImages, (imgElement) => {
          if (imgElement.currentSrc.indexOf('shuangkong.oss') > -1 || imgElement.src.indexOf('shuangkong.oss') > -1) {
            imgElement.height = this.imgHeight
            imgElement.width = this.imgHeight * 16 / 9
          }
        })
        canvas.remove()
      }
    }
  }
</script>
