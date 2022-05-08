import { Component } from "vue"
import { NTag, NIcon, NButton} from 'naive-ui'
import { h} from 'vue'

    /**
     * 渲染图标
     * @param icon 图标名称
     */
    export const renderIcon =  (icon: Component) => {
        return () => h(NIcon, null, { default: () => h(icon) })
    }

    /**
     * 获取标签方法，可复用
     * @param typeName 类型名称
     * @param msg 显示字
     */
     export const getTags = (typeName : any, msg : string) => {
        return h(
                NTag,
                {
                    style: {
                        marginRight: '6px'
                    },
                type: typeName
                },
                {
                    default: () => msg
                }
        )
    }

    /** 
     * 拼装按钮
     * @param method click 方法
     * @param iconTypeName icon 类型
     * @param typeName : 按钮类型名称, 如: success, error
    */
    export const getActionButton = (method : any, iconType : Component, typeName : any) => {
        return h(
           NButton,
           {
               size: 'medium',
               style: {
                   marginRight: '6px'
               },
               type : typeName,
               // 点击事件
               onClick: method
           },
           { default: renderIcon(iconType)}
       )
   }

  