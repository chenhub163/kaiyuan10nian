<script setup lang="ts">
import { useRoute } from "vue-router"
import { get } from "lodash"

//@DESC: 类型定义
interface IRouterViewKeepAliveState {
  ExluceNames: string[]
}

//@DESC: 初始化
const state = reactive<IRouterViewKeepAliveState>({
  ExluceNames: [],
})

const { ExluceNames } = toRefs(state)

//@DESC: 事件处理
watch(useRoute(), (val, oldVal) => {
  if (get(val, "meta.keepAlive", true) == false) {
    // const cmpName = get(val, "meta.cmpName", "")

    const cmpName = get(val.matched[val.matched.length - 1], 'components.default["__name"]', "")
    
    if (cmpName && !state.ExluceNames.includes(cmpName)) {
      state.ExluceNames.push(cmpName)
    }
  }
})
</script>

<template>
  <router-view v-slot="{ Component }">
    <keep-alive :exclude="ExluceNames">
      <component :is="Component"></component>
    </keep-alive>
  </router-view>
</template>

<style scoped></style>
