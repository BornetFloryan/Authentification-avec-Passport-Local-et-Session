import Vue from 'vue';
import Router from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import SignInView from '@/views/SignInView.vue';
import SignUpView from '@/views/SignUpView.vue';
import axios from 'axios';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/home', name: 'home', component: HomeView },
    { path: '/signin', name: 'signin', component: SignInView },
    { path: '/signup', name: 'signup', component: SignUpView }
  ]
});

router.beforeEach(async (to, from, next) => {
  if (to.name === 'signin' || to.name === 'signup') {
    next();
  } else {
    try {
      await axios.get('http://localhost:3000/user', { withCredentials: true });
      next();
    } catch {
      next('/signin');
    }
  }
});

export default router;