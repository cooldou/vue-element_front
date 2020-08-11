<template>
  <el-form-item :label="label"
    :prop="name"
    :required="required">
    <el-cascader
      :options="options"
      :props="props"
      :placeholder="placeholder"
      :disabled="disabled || readonly"
      v-model="selectedItems"
      :clearable="true"
      @active-item-change="handleItemChange"
      @change="handleChange">
    </el-cascader>
  </el-form-item>
</template>

<script>
import isString from 'lodash/isString'
import { mapGetters, mapActions } from 'vuex'
import inputMixin from '@/mixins/input-mixin'

export default {
  name: 'CascaderInput',

  props: {
    placeholder: {
      type: String,
      default: '请选择'
    },

    resourceName: {
      type: String,
      required: true
    }
  },

  mixins: [inputMixin],

  data() {
    return {
      props: {
        value: 'code',
        label: 'name',
        children: 'children',
        disabled: 'disabled'
      },

      selectedItems: []
    }
  },

  computed: {
    ...mapGetters('cascaderSelect', ['items']),

    options() {
      return this.items(this.resourceName)
    }
  },

  methods: {
    ...mapActions('cascaderSelect', ['loadRootItems', 'loadChildItems']),

    handleItemChange(selected) {
      this.loadChildItems({
        resourceName: this.resourceName, parentCode: selected.slice(-1)[0]
      })
    },

    handleChange(selected) {
      this.$emit('input', selected.join('/'))
    },

    async loadChildren() {
      if (this.value && isString(this.value)) {
        const [rootCode, childCode] = this.value.split('/')
        const root = this.options.find(item => item.code === rootCode)
        if (!root) return

        const children = await this.loadChildItems({
          resourceName: this.resourceName, parentCode: root.code
        })
        const child = children.find(item => item.code === childCode)

        this.selectedItems = [root, child].filter(v => !!v).map(item => item.code)
      }
    }
  },

  async created() {
    await this.loadRootItems(this.resourceName)
    this.loadChildren()
  },

  watch: {
    value(newVal) {
      this.loadChildren()
    }
  }
}
</script>
