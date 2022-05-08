import { h, VNode } from 'vue'
import { NSpace, SpaceProps } from 'naive-ui'

type Justify = 'start' | 'end' | 'center' | 'space-around' | 'space-between'
type Size = number | [number, number] | "small" | "medium" | "large"

export const renderSpace = (components: VNode[], vertical: boolean = false, justify: Justify = 'start', size: Size = 'medium') => h(
    NSpace,
    {
        vertical: vertical,
        size: size
    },
    {
        default: () => components
    }
)