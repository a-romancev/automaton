import Login from './components/login/Login.vue';
import Evolution from './components/automaton/Evolution';
import FieldList from "./components/automaton/FieldList";

const routes = [
    { path: '/', component: Evolution },
    { path: '/login', component: Login },
    { path: '/field_list', component: FieldList },
    { path: '/field/:id', component: Evolution },
    { path: '/field/:id/rules', component: Evolution },
];
export default routes;