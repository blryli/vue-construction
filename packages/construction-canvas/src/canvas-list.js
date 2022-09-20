import VImg from './img.vue'
import VText from './text.vue'
export default {
  name: 'CanvasList',
  components: { VImg, VText },
  props: {
    value: { type: Array, default: () => [] }
  },
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
    }
  },
  mounted() {

  },
  methods: {
    itemMove(move) {
      this.$emit('item-move', move)
    },
    itemChange(move) {
      this.$emit('item-change', move)
    }
  },
  render(h) {
    const { list, itemMove, itemChange } = this
    const render = list.map((d, i) => {
      const { itemId, type, content, width, height, fontSize, color, pos, fontFamily } = d
      let node = content
      if (type === 'text') {
        node = h(VText, { props: { value: d }, on: { input: (val) => (list[i] = val), 'item-move': itemMove, 'item-change': itemChange }})
      } else if (type === 'img') {
        node = h(VImg, { props: { value: d }, on: { input: (val) => (list[i] = val), 'item-move': itemMove, 'item-change': itemChange }})
      }
      if (type === 'text' || type === 'img') {
        let transform = ''
        if (pos) {
          const { x, y } = pos
          transform = `translate(${x}px, ${y}px)`
        }
        return h('div', { attrs: { 'data-itemid': itemId }, style: Object.assign({}, { width: width + 20 + 'px', height: height + 20 + 'px', transform }), class: ['canvas-item'] }, [node])
      }
    })
    return h('div', { class: 'canvas-list' }, render)
  }
}
