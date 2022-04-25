<!-- SFC TS Sample -->
<template>
    <div class="my-header">
        {{ `时间戳：${timestamp}` }}
        <el-button type="primary" @click="handleButtonClick">更新</el-button>
    </div>
</template>

<script lang="ts" setup>

import {ref} from 'vue';

const timestamp = ref(Date.now());

function handleButtonClick() {
    timestamp.value = Date.now();
}

</script>

<style lang="less" scoped>

.my-header {
    font-size: 24px;
    color: blue;
}

</style>