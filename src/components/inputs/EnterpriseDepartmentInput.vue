<template>
  <el-form-item :label="label"
    :prop="name"
    :required="required">
    <el-popover v-model="visible"
      :disabled="disabled || readonly"
      placement="bottom-start"
      popper-class="el-select-dropdown"
      :arrow-offset="35"
      :width="popoverWidth"
      ref="popover">
      <el-input type="text"
        slot="reference"
        v-model="selectedLabel"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="true"
        :class="{ 'result-input': true, 'is-focus': visible }"
        @blur="handleBlur"
        @mouseenter.native="inputHovering = true"
        @mouseleave.native="inputHovering = false">
        <i slot="suffix"
          :class="['el-select__caret', 'el-input__icon', 'el-icon-' + iconClass]"
          @click.stop="handleIconClick">
        </i>
      </el-input>

      <el-scrollbar
        wrap-class="el-select-dropdown__wrap">
        <el-tree :data="list.treeItems"
          node-key="id"
          :props="treeProps"
          :highlight-current="true"
          :expand-on-click-node="false"
          :default-expand-all="true"
          @node-click="handleSelect"
          @node-expand="visible = true"
          @node-collapse="visible = true"
          ref="tree">
        </el-tree>
      </el-scrollbar>
    </el-popover>
  </el-form-item>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import inputMixin from '@/mixins/input-mixin'

export default {
  name: 'EnterpriseDepartmentInput',

  mixins: [inputMixin],

  props: {
    enterpriseId: Number,

    clearable: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      visible: false,
      popoverWidth: 150,
      isSilentBlur: false,
      inputHovering: false,

      treeProps: {
        label: 'name',
        children: 'children'
      },

      selected: this.value,
      selectedLabel: ''
    }
  },

  computed: {
    ...mapState('enterpriseDepartment', ['list']),

    iconClass() {
      let criteria = this.clearable &&
        !this.disabled && !this.readonly && this.inputHovering

      return criteria ? 'circle-close is-show-close' : 'arrow-down'
    }
  },

  methods: {
    ...mapMutations('enterpriseDepartment', ['setListParams']),
    ...mapActions('enterpriseDepartment', ['loadListData']),

    handleSelect(data) {
      this.isSilentBlur = true
      this.selected = data.id
      this.selectedLabel = data[this.treeProps.label]
      this.visible = false

      this.$emit('input', this.selected)
      this.$emit('change', this.selected)
    },

    handleIconClick() {
      this.selected = null
      this.selectedLabel = ''
      this.$refs.tree.setCurrentKey(null)

      this.$emit('input', this.selected)
      this.$emit('change', this.selected)
    },

    handleBlur(event) {
      setTimeout(() => {
        if (this.isSilentBlur) {
          this.isSilentBlur = false
        } else {
          this.$emit('blur', event)
        }
      }, 50)

      this.visible = false
    },

    setSelected(val) {
      if (val) {
        const item = this.list.items.find(item => item.id === parseInt(val))
        if (!item) return

        this.selected = item.id
        this.selectedLabel = item[this.treeProps.label]
        this.$refs.tree.setCurrentKey(item.id)
      } else {
        this.selectedLabel = ''
        this.$refs.tree.setCurrentKey(null)
      }
    }
  },

  async created() {
    if (this.enterpriseId) {
      this.setListParams({ enterpriseId: this.enterpriseId })
      await this.loadListData()
      this.loaded = true

      this.setSelected(this.value)
    }
  },

  mounted() {
    this.popoverWidth = this.$el.querySelector('.el-popover__reference').clientWidth
  },

  watch: {
    value(newVal) {
      if (this.loaded) this.setSelected(newVal)
    }
  }
}
</script>

<style lang="scss" scoped>
.result-input {
  /deep/ {
    input, .el-input__suffix {
      cursor: pointer;
    }
  }

  &:focus {
    outline: none;
  }
}
</style>

