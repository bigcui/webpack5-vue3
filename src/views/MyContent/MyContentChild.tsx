import {defineComponent} from 'vue';

export default defineComponent({
    props: {
        bgColor: {
            type: String,
            required: false,
            default: '#FFFFFF'
        }
    },
    setup(props, {slots}) {
        return () => (
            <div style={`background: ${props.bgColor};`}>
                <h1>Child</h1>
                <p>default</p>
                {slots.default?.()}
                <p>tip</p>
                {slots.tip?.()}
            </div>
        );
    }
});