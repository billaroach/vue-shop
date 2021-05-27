import { createRouter, createWebHistory} from 'vue-router'
import vCatalog from '../components/v-catalog'
import vCart from '../components/v-cart'
import vPayment from '../components/v-payment'
import vCheckout from '../components/v-checkout'
import vSignin from '../components/v-signin'
import vSignup from '../components/v-signup'
import vAbout from '../components/v-about'
import vProfile from '../components/v-profile'
import vAdmin from '../components/v-admin'
import vProduct from '../components/v-product'
import Store from '../vuex/store.js'
import {adminUID} from '@/main'


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'catalog',
            component: vCatalog
        },
        {
            path: '/cart',
            name: 'cart',
            component: vCart,
            props: true
        },
        {
            path: '/payment',
            name: 'payment',
            component: vPayment,
            props: true
        },
        {
            path: '/checkout',
            name: 'checkout',
            component: vCheckout,
            props: true
        },
        {
            path: '/signin',
            name: 'signin',
            component: vSignin,
            props: true
        },
        {
            path: '/signup',
            name: 'signup',
            component: vSignup,
            props: true
        },
        {
            path: '/about',
            name: 'about',
            component: vAbout,
            props: true
        },
        {
            path: '/profile',
            name: 'profile',
            component: vProfile,
            beforeEnter: AuthGuard
        },
        {
            path: '/admin',
            name: 'admin',
            component: vAdmin,
            beforeEnter: AuthGuard && AdminGuard
        },
        {
            path: '/product:id',
            name: 'product',
            component: vProduct,
            props: true
        }

    ],
})

function AuthGuard(from, to, next) {
    if(Store.getters.isUserAuthenticated)
    {
        next()
    }
    else
    {
        next('/signin')
    }
}
function AdminGuard(from, to, next) {

    if(Store.getters.userId === adminUID)
    {
        next()
    }
    else
    {
        next('/')
    }
}

export default router;