<template>
  <div class="v-construction">
    <div class="v-construction__wrapper">
      <VConstructionTool v-model="list" :activated="collapseActive" />
      <VConstructionCanvas
        v-model="list"
        :check-id="checkId"
        :collapse-active="collapseActive"
        @collapse-change="collapseChange"
      />
      <VConstructionStyles
        ref="styles"
        v-model="list"
        :check-id="checkId"
      />
    </div>
    <VPopover ref="popover" v-bind="popoverProps" />
  </div>
</template>

<script>
import VConstructionCanvas from './construction-canvas'
import VConstructionStyles from './construction-styles'
import VConstructionTool from './construction-tool'
import VPopover from './components/popover'

export default {
  name: 'VConstruction',
  components: { VConstructionCanvas, VConstructionStyles, VConstructionTool, VPopover },
  props: { value: { type: Array, default: () => ([]) }},
  provide() {
    return {
      root: this
    }
  },
  data() {
    return {
      collapseActive: true,
      // list: [
      //   { itemId: '0', type: 'bg', bgType: 'color', width: 800, height: 800, backgroundColor: '#fff', backgroundImage: '' },
      //   { itemId: '1', type: 'text', content: '拒绝酒驾', width: 560, height: 150, fontSize: 125, color: '#E24A57', fontFamily: 'SourceHanSerifCN-SemiBold',
      //     fontWeight: 'normal', textAlign: 'left', opacity: 1, fontStyle: 'normal', whiteSpace: 'break-spaces', margin: 0, padding: 0, wordBreak: 'break-all', outline: 'none', pos: { x: 120, y: 100 }},
      //   { itemId: '2', type: 'text', content: '全国拒绝酒驾日', width: 300, height: 50, fontSize: 40, color: '#111', pos: { x: 240, y: 300 }},
      //   { itemId: '3', type: 'text', content: '2022/09/09', width: 180, height: 40, fontSize: 30, color: '#333', pos: { x: 300, y: 360 }},
      //   { itemId: '4', type: 'text', content: '只要感情有 | 喝茶更胜酒', width: 400, height: 40, fontSize: 30, color: '#333', pos: { x: 190, y: 600 }},
      //   { itemId: '5', type: 'text', content: '只开车莫沾酒 | 平安伴我走', width: 400, height: 40, fontSize: 30, color: '#333', pos: { x: 180, y: 650 }}
      // ],
      checkId: '0',
      editId: null,
      popoverProps: {}
    }
  },
  computed: {
    list: {
      get() {
        const { value } = this
        return value.length ? value : this.$set(this, 'list', [{ itemId: '0', type: 'bg', bgType: 'color', width: 800, height: 800, backgroundColor: '#fff', backgroundImage: '' }])
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  },
  methods: {
    collapseChange(type) {
      this.collapseActive = type
    },
    showPopover(props, calc) {
      this.$refs.popover.doShow()
      this.$nextTick(() => {
        this.popoverProps = props
        if (calc) {
          this.$refs.popover.calculateCoordinate()
        }
      })
    },
    hidePopover() {
      this.$refs.popover.doHide()
    },
    handleUpload() {
      this.$refs.styles.handleUpload()
    }
  }

}
</script>

<style lang="scss">
.v-construction{
  font-size: 14px;
  &__wrapper{
    position: relative;
    width: 100%;
    height: calc(100vh - 80px);
    background-color: #f5f5f5;
  }
}
.d-f{
  display: flex;
  align-items: center;
}
.d-f-s-b{
  display: flex;
  align-items: center;
  justify-content: space-between;
}
body, html {
    width: 100%;
    height: 100%;
    overflow: hidden;
}
</style>
