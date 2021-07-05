import { PropType, ref, VNode } from 'vue'
import { onMounted } from 'vue'
import { defineComponent } from 'vue'
import { getSlot } from '../../shared/utils'
import Wrapper from './wrapper'

export interface IOption {
  title: string
  image: string
}

function getOptionsDevideArr(children: VNode[], rowNum: number) {
  return [
    children.slice(0, rowNum),
    children.slice(rowNum, rowNum * 2 - 2),
    children.slice(rowNum * 2 - 2, rowNum * 3 - 2),
    children.slice(rowNum * 3 - 2, rowNum * 4 - 4)
  ]
}

export default defineComponent({
  name: 'mk-grids',

  props: {
    row: {
      type: Number,
      default: 3
    },
    options: {
      type: Array as PropType<Array<IOption>>
    }
  },

  setup(props) {
    const autoSize = ref(0)
    const el = ref()
    const setRef = (ele: any) => {
      el.value = ele
    }

    onMounted(() => {
      if (autoSize.value === 0) {
        const rect = el.value.$el.parentNode.getBoundingClientRect()
        autoSize.value = rect.width / props.row
      }
    })

    return {
      setRef,
      size: autoSize
    }
  },

  render() {
    let children = getSlot(this)[0].children
    children.forEach((child: any) => {
      if (!child.el) return
      child.el.style.width = this.size + 'px'
      child.el.style.height = this.size + 'px'
    })
    children = getOptionsDevideArr(children, this.row)
    
    return  <Wrapper size={this.size} row={this.row} ref={this.setRef}>
      {{
        top: () => children[0],
        right: () => children[1],
        bottom: () => children[2],
        left: () => children[3]
      }}
    </Wrapper>
  }
})