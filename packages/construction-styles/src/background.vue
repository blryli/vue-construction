<template>
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
          <Sketch-picker v-model="modelValue.backgroundColor" @input="bgColorChange" />
        </div>
      </v-tabs-pane>
      <v-tabs-pane label="图片">
        <v-upload @change="bgImgChange" />
      </v-tabs-pane>
    </v-tabs>
  </div>
</template>

<script>
import { Sketch } from '../../components/color'
import { Tabs, TabsPane } from '../../components/tabs'
import VUpload from '../../components/upload'

export default {
  name: 'VBackground',
  components: {
    'Sketch-picker': Sketch,
    'v-tabs': Tabs,
    'v-tabs-pane': TabsPane,
    VUpload
  },
  props: {
    value: { type: Object, default: () => {} }
  },
  inject: ['root'],
  data() {
    return {
      bgSize: { width: 1242, height: 2204 }
    }
  },
  computed: {
    modelValue: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  },

  methods: {
    // 背景颜色变化
    bgColorChange({ rgba }) {
      const { r, g, b, a } = rgba
      this.set('backgroundColor', `rgba(${r}, ${g}, ${b}, ${a})`)
    },
    // 背景图片变化
    bgImgChange(img) {
      this.set('backgroundImage', img)
    },
    // 背景类型变化
    bgTYpeChange(i) {
      const type = i === 0 ? 'color' : 'image'
      this.set('bgType', type)
    },
    set(filed, val) {
      this.$set(this.modelValue, filed, val)
    }
  }
}
</script>

<style lang="scss" scoped>
.v-construction__styles-bg{
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
</style>
