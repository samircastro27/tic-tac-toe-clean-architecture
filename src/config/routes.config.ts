import { App } from "vue"
import { createRouter, createWebHistory } from "vue-router";

export const buildMainRouter = () => {
    return createRouter({
        history: createWebHistory(),
        routes: [
            { path: '/', redirect: '/home' },
            { path: '/home', name: 'home', component: () => import('../presentation/layout/Home.vue') },
            { path: '/game', name: 'game', component: () => import('../presentation/layout/Game.vue') },
            { path: '/:path(.*)*', name: 'not found', component: () => import('../presentation/layout/404.vue') }
        ]
    })
}

export const buildRoutes = (app: App) => {
    const mainRouter = buildMainRouter();
    app.use(mainRouter);
}