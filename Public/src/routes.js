import Start from './components/Start.vue';
import Login from './components/Login.vue';
import Signup from './components/Signup.vue';

export const routes = [
    {
        path: '/welcome', component: Start, children: [
        {
            path: 'login', component: Login, name: 'login'
        },
        {
            path: 'signup', component: Signup, name: 'signup'
        }
    ]
    }, {
        path: 'home/:id',
        component: Start
    }
];