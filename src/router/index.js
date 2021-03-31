import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from "@/views/Login";
import firebaseInstance from '../middleware/firebase/firebase-index'

Vue.use(VueRouter)

const routes = [
    {
        path: '/home',
        name: 'Home',
        component: Home
    },
    {
        path: '/',
        name: 'Login',
        component: Login
    },
    {
        path: '/about',
        name: 'About',
        meta: {authNotRequired: true},
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: '/back-office',
        name: 'BackOffice',
        //component: BackOffice,
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "back-office" */ '../views/BackOffice.vue')
    },
    {
        path: '/deal-information/:id',
        name: 'DealInformation',
        component: () => import('../views/DealInformation.vue')
    },
    {
        path: '/wishlist',
        name: 'Wishlist',
        component: () => import('../views/Wishlist.vue')
    },
    {
        path: '/post-new-deal',
        name: 'PostNewDeal',
        component: () => import('../views/PostNewDeal.vue')
    },
    {
        path: '/my-deals',
        name: 'MyDeals',
        component: () => import(/* webpackChunkName: "back-office" */ '../views/MyDeals.vue')
    }
]

const router = new VueRouter({
    routes
})

// router.beforeEach((to, from, next) => {
//     const user = firebaseInstance.firebase.auth().currentUser
//     console.log('AUTH',firebaseInstance.firebase.auth())
//     console.log('USERRRR',user)
//     if (user && to.meta.authNotRequired || !user && !to.meta.authNotRequired) {
//         const path = !user ? '/' : '/home'
//         return next(path)
//     }
//     next()
// })

export default router
