<script>
import VInput from '../../input'
import VInputNumber from '../../input-number'
import VPopover from '../../popover'
export default {
  name: 'VSelect',
  components: { VInput, VInputNumber, VPopover },
  props: {
    value: { type: [Number, String], default: null },
    min: { type: Number, default: -Infinity },
    max: { type: Number, default: Infinity },
    isNumber: { type: Boolean }
  },
  data() {
    return {
      popover: {},
      inDropdowm: false,
      checked: { label: '', value: '' }
    }
  },
  computed: {
    inputValue: {
      get() {
        return this.value
      },
      set(val) {
        const { isNumber } = this
        const value = isNumber ? Number(val) : val
        this.$emit('input', value)
        this.$emit('change', value)
      }
    }
  },
  mounted() {

  },
  methods: {
    focus() {
      const { input } = this.$refs
      input && input.focus && input.focus()
    },
    select() {
      const { input } = this.$refs
      input && input.select && input.select()
    },
    handleChange() {
      this.$emit('change', this.inputValue)
    },
    handleFocus(e) {
      console.log(this.$refs.select)
      this.doShow()
      this.$emit('focus', e)
      this.$nextTick(() => {
        this.popover = { reference: this.$el, placement: 'bottom', addToBody: true, showAlways: true }
      })
    },
    handleBlur(e) {
      const { inDropdowm } = this
      !inDropdowm && this.doHide()
      this.$emit('blur', e)
      this.handleChange()
    },
    doShow() {
      this.$refs.popover.doShow()
    },
    doHide() {
      this.$refs.popover.doHide()
    },
    dropdownMouseenter() {
      this.inDropdowm = true
    },
    dropdownMouseleave() {
      this.inDropdowm = false
    },
    itemClick(props) {
      const { label, value } = props
      this.checked = { label, value }
      this.$set(this, 'inputValue', value)
      this.doHide()
    }
  },
  render(h) {
    const { isNumber, inputValue, popover, checked, $attrs, handleFocus, handleBlur, dropdownMouseenter, dropdownMouseleave, itemClick } = this
    const slots = (this.$slots.default || []).filter((d, i) => d.tag)
    return h('div', { ref: 'select', class: 'v-select' }, [
      isNumber ? h(VInputNumber, { ref: 'input', attrs: Object.assign($attrs, { value: inputValue }), on: { input: val => this.$set(this, 'inputValue', val), focus: handleFocus, blur: handleBlur }})
        : h(VInput, { ref: 'input', attrs: Object.assign($attrs, { value: checked.label }), on: { focus: handleFocus, blur: handleBlur }}),
      h(VPopover, { ref: 'popover', attrs: popover }, [
        h('div', { class: 'v-select-dropdown__wrap', on: { mouseenter: dropdownMouseenter, mouseleave: dropdownMouseleave }}, [
          slots.map(d => {
            const props = d.componentOptions.propsData
            return h('div', { class: 'v-select-dropdown__item', on: { click: () => itemClick(props) }}, [d])
          })
        ])
      ])
    ])
  }
}
</script>

<style lang="scss">
.v-select{

}
</style>
