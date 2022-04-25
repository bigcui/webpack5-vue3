<!-- SFC TS Sample -->
<script lang="tsx">

import {defineComponent} from 'vue';
import {Asset, getAssetSrc} from '@/common/assets';

export default defineComponent({
    setup() {
        return () => (
            <img
                src={getAssetSrc(Asset.success)}
                alt={''}
                style="width: 40px"
            />
        );
    }
});

</script>

<style lang="less" scoped>

.my-footer {
    color: orange;
}

</style>