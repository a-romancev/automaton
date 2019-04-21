import Login from './components/login/Login.vue';
import Evolution from './components/evolution/Evolution';

const routes = [
    { path: '/', component: Evolution },
    { path: '/login', component: Login },
];
export default routes;