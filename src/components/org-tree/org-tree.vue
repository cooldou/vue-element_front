<template>
  <div class="org-tree-container">
    <div class="org-tree" :class="{horizontal, collapsable}">
      <org-tree-node
        :data="data"
        :props="props"
        :horizontal="horizontal"
        :label-width="labelWidth"
        :collapsable="collapsable"
        :render-content="renderContent"
        :label-class-name="labelClassName"
        :item-class="itemClass"
        @on-expand="$emit('on-expand', $event)"
        @on-node-click="(e, data) => {handleOpen(e, data)}"
      >
      </org-tree-node>
    </div>
  </div>
</template>

<script>
  import render from './node'
  import { each, clone } from 'lodash'

  export default {
    name: 'OrgTree',
    components: {
      OrgTreeNode: {
        render,
        functional: true
      }
    },
    props: {
      data: {
        type: Object,
        required: true
      },
      props: {
        type: Object,
        default: () => ({
          label: 'label',
          expand: 'expand',
          children: 'children'
        })
      },
      horizontal: Boolean,
      collapsable: {
        type: Boolean,
        default: false
      },
      renderContent: Function,
      // labelWidth: [String, Number],
      // 每层 宽度
      labelWidth: {
        type: String,
        default: '100px'
      },
      labelClassName: [Function, String],
      // 每一层的单独class同配置 如：'org-tree-node-1', 'org-tree-node-2' 中的 'org-tree-node'
      itemClass: {
        type: String,
        default: 'tree-node-item'
      }
    },

    methods: {
      handleOpen (e, data) {
        if (data.expand !== undefined) {
          data.expand = !data.expand
          if (data.children && data.expand === false) {
            this.treeEach(data.children)
          }
        }

        this.$emit('on-node-click', e, data)
      },

      treeEach (data) {
        each(data, (i)=> {
          if (i.children) {
            i.expand = false
            this.treeEach(i.children)
          }
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  /*.tree-node-item {
    background-color: #f2f9ff;
    border-radius: 20px;
    font-size: 12px;
    padding: 10px;
    color: #666;
    cursor: pointer;
    &:hover {
      background-color: #5fafff;
      color: white;
    }
  }*/
</style>
<style lang="scss" scoped>
  .org-tree-container {
    display: inline-block;
    padding: 15px;
    background-color: #fff;
  }

  .org-tree {
    display: table;
    /*text-align: center;*/
    width:100%;
    box-sizing: border-box;
    &:before, &:after {
      content: '';
      display: table;
    }

    &:after {
      clear: both;
    }
  }

  .org-tree-node,
  .org-tree-node-children {
    position: relative;
    margin: 0;
    padding: 0;
    list-style-type: none;

    &:before, &:after {
      transition: all .35s;
    }
  }
  .org-tree-node-label {
    position: relative;
    display: inline-block;

    .org-tree-node-label-inner {
      /*padding: 10px 15px;
      border-radius: 3px;
      box-shadow: 0 1px 5px rgba(0, 0, 0, .15);
      text-align: center;*/
      background-color: #f2f9ff;
      border-radius: 20px;
      font-size: 12px;
      padding: 10px;
      color: #666;
      cursor: pointer;
      text-align: center;
      &:hover {
        background-color: #5fafff;
        color: white;
      }
    }
  }
  .org-tree-node-btn {
    position: absolute;
    top: 100%;
    left: 50%;
    width: 20px;
    height: 20px;
    z-index: 10;
    margin-left: -11px;
    margin-top: 9px;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 50%;
    box-shadow: 0 0 2px rgba(0, 0, 0, .15);
    cursor: pointer;
    transition: all .35s ease;

    &:hover {
      background-color: #e7e8e9;
      transform: scale(1.15);
    }

    &:before, &:after {
      content: '';
      position: absolute;
    }

    &:before {
      top: 50%;
      left: 4px;
      right: 4px;
      height: 0;
      border-top: 1px solid #ccc;
    }

    &:after {
      top: 4px;
      left: 50%;
      bottom: 4px;
      width: 0;
      border-left: 1px solid #ccc;
    }

    &.expanded:after {
      border: none;
    }
  }
  .org-tree-node {
    padding-top: 20px;
    display: table-cell;
    vertical-align: top;

    &.is-leaf, &.collapsed {
      padding-left: 10px;
      padding-right: 10px;
    }

    &:before, &:after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 50%;
      height: 19px;
    }

    &:after {
      left: 50%;
      border-left: 1px solid #ddd;
    }

    &:not(:first-child):before,
    &:not(:last-child):after {
      border-top: 1px solid #ddd;
    }

  }
  .collapsable .org-tree-node.collapsed {
    padding-bottom: 30px;

    .org-tree-node-label:after {
      content: '';
      position: absolute;
      top: 100%;
      left: 0;
      width: 50%;
      height: 20px;
      border-right: 1px solid #ddd;
    }
  }
  .org-tree > .org-tree-node {
    padding-top: 0;

    &:after {
      border-left: 0;
    }
  }
  .org-tree-node-children {
    padding-top: 20px;
    display: table;

    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 50%;
      width: 0;
      height: 20px;
      border-left: 1px solid #ddd;
    }

    &:after {
      content: '';
      display: table;
      clear: both;
    }
  }

  .horizontal {
    .org-tree-node {
      display: table-cell;
      float: none;
      padding-top: 0;
      padding-left: 20px;

      &.is-leaf, &.collapsed {
        padding-top: 10px;
        padding-bottom: 10px;
      }

      &:before, &:after {
        width: 19px;
        height: 50%;
      }

      &:after {
        top: 50%;
        left: 0;
        border-left: 0;
      }

      &:only-child:before {
        top: 0px;
        border-bottom: 1px solid #ddd;
      }

      &:not(:first-child):before,
      &:not(:last-child):after {
        border-top: 0;
        border-left: 1px solid #ddd;
      }

      &:not(:only-child):after {
        border-top: 1px solid #ddd;
      }

      .org-tree-node-inner {
        display: table;
      }
    }

    .org-tree-node-label {
      display: table-cell;
      vertical-align: middle;
      &:after {
        display: none;
      }
    }

    &.collapsable .org-tree-node.collapsed {
      padding-right: 30px;

      .org-tree-node-label:after {
        top: 0;
        left: 100%;
        width: 20px;
        height: 50%;
        border-right: 0;
        border-bottom: 1px solid #ddd;
      }
    }

    .org-tree-node-btn {
      top: 50%;
      left: 100%;
      margin-top: -11px;
      margin-left: 9px;
      display: none;
    }

    & > .org-tree-node:only-child:before {
      border-bottom: 0;
    }

    .org-tree-node-children {
      display: table-cell;
      padding-top: 0;
      padding-left: 20px;

      &:before {
        top: 50%;
        left: 0;
        width: 20px;
        height: 0;
        border-left: 0;
        border-top: 1px solid #ddd;
      }

      &:after {
        display: none;
      }

      & > .org-tree-node {
        display: block;
      }
    }
  }
</style>
