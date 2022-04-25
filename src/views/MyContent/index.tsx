// TSX Sample
import {computed, defineComponent, ref, watch} from 'vue';
import styles from './styles.module.less';
import {ElMessage} from 'element-plus';
import MyContentChild from './MyContentChild';
import {Asset, getAssetSrc} from '@/common/assets';

export default defineComponent({
    components: {
        MyContentChild
    },
    setup() {
        // 指令
        const loading = ref(true);
        setTimeout(() => {
            loading.value = false;
            console.log('loading', loading.value);
        }, 2000);
        // v-show
        const visible = ref(true);
        function handleImgClick() {
            visible.value = !visible.value;
            // ElMessage
            ElMessage('图片已' + (visible.value ? '显示' : '隐藏'));
        }
        // computed
        const buttonTitle = computed(() => {
            return visible.value ? '隐藏图片' : '显示图片';
        });
        const docTitle = ref(document.title);
        // watch
        watch(docTitle, val => {
            document.title = val;
        });
        // 具名插槽
        const childSlots = {
            tip: () => <p>tip具名插槽</p>
        };
        return () => (
            // CSS Module
            <div
                class={[
                    styles['my-content'],
                    'border-red-3'
                ]}
                v-loading={loading.value}
            >
                <el-button
                    type={'primary'}
                    onClick={handleImgClick}
                >
                    {buttonTitle.value}
                </el-button>
                {/*动态资源*/}
                <img
                    v-show={visible.value}
                    class={styles['my-content__img']}
                    src={getAssetSrc(Asset.baidu)}
                    alt={''}
                />
                {/*v-model*/}
                <el-input
                    v-model={docTitle.value}
                    placeholder={'请输入标题'}
                />
                {/*插槽，props*/}
                <my-content-child
                    bg-color={'#B4DCDC'}
                    v-slots={childSlots}
                >
                    <p>默认插槽</p>
                </my-content-child>
            </div>
        );
    }
});