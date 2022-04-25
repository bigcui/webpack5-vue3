import { createApp, App} from 'vue';
import AppRoot from './App.vue';
import { createRouter, createWebHistory, RouterHistory, Router } from 'vue-router';
import routes from './router';
import Elements from './common/elements';
import './public-path';
let router: any;
let instance: any;
let history : any;
// eslint-disable-next-line @typescript-eslint/init-declarations
function render(props: any = {}) {
    const { container } = props;
    history = createWebHistory(window.__POWERED_BY_QIANKUN__ ? '/webpack5-vue3' : '/');
    router = createRouter({
        history,
        routes,
    });
    console.log('props=', props);
    instance = createApp(AppRoot);
    instance.use(router);
    instance.use(Elements);
    instance.mount(container ? container.querySelector('#app') : '#app');

}
// eslint-disable-next-line @typescript-eslint/init-declarations
if (!window.__POWERED_BY_QIANKUN__) {
    render();
}


export async function bootstrap() {
    console.log('%c ', 'color: green;', 'vue3.0 app bootstraped');
}

export async function mount(props: any) {
    render(props);
}

export async function unmount() {
    instance.unmount();
    // eslint-disable-next-line
    instance._container.innerHTML = '';
    instance = null;
    router = null;
    history.destroy();
}
