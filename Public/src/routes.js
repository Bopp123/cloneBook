import Start from './components/Start.vue';
import Login from './components/Login.vue';
import Signup from './components/Signup.vue';
import Info from './components/Info.vue';
import Home from './components/Home.vue';
import User from './components/User.vue';

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
        path: '/home',
        component: Home, children: [
            {
                path: 'edit', name: 'edit'
            },
            {
                path: 'friends',  name: 'friends'
            },
            {
                path: 'history',  name: 'history'
            },{
            path: '' , component: User, name:'home'
            }
        ]
    },{
        path:'/info',
        component: Info
    }
];