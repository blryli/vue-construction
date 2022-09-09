<template>
  <div>
    <input
      ref="input"
      :value="value"
      class="v-input"
      type="text"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
      @change="handleChange"
    >
  </div>
</template>

<script>
export default {
  name: 'VInput',
  props: {
    value: { type: String, default: '' },
    autoSelect: { type: Boolean }
  },
  data() {
    return {
      content: ''
    }
  },
  mounted() {
    if (this.autoSelect) {
      const { input } = this.$refs
      input && input.select()
    }
  },
  methods: {
    handleInput(event) {
      const { value } = event.target
      this.$emit('input', value)
    },
    handleFocus() {},
    handleBlur() {},
    handleChange() {}
  }
}
</script>

<style lang="scss" scoped>
.v-input{
  background-color: transparent;
  background-image: none;
  border-radius: 4px;
  border: 0;
  box-sizing: border-box;
  display: inline-block;
  font-size: inherit;
  outline: none;
  width: 100%;
}
</style>
