<template>
  <div class="tagging-container">
    <div class="tagging-title">图例</div>
    <div class="tagging-info">
      <div>
        <span>
          <div style="background-color: #F7454A;"></div>
          <span>重大风险</span>
        </span><br>
        <span>
          <div style="background-color: #FEA340;"></div>
          <span>较大风险</span>
        </span><br>
        <span>
          <div style="background-color: #F4D341;"></div>
          <span>一般风险</span>
        </span><br>
        <span>
          <div style="background-color: #37A9FA;"></div>
          <span>低风险</span>
        </span>
      </div>
      <div v-if="!isRisk">
        <span>
          <img src="@/assets/icons/hazard-1.png">
          <span>一级危险源</span>
        </span><br>
        <span>
          <img src="@/assets/icons/hazard-2.png">
          <span>二级危险源</span>
        </span><br>
        <span>
          <img src="@/assets/icons/hazard-3.png">
          <span>三级危险源</span>
        </span><br>
        <span>
          <img src="@/assets/icons/hazard-4.png">
          <span>四级危险源</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'GraphTagging',
    props: {
      isRisk: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style lang="scss" scoped>
  .tagging-container {
    position: absolute;
    bottom: 4px;
    left: 4px;
    z-index: 5;
    padding: 10px;
    background-color: white;
    box-shadow: 0 0 4px #eee;
    .tagging-title {
      font-size: 14px;
      margin-bottom: 5px;
    }
    .tagging-info {
      display: flex;
      font-size: 12px;
      >:nth-child(1) {
        margin-right: 10px;
        >span {
          >div {
            width: 14px;
            height: 14px;
            margin: 3px 5px 3px 0;
          }
        }
      }
      div {
        >span {
          display: flex;
          align-items: center;
          img {
            height: 20px;
            width: auto;
            margin-right: 5px;
          }
        }
      }
    }
  }
</style>
