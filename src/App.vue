<script setup lang="ts">
import tools from "./utils/tools"

tools.localStorage.setItem("user_name", "张三")
tools.cookie.setItem("user_phone", "1599886655")

const show: boolean = true
</script>

<template>
  <div class="view">
    <router-view></router-view>
  </div>
</template>

<style lang="scss" scoped>
</style>
