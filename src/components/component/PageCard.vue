<template>
  <div class="page-card component-page-card-deep el-card is-never-shadow">
    <div class="card-header" v-if="scrollableHeader">
      <slot name="header"></slot>
    </div>
    <div class="page-toolbar" v-else>
      <slot name="header"></slot>
    </div>

    <scroll-view class="card-body" v-if="scrollable">
      <slot></slot>
    </scroll-view>
    <div v-else class="card-body">
      <slot></slot>
    </div>

    <div class="card-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
import ScrollView from '@/components/ScrollView'

export default {
  name: 'PageCard',

  components: {
    ScrollView
  },

  props: {
    scrollable: {
      type: Boolean,
      default: true
    },
    scrollableHeader: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="scss" scoped>
  .page-card {
    box-sizing: border-box;
    margin: 20px 0 0 0px;
    /*height: calc(100% - 20px);*/
    flex: 1;
    min-height: 1px;
    width: 100%;
    display: flex;
    flex-direction: column;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
    background-color: transparent;
    background-color: #FAFAFA;
  }
  .page-toolbar {
    border-bottom: 1px solid #ebeef5;
  }
</style>
<style lang="scss">
  .component-page-card-deep {
    .card-body {
      flex: 1;
      /*height: 100%;*/
      min-height: 1px;

      > {
        .scroll-container .scroll-content {
          padding: 20px;
        }
      }

      .data-table {
        height: 100%;
      }
    }

    .card-footer .form-buttons {
      padding: 8px 0;
      border-top: 1px solid #eee;
      text-align: center;
    }
  }
</style>
