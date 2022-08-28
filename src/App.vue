<script setup lang="ts">
import tools from "./utils/tools"

tools.localStorage.setItem("user_name", "张三")
tools.cookie.setItem("user_phone", "1599886655")

const show: boolean = true
</script>

<template>
  <div class="container">
    <h1 class="color">{{ useLpk("Title") }}</h1>
    <p>{{ useLpk("BlogAddress") }}: {{ globalCenter.getSystemConfig("baseUrl") }}</p>
    <p>{{ useLpk("UserName") }}: {{ tools.localStorage.getItem("user_name") }}</p>
    <p>{{ useLpk("UserPhone") }}: {{ tools.cookie.getItem("user_phone") }}</p>
    <p>{{ useLpk("Mood") }}: 😪</p>

    <Icon icon="icon-time"></Icon>
    <van-button>按钮</van-button>

    <!-- <van-calendar v-model:show="show" /> -->

    <div class="theme">
      <div class="theme-item" v-for="index in 3">{{ index }}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.theme {
  display: flex;
  justify-content: space-between;

  .theme-item {
    margin: 10px 20px;
    width: 30%;
    padding: 30px 0;
    text-align: center;
    background-color: var(--primary-bg-color);
    color: var(--primary-color);
  }
}

.color {
  display: flex;
  color: red;
}

.container {
  padding: 20px;
}
</style>
