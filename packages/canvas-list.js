import Card from './components/card.vue'
import VInput from './components/input.vue'
export default {
  name: 'CanvasList',
  components: { Card, VInput },
  props: {
    list: { type: Array, default: () => [] }
  },
  data() {
    return {
    }
  },
  mounted() {

  },
  inject: ['root', 'canvas'],
  methods: {
    handleEnd(d, move) {
      this.$emit('item-change', Object.assign({ itemId: d.itemId }, move))
    },
    handleMove(d, move) {
      this.$emit('item-move', Object.assign({ itemId: d.itemId }, move))
    }
  },
  render(h) {
    const { list, handleEnd, root, canvas, handleMove } = this
    const render = list.map((d, i) => {
      const { itemId, type, content, style, pos, img } = d
      let node = h('div', {}, [content])
      const { width, height, fontSize } = style
      // card
      // console.log(this.root.checkId, itemId)
      if (type === 'text' && root.editId === itemId) {
        node = h(VInput, { props: { value: content, autoSelect: true }, style: Object.assign({}, style, { width: width + 'px', height: height + 'px', fontSize: fontSize + 'px' }), on: { input: (val) => (d.content = val) }})
      } else if (type === 'img') {
        node = h('img', { attrs: { src: img }, style: Object.assign({}, style, { width: width + 'px', height: height + 'px' }) })
      }
      if (root.checkId === itemId) {
        node = h(Card, { style: { }, props: { width, height, show: true, zoom: canvas.canvasRatio, fontSize }, on: { 'end': move => handleEnd(d, move), 'move': move => handleMove(d, move) }}, [node])
      }
      if (type === 'text' || type === 'img') {
        let transform = ''
        if (pos) {
          const { x, y } = pos
          transform = `translate(${x}px, ${y}px)`
        }
        return h('div', { attrs: { 'data-itemid': itemId }, style: Object.assign({}, style, { width: width + 'px', height: height + 'px', fontSize: fontSize + 'px', transform }), class: ['canvas-item'] }, [node])
      }
    })
    return h('div', { class: 'canvas-list' }, render)
  }
}
