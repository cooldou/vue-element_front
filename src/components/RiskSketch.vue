<template>
  <div class="risk-sketch"
    v-loading="imageUrl && !imageLoaded"
    element-loading-text="正在加载平面图">
    <div v-if="!imageUrl" class="no-planar-graph">
      <img src="@/assets/icons/no-planar-image.png">
      <div class="hint">未设置平面图</div>
      <el-button type="text"
        size="medium"
        @click.stop="$emit('upload')"
        v-if="!readonly">
        点击上传
      </el-button>
    </div>

    <div class="graph" :style="graphStyle" v-drag>
      <img :src="imageUrl"
        @load="onGraphImageLoaded"
        v-if="imageUrl"
        draggable="false"
        class="planar-image"
        ref="graphImage">

      <div class="risk-markups" v-if="imageUrl && imageLoaded">
        <risk-markup v-for="markup in markups"
          :key="markup.riskAssessmentId"
          v-bind="markup"
          :readonly="readonly"
          @activated="handleMarkupActivated(markup)"
          @remove="$emit('remove-markup', $event)"
          @resizestop="handleMarkupResize"
          @dragstop="handleMarkupDrag"
          @rotatestop="handleMarkupRotate"
          ref="markup">
        </risk-markup>
      </div>
    </div>

    <div class="actions" v-show="imageUrl">
      <slot name="actions"></slot>

      <a href="javascript:;" class="zoom-out-button" @click.stop="zoomIn">
        <img src="@/assets/icons/zoom-out.png">
      </a>

      <a href="javascript:;" class="zoom-in-button" @click.stop="zoomOut">
        <img src="@/assets/icons/zoom-in.png">
      </a>
    </div>

    <graph-tagging v-if="isShow && imageUrl" :is-risk="true"></graph-tagging>
  </div>
</template>

<script>
import drag from '@branu-jp/v-drag'
import { addWheelListener, removeWheelListener } from 'wheel'
import RiskMarkup from './RiskMarkup'
import GraphTagging from './GraphTagging'

export default {
  name: 'RiskSketch',

  directives: { drag },

  components: {
    RiskMarkup,
    GraphTagging
  },

  props: {
    imageUrl: {
      type: String, default: ''
    },

    markups: {
      type: Array, default: () => []
    },

    readonly: {
      type: Boolean,
      default: false
    },

    isCarousel: {
      type: Boolean,
      default: false
    },

    isShow: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      imageLoaded: false,

      scale: 100,
      scaleIncrement: 10,
      maxScale: 500,
      minScale: 10,

      sketchRect: {
        width: 0,
        height: 0,
        top: 0,
        left: 0
      },

      graphRect: {
        width: 0,
        height: 0,
        top: 0,
        left: 0
      },

      leftDistance: 0
    }
  },

  computed: {
    graphImage() {
      return this.$refs.graphImage
    },

    graphStyle() {
      return {
        width: `${this.graphRect.width}px`,
        height: `${this.graphRect.height}px`,
        top: `${this.graphRect.top}px`,
        left: `${this.graphRect.left}px`
      }
    }
  },

  mounted() {
    this.$graph = this.$el.querySelector('.graph')
    const { width, height, top, left } = this.$el.getBoundingClientRect()
    this.sketchRect.width = width
    this.sketchRect.height = height
    this.sketchRect.left = left
    this.sketchRect.top = top
  },

  beforeDestroy() {
    if (this.$graphImage)
      removeWheelListener(this.$graphImage, this.wheelZoom.bind(this))
  },

  methods: {
    onGraphImageLoaded(event) {
      this.$graphImage = this.$graph.querySelector('.planar-image')
      addWheelListener(this.$graphImage, this.wheelZoom.bind(this))

      this.scale = 100

      const parentWidth = this.sketchRect.width
      const graphWidth = this.graphImage.naturalWidth
      const graphHeight = this.graphImage.naturalHeight
      let suitableWidth = graphWidth
      let suitableHeight = graphHeight

      while (suitableWidth > parentWidth) {
        suitableWidth = graphWidth * this.scale / 100
        suitableHeight = graphHeight * this.scale / 100
        this.scale = this.scale - this.scaleIncrement
        if (this.scale <= this.minScale) break
      }

      // 首页、轮播展示时控制位置和大小

      if (this.isCarousel) {
        let divWidth = document.getElementById('planar-graph').offsetWidth
        let divHeight = document.getElementById('planar-graph').offsetHeight
        let suitableWidthCopy = suitableWidth
        if (divWidth > suitableWidth) { // 屏幕宽度较大时
          suitableWidth = suitableWidth * divHeight / suitableHeight * suitableWidthCopy / divWidth
          suitableHeight = divHeight * suitableWidthCopy / divWidth
        } else {
          suitableWidth = suitableWidth * divHeight / suitableHeight
          suitableHeight = divHeight
        }
        this.graphRect.left = (divWidth - suitableWidth) / 2
      } else {
        this.graphRect.left = 0
        this.graphRect.top = 40
      }

      this.graphRect = Object.assign({}, this.graphRect, {
        width: suitableWidth,
        height: suitableHeight
      })

      this.suitableScale = this.scale
      this.imageLoaded = true
    },

    zoomIn() {
      if (!this.imageUrl || !this.imageLoaded) return

      if (this.scale < this.maxScale) {
        this.scale = this.scale + this.scaleIncrement
        this.zoom()
      }
    },

    zoomOut() {
      if (!this.imageUrl || !this.imageLoaded) return

      if (this.scale > this.minScale) {
        this.scale = this.scale - this.scaleIncrement
        this.zoom()
      }
    },

    zoom() {
      const width = this.graphImage.naturalWidth * this.scale / 100
      const height = this.graphImage.naturalHeight * this.scale / 100
      this.graphRect = Object.assign({}, this.graphRect, { width, height})
    },

    wheelZoom(event) {
      if (!this.imageUrl || !this.imageLoaded) return

      let direct = 0

      if (event.wheelDelta) {
        direct = event.wheelDelta > 0 ? 1 : -1
      } else if (event.detail) {
        direct = event.detail < 0 ? 1 : -1
      }

      if ((direct === 1 && this.scale < this.maxScale) ||
          (direct === -1 && this.scale > this.minScale)) {
        this.scale = this.scale + direct * this.scaleIncrement
        this.zoom()
      }

      event.preventDefault()
      event.stopPropagation()
    },

    handleMarkupResize(id, left, top, width, height) {
      this.$emit('change-markup', id, { left, top, width, height })
    },

    handleMarkupDrag(id, left, top) {
      this.$emit('change-markup', id, { left, top })
    },

    handleMarkupRotate(id, angle) {
      this.$emit('change-markup', id, { angle })
    },

    handleMarkupActivated(markup) {
      if (this.readonly)  this.$emit('select-markup', markup)
    }
  }
}
</script>

<style lang="scss" scoped>
.risk-sketch {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;

  .no-planar-graph {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    img {
      width: 60px;
      height: auto;
      margin-bottom: 15px;
    }

    .hint {
      font-size: 14px;
      color: #B0B0B0;
    }
  }

  .graph {
    position: absolute;

    .planar-image {
      user-select: none;
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
    }
  }

  .actions {
    position: absolute;
    right: 15px;
    bottom: 0;
    z-index: 10004;

    a {
      display: block;
      width: 36px;
      height: 36px;
      margin-bottom: 8px;

      img {
        width: 100%;
        height: auto;
      }
    }
  }

  .risk-markups {
    width: 100%;
    height: 100%;
  }
}
</style>
