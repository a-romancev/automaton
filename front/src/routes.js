import Login from './components/login/Login.vue';
import Evolution from './components/evolution/Evolution';
import FieldList from "./components/automaton/FieldList";

const routes = [
    { path: '/', component: Evolution },
    { path: '/login', component: Login },
    { path: '/field_list', component: FieldList },
];
export default routes;