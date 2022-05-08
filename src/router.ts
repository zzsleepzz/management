import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router"

const routes: RouteRecordRaw[] = [
    {
        path: "/",
        component: () => import("./views/Home.vue")
    },
    {
        path: "/info",
        component: () => import("./views/Info.vue")
    },
    {
        path: "/notice",
        component: () => import("./views/Notice.vue")
    },
    {
        path: "/user",
        component: () => import("./views/User.vue")
    },
    {
        path: "/alumni",
        component: () => import("./views/Alumni.vue")
    },
    {
        path: "/activity",
        component: () => import("./views/Activity.vue")
    }
]

export default createRouter({
    routes,
    history: createWebHashHistory()
})