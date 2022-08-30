<script setup lang="ts">
//@DESC: 类型定义

//@DESC: 初始化

//@DESC: 事件处理
</script>

<template>
  <div class="container">
    <h1>首页</h1>
    <router-view></router-view>
    <ul>
      <li>
        <router-link :to="{ name: 'Home' }">{{ useLpk("page.index.title") }}</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'My' }">{{ useLpk("page.my.title") }}</router-link>
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
