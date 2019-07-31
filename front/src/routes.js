import Login from './components/login/Login.vue';
import Evolution from './components/automaton/Evolution';
import FieldList from "./components/automaton/FieldList";
import MutatorList from "./components/automaton/MutatorList";
import Mutator from "./components/automaton/Mutator";
import Field from "./components/automaton/Field";
import FieldRating from "./components/automaton/FieldRating";

const routes = [
    { path: '/', component: Evolution },
    { path: '/login', component: Login },
    { path: '/field_list', component: FieldList },
    { path: '/mutator_list', component: MutatorList },
    { path: '/field/rating/', component: FieldRating},
    { path: '/field/:id', component: Field },
    { path: '/mutator/:id', component: Mutator },
];
export default routes;