<script setup lang="ts">
//@DESC: 类型定义

//@DESC: 初始化

//@DESC: 事件处理
</script>

<template>
  <div class="container">
    <h1>首页</h1>

    <router-view-keep-alive class="views"></router-view-keep-alive>

    <ul class="nav">
      <li>
        <router-link :to="{ name: 'Home' }">{{ useLpk("page.index.title") }}</router-link>
      </li>
      <!-- <li>
        <router-link :to="{ name: 'BlogIndex' }">{{ useLpk("blog.index.title") }}</router-link>
      </li> -->
      <li>
        <router-link :to="{ name: 'My' }">{{ useLpk("page.my.title") }}</router-link>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.container {
  padding: 0 12px;
}
.views {
  height: 250px;
  border: 1px solid #ff6347;
  border-radius: 8px;
  margin: 10px 0;
  padding: 20px 12px;
}
.nav {
  display: flex;
  justify-content: center;
  gap: 10px;
  li {
    padding: 10px 15px;
    background-color: #85b1eba9;
    border-radius: 4px;
    color: #333;
  }
}
</style>
