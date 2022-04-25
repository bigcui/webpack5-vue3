
<template>
    <el-config-provider :locale="locale">
        <my-header/>
        <my-content/>
        <my-footer/>
    </el-config-provider>
</template>

<script lang="ts">
import zhCn from 'element-plus/lib/locale/lang/zh-cn';
import {defineComponent} from 'vue';
import {ElConfigProvider} from 'element-plus';
import MyHeader from './MyHeader/index.vue';
import MyContent from './MyContent/index.tsx';
import MyFooter from './MyFooter/index.vue';

export default defineComponent({
    name: 'App',
    components: {
        [ElConfigProvider.name]: ElConfigProvider,
        MyHeader,
        MyContent,
        MyFooter
    },
    setup() {
        return {
            locale: zhCn
        };
    }
});

</script>

<style scoped>

</style>