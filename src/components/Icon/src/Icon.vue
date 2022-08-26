<script setup lang="ts">
//@DESC: 类型定义
interface IIconProps {
  icon: string
}

//@DESC: 初始化
const props = defineProps<IIconProps>()
const { icon } = toRefs(props)

//@DESC: 事件处理
</script>

<template>
  <i :class="['iconfont', icon]"></i>
</template>

<style scoped></style>
