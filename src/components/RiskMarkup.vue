<template>
  <div
    class="risk-markup"
    :style="style"
    :class="{
      draggable: draggable,
      resizable: resizable,
      active: enabled,
      dragging: dragging,
      resizing: resizing,
      rotating: rotating,
      highlight: selected,
      [`level-${level}`]: true
    }"
    @mousedown.stop="elmDown">

    <div class="handle handle-rotateable"
      v-if="rotateable && !readonly"
      :style="{ display: enabled ? 'block' : 'none' }"
      @mousedown.stop.prevent="rotating = true">
      <img src="@/assets/icons/mark-rotate.png">
    </div>

    <div class="handle handle-br"
      v-if="resizable && !readonly"
      :style="{ display: enabled ? 'block' : 'none'}"
      @mousedown.stop.prevent="handleDown($event)">
      <img src="@/assets/icons/mark-resize.png">
    </div>

    <div class="handle handle-remove"
      v-if="!readonly"
      :style="{ display: enabled ? 'block' : 'none'}"
      @click.stop.prevent="$emit('remove', id)"
      @mousedown.stop>
      <img src="@/assets/icons/mark-delete.png">
    </div>
    
    <slot></slot>
  </div>
</template>

<script>
import { matchesSelectorToParentElements } from '@/modules/utils'

export default {
  replace: true,
  name: 'RiskMarkup',

  props: {
    readonly: {
      type: Boolean, default: false
    },
    selected: {
      type: Boolean, default: false
    },

    id: Number,
    riskAssessmentId: Number,
    level: Number,

    active: {
      type: Boolean, default: false
    },

    draggable: {
      type: Boolean, default: true
    },
    resizable: {
      type: Boolean, default: true
    },
    rotateable: {
      type: Boolean, default: true
    },

    w: {
      type: Number,
      default: 200,
      validator(val) { return val > 0 }
    },
    h: {
      type: Number,
      default: 200,
      validator(val) { return val > 0 }
    },

    minw: {
      type: Number,
      default: 33,
      validator(val) { return val >= 0 }
    },
    minh: {
      type: Number,
      default: 30,
      validator(val) { return val >= 0 }
    },

    angle: {
      type: Number,
      default: 0,
      validator(val) { return typeof val === 'number' }
    },

    x: {
      type: Number,
      default: 0,
      validator(val) { return typeof val === 'number' }
    },
    y: {
      type: Number,
      default: 0,
      validator(val) { return typeof val === 'number' }
    },
    z: {
      type: [ String, Number ],
      default: 'auto',
      validator(val) {
        return (typeof val === 'string') ? val === 'auto' : val >= 0
      }
    },

    dragHandle: {
      type: String,
      default: null
    },
    dragCancel: {
      type: String,
      default: null
    },

    axis: {
      type: String,
      default: 'both',
      validator(val) {
        return ['x', 'y', 'both'].indexOf(val) !== -1
      }
    },

    grid: {
      type: Array,
      default() { return [1, 1] }
    },

    maximize: {
      type: Boolean, default: false
    }
  },

  created() {
    this.parentX = 0
    this.parentW = 9999
    this.parentY = 0
    this.parentH = 9999

    this.lastMouseX = 0
    this.lastMouseY = 0

    this.mouseOffX = 0
    this.mouseOffY = 0

    this.elmX = 0
    this.elmY = 0

    this.elmW = 0
    this.elmH = 0
  },

  mounted() {
    document.documentElement.addEventListener('mousemove', this.handleMove, true)
    document.documentElement.addEventListener('mousedown', this.deselect, true)
    document.documentElement.addEventListener('mouseup', this.handleUp, true)

    this.elmX = parseFloat(this.$el.style.left)
    this.elmY = parseFloat(this.$el.style.top)
    this.elmW = this.$el.offsetWidth || this.$el.clientWidth
    this.elmH = this.$el.offsetHeight || this.$el.clientHeight

    this.$nextTick(() => this.reviewDimensions())
  },

  beforeDestroy() {
    document.documentElement.removeEventListener('mousemove', this.handleMove, true)
    document.documentElement.removeEventListener('mousedown', this.deselect, true)
    document.documentElement.removeEventListener('mouseup', this.handleUp, true)
  },

  data() {
    return {
      top: 0,
      left: 0,
      width: 0,
      height: 0,
      topPercent: this.y,
      leftPercent: this.x,
      widthPercent: this.w,
      heightPercent: this.h,
      rotateAngle: this.angle,
      resizing: false,
      dragging: false,
      rotating: false,
      enabled: this.active,
      zIndex: this.z
    }
  },

  methods: {
    reviewDimensions() {
      const parentW = parseFloat(this.$el.parentNode.clientWidth)
      const parentH = parseFloat(this.$el.parentNode.clientHeight)

      this.parentW = parentW
      this.parentH = parentH

      const rect = this.$el.getBoundingClientRect()
      this.width = this.$el.offsetWidth
      this.height = this.$el.offsetHeight
      this.left = this.$el.offsetLeft
      this.top = this.$el.offsetTop

      this.elmW = this.width
      this.elmH = this.height
      this.elmX = this.left
      this.elmY = this.top
    },

    elmDown(e) {
      const target = e.target || e.srcElement

      if (this.$el.contains(target)) {
        this.reviewDimensions()

        if (!this.enabled) {
          this.enabled = true

          this.$emit('activated')
          this.$emit('update:active', true)
        }

        if (this.draggable && !this.readonly) {
          this.dragging = true
        }
      }
    },

    deselect(e) {
      const mouseX = e.pageX || e.clientX + document.documentElement.scrollLeft
      const mouseY = e.pageY || e.clientY + document.documentElement.scrollTop

      this.lastMouseX = mouseX
      this.lastMouseY = mouseY

      const target = e.target || e.srcElement
      const regex = new RegExp('handle-([trmbl]{2})', '')

      if (!this.$el.contains(target) && !regex.test(target.className)) {
        if (this.enabled) {
          this.enabled = false

          this.$emit('deactivated')
          this.$emit('update:active', false)
        }
      }
    },

    handleDown(e) {
      if (e.stopPropagation) e.stopPropagation()
      if (e.preventDefault) e.preventDefault()

      this.reviewDimensions()
      this.resizing = true
    },

    handleMove(e) {
      const lastMouseX = this.lastMouseX
      const lastMouseY = this.lastMouseY

      const mouseX = e.pageX || e.clientX + document.documentElement.scrollLeft
      const mouseY = e.pageY || e.clientY + document.documentElement.scrollTop

      let diffX = mouseX - lastMouseX + this.mouseOffX
      let diffY = mouseY - lastMouseY + this.mouseOffY

      this.mouseOffX = this.mouseOffY = 0

      this.lastMouseX = mouseX
      this.lastMouseY = mouseY

      let dX = diffX
      let dY = diffY

      if (this.resizing) {
        if (this.elmH + dY < this.minh)
          this.mouseOffY = (dY - (diffY = this.minh - this.elmH))
        else if (this.elmY + this.elmH + dY > this.parentH)
          this.mouseOffY = (dY - (diffY = this.parentH - this.elmY - this.elmH))
        
        this.elmH += diffY

        if (this.elmW + dX < this.minw)
          this.mouseOffX = (dX - (diffX = this.minw - this.elmW))
        else if (this.elmX + this.elmW + dX > this.parentW)
          this.mouseOffX = (dX - (diffX = this.parentW - this.elmX - this.elmW))
        
        this.elmW += diffX

        this.left = (Math.round(this.elmX / this.grid[0]) * this.grid[0])
        this.top = (Math.round(this.elmY / this.grid[1]) * this.grid[1])

        this.width = (Math.round(this.elmW / this.grid[0]) * this.grid[0])
        this.height = (Math.round(this.elmH / this.grid[1]) * this.grid[1])

        this.$emit('resizing', this.left, this.top, this.width, this.height)
      } else if (this.dragging) {
        if (this.elmX + dX < this.parentX)
          this.mouseOffX = (dX - (diffX = this.parentX - this.elmX))
        else if (this.elmX + this.elmW + dX > this.parentW)
          this.mouseOffX = (dX - (diffX = this.parentW - this.elmX - this.elmW))

        if (this.elmY + dY < this.parentY)
          this.mouseOffY = (dY - (diffY = this.parentY - this.elmY))
        else if (this.elmY + this.elmH + dY > this.parentH)
          this.mouseOffY = (dY - (diffY = this.parentH - this.elmY - this.elmH))

        this.elmX += diffX
        this.elmY += diffY

        if (this.axis === 'x' || this.axis === 'both') {
          this.left = (Math.round(this.elmX / this.grid[0]) * this.grid[0])
        }
        if (this.axis === 'y' || this.axis === 'both') {
          this.top = (Math.round(this.elmY / this.grid[1]) * this.grid[1])
        }
        
        this.$emit('dragging', this.left, this.top)
      } else if (this.rotating) {
        const rect = this.$el.getBoundingClientRect()
        const origin = {
          x: (rect.left + rect.right) / 2,
          y: (rect.bottom + rect.top) / 2
        }

        const lastAngle = Math.atan2(lastMouseY - origin.y, lastMouseX - origin.x)
        const currentAngle = Math.atan2(mouseY - origin.y, mouseX - origin.x)
        
        this.rotateAngle += Math.round((currentAngle - lastAngle) * 180 / Math.PI)
        this.$emit('rotating', this.rotateAngle)
      }
    },

    handleUp(e) {
      this.handle = null

      if (this.resizing) {
        this.calculatePercent()
        this.resizing = false
        
        this.$emit(
          'resizestop',
          this.id, this.leftPercent, this.topPercent, this.widthPercent, this.heightPercent
        )
      }

      if (this.dragging) {
        this.calculatePercent()
        this.dragging = false

        this.$emit('dragstop', this.id, this.leftPercent, this.topPercent)
      }

      if (this.rotating) {
        this.rotating = false
        this.$emit('rotatestop', this.id, this.rotateAngle)
      }

      this.elmX = this.left
      this.elmY = this.top
      this.elmW = this.width
      this.elmH = this.height
    },

    calculatePercent() {
      if (this.dragging) {
        this.topPercent = this.top / this.parentH * 100
        this.leftPercent = this.left / this.parentW * 100
      }

      if (this.resizing) {
        this.widthPercent = this.width / this.parentW * 100
        this.heightPercent = this.height / this.parentH * 100
      }
    }
  },

  computed: {
    style() {
      return {
        top: this.dragging || this.resizing ? `${this.top}px` : `${this.topPercent}%`,
        left: this.dragging || this.resizing ? `${this.left}px` : `${this.leftPercent}%`,
        width: this.resizing ? `${this.width}px` : `${this.widthPercent}%`,
        height: this.resizing ? `${this.height}px` : `${this.heightPercent}%`,
        transform: 'rotate(' + this.rotateAngle + 'deg)',
        zIndex: this.zIndex
      }
    }
  },

  watch: {
    active(val) {
      this.enabled = val
    },

    z(val) {
      if (val >= 0 || val === 'auto') {
        this.zIndex = val
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .risk-markup {
    position: absolute;
    box-sizing: border-box;
    border-radius: 3px;

    &.level-1 {
      background: rgba(250,88,120,0.6);
      border: 2px solid rgba(250,88,120,1);
    }
    &.level-1.highlight {
      background: rgba(250,88,120,0.92);
    }

    &.level-2 {
      background: rgba(254,163,64,0.6);
      border: 2px solid rgba(254,163,64,1);
    }
    &.level-2.highlight {
      background: rgba(254,163,64,0.92);
    }

    &.level-3 {
      background: rgba(244,211,65,0.6);
      border: 2px solid rgba(244,211,65,1);
    }
    &.level-3.highlight {
      background: rgba(244,211,65,0.92);
    }

    &.level-4 {
      background: rgba(55,169,250,0.6);
      border: 2px solid rgba(55,169,250,1);
    }
    &.level-4.highlight {
      background: rgba(55,169,250,0.92);
    }
  }

  .handle {
    box-sizing: border-box;
    display: none;
    position: absolute;

    img {
      width: 26px;
      height: 26px;
    }
  }

  .handle-rotateable {
    top: -13px;
    right: -13px;
  }
  
  .handle-br {
    bottom: -13px;
    right: -13px;
    cursor: se-resize;
  }

  .handle-remove {
    top: -13px;
    left: -13px;
    cursor: pointer;
  }
</style>