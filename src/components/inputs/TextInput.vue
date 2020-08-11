<template>
  <el-form-item :label="label"
    :prop="name"
    :required="required">
    <el-input type="textarea"
      :value="value"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :rows="rows"
      @change="$emit('input', $event)">
    </el-input>
  </el-form-item>
</template>

<script>
import inputMixin from '@/mixins/input-mixin'

export default {
  name: 'TextInput',

  mixins: [inputMixin],

  props: {
    rows: {
      type: Number,
      default: 3
    }
  }
}
</script>
