<template>
  <div class="v-input-number">
    <VInput
      ref="input"
      v-model="inputValue"
      type="number"
      v-bind="$attrs"
      :min="min"
      :max="max"
      @focus="handleFocus"
      @blur="handleBlur"
    />
  </div>
</template>
<script>
import VInput from '../../input'
export default {
  name: 'VInputNumber',
  components: { VInput },
  props: {
    value: { type: Number, default: null },
    min: { type: Number, default: -Infinity },
    max: { type: Number, default: Infinity }
  },
  data() {
    return {

    }
  },
  computed: {
    inputValue: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', Number(value))
      }
    }
  },
  mounted() {

  },
  methods: {
    focus() {
      const { input } = this.$refs
      input && input.focus && input.focus()
    },
    select() {
      const { input } = this.$refs
      input && input.select && input.select()
    },
    handleChange() {
      this.$emit('change', this.inputValue)
    },
    handleFocus(e) {
      this.$emit('focus', e)
    },
    handleBlur(e) {
      this.$emit('blur', e)
      this.handleChange()
    }
  }
}
</script>

<style lang="scss">
.v-input-number{
  .v-input{
    &__inner{
      padding: 0 0 0 10px;
    }
  }
}
</style>
