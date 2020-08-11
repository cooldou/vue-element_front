<template>
  <el-dialog :visible.sync="visible" :append-to-body="appendToBody" custom-class="file-show-dialog-public"
    :close-on-click-modal="false"
    @close="clear">
    <!-- <iframe v-if="fileUrl" style="width: 100%; height: 100%;" :src="`https://view.officeapps.live.com/op/view.aspx?src=${fileUrl}`"></iframe> -->
    <file-show :url="fileUrl"></file-show>
  </el-dialog>
</template>

<script>
  import FileShow from '@/components/component/FileShow'

  export default {
    name: 'DialogFileShow',

    components: {
      FileShow
    },

    props: {
      appendToBody: {
        type: Boolean,
        default: false
      }
    },

    data: () => ({
      visible: false,
      fileUrl: ''
    }),

    methods: {
      show (fileUrl) {
        if (fileUrl) {
          this.visible = true
          this.fileUrl = fileUrl
        }
      },

      clear () {
        this.visible = false
        this.fileUrl = ''
      }
    }
  }
</script>

<style lang="scss">
  .file-show-dialog-public {
    width: 1000px;
    .el-dialog__headerbtn {
      top: 4px !important;
    }
    .el-dialog__body {
      height: 600px;
    }
  }
</style>
