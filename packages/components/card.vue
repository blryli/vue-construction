<template>
  <div
    v-show="show"
    ref="card"
    :class="['eff-card']"
    shadow="hover"
    :style="style"
    @mousedown="handleMousedown"
    @mousemove="handleMousemove"
    @mouseleave="handleMouseleave"
  >
    <div ref="body" class="eff-card__body">
      <div class="eff-card__body-lefttop" />
      <div class="eff-card__body-top" />
      <div class="eff-card__body-topright" />
      <div class="eff-card__body-right" />
      <div class="eff-card__body-rightbottom" />
      <div class="eff-card__body-bottom" />
      <div class="eff-card__body-bottomleft" />
      <div class="eff-card__body-left" />
      <slot />
    </div>
  </div>
</template>

<script>
import { onMousemove, hasClass } from '../utils/dom'

export default {
  name: 'Card',
  props: {
    width: { type: Number, default: 250 },
    height: { type: Number, default: 250 },
    minWidth: { type: Number, default: 100 },
    minHeight: { type: Number, default: 200 },
    fontSize: { type: Number, default: 12 },
    zoom: { type: Number, default: 1 },
    show: Boolean,
    inline: Boolean,
    limit: { type: Number, default: 15 }
  },
  inject: ['canvas'],
  data() {
    return {
      endRect: { width: this.width, height: this.height },
      move: { x: 0, y: 0, width: 0, height: 0 },
      cursor: null,
      isDraging: false
    }
  },
  computed: {
    style() {
      const { width, height } = this.endRect
      const { move } = this
      const { x, y, height: moveHeight } = move
      return {
        width: width + 'px',
        height: height + 'px',
        transform: `translate(${x}px, ${y}px)`,
        fontSize: `${this.fontSize + moveHeight}px`
      }
    }
  },
  watch: {
    move() {
      this.update()
    },
    cursor(val) {
      document.body.style.cursor = val.replace(/_[a-z]+/, '')
    }
  },
  mounted() {
    const timer = setTimeout(() => {
      this.update()
      clearTimeout(timer)
    }, 500)
  },
  methods: {
    update() {
      const { width, height } = this.move
      this.endRect.width = Math.trunc(this.width + width)
      this.endRect.height = Math.trunc(this.height + height)
      this.$emit('move', this.move)
    },
    handleMousedown(e) {
      const { button } = e
      const { editId } = this.canvas
      if (button !== 0 || editId) return
      this.cursor && onMousemove({
        start: this.start,
        moveing: this.moveing,
        end: this.end
      }, this.zoom)
    },
    handleMousemove(e) {
      const { button } = e
      if (this.isDraging || button !== 0) return
      const { target } = e

      const cursors = {
        'eff-card__body-lefttop': 'nwse-resize_top', // 左上角
        'eff-card__body-top': 'ns-resize_top', // 上拉伸
        'eff-card__body-topright': 'nesw-resize_top', // 右上角
        'eff-card__body-right': 'ew-resize_right', // 右拉伸
        'eff-card__body-rightbottom': 'nwse-resize_bottom', // 右下角
        'eff-card__body-bottom': 'ns-resize_bottom', // 下拉伸
        'eff-card__body-bottomleft': 'nesw-resize_bottom', // 左下角
        'eff-card__body-left': 'ew-resize_left' // 左拉伸
      }
      let hasCursor = false
      for (const key in cursors) {
        if (hasClass(target, key)) {
          this.cursor = cursors[key]
          hasCursor = true
        }
      }
      if (!hasCursor) {
        this.cursor = 'move'
      }
    },
    handleMouseleave(e) {
      const { button } = e
      if (this.isDraging || button !== 0) return
      document.body.style.cursor = ''
    },
    start() {
      this.isDraging = true
    },
    moveing(x, y) {
      const { cursor } = this
      let move = {}
      if (cursor.startsWith('ns-resize')) {
        move =
          cursor.indexOf('top') > -1
            ? { x: 0, y, width: 0, height: -y }
            : { x: 0, y: 0, width: 0, height: y }
      } else if (cursor.startsWith('nesw-resize')) {
        move =
          cursor.indexOf('top') > -1
            ? { x: 0, y, width: x, height: -y }
            : { x, y: 0, width: -x, height: y }
      } else if (cursor.startsWith('nwse-resize')) {
        move =
          cursor.indexOf('top') > -1
            ? { x, y, width: -x, height: -y }
            : { x: 0, y: 0, width: x, height: y }
      } else if (cursor.startsWith('ew-resize')) {
        move =
          cursor.indexOf('left') > -1
            ? { x, y: 0, width: -x, height: 0 }
            : { x: 0, y: 0, width: x, height: 0 }
      } else if (cursor === 'move') {
        move = { x, y, width: 0, height: 0 }
      }
      if (move.height) move.fontSize = this.fontSize + move.height
      this.move = move
    },
    end() {
      this.isDraging = false
      const { x, y, width, height } = this.move
      if (x === 0 && y === 0 && width === 0 && height === 0) return
      this.$emit('end', this.move)
      this.move = { x: 0, y: 0, width: 0, height: 0 }
    }
  }
}
</script>

<style lang="scss" scoped>
.eff-card {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  border: 2px solid #80a3ff;
  box-sizing: border-box;
  transition: box-shadow .3s;
  &:hover{
    box-shadow: 0 1px 10px rgba($color: #000000, $alpha: .1);
  }

  &__body {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    padding: 10px;
    overflow: visible;
    box-sizing: border-box;
    div[class *= eff-card__body-] {
      padding: 2px;
      position: absolute;
      background-color: #fff;
      box-sizing: border-box;
    }
    &-lefttop, &-topright, &-rightbottom, &-bottomleft{
      width: 12px;
      height: 12px;
      border-radius: 12px;
    }
    &-lefttop{
      left: -6px;
      top: -6px;
    }
    &-topright{
      top: -6px;
      right: -6px;
    }
    &-rightbottom{
      right: -6px;
      bottom: -6px;
    }
    &-bottomleft{
      left: -6px;
      bottom: -6px;
    }
    &-top, &-bottom{
      width: 20px;
      height: 8px;
      border-radius: 8px;
      left: 50%;
      transform: translateX(-50%);
    }
    &-top{
      top: -5px;
    }
    &-bottom{
      bottom: -5px;
    }
    &-right, &-left{
      width: 8px;
      height: 20px;
      border-radius: 8px;
      top: 50%;
      transform: translateY(-50%);
    }
    &-right{
      right: -5px;
    }
    &-left{
      left: -5px;
    }
  }
}
</style>
