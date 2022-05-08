import {h, VNode} from 'vue'
import { NButton } from 'naive-ui'
// import LabelList from './LabelList.vue'

type Size = 'tiny' | 'small' | 'medium' | 'large';
type Type = 'default' | 'primary' | 'info' | 'success' | 'warning' | 'error';

const defaultClick = function(){}

export const renderButton = (content: string | VNode | Array<string | VNode> , type: Type = 'default', size: Size = 'medium' , cb: Function = defaultClick) => h(
    NButton,
    {
        onClick: cb,
        type: type,
        size: size
    },
    {
        default: () => content
    }
)

// export const renderLabelList = (labels1, labels2, labels3) => h(
//     LabelList,
//     {},
//     {
//         prefix: () => labels1
//         ,
//         default: h(
//             NSpace,
//             {
//                 vertical: true
//             },
//             {
//                 default: () => labels2
//             }
//         ),
//         suffix: h(
//             NSpace,
//             {
//                 vertical: true
//             },
//             {
//                 default: () => labels3
//             }
//         )
//     }
// )
