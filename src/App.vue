<script setup lang="ts">
import tools from './utils/tools';

tools.localStorage.setItem('user_name', '张三')
tools.cookie.setItem('user_phone', '1599886655')
</script>

<template>
  <div class="container">
    <h1 class="color">{{ useLpk('Title') }}</h1>
    <p>{{ useLpk('BlogAddress') }}: {{ globalCenter.getSystemConfig('baseUrl') }}</p>
    <p>{{ useLpk('UserName') }}: {{ tools.localStorage.getItem('user_name') }}</p>
    <p>{{ useLpk('UserPhone') }}: {{ tools.cookie.getItem('user_phone') }}</p>
    <p>{{ useLpk('Mood') }}: 😪</p>
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
