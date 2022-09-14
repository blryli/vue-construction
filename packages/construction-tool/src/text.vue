<template>
  <div class="v-text">
    <div class="v-construction-tool-btn" @click="handleClick">添加文字</div>
  </div>
</template>

<script>
export default {
  name: 'Text',
  components: { },
  props: {
    label: { type: String, default: '标签' }
  },
  data() {
    return {
      content: ''
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

<style lang="scss" scoped>
.v-text{

}
</style>
