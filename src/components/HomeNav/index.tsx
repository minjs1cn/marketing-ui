import { defineComponent, PropType } from 'vue'
import { RouterLink } from 'vue-router'
import ArrowRight from '../ArrowRight'

import './index.less'

type TNavItem = {
  path: string
  title: string
}

export interface INavGroup {
  name: string
  children: Array<TNavItem>
}

export default defineComponent({
  props: {
    group: {
      type: Object as PropType<INavGroup>,
      default: []
    }
  },

  render() {
    return <div class="demo-home-nav">
      <div>
        <div class="demo-home-nav__title">
          { this.group.name }
        </div>
        <div class="demo-home-nav__group">
          {
            this.group.children.map((navItem: TNavItem) => {
              return (
                <RouterLink class="demo-home-nav__block" key={navItem.path} to={navItem.path}>
                  { navItem.title }
                  <ArrowRight class="demo-home-nav__icon" />
                </RouterLink>
              )
            })
          }
        </div>
      </div>
    </div>
  }
})
