<script>
import Card from '../../components/card.vue'
export default {
  name: 'VImg',
  components: { Card },
  props: {
    value: { type: Object, default: () => ({}) }
  },
  inject: ['root', 'canvas'],
  data() {
    return {
    }
  },
  computed: {
    item: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  },
  methods: {
    handleEnd(move) {
      const { item } = this
      const { itemId, pos } = item
      const { x, y, width, height } = move
      if (x) pos.x += x
      if (y) pos.y += y
      if (width) item.width += width
      if (height) item.height += height
      setTimeout(() => {
        this.root.checkId = itemId
        this.isMove = false
        this.$emit('item-change', Object.assign({ itemId }, move))
      })
    },
    handleMove(move) {
      this.isMove = true
      const { root, item } = this
      const { itemId } = item
      root.checkId = itemId
      this.$emit('item-move', Object.assign({ itemId }, move))
    }
  },
  render(h) {
    const { value, root, canvas, handleMove, handleEnd } = this
    const { itemId, type, width, height, fontSize, img, opacity } = value
    const node = h('div', { class: 'canvas-item__img' }, [
      h('img', { attrs: { src: img }, style: { opacity: opacity / 100 }, class: 'canvas-item__img-content' })
    ])
    const showCursors = type === 'text' ? { top: false, bottom: false } : {}
    return h(Card, {
      style: { },
      class: root.checkId === itemId ? ' active' : '',
      props: { isHandle: root.checkId === itemId, width, height, show: true, zoom: canvas.canvasRatio, fontSize, showCursors },
      on: { 'end': handleEnd, 'move': handleMove }
    }, [node])
  }
}
</script>
