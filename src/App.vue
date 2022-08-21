<script setup lang="ts">
import tools from './utils/tools';

tools.localStorage.setItem('user_name', '张三')
tools.cookie.setItem('user_phone', '1599886655')
</script>

<template>
  <div class="container">
    <h1 class="color">前端项目：开源十年</h1>
    <p>kaiyuan10nian</p>
    <p>globalCenter: {{ globalCenter.getSystemConfig('baseUrl') }}</p>
    <p>user_name: {{ tools.localStorage.getItem('user_name') }}</p>
    <p>user_phone: {{ tools.cookie.getItem('user_phone') }}</p>
  </div>
</template>

<style scoped>
.color {
  display: flex;
  color: red;
}

.container {
  padding: 20px;
}
</style>
