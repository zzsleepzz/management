<template>
    <n-modal
        :show="visiable"
        :mask-closable="false"
        preset="dialog"
        title="提示"
        content="此操作将永久删除该项, 是否继续?"
        positive-text="确认"
        @positive-click="del"
        @negative-click="cancel"
        negative-text="取消"
    />
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { NModal } from 'naive-ui'

export default defineComponent({
    name: "del-modal",
    props: {
        visiable: Boolean,
        del: Function,
        cancel: Function
    },
    components: {
        NModal
    },
    setup() {

    }
})
</script>
<style>
</style>