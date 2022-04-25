/**
 * 按需引入ElementPlus
 */
import {App} from 'vue';
import {
    ElButton,
    ElInput,
    ElMessage,
    ElLoading
} from 'element-plus';
import 'element-plus/es/components/message/style/css';
import 'element-plus/es/components/loading/style/css';

const elements: any[] = [
    ElButton,
    ElInput,
    ElMessage
];

export default {
    install: (app: App) => {
        elements.forEach(el => {
            app.component(el.name, el);
        });
        app.use(ElLoading);
    }
}