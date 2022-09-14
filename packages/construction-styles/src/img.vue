<template>
  <div class="v-construction__styles-img">
    <div class="v-construction__styles-title">图片</div>
    <div class="v-construction__styles-img-btn" @click="handleUpload">替换图片</div>
    <div class="v-construction__styles-img-btn">裁剪图片</div>
    <div class="d-f-s-b">
      <div class="v-construction__styles-item">不透明度</div>
      <div class="v-construction__styles-img--opacity">
        <VInputNumber v-model="modelValue.opacity" :min="0" :max="100" />
      </div>
    </div>
    <v-upload ref="upload" :show-btn="false" :show-img="false" @change="upload" />
  </div>
</template>

<script>
import VInputNumber from '../../components/input-number'
import VUpload from '../../components/upload'
export default {
  name: 'VImg',
  components: {
    VInputNumber, VUpload
  },
  props: {
    value: { type: Object, default: () => ({}) }
  },
  inject: ['root'],
  data() {
    return {

    }
  },
  computed: {
    modelValue: {
      get() {
        return this.value
      },
      set(val) {
        console.log(val)
        this.$emit('input', val)
      }
    }
  },
  mounted() {
  },
  methods: {
    set(filed, val) {
      this.$set(this.modelValue, filed, val)
    },
    fontFamilyChange(val) {
      this.set('fontFamily', val)
    },
    handleUpload() {
      this.$refs.upload.handleClick()
    },
    upload(img) {
      this.set('img', img)
    }
  }
}
</script>

<style lang="scss" scoped>
.v-construction__styles-img{
  &-btn{
    height: 30px;
    line-height: 30px;
    margin: 15px 0;
    padding: 0 10px;
    font-size: 14px;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 50px;
    color: #666;
    text-align: center;
    cursor: pointer;
    user-select: none;
    &:hover{
      border-color: #aaa;
      color: #333;
    }
  }
  &--opacity{
    width: 60px;
  }
}
</style>
