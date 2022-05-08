<template>
    <h1>通知模块</h1>
    <n-card>
        <n-input-group>
            <n-button type="info" @click="toNoticeAdd()"> 添加通知 </n-button>
        </n-input-group>
        <n-divider></n-divider>
        <div>
            <n-data-table :single-line="false" :columns="columns" :data="data" :row-key="(row) => row.index" />
            <n-pagination v-model:page="currentPage" :page-size="10" :item-count="total" />
        </div>
    </n-card>
    <del-modal :visiable="modalVisibility" :del="delNotice" :cancel="() => showMessage('取消操作', 1, 1)" />
</template>

<script setup lang="ts">
import { Notice } from "../models";
import { useMessage } from "naive-ui";
import { noticeApi } from "../api";
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
        title: "公告标题",
        key: "title",
        width: 90,
    },
    {
        title: "公告内容",
        key: "content",
        ellipsis: {
            tooltip: true,
        },
    }, {
        title: "操作",
        key: "action",
        width: 140,
        render(row: Notice) {
            return renderSpace([
                renderButton("编辑", "info", 'small', () => toNoticeEdit(row.id)),
                renderButton("删除", "error", 'small', () => comfirmDel(row.id)),
            ]);
        },
    },
];

const data: Notice[] = [
    { id: 1, title: '工商管理学院通知', content: '2018届学生即将毕业，希望大家前程似锦！！！' },

]

const toDelId = ref<number>(-1)

const comfirmDel = (id: number) => {
    modalVisibility.value = !modalVisibility.value
    toDelId.value = id
}

/**
 * 跳转到新建good
 */
const toNoticeAdd = () => {
    router.push("/notice/add");
};

/**
 * 跳转到编辑good
 */
const toNoticeEdit = (id: number) => {
    router.push(`/notice/edit/${id}`)
}

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

const delNotice = () => {
    noticeApi.list().then(
        response => {
            console.log(response.data)
            showMessage('操作成功', 2, 1)
        }
    ).catch(
        () => showMessage('操作失败', 2, 1)
    )
}

</script>