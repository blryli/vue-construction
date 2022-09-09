<template>
  <div class="v-construction__styles">
    <div>
      <div class="v-construction__styles-title">画布</div>
      <div class="v-construction__styles-item">
        <span>画布尺寸</span>
        <div class="v-construction-btn">编辑</div>
      </div>
      <div class="v-construction__styles-bg">
        <div class="v-construction__styles-bg--width">
          <span>{{ bgSize.width }}</span>
          <div>宽</div>
        </div>
        <div class="v-construction__styles-bg--height">
          <span>{{ bgSize.height }}</span>
          <div>高</div>
        </div>
      </div>
      <div class="v-construction__styles-item">画布背景</div>
      <v-tabs @change="bgTYpeChange">
        <v-tabs-pane label="颜色">
          <div class="v-check-color">
            <div class="v-check-color--btn" />
            <Sketch-picker v-model="colors" @input="bgColorChange" />
          </div>
        </v-tabs-pane>
        <v-tabs-pane label="图片">
          <v-upload @change="bgImgChange" />
        </v-tabs-pane>
      </v-tabs>
    </div>
  </div>
</template>

<script>
import { Sketch } from './components/color'
import { Tabs, TabsPane } from './components/tabs'
import VUpload from './components/upload'

export default {
  name: 'VConstructionStyles',
  components: {
    'Sketch-picker': Sketch,
    'v-tabs': Tabs,
    'v-tabs-pane': TabsPane,
    VUpload
  },
  props: {
    value: { type: Array, default: () => [] },
    checkId: { type: String, default: '' }
  },
  inject: ['root'],
  data() {
    return {
      bgSize: { width: 1242, height: 2204 },
      colors: {
        color: '',
        hex: ''
      }
    }
  },
  computed: {
    bgItem() {
      return this.value.find(d => d.type === 'bg') || {}
    }
  },
  watch: {
    value() {
      this.setColors()
    }
  },
  mounted() {
    this.setColors()
  },
  methods: {
    setColors() {
      const item = this.value.find(d => d.type === 'bg')
      if (item) {
        const backgroundColor = item.style.backgroundColor
        this.$set(this, 'colors', { color: backgroundColor, hex: backgroundColor })
      }
    },
    // 背景颜色变化
    bgColorChange({ hex }) {
      const { value } = this
      const list = [...value]
      console.log(list)
      const item = list.find(d => d.type === 'bg')
      if (item) {
        item.style.backgroundColor = hex
      }
      this.$emit('input', list)
    },
    // 背景图片变化
    bgImgChange(img) {
      this.$emit('bg-img-change', img)
    },
    bgTYpeChange(type) {
      this.$emit('bg-type-change', type)
    }
  }
}
</script>

<style lang="scss" scoped>
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
  &-bg{
    display: flex;
    justify-content: center;
    align-items: stretch;
    &--width,&--height{
      flex: 1;
      width: 100px;
      padding: 0 10px;
      height: 30px;
      line-height: 30px;
      overflow: hidden;
      border: 1px solid #ddd;
      border-radius: 4px;
      box-sizing: border-box;
      background-color: #f5f5f5;
      span{
        color: #888;
      }
      div{
        color: #aaa;
        float: right;
      }
    }
  }
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
