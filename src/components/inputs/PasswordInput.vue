<template>
  <el-form-item :label="label"
    :prop="name"
    :required="required">
    <el-input type="password"
      :value="value"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      @change="$emit('input', $event)">
    </el-input>
  </el-form-item>
</template>

<script>
import inputMixin from '@/mixins/input-mixin'

export default {
  name: 'PasswordInput',

  mixins: [inputMixin]
}
</script>
