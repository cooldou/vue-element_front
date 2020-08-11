<template>
  <div class="component-strip-type-table">
    <slot name="header"></slot>
    <div class="bar-type-table-two" v-if="customize">
      <ul class="book-table-title-ul" v-if="titleShow">
        <li class="book-table-title">
          <div
            v-for="(column, index) in columns"
            :key="index"
            :style="column.width ? { width: column.width, flex: '0 0 auto' } : {}"
          >{{ column.title }}</div>
        </li>
      </ul>
      <div class="book-table-content">
        <ul class="book-table-content-ul">
          <li
            class="table-item"
            v-for="(item, index) in data"
            :key="index"
            @click.stop="$emit('row-click', item)"
          >
            <div
              v-for="(column, idx) in columns"
              class="table-item-column"
              :key="index + '-' + idx"
              :style="column.width ? { width: column.width, flex: '0 0 auto' } : {}"
            >
              <slot
                :row="item"
                v-if="column.name && column.name.startsWith('__slot:')"
                :name="column.name.replace('__slot:', '')"
              ></slot>
              <div v-else>{{ valueDesc(column, item)}}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="bar-type-table-two" style="border: 0;" v-else>
      <div class="book-table-content">
        <ul class="book-table-content-ul">
          <slot></slot>
        </ul>
      </div>
    </div>
    <div class="strip-type-bottom-bar" v-if="showBottomBar">
      <el-pagination
        background
        layout="prev, pager, next, sizes, total"
        :pager-count="pagerCount"
        :total="total"
        :page-size="pageSize"
        :current-page="currentPage"
        @size-change="$emit('page-size-change', $event)"
        @current-change="$emit('page-change', $event)"
        @prev-click="$emit('page-change', $event)"
        @next-click="$emit('page-change', $event)"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StripTypeTable',

  components: {},

  props: {
    columns: {
      type: Array,
      default() {
        return []
      }
    },

    data: {
      type: Array,
      default() {
        return []
      }
    },

    pagerCount: {
      type: Number,
      default: 7
    },

    total: {
      type: Number,
      default: 0
    },

    pageSize: {
      type: Number,
      default: 20
    },

    currentPage: {
      type: Number,
      default: 1
    },

    showBottomBar: {
      type: Boolean,
      default: true
    },

    titleShow: {
      type: Boolean,
      default: true
    },

    customize: {
      type: Boolean,
      default: true
    }
  },

  methods: {
    valueDesc(column, item) {
      if (column.type === 'date') return this.dateDesc(item[column.name])
      if (column.type === 'dateTime')
        return this.dateTimeDesc(item[column.name])
      return item[column.name]
    }
  }
}
</script>
<style lang="scss">
.component-strip-type-table {
  .page-toolbar {
    border-bottom: 1px solid #ebeef5;
  }
}
</style>
<style lang="scss" scoped>
.component-strip-type-table {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  .bar-type-table-two {
    width: 100%;
    /*height: 100%;*/
    flex: 1;
    min-height: 1px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    .book-table-title-ul {
      z-index: 1;
      margin: 0;
      padding: 0 20px;
      box-shadow: 2px 2px 2px 1px #ccc;
      list-style: none;
      height: 30px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
      .book-table-title {
        display: flex;
        > div {
          font-size: 16px;
          font-weight: 900;
          box-sizing: border-box;
          padding: 5px;
          font-size: 14px;
          color: #8e9196;
          text-align: center;
          flex: 1;
        }
      }
    }
    .book-table-content {
      /*height: 100%;*/
      flex: 1;
      min-height: 1px;
      box-sizing: border-box;
      width: 100%;
      overflow: hidden;
      overflow-y: auto;
      .book-table-content-ul {
        margin: 20px 20px 20px 20px;
        padding: 0;
        box-sizing: border-box;
        li {
          display: flex;
          align-items: center;
          margin: 10px 0;
          width: 100%;
          min-height: 40px;
          background: rgba(255, 255, 255, 1);
          border-radius: 10px;
          background-color: white;
          box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
          /*background-color: rgba(249, 249, 249, 0.5);
            box-shadow: 0 1px 6px rgba(0, 0, 0, 0.12),
              0 1px 4px rgba(0, 0, 0, 0.24);*/
          /*box-shadow: 0px 3px 15px 0px rgba(64, 138, 249, 0.15);*/
          &:hover {
            cursor: pointer;
            box-shadow: 0px 4px 9px 1px rgba(0, 0, 0, 0.2);

            /*background: rgba(255, 255, 255, 1);*/
            // background-color: #f2f8fe;
            /*box-shadow: 0px 3px 15px 0px rgba(64, 138, 249, 0.15);*/
            /*box-shadow: 0px 2px 6px 1px rgba(64, 138, 249, 0.15);*/
          }
          .table-item-column {
            box-sizing: border-box;
            padding: 5px;
            font-size: 13px;
            color: #606266;
            text-align: center;
            flex: 1;
          }
        }
        .item-color-1 {
          background-color: #f7454a;
        }
        .item-color-2 {
          background-color: #f49e41;
        }
        .item-color-3 {
          background-color: #f4d341;
        }
        .item-color-4 {
          background-color: #409eff;
        }
        .item-color-5 {
          background-color: #dedede;
        }
        .item-color-6 {
          background-color: #67c23a;
        }
      }
    }
  }
  .strip-type-bottom-bar {
    text-align: right;
    border-top: 1px solid #ebeef5;
    box-sizing: border-box;
    .el-pagination {
      padding: 5px;
    }
  }
}
</style>
