<script>
import Card from '../../components/card.vue'
import VInput from '../../components/input.vue'
export default {
  name: 'VText',
  components: { Card, VInput },
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
      const { x, y, width, height, fontSize } = move
      const { pos, itemId } = item
      if (x) pos.x += x
      if (y) pos.y += y
      if (width) item.width += width
      if (height) item.height += height
      if (fontSize) item.fontSize = Math.max(fontSize, 12)
      this.$set(this, 'item', item)
      setTimeout(() => {
        this.root.checkId = itemId
        this.$emit('item-change', Object.assign({ itemId }, move))
      })
      // console.log({ x, y, width, height })
    },
    handleMove(move) {
      const { root, item } = this
      const { itemId } = item
      root.checkId = itemId
      this.$emit('item-move', Object.assign({ itemId }, move))
    }
  },
  render(h) {
    const { item, root, canvas, handleMove, handleEnd } = this
    const { itemId, type, content, width, height, fontSize, color, pos, img, fontFamily } = item
    let node = h('div', {}, [content])
    if (root.editId === itemId) {
      node = h(VInput, { props: { value: content, autoSelect: true }, style: Object.assign({}, { width: width + 'px', height: height + 'px', color }), on: { input: (val) => (item.content = val) }})
    }
    const showCursors = type === 'text' ? { top: false, bottom: false } : {}
    return h(Card, {
      style: { color, fontFamily },
      class: root.checkId === itemId ? ' active' : '',
      props: { isHandle: root.checkId === itemId, width, height, show: true, zoom: canvas.canvasRatio, showCursors },
      on: { 'end': handleEnd, 'move': handleMove }
    }, [node])
  }
}
</script>
