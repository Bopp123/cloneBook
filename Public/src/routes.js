import Start from './components/Start.vue';
import Login from './components/Login.vue';
import Signup from './components/Signup.vue';
import Info from './components/Info.vue';
import Home from './components/Home.vue';
import User from './components/User.vue';
import UserView from './components/UserView.vue';
import Friends from './components/Friends.vue';
import Error from './components/Error.vue';
import {Global} from './global.js';

export const routes = [
    {
        path: '', component: Start, children: [
        {
            path: '', component: Login, name: 'login'
        },
        {
            path: '/signup', component: Signup, name: 'signup'
        }
    ]
    }, {
        path: '/home',
        beforeEnter: (to, from, next) => {
            if (!Global.logedIn) {
                next({name: 'login'});
            }
            next();
        },
        component: Home,
        children: [
            {
                path: 'edit', name: 'edit'
            },
            {
                path: 'friends', name: 'friends', component: Friends
            },
            {
                path: 'history', name: 'history', component: UserView
            }, {
                path: '', component: User, name: 'home'
            },
            {
                path: '/home/user/:id',
                name: 'userView',
                component: UserView,
                canReuse: false
            }
        ]
    }, {
        path: '/info',
        component: Info
    },
    {
        path: '/error',
        component: Error,
        name: '404'
    }
];