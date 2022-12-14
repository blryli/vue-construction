<template>
  <div class="v-construction__tool" :class="{'activated': activated}">
    <div class="v-construction__tool__menu">
      <div v-for="(d, i) in menuList" :key="i" :class="['v-construction__tool__menu-tiem', activeIndex === i ? 'active' : '']" @click="() => menuClick(d, i)">{{ d.title }}</div>
      <div class="hr" />
      <div class="v-construction__tool__menu-tiem" @click="saveClick">保存</div>
    </div>
    <div v-if="activated" class="v-construction__tool-collapse">
      <VText v-if="collapseType === 'text'" @click="addText" />
      <VMaterial v-else-if="collapseType === 'material'" @upload="upload" />
      <div v-if="collapseType === 'text'" class="show">
        <img class="img" :src="snapshoot">
      </div>
    </div>
  </div>
</template>

<script>
import html2canvas from 'html2canvas'
import VMaterial from './material.vue'
import VText from './text.vue'
import { text, img } from '../../utils/layer'
import { getId } from '../../utils'
export default {
  name: 'VConstructionTool',
  components: { VMaterial, VText },
  props: {
    value: { type: Array, default: () => ([]) },
    activated: { type: Boolean }
  },
  data() {
    return {
      menuList: [
        { title: '文字', type: 'text' },
        { title: '素材', type: 'material' }
      ],
      collapseType: 'text',
      snapshoot: '',
      activeIndex: 0
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
    this.$nextTick(() => {
      this.canvasNode = document.getElementById('canvas')
    })
  },
  methods: {
    addText() {
      this.list.push(Object.assign({}, { itemId: getId() }, text()))
    },
    upload(base) {
      this.list.push(Object.assign({}, img(), { itemId: getId(), img: base }))
    },
    menuClick(d, i) {
      const { type } = d
      this.collapseType = type
      this.activeIndex = i
    },
    saveClick() {
      this.convertToImage(this.canvasNode).then(res => {
        this.snapshoot = res
        console.log('上传数据', { img: res, list: this.value }) // 上传数据
      })
    },
    // 生成快照
    convertToImage(container, options = {}) {
      // 设置放大倍数
      const scale = window.devicePixelRatio

      // 传入节点原始宽高
      const _width = container.offsetWidth
      const _height = container.offsetHeight

      let { width, height } = options
      width = width || _width
      height = height || _height

      // html2canvas配置项
      const ops = {
        scale,
        width,
        height,
        useCORS: true,
        allowTaint: false,
        ...options
      }

      return html2canvas(container, ops).then(canvas => {
        // 返回图片的二进制数据
        return canvas.toDataURL('image/png')
      })
    }
  }
}
</script>

<style lang="scss">
.v-construction__tool{
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 3;
  display: flex;
  min-width: 72px;
  max-width: 332px;
  box-sizing: border-box;
  &__menu{
    width: 72px;
    height: 100%;
    box-sizing: border-box;
    padding: 15px;
    &-tiem{
      height: 30px;
      line-height: 30px;
      text-align: center;
      color: #666;
      cursor: pointer;
      &:hover, &.active{
        color: #222;
        font-weight: bold;
      }
    }
  }
  &-collapse{
    width: 260px;
    position: relative;
    display: block;
    height: 100%;
    padding: 15px;
    background-color: #fff;
    border-radius: 4px 4px 0 0;
    border: 1px solid #eee;
    .show{
      width: 100%;
      height: auto;
    }
    .img{
      margin-top: 20px;
      width: 100%;
      height: auto;
    }
    box-shadow: 0 1px 10px rgba($color: #aaa, $alpha: 0.1);
    box-sizing: border-box;
  }
}
.v-construction-tool-btn{
  height: 30px;
  line-height: 30px;
  padding: 0 10px;
  font-size: 14px;
  background-color: #666;
  border-radius: 50px;
  color: #fff;
  text-align: center;
  cursor: pointer;
  &:hover{
    background-color: #888;
  }
}
.hr{
  width: 100%;
  height: 1px;
  background-color: #ccc;
  margin: 10px 0;
}
</style>
