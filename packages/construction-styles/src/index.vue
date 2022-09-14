<script>
import VBackground from './background.vue'
import VText from './text.vue'
import VImg from './img.vue'

export default {
  name: 'VConstructionStyles',
  components: { VBackground, VText, VImg },
  props: {
    value: { type: Array, default: () => ([]) },
    checkId: { type: String, default: '' }
  },
  inject: ['root'],
  data() {
    return {
    }
  },
  computed: {
    list: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    },
    checkIndex() {
      const { list, checkId } = this
      const checkIndex = list.findIndex(d => d.itemId === checkId)
      return checkIndex !== -1 ? checkIndex : list.findIndex(d => d.type === 'bg')
    },
    checkType() {
      const { list, checkIndex } = this
      return checkIndex === -1 ? 'bg' : list[checkIndex].type
    }
  },
  watch: {

  },
  mounted() {
  },
  methods: {
    handleUpload() {
      this.$refs.img.handleUpload()
    }
  },
  render(h) {
    const { list, checkType, checkIndex } = this
    const nodeMap = {
      'bg': VBackground,
      'imag': VImg,
      'text': VText
    }
    const getNode = (type) => h(nodeMap[type], { ref: type, props: { value: list[checkIndex] }, on: { input: val => this.$set(this, 'list', val) }})

    return h('div', { class: 'v-construction__styles' }, [
      list.length ? getNode(checkType) : '',
      checkType === 'bg' ? '' : h('div', { class: 'hr' }),
      checkType === 'bg' ? '' : h('div', { class: 'v-construction__layer' }, [
        h('div', { class: 'v-construction__layer-item' }, ['解锁']),
        h('div', { class: 'v-construction__layer-item' }, ['排序']),
        checkType === 'text' ? '' : h('div', { class: 'v-construction__layer-item' }, ['翻转']),
        h('div', { class: 'v-construction__layer-item' }, ['复制']),
        h('div', { class: 'v-construction__layer-item' }, ['删除'])
      ])
    ])
  }
}
</script>

<style lang="scss">
.v-construction__styles{
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 3;
  width: 260px;
  padding: 15px;
  background-color: #fff;
  border-radius: 4px 0 0 0;
  border: 1px solid #eee;
  box-shadow: 0 1px 10px rgba($color: #aaa, $alpha: 0.1);
  box-sizing: border-box;

  &-title{
    font-size: 14px;
    font-weight: bold;
  }

  &-item{
    margin: 20px 0;
    font-size: 14px;
    align-items: center;
    .v-construction-btn{
      float: right;
    }
  }
}
.v-construction__layer{
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.v-construction-btn{
  height: 24px;
  line-height: 24px;
  padding: 0 10px;
  display: inline-block;
  background-color: #f0f0f0;
  border-radius: 50px;
  cursor: pointer;
  user-select: none;
}
</style>
