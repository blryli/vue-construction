<template>
  <div class="v-construction">
    <div class="v-construction__wrapper">
      <VConstructionTool v-model="list" :activated="collapseActive" />
      <VConstructionCanvas
        v-model="list"
        :check-id="checkId"
        :bg-type="bgType"
        :bg-img="bgImg"
        :collapse-active="collapseActive"
        @collapse-change="collapseChange"
      />
      <VConstructionStyles
        v-model="list"
        :check-id="checkId"
        @bg-type-change="bgTypeChange"
        @bg-img-change="bgImgChange"
      />
    </div>
  </div>
</template>

<script>
import VConstructionCanvas from './construction-canvas.vue'
import VConstructionStyles from './construction-styles.vue'
import VConstructionTool from './construction-tool'

export default {
  name: 'VConstruction',
  components: { VConstructionCanvas, VConstructionStyles, VConstructionTool },
  provide() {
    return {
      root: this
    }
  },
  data() {
    return {
      collapseActive: true,
      list: [
        { itemId: '0', type: 'bg', imag: '', style: { width: 1242, height: 2208, backgroundColor: '#BCCCEC', backgroundImage: '' }},
        { itemId: '1', type: 'text', content: '拒绝酒驾', style: { width: 800, height: 284, fontSize: 180, color: '#E24A57' }, pos: { x: 200, y: 300 }},
        { itemId: '2', type: 'text', content: '全国拒绝酒驾日', style: { width: 500, height: 120, fontSize: 60, color: '#111' }, pos: { x: 360, y: 600 }},
        { itemId: '3', type: 'text', content: '2022/09/09', style: { width: 280, height: 100, fontSize: 50, color: '#333' }, pos: { x: 420, y: 700 }},
        { itemId: '4', type: 'text', content: '只要感情有 | 喝茶更胜酒', style: { width: 800, height: 100, fontSize: 50, color: '#333' }, pos: { x: 220, y: 1200 }},
        { itemId: '5', type: 'text', content: '只开车莫沾酒 | 平安伴我走', style: { width: 800, height: 100, fontSize: 50, color: '#333' }, pos: { x: 220, y: 1300 }}
      ],
      checkId: '0',
      editId: null,
      bgType: 0,
      bgImg: ''
    }
  },
  methods: {
    collapseChange(type) {
      this.collapseActive = type
    },
    bgTypeChange(type) {
      this.bgType = type
    },
    bgImgChange(img) {
      this.bgImg = img
    }
  }

}
</script>

<style lang="scss" scoped>
.v-construction{
  font-size: 14px;
  &__wrapper{
    position: relative;
    width: 100%;
    height: calc(100vh - 80px);
    background-color: #f5f5f5;
  }
}
</style>
