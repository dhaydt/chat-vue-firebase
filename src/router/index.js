import Vue from 'vue'
import About from '../views/Register.vue'
import Dashboard from '../views/Dashboard.vue'
import Map from '../views/Maps.vue'
import Chat from '../views/Chat.vue'
import firebase from "firebase";
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Hello from '../components/HelloWorld.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },{
    path: '/hello',
    name: 'Hello',
    component: Hello
  },
  {
    path: '/map',
    name: 'map',
    component: Map
  },
  {
    path: '/chat',
    name: 'Chat',
    component: Chat
  },
  {
    path: '/register',
    name: 'Register',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: About
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      authRequired: true,
    },
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.authRequired)) {
//     if (firebase.auth().currentUser) {
//       next();
//     } else {
//       alert('You must be logged in to see this page');
//       next({
//         path: '/',
//       });
//     }
//   } else {
//     next();
//   }
// });

export default router
