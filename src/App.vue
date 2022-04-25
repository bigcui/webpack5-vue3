<!--
 * @@file: app
 * @@Author: cuihonglei <cuihonglei@baidu.com>
 * @@Date: Do not edit
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-04-12 13:03:02
-->
<template>
  <div class="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
      |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
});
</script>

<style scoped>
.app {
  width: 700px;
  margin: 0 auto;
  text-align: center;
}
</style>
