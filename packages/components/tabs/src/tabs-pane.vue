<template>
  <div class="v-tabs-pane">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'VTabsPane',
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

  }
}
</script>

<style lang="scss" scoped>
.v-tabs-pane{

}
</style>
