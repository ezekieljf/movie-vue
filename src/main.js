import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'notyf/notyf.min.css';

import './style.css';


import { createApp } from 'vue';
import App from './App.vue';

import { createPinia } from 'pinia';


import { createRouter, createWebHistory } from 'vue-router';

import LoginPage from './pages/LoginPage.vue';
import RegisterPage from './pages/RegisterPage.vue';
import HomePage from './pages/HomePage.vue';
import LogoutPage from './pages/LogoutPage.vue';

import MoviesPage from './pages/MoviesPage.vue';
import MoviePage from './pages/MoviePage.vue';

import AddMoviePage from './pages/AddMoviePage.vue';
import EditMoviePage from './pages/EditMoviePage.vue';


const router = createRouter({
    history: createWebHistory(),
    routes:[
        {
            path: '/',
            name: 'Home',
            component: HomePage
        },
        {
            path: '/register',
            name: 'Register',
            component: RegisterPage
        },
        {
            path: '/login',
            name: 'Login',
            component: LoginPage
        },
        {
            path: '/logout',
            name: 'Logout',
            component: LogoutPage
        },
        {
            path: '/movies',
            name: 'Movies',
            component: MoviesPage
        },
        {
            path: '/movies/:id',
            component: MoviePage
        },
        {
            path: '/addMovie',
            name: 'AddMovie',
            component: AddMoviePage
        },
        {
            path: '/editMovie/:id',
            name: 'EditMovie',
            component: EditMoviePage
        }
    ]
})

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.mount('#app');

// createApp(App).mount('#app')