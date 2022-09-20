<template>
  <div class="v-construction__styles-text">
    <div class="v-construction__styles-title">文字</div>
    <div class="v-construction__styles-item d-f">
      <div class="v-construction__styles-item--fontfamily">
        <VSlect v-model="modelValue.fontFamily" @change="fontFamilyChange">
          <VOption v-for="(d, i) in fontFamilys" :key="i" :value="d.value" :label="d.label" />
        </VSlect>
      </div>
      <div class="v-construction__styles-item--fontsize">
        <VSlect v-model="modelValue.fontSize" is-number>
          <VOption :value="120" />
          <VOption :value="140" />
        </VSlect>
      </div>
    </div>
    <div class="v-construction__styles-title">文字颜色</div>
    <div class="v-construction__styles-item">填充</div>
    <div class="v-construction__styles-item">描边</div>
    <div class="v-construction__styles-item">投影</div>
    <div class="v-construction__styles-item">不透明度</div>
  </div>
</template>

<script>
import VSlect from '../../components/select'
import VOption from '../../components/option'
export default {
  name: 'VText',
  components: {
    VSlect, VOption
  },
  props: {
    value: { type: Object, default: () => ({}) }
  },
  inject: ['root'],
  data() {
    return {
      inputValue: '',
      inputNumberValue: null,
      fontFamilys: [
        { label: '华文细黑', value: 'STHeiti Light [STXihei]' },
        { label: '华文黑体', value: 'STHeiti' },
        { label: '华文楷体', value: 'STKaiti' },
        { label: '华文宋体', value: 'STSong' },
        { label: '华文仿宋', value: 'STFangsong' },
        { label: '俪黑Pro', value: 'LiHei Pro Medium' },
        { label: '俪宋Pro', value: 'LiSong Pro Light' },
        { label: '标楷体', value: 'BiauKai' },
        { label: '苹果俪中黑', value: 'Apple LiGothic Medium' },
        { label: '苹果俪细宋', value: 'Apple LiSung Light' }
      ]
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
    },
    fontSize: {
      get() {
        return this.modelValue.height
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
    }
  }
}
</script>

<style lang="scss" scoped>
.v-construction__styles-text{
  .v-construction__styles-item{
    display: flex;
    align-items: center;
    justify-content: space-between;
    &--fontfamily{
      width: 160px;
    }
    &--fontsize{
      width: 60px;
    }
  }
}
</style>
