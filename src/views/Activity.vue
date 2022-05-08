<template>
    <h1>活动模块</h1>
    <n-card>
        <n-input-group>
            <n-button type="info" @click="showAddModel"> 添加活动 </n-button>
        </n-input-group>
        <n-divider></n-divider>
        <div>
            <n-data-table :single-line="false" :columns="columns" :data="data" :row-key="(row) => row.index" />
            <n-pagination v-model:page="currentPage" :page-size="5" :item-count="total" />
        </div>
    </n-card>

    <n-modal :show="addModalVisibility" title="添加活动" preset="dialog" positive-text="确认" negative-text="取消"
        @positive-click="addActivity" @negative-click="toggleAddModal">
        <n-form>
            <n-form-item label="活动标题">
                <n-input required v-model:value="newActivity.title" />
            </n-form-item>
            <n-form-item label="活动内容">
                <n-input required v-model:value="newActivity.content" />
            </n-form-item>
            <n-form-item label="活动时间">
                <n-input v-model:value="newActivity.time" />
            </n-form-item>
        </n-form>
    </n-modal>

    <n-modal :show="editModalVisibility" title="修改活动" preset="dialog" positive-text="确认" negative-text="取消"
        @positive-click="editActivity" @negative-click="toggleEditModal">
        <n-form>
            <n-form-item label="活动标题">
                <n-input required v-model:value="targetActivity.title" />
            </n-form-item>
            <n-form-item label="活动内容">
                <n-input v-model:value="targetActivity.content" />
            </n-form-item>
            <n-form-item label="活动时间">
                <n-input v-model:value="targetActivity.time" />
            </n-form-item>
        </n-form>
    </n-modal>

    <del-modal :visiable="delModalVisibility" :del="delActivity" :cancel="toggleDelModal" />
</template>

<script setup lang="ts">
import { Activity } from "../models";
import { useMessage } from "naive-ui";
import { activityApi } from "../api";
import { doShowMessage } from "../components/showMessage";
import { renderButton } from "../components/renderButton";
import { renderSpace } from "../components/renderSpace";
import { GET, POST } from "../http/request";
import { count } from "console";


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
        width: 400,
    }, {
        title: "时间",
        key: "time",
        width: 200,
    }, {
        title: "操作",
        key: "action",
        width: 140,
        render(row: Activity) {
            return renderSpace([
                renderButton("编辑", "info", 'small', () => {
                    showEditModal(row.id)
                    targetActivity.title = row.title
                    targetActivity.content = row.content
                    targetActivity.time = row.time
                }),
                renderButton("删除", "error", 'small', () => showDelModel(row.id)),
            ]);
        },
    },
];

// const data: Activity[] = reactive([
//     { id: 1, title: '毕业旅行', content: '2018届学生即将毕业，举办一场旅游活动！！！', time: "2022-05-05 12:00:00" },
// ]);

const data = ref<Activity[]>();

const router = useRouter()
const message = useMessage();
const currentPage = ref(1);
const total = ref(1);

const targetActivityId = ref(0)
const targetActivity = reactive({} as Activity)
const newActivity = reactive({} as Activity)


const addModalVisibility = ref(false)
const delModalVisibility = ref(false)
const editModalVisibility = ref(false)

const toggleDelModal = () => delModalVisibility.value = !delModalVisibility.value
const toggleAddModal = () => addModalVisibility.value = !addModalVisibility.value
const toggleEditModal = () => editModalVisibility.value = !editModalVisibility.value

const showDelModel = (id: number) => {
    targetActivityId.value = id
    toggleDelModal()
}

const showAddModel = () => {
    toggleAddModal()
}

const showEditModal = (id: number) => {
    targetActivityId.value = id
    targetActivity.id = id
    toggleEditModal()
}

const addActivity = () => {
    createOrUpdate(newActivity)
    toggleAddModal()
    list(Math.floor(total.value / 5) + 1)
}

const delActivity = () => {
    del(targetActivityId.value)
    toggleDelModal()
}

const editActivity = () => {
    createOrUpdate(targetActivity)
    toggleEditModal()
    list(currentPage.value)
}

const createOrUpdate = (data: any) => {
    POST("/activity/createOrUpdate", data)
}

const del = (id: number) => {
    GET("/activity/deleteByAdmin", { id: id })
        .then((response: any) => {
            list(currentPage.value)
        })
}

const list = (pageNo: number) => {
    GET("/activity/list", { pageNo: pageNo })
        .then((response: any) => {
            console.log(response)
            console.log(response.data.records)
            data.value = response.data.records
            total.value = response.data.total
            currentPage.value = response.data.current
        })
}

const login = (schoolSystemId: number, password: string) => {
    GET("/account/login", { schoolSystemId: schoolSystemId, password: password })
        .then((response: any) => {
            alert("登录成功")
        })
}


onMounted(
    () => list(currentPage.value)
)

watch(
    () => currentPage.value,
    () => list(currentPage.value)
)

</script>