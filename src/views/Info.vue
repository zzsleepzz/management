<template>
    <h1>{{ fuck }}</h1>
    <h2>{{ test.msg }}</h2>

    <button @click="click">click</button>
    <button @click="goHome">go home</button>
    <button @click="test.toggleMsg">toggleMsg</button>


    <NInput v-model:value="fuck" />
</template>

<script setup lang="ts">
import { fakeApi } from "../api";
import useTestStore from '../store/test'

const test = useTestStore()

const router = useRouter()

const goHome = () => {
    router.push('/')
}

const fuck = ref('fuck')

const click = () => {
    fakeApi.gFake().catch(
        () => fuck.value = "wrong network request"
    )
    // .then(
    //     res => res.data.xxx
    // )
}
</script>
