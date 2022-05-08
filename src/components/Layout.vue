<template>
    <!-- <div>
        <h1>layout</h1>
        <router-view></router-view>
    </div> -->
    <n-layout has-sider class="page-layout">
        <n-layout-sider class="page-layout__sider" content-style="padding: 24px;">
            <div class="page-layout__title">Alumni System</div>
            <n-menu @update:value="onMenuValueUpdate" :options="menuOptions" inverted :value="currentMapKey" />
        </n-layout-sider>
        <n-layout class="page-layout__main" content-style="display: flex;flex-direction: column">
            <n-layout-header class="page-layout__header">
                <n-breadcrumb separator=">">
                    <n-breadcrumb-item>首页</n-breadcrumb-item>
                    <n-breadcrumb-item> {{ currentPageParent }}</n-breadcrumb-item>
                    <n-breadcrumb-item class="n_pageLayou_header_item"> {{ currentPage }}</n-breadcrumb-item>
                </n-breadcrumb>
            </n-layout-header>
            <n-layout-content content-style="padding: 24px;" class="page-layout__content">
                <router-view />
            </n-layout-content>
            <n-layout-footer class="page-layout__footer">yuqi</n-layout-footer>
        </n-layout>
    </n-layout>
</template>

<script setup lang="ts">
import {
    NIcon
} from 'naive-ui'
import { watch, ref, h, Component } from 'vue'
import { InboxOutlined, UserOutlined } from '@vicons/antd'

function renderIcon(icon: Component) {
    return () => h(NIcon, null, { default: () => h(icon) })
}


const routeMap = {
    notice: '/notice',
    user: '/user',
    alumni: '/alumni',
    activity: '/activity',
}

const menuOptions = [{
    key: 'notice',
    label: '通知',
    icon: renderIcon(InboxOutlined),
}, {
    key: 'user',
    label: '用户',
    icon: renderIcon(UserOutlined),
}, {
    key: 'alumni',
    label: '优秀校友',
    icon: renderIcon(UserOutlined),
    // children: [{
    //     key: 'myinfo',
    //     label: '个人信息'
    // }],
}, {
    key: 'activity',
    label: '活动',
    icon: renderIcon(UserOutlined),
}]


const router = useRouter()
const route = useRoute();

const currentPageParent = ref<string>('用户管理');
const currentPage = ref<string>('用户列表');
const currentMapKey = ref("");

const page = {
    user: ["用户模块", "用户列表"],
    notice: ["公告模块", "公告列表"],
    alumni: ["优秀校友模块", "优秀校友列表"],
    activity: ["活动模块", "活动列表"],
}

/**
 * 菜单值更新事件
 */
const onMenuValueUpdate = (
    key: keyof typeof routeMap
) => {
    router.push(routeMap[key])
}

watch(
    () => route.path,
    () => {
        const currentPath = route.path;
        Object.keys(routeMap).some(k => {
            //@ts-ignore
            const isMatch = routeMap[k] === route.path;
            if (isMatch) {
                currentMapKey.value = k;
                currentPageParent.value = page[k][0];
                currentPage.value = page[k][1];
            }
        })

    }
)


</script>

<style>
.page-layout {
    height: 100%;
}

.page-layout__sider {
    color: #fff;
    background: #001529;
}

.page-layout__title {
    font-size: 32px;
    font-weight: 500;
    text-align: center;
}

.page-layout__main {
    background: #f0f2f5;
}

.page-layout__header {
    height: 48px;
    background: #fff;
}

.page-layout__content,
.page-layout__footer {
    background: transparent;
}

.page-layout__footer {
    text-align: center;
}
</style>

