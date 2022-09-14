<template>
  <div
    class="v-construction__canvas"
    :style="{'width': canvasStyles.width + 'px','height': canvasStyles.height + 'px','left': canvasStyles.left + 'px'}"
    @click="handleClick"
    @dblclick="handleDblclick"
  >
    <div class="v-construction__collapse-active" :class="{'active': collapseActive}" @click="collapseClick">
      <div class="v-construction__collapse-active--line" />
      <div class="v-construction__collapse-active--btn" />
      <div class="v-construction__collapse-active--line" />
    </div>
    <div id="canvas" class="v-construction__canvas-content" :style="styles">
      <div class="v-construction__canvas-background" :style="bgStyle">
        <CanvasList
          v-if="list.length"
          v-model="list"
          @item-change="itemChange"
          @item-move="itemMove"
        />
      </div>
    </div>
  </div>
</template>

<script>
const canvasSize = {
  '0': { title: '自定义尺寸', width: 1242, height: 2208 },
  '1': { title: '电商竖版海报', width: 750, height: 950 },
  '2': { title: '电商主图', width: 800, height: 800 },
  '3': { title: '横版广告', width: 900, height: 500 },
  '4': { title: '原尺寸', width: 1242, height: 2208 }
}
import { on, off, hasClass } from '../../utils/dom'
import CanvasList from './canvas-list'
export default {
  name: 'VConstructionCanvas',
  components: { CanvasList },
  props: {
    value: { type: Array, default: () => ([]) },
    canvasType: { type: String, default: '2' },
    collapseActive: { type: Boolean },
    checkId: { type: String, default: '' }
  },
  provide() {
    return {
      canvas: this
    }
  },
  inject: ['root'],
  data() {
    return {
      innerHeight: 0,
      innerWidth: 0,
      canvasRatio: 1
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
    styles() {
      const { canvasType, canvasStyles } = this
      const styles = { width: 0, height: 0 }
      const { width: canvasWidth, height: canvasHeight } = canvasStyles
      const { width: canvaSizeWidth, height: canvasSizeHeight } = canvasSize[canvasType]
      let ratio = 1
      if (canvaSizeWidth > canvasSizeHeight) {
        ratio = canvaSizeWidth > canvasWidth ? canvasWidth / canvaSizeWidth : 1
      } else if (canvaSizeWidth < canvasSizeHeight) {
        ratio = canvasSizeHeight > canvasHeight ? canvasHeight / canvasSizeHeight : 1
      }
      styles.width = canvaSizeWidth - 40 + 'px'
      styles.height = canvasSizeHeight - 40 + 'px'
      const canvasRatio = canvaSizeWidth * ratio > canvasWidth ? canvasWidth / (canvaSizeWidth * ratio) - ratio : ratio
      this.setCanvasRatio(canvasRatio)
      styles.transform = `translate(-50%, -50%) scale(${canvasRatio})`
      return styles
    },
    canvasStyles() {
      const styles = { width: 0, height: 0, left: 0 }
      const { innerHeight, innerWidth, collapseActive } = this
      const toolWidth = collapseActive ? 332 : 72
      styles.width = innerWidth - toolWidth - 260
      styles.height = innerHeight - 80
      styles.left = toolWidth
      return styles
    },
    bgStyle() {
      const styles = { width: 0, height: 0, backgroundColor: 'transparent' }
      const { list } = this
      if (!list.length) return {}
      const { width, height } = this.styles
      styles.width = width
      styles.height = height
      const bg = list.find(d => d.type === 'bg') || {}
      const { bgType, backgroundColor, backgroundImage } = bg
      if (bgType === 'color') {
        styles.backgroundColor = backgroundColor || '#fff'
      } else if (backgroundImage) {
        styles.backgroundImage = `url(${backgroundImage})`
      }
      return styles
    }
  },
  mounted() {
    const { innerHeight, innerWidth } = window
    this.innerHeight = innerHeight
    this.innerWidth = innerWidth
    on(window, 'resize', this.onResize)
  },
  beforeDestroy() {
    off(window, 'resize', this.onResize)
  },
  methods: {
    onResize({ currentTarget }) {
      const { innerHeight, innerWidth } = currentTarget
      this.innerHeight = innerHeight
      this.innerWidth = innerWidth
    },
    collapseClick() {
      this.$emit('collapse-change', !this.collapseActive)
    },
    itemChange(item) {
      console.log(item)
      const { itemId, x, y, width, height, fontSize } = item
      const list = [...this.value]
      list.forEach(d => {
        const { pos } = d
        if (itemId === d.itemId) {
          if (x) pos.x += x
          if (y) pos.y += y
          if (width) d.width += width
          if (height) d.height += height
          if (fontSize) d.fontSize = Math.max(fontSize, 12)
          setTimeout(() => {
            this.root.checkId = itemId
          })
          // console.log({ x, y, width, height })
        }
      })
      this.$emit('input', list)
    },
    itemMove(item) {

    },
    setCanvasRatio(canvasRatio) {
      this.canvasRatio = canvasRatio
    },
    getItem(event) {
      let cell = event.target

      while (cell && cell.tagName.toUpperCase() !== 'HTML') {
        if (hasClass(cell, 'canvas-item')) {
          return cell
        }
        cell = cell.parentNode
      }

      return null
    },
    handleItem(e, type) {
      const { value, getItem } = this
      const itemNode = getItem(e)
      if (itemNode) {
        const itemid = itemNode.getAttribute('data-itemid')
        if (itemid) {
          const item = value.find(d => d.itemId === itemid)
          if (item) {
            this.root[type] = itemid
            if (type === 'editId' && item.type === 'img') {
              this.root.handleUpload()
            }
          }
        }
      } else {
        this.root[type] = null
        this.root.editId = null
      }
    },
    handleClick(e) {
      this.handleItem(e, 'checkId')
    },
    handleDblclick(e) {
      this.handleItem(e, 'editId')
    }
  }

}
</script>

<style lang="scss">
.v-construction__canvas{
  position: absolute;
  top: 0;
  bottom: 0;
  z-index: 1;
  transition: left .1s;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  &-content{
    background-color: #fff;
    box-sizing: border-box;
    position: absolute;
    top: 50%;
    left: 50%;
    background-repeat: repeat;
    -webkit-transform-origin: center center;
    transform-origin: center center;
  }
  &-background{
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
}
.v-construction__collapse-active {
  position: absolute;
  left: 10px;
  top: 50%;
  width: 20px;
  height: 180px;
  transform: translateY(-50%);
  &--line{
    height: 70px;
    border-left: 1px solid #ddd;
  }
  &--btn{
    position: relative;
    width: 16px;
    height: 40px;
    border: 1px solid #ddd;
    border-left: 0;
    border-radius: 0 10px 10px 0;
    cursor: pointer;
    &::before{
      content: '';
      display: inline-block;
      position: absolute;
      left: 8px;
      top: 15px;
      width: 1px;
      height: 6px;
      transform: rotate(-45deg);
      background-color: #999;
    }
    &::after{
      content: '';
      display: inline-block;
      position: absolute;
      left: 8px;
      top: 19px;
      width: 1px;
      height: 6px;
      transform: rotate(45deg);
      background-color: #999;
    }
  }
  &.active {
    .v-construction__collapse-active--btn{
      &::before{
        transform: rotate(45deg);
      }
      &::after{
        transform: rotate(-45deg);
      }
    }
    }
}
.canvas-list{
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  box-sizing: border-box;
  .canvas-item{
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    display: inline-block;
    z-index: 2;
    padding: 5px;
    border: 2px solid transparent;
    user-select: none;
    box-sizing: border-box;
  }
  .canvas-item__img{
    overflow: hidden;
    position: absolute;
    left: 10px;
    top: 10px;
    right: 10px;
    bottom: 10px;
    &-content{
      width: 100%;
      height: 100%;
    }
  }
}

</style>
