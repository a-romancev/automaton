import Login from './components/login/Login.vue';
import Evolution from './components/automaton/Evolution';
import FieldList from "./components/automaton/FieldList";
import MutatorList from "./components/automaton/MutatorList";
import Mutator from "./components/automaton/Mutator";

const routes = [
    { path: '/', component: Evolution },
    { path: '/login', component: Login },
    { path: '/field_list', component: FieldList },
    { path: '/field/:id', component: Evolution },
    { path: '/mutator_list', component: MutatorList },
    { path: '/mutator/:id', component: Mutator },
];
export default routes;