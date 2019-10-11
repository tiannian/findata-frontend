import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import VueRouter from 'vue-router';

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import Login from './components/Login.vue';
import Register from './components/Register/Register.vue';
import Issue from './components/Register/Issue.vue';
import User from './components/User/User.vue';
import Recv from './components/User/Recv.vue';
import Bank from './components/Bank/Bank.vue';

Vue.config.productionTip = false

Vue.use(BootstrapVue);
Vue.use(VueRouter);

const router = new VueRouter({
    routes: [
        { path: '/', component: Login },
        { path: '/register', component: Register },
        { path: '/register/issue', component: Issue },
        { path: '/user/:id', component: User },
        { path: '/bank', component: Bank },
        { path: '/user/:id/recv/:txid/', component: Recv },
        
    ]
})

new Vue({
    render: h => h(App),
    router
}).$mount('#app')