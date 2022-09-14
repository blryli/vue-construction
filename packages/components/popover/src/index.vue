<script>
import { removeBody, getDomClientRect } from '../../../utils/dom'

export default {
  name: 'Popover',
  props: {
    effect: { type: [String, Object], default: 'light' },
    // popover消息提示
    data: { type: [String, Object, Array], default: '' },
    placement: { type: String, default: 'top' },
    borderColor: { type: String, default: '#ddd' },
    popoverClass: { type: String, default: '' },
    trigger: { type: String, default: 'hover' },
    reference: HTMLElement,
    message: { type: [String, Array], default: '' },
    enterable: Boolean,
    hideDelay: { type: Number, default: 200 },
    vslot: { type: [Object, Array], default: () => {} },
    addToBody: Boolean,
    isFixed: Boolean,
    showAlways: Boolean,
    disabled: Boolean
  },
  data() {
    return {
      show: false,
      addedBody: false,
      momentPlacement: this.placement
    }
  },
  computed: {
    isVisible() {
      const { showAlways, show, disabled, message, $slots, vslot } = this
      return (showAlways || show) && !disabled && (vslot || message || $slots.default)
    },
    pClass() {
      const { effect, momentPlacement, popoverClass, isFixed, isVisible } = this
      return `${effect ? `is-${effect}` : 'is-light'}  v-popover-${momentPlacement} ${popoverClass} ${isVisible ? 'v-popover--visible' : 'v-popover--hidden'} ${isFixed ? 'is--fixed' : ''}`
    },
    popoverStyle() {
      const { effect } = this
      const style = {
        '--borderColor': '#ddd',
        '--bgColor': '#fff',
        '--color': '#303133'
      }
      if (!effect) {
        return style
      }
      if (typeof effect === 'string') {
        switch (effect) {
          case 'light':
            style['--borderColor'] = '#ddd'
            style['--bgColor'] = '#fff'
            style['--color'] = '#303133'
            break
          case 'dark':
            style['--borderColor'] = '#303133'
            style['--bgColor'] = '#303133'
            style['--color'] = '#fff'
            break
          case 'info':
            style['--borderColor'] = '#e6a23c'
            style['--bgColor'] = '#e6a23c'
            style['--color'] = '#fff'
            break
          case 'error':
            style['--borderColor'] = '#f56c6c'
            style['--bgColor'] = '#f56c6c'
            style['--color'] = '#fff'
            break
          default:
            style['--borderColor'] = effect
            style['--bgColor'] = effect
            style['--color'] = '#fff'
            break
        }
      } else if (typeof effect === 'object') {
        if (Array.isArray(effect)) {
          console.error('effect 只能是对象或字符串')
        } else {
          style['--borderColor'] = effect.borderColor
            ? effect.borderColor
            : '#ddd'
          style['--bgColor'] = effect.backgroundColor
            ? effect.backgroundColor
            : '#fff'
          style['--color'] = effect.color ? effect.color : '#303133'
        }
      } else {
        console.error('effect 只能是对象或字符串')
      }
      return style
    }
  },
  watch: {
    showAlways(val) {
      if (val) {
        this.timer = setTimeout(this.calculateCoordinate, 0)
      }
    },
    show(val) {
      if (val) {
        this.timer = setTimeout(() => {
          this.popoverAddedBody()
          this.calculateCoordinate()
        }, 0)
      } else {
        this.timer = null
      }
    },
    placement(val) {
      this.momentPlacement = val
    }
  },
  mounted() {
  },
  beforeDestroy() {
    this.addedBody && removeBody(this, 'popover')
    this.addedBody = false
  },
  methods: {
    popoverAddedBody() {
      const { addToBody, addedBody, show, $el } = this
      if (!addedBody && show) {
        if (addToBody) document.body.appendChild($el)
        this.addedBody = true
      }
    },
    doShow() {
      const { timeoutPending } = this
      if (timeoutPending) {
        clearTimeout(timeoutPending)
        this.show = true
      } else {
        this.show = true
      }
    },
    doHide() {
      if (this.enterable) {
        this.timeoutPending = setTimeout(() => {
          this.show = false
        }, this.hideDelay)
      } else {
        this.show = false
      }
    },
    mouseenterWrap() {
      const { enterable, timeoutPending } = this
      enterable && clearTimeout(timeoutPending)
    },
    mouseleaveWrap() {
      if (this.enterable) {
        this.timeoutPending = setTimeout(() => {
          this.show = false
        }, 200)
      }
    },
    calculateCoordinate() {
      const { addedBody, $el, isFixed, reference, popoverAddedBody, changeDirection } = this
      !addedBody && popoverAddedBody()
      const popover = $el
      const referenceRect = getDomClientRect(reference)
      const popoverRect = getDomClientRect(popover)

      changeDirection(popoverRect, referenceRect, popover)

      let top, left
      switch (this.momentPlacement) {
        case 'top':
          left = referenceRect.centerX - (popoverRect.width / 2)
          top = referenceRect.top - popoverRect.height - 10
          break
        case 'bottom':
          left = referenceRect.centerX - (popoverRect.width / 2)
          top = referenceRect.bottom + 10
          break

        case 'left':
          left = referenceRect.left - popoverRect.width - 10
          top = referenceRect.top + referenceRect.height / 2 - popoverRect.height / 2
          break

        case 'right':
          left = referenceRect.right + 10
          top = referenceRect.top + referenceRect.height / 2 - popoverRect.height / 2
          break

        default:
          console.error('Wrong placement must left/top/right/bottom')
          break
      }
      const { left: tLeft, top: tTop } = getDomClientRect(document.body)
      popover.style.left = left - (isFixed ? 0 : tLeft) + 'px'
      popover.style.top = top - (isFixed ? 0 : tTop) + 'px'
    },
    changeDirection(popoverRect, referenceRect, popover) {
      const allHeight = referenceRect.bottom + popoverRect.height + 5
      switch (this.placement) {
        case 'top':
          if (referenceRect.top - popoverRect.height - 5 < 10) {
            this.momentPlacement = 'bottom'
          } else {
            this.momentPlacement = 'top'
          }
          break
        case 'bottom':
          if (window.innerHeight - allHeight < 10) {
            this.momentPlacement = 'top'
          } else {
            this.momentPlacement = 'bottom'
          }
          break
        default:
          break
      }
    }
  },
  render(h) {
    const { pClass, popoverStyle, mouseenterWrap, mouseleaveWrap, $slots, message, vslot } = this
    return h('transition', { attts: { name: 'effFade' }}, [
      h('div', { ref: 'popover', class: ['v-popover ' + pClass], style: popoverStyle, on: { mouseenter: mouseenterWrap, mouseleave: mouseleaveWrap }}, [
        vslot || $slots.default || h('div', { class: 'v-popover-message' }, (Array.isArray(message) ? message : [{ message }]).map((d, i) => h('div', { key: i, class: `v-popover-item is--${d.type}` }, [d.message]))),
        h('div', { ref: 'arrow', class: 'v-popover-arrow' })
      ])
    ])
  }
}
</script>

<style lang="scss" scoped>
.v-popover {
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.3s ease;
  position: absolute;
  z-index: 2001;
  line-height: 1.2;
  min-width: 10px;
  border-radius: 4px;
  border: 1px solid;
  background-color: var(--bgColor);
  border-color: var(--borderColor);
  color: var(--color);
  box-shadow: 0 1px 10px rgba($color: #000000, $alpha: .1);

  &.is--fixed{
    position: fixed;
  }

  &-item{
    + .v-popover-item{
      margin-top: 10px;
    }
  }

  .is--error{
    color: red;
  }
  &--visible {
    visibility: visible;
    opacity: 1;
  }
  &--hidden {
    visibility: hidden;
    opacity: 0;
  }
  &-arrow {
    position: absolute;
    width: 0;
    height: 0;
    border: 6px solid transparent;
    &:after {
      content: "";
      position: absolute;
      width: 0;
      height: 0;
      border: 5px solid transparent;
    }
  }
  &-message{
    padding: 10px;
  }
}

.v-popover-top .v-popover-arrow {
  border-top-color: var(--borderColor);
  margin-left: -6px;
  left: 50%;
  top: 100%;
}

.v-popover-top .v-popover-arrow:after {
  top: -6px;
  margin-left: -5px;
  border-top: 5px solid var(--bgColor);
}

.v-popover-right .v-popover-arrow {
  border-right-color: var(--borderColor);
  margin-top: -6px;
  left: -12px;
  top: 50%;
}

.v-popover-right .v-popover-arrow:after {
  left: -3px;
  margin-top: -5px;
  border-right: 5px solid var(--bgColor);
}

.v-popover-bottom .v-popover-arrow {
  border-bottom-color: var(--borderColor);
  margin-left: -6px;
  top: -12px;
  left: 50%;
}

.v-popover-bottom .v-popover-arrow:after {
  top: -3px;
  margin-left: -5px;
  border-bottom: 5px solid var(--bgColor);
}

.v-popover-left .v-popover-arrow {
  border-left-color: var(--borderColor);
  margin-top: -6px;
  left: 100%;
  top: 50%;
}

.v-popover-left .v-popover-arrow:after {
  right: -3px;
  margin-top: -5px;
  border-left: 5px solid var(--bgColor);
}

.effFade-enter-active, .effFade-leave-active {
  transition: opacity .5s;
}
.effFade-enter, .effFade-leave-to {
  opacity: 0;
}

.v-popup{
  width: 100%;
  height: var(--rowHeight);
  line-height: var(--rowHeight);
  box-sizing: border-box;
}

.v-edit{
  .v-popup{
    margin: 0 5px;
  }
}
</style>
