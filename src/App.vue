<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  /*font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;*/
  font-family: "微软雅黑";
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
}
iframe {
  width: 100%;
  height: 100%;
  border: 0;
}

#app {
  height: 100%;

  .page {
    height: 100%;
    display: flex;
    flex-direction: column;

    .page-main {
      flex: 1;
      overflow: hidden;
      position: relative;

      > .scroll-container .scroll-content {
        padding: 28px 28px 0;
      }

      > .header,
      > .scroll-container .scroll-content > .header {
        display: flex;
        align-items: center;
        margin-bottom: 20px;

        .left {
          flex: 1;
        }

        .right {
          text-align: right
        }

        .el-form--inline .el-form-item {
          margin-bottom: 0;
        }
      }
    }

    .page-footer {
      padding: 10px 20px;

      &.is-pagination {
        padding: 10px 15px;
        display: flex;
        justify-content: flex-end;
      }
    }
  }

  .button-image-icon {
    &.el-button--medium span {
      position: relative;
      padding-left: 26px;
      color: #57687C;

      img.icon {
        width: 18px;
        height: auto;
        position: absolute;
        top: -3px;
        left: 0;
      }
    }
  }
}

.el-dialog {
  .el-dialog__header {
    background: #3F4B5B;
    padding-top: 16px;
    padding-bottom: 16px;

    .el-dialog__title {
      font-size: 18px;
      font-weight: 500;
      color: #fff;
    }

    .el-dialog__headerbtn {
      top: 16px;

      .el-dialog__close {
        color: #fff;
        font-size: 24px;
      }
    }
  }

  .el-dialog__footer .form-buttons {
    margin: 0 -20px -10px;
    padding: 12px 20px 0;
    border-top: 1px solid #eee;
  }

  &.photo-preview-dialog .el-dialog__header {
    background: #fff;

    .el-dialog__headerbtn {
      .el-dialog__close {
        color: #909399;
      }
    }
  }
}

.el-form-item > .el-form-item__content {
  .el-cascader, .el-select,
  .el-date-editor {
    // width: 100%;
  }
}

.danger-confirm-dialog {
  .el-message-box__status.el-icon-warning {
    color: #F7454A;
    font-size: 48px !important;

    & + .el-message-box__message {
      padding-left: 64px;
    }
  }
}

.risk-level-1-bg {
  background: #EF2B52;
}

.risk-level-2-bg {
  background: #FEA340;
}

.risk-level-3-bg {
  background: #F4D341;
}

.risk-level-4-bg {
  background: #37A9FA;
}

.hidden-danger-level-1-bg {
  background: #FEA340;
}

.hidden-danger-level-2-bg {
  background: #F4D341;
}

.risk-level-1-color {
  color: #EF2B52;
}

.risk-level-2-color {
  color: #FEA340;
}

.risk-level-3-color {
  color: #F4D341;
}

.risk-level-4-color {
  color: #37A9FA;
}

.hidden-danger-level-1-color {
  color: #FEA340;
}

.hidden-danger-level-2-color {
  color: #F4D341;
}
</style>
