import { computed, defineComponent } from 'vue'
import { getSlot } from '../../shared/utils'

export default defineComponent({
  props: {
    row: {
      type: Number,
      default: 3
    },
    size: {
      type: Number,
      default: 100
    }
  },

  setup(props) {
    const top = computed(() => ({
      height: props.size + 'px',
    }))

    const right = computed(() => ({
      top: props.size + 'px',
      height: (props.row - 2) * props.size + 'px',
      width: props.size + 'px'
    }))

    const bottom = computed(() => ({
      height: props.size + 'px',
      top: (props.row - 1) * props.size + 'px',
    }))

    const left = computed(() => ({
      top: props.size + 'px',
      width: props.size + 'px',
      height: (props.row - 2) * props.size + 'px'
    }))

    return {
      top,
      right,
      bottom,
      left
    }
  },

  render() {
    return  <div class="mk-grids-wrapper">
      <div style={this.top} class="mk-grids-wrapper__top">{getSlot(this, 'top')}</div>
      <div style={this.right} class="mk-grids-wrapper__right">{getSlot(this, 'right')}</div>
      <div style={this.bottom} class="mk-grids-wrapper__bottom">{getSlot(this, 'bottom')}</div>
      <div style={this.left} class="mk-grids-wrapper__left">{getSlot(this, 'left')}</div>
    </div>
  }
})