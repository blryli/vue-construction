<script>
export default {
  name: 'VTabs',
  components: { },
  props: {
    value: { type: String, default: '' }
  },
  data() {
    return {
      activeIndex: 0
    }
  },
  mounted() {

  },
  methods: {
    itemClick(idx) {
      this.activeIndex = idx
      this.$emit('change', idx)
    }
  },
  render(h) {
    const slots = (this.$slots.default || []).filter((d, i) => d.tag)
    const list = slots.map(d => d.componentOptions.propsData.label)
    const { activeIndex, itemClick } = this
    // console.log(slots, list)
    return h('div', { class: 'v-tabs' }, [
      h('div', { class: 'v-tabs__header' }, [
        h('div', { class: 'v-tabs__list' }, [
          list.map((d, i) => h('div', { class: ['v-tabs__list-item', activeIndex === i ? 'active' : ''], on: { click: () => itemClick(i) }}, [d]))
        ])
      ]),
      h('div', { class: 'v-tabs__content' }, [
        slots.map((d, i) => h('div', { class: ['v-tabs__content-item', activeIndex === i ? 'active' : ''] }, [d]))
      ])
    ])
  }
}
</script>

<style lang="scss" scoped>
.v-tabs{
  &__header{
    margin-bottom: 15px;
    padding: 0;
    position: relative;
  }
  &__list{
    display: flex;
    justify-content: center;
    align-items: stretch;
    &-item{
      flex: 1;
      padding: 0 15px;
      height: 30px;
      line-height: 30px;
      background-color: #f5f5f5;
      border: 1px solid transparent;
      border-radius: 4px;
      font-size: 14px;
      color: #666;
      text-align: center;
      cursor: pointer;
      user-select: none;
      &.active{
        color: #333;
        border-color:  #ddd;
        background-color: transparent;
      }
    }
  }
  &__content{
    overflow: hidden;
    position: relative;
    &-item{
      display: none;
      &.active{
        display: block;
      }
    }
  }
}
</style>
