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
      <div v-if="isHandle && showCursors.lefttop !== false" ref="lefttop" class="eff-card__body-lefttop" />
      <div v-if="isHandle && showCursors.top !== false" ref="top" class="eff-card__body-top" />
      <div v-if="isHandle && showCursors.topright !== false" ref="topright" class="eff-card__body-topright" />
      <div v-if="isHandle && showCursors.right !== false" ref="right" class="eff-card__body-right" />
      <div v-if="isHandle && showCursors.rightbottom !== false" ref="rightbottom" class="eff-card__body-rightbottom" />
      <div v-if="isHandle && showCursors.bottom !== false" ref="bottom" class="eff-card__body-bottom" />
      <div v-if="isHandle && showCursors.bottomleft !== false" ref="bottomleft" class="eff-card__body-bottomleft" />
      <div v-if="isHandle && showCursors.left !== false" ref="left" class="eff-card__body-left" />
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
    minWidth: { type: Number, default: 50 },
    minHeight: { type: Number, default: 50 },
    fontSize: { type: Number, default: 12 },
    zoom: { type: Number, default: 1 },
    show: Boolean,
    inline: Boolean,
    isHandle: { type: Boolean, default: true },
    limit: { type: Number, default: 15 },
    showCursors: { type: Object, default: () => {} }
  },
  inject: ['root', 'canvas'],
  data() {
    return {
      endRect: { width: this.width, height: this.height },
      move: { x: 0, y: 0, width: 0, height: 0 },
      cursor: null,
      cursorNode: null,
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
        fontSize: `${Math.max(height * (30 / 36), 12)}px !important`
      }
    },
    eq() {
      const { width, height } = this
      return (width / height).toFixed(2)
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
      const { move, minWidth, minHeight } = this
      const { width, height } = move
      this.endRect.width = Math.max(this.width + width, minWidth)
      this.endRect.height = Math.max(this.height + height, minHeight)
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
          this.cursorNode = this.$refs[key.substring(15)]
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
    },
    moveing(x, y) {
      this.isDraging = true
      const { cursor, cursorNode, eq, width: startWidth, height: startHeight } = this
      let move = {}
      const eqX = Math.trunc(x / eq) // 等比缩放
      // console.log({ x, y }, parseInt(-0))
      if (!parseInt(x) && !parseInt(y)) return
      if (cursor === 'move') { // 移动
        move = { x, y, width: 0, height: 0 }
      } else {
        if (cursor.startsWith('ns-resize')) { // 垂直
          if (cursor.indexOf('top') > -1) { // 上拉伸
            move = { x: 0, y, width: 0, height: -y }
          } else { // 下拉伸
            move = { x: 0, y: 0, width: 0, height: y }
          }
        } else if (cursor.startsWith('nesw-resize')) {
          if (cursor.indexOf('top') > -1) { // 右上角
            move = { x: 0, y: -eqX, width: x, height: eqX }
          } else { // 左下角
            move = { x: x, y: 0, width: -x, height: -eqX }
          }
        } else if (cursor.startsWith('nwse-resize')) {
          if (cursor.indexOf('top') > -1) { // 左上角
            move = { x: x, y: eqX, width: -x, height: -eqX }
          } else { // 右下角
            move = { x: 0, y: 0, width: x, height: eqX }
          }
        } else if (cursor.startsWith('ew-resize')) {
          if (cursor.indexOf('left') > -1) { // 左拉伸
            move = { x, y: 0, width: -x, height: 0 }
          } else { // 右拉伸
            move = { x: 0, y: 0, width: x, height: 0 }
          }
        }
        cursorNode && this.root.showPopover({ reference: cursorNode, placement: 'right', effect: 'dark', addToBody: true, message: [{ message: startWidth + x }, { message: startHeight - y }] }, true)
      }
      this.move = move
    },
    end() {
      this.isDraging = false
      const { x, y, width, height } = this.move
      if (x === 0 && y === 0 && width === 0 && height === 0) return
      this.$emit('end', this.move)
      this.move = { x: 0, y: 0, width: 0, height: 0 }
      this.root.hidePopover()
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
  border: 2px solid transparent;
  box-sizing: border-box;
  transition: box-shadow .3s;
  &:hover, &.active{
    border-color: #80a3ff;
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
