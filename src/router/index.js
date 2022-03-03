import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import ViewMaster from '../views/ViewMaster.vue'
import Login from '../views/Login.vue'
import Workbench from '../views/Workbench.vue'
import AnnualPlan from '../views/AnnualPlan.vue'
import HRPage from '../views/HRPage.vue'
import Employ from '../views/Employ.vue'
import Leave from '../views/Leave.vue'
import Quit from '../views/Quit.vue'
import CreateApply from '../views/CreateApply.vue'
import Pending from '../views/Pending.vue'
import LeaveProcessShow from '../views/LeaveProcessShow.vue'
import employShow from '../views/employShow.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/employShow',
        name: 'employShow',
        component: employShow
    },
    {
        path: '/Login',
        name: 'Login',
        component: Login
    },
    {
        path: '/Leave',
        name: 'Leave',
        component: Leave
    },
    {
        path: '/AnnualPlan',
        name: 'AnnualPlan',
        component: AnnualPlan
    },
    {
        path: '/HRPage',
        name: 'HRPage',
        component: HRPage
    },
    {
        path: '/Employ',
        name: 'Employ',
        component: Employ
    },
    {
        path: '/Quit',
        name: 'Quit',
        component: Quit
    },
    {
        path: '/LeaveProcessShow',
        name: 'LeaveProcessShow',
        component: LeaveProcessShow
    },
    {
        path: '/ViewMaster',
        name: 'ViewMaster',
        component: ViewMaster,
        children: [
            {
                path: '/CreateApply',
                name: 'CreateApply',
                component: CreateApply
            },
            {
                path: '/Workbench',
                name: 'Workbench',
                component: Workbench
            },
            {
                path: '/Pending',
                name: 'Pending',
                component: Pending
            },
        ]
    },
    {
        path: '/about',
        name: 'About',
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
