<template>
    <h1>活动模块</h1>
    <n-card>
        <n-input-group>
            <n-button type="info" @click="addActivity()"> 添加活动 </n-button>
        </n-input-group>
        <n-divider></n-divider>
        <div>
            <n-data-table :single-line="false" :columns="columns" :data="data" :row-key="(row) => row.index" />
            <n-pagination v-model:page="currentPage" :page-size="10" :item-count="total" />
        </div>
    </n-card>
    <del-modal :visiable="modalVisibility" :del="delActivity" :cancel="() => showMessage('取消操作', 1, 1)" />
</template>

<script setup lang="ts">
import { Activity } from "../models";
import { useMessage } from "naive-ui";
import { activityApi } from "../api";
import { doShowMessage } from "../components/showMessage";
import { renderButton } from "../components/renderButton";
import { renderSpace } from "../components/renderSpace";

const router = useRouter()
const message = useMessage();
const currentPage = ref(1);
const total = ref(1);

const columns = [
    {
        title: "#",
        key: "index",
        width: 50,
    },
    {
        title: "活动标题",
        key: "title",
        width: 90,
    },
    {
        title: "活动内容",
        key: "content",
        ellipsis: {
            tooltip: true,
        },
    }, {
        title: "操作",
        key: "action",
        width: 140,
        render(row: Activity) {
            return renderSpace([
                renderButton("编辑", "info", 'small', () => toActivityEdit(row.id)),
                renderButton("删除", "error", 'small', () => comfirmDel(row.id)),
            ]);
        },
    },
];

const data: Activity[] = [
    { id: 1, title: '毕业旅行', content: '2018届学生即将毕业，举办一场旅游活动！！！' },

]

/**
 * 删除模态框加载
 */
const modalVisibility = ref<boolean>(false);

/**
 * 输出提示信息
 */
const showMessage = (msg: string, level: number, index: number) => {
    modalVisibility.value = !modalVisibility.value;
    doShowMessage(message, msg, level);
};


const addActivity = () => {

}

const delActivity = () => {

}

const toActivityEdit = (id: number) => {
    router.push(`/notice/edit/${id}`)
}

const toDelId = ref<number>(-1)

const comfirmDel = (id: number) => {
    modalVisibility.value = !modalVisibility.value
    toDelId.value = id
}

</script>