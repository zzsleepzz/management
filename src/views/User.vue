<template>
    <h1>用户模块</h1>
    <n-card>
        <n-divider></n-divider>
        <div>
            <n-data-table :single-line="false" :columns="columns" :data="data" :row-key="(row) => row.index" />
            <n-pagination v-model:page="currentPage" :page-size="10" :item-count="total" />
        </div>
    </n-card>
</template>

<script setup lang="ts">
import { fakeApi } from "../api";
import { User } from "../models";

const currentPage = ref(1);
const total = ref(2);

const columns = [
    {
        title: "#",
        key: "index",
        width: 50,
    },
    {
        title: "学校系统ID",
        key: "schoolId",
        width: 90,
    },
    {
        title: "用户名",
        key: "username",
        width: 90,
    },
    {
        title: "手机号",
        key: "phone",
        width: 90,
    }
];

const data: User[] = [
    { id: 1, schoolId: 811180205, username: 'gyx', phone: '13574439876' },
    { id: 2, schoolId: 811180206, username: 'ggg', phone: '13574269876' },
    { id: 3, schoolId: 811180207, username: 'xixi', phone: '13557439876' },
    { id: 4, schoolId: 811180206, username: 'yuqi', phone: '13563469876' },
    { id: 5, schoolId: 811180207, username: 'grake', phone: '13678439876' },
]

const click = () => {
    fakeApi.userList().catch(

    ).then(
        //res => res.data.records;
    )
}

</script>