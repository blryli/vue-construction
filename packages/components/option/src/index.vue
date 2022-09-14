<template>
  <div class="v-option" @click="handleClick">
    <slot>{{ label || value }}</slot>
  </div>
</template>
<script>
export default {
  name: 'VOption',
  components: { },
  props: {
    value: { type: [String, Number], default: '' },
    label: { type: String, default: '' }
  },
  data() {
    return {
      popover: {}
    }
  },
  mounted() {

  },
  methods: {
    handleClick(e) {
      this.$emit('click', e)
    }
  }
}
</script>

<style lang="scss">
.v-option{
  font-size: 14px;
  padding: 0 15px;
  position: relative;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #606266;
  height: 30px;
  line-height: 30px;
  box-sizing: border-box;
  cursor: pointer;
  &:hover {
    background-color: #f5f7fa;
  }
}
</style>
