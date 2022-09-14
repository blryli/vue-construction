<template>
  <div class="v-input">
    <input
      ref="input"
      v-model="inputValue"
      v-bind="$attrs"
      class="v-input__inner"
      @focus="handleFocus"
      @blur="handleBlur"
    >
  </div>
</template>
<script>
export default {
  name: 'VInput',
  components: { },
  props: {
    value: { type: [String, Number], default: '' }
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
        this.$emit('input', value)
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
.v-input{
  position: relative;
  font-size: 14px;
  display: inline-block;
  width: 100%;
  &__inner{
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 30px;
    line-height: 30px;
    outline: none;
    padding: 0 10px;
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 100%;
    &:hover, &:focus {
      outline: none;
      border-color: #aaa;
  }
  }
}
</style>
