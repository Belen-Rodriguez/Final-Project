import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AuthView from '../views/AuthView.vue'
import SignInView from '../views/SignInView.vue'
import SignUpView from '../views/SignUpView.vue'
import userStore from '../stores/userStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/auth',
      name: 'auth',
      component: AuthView,
      children: [
        {
          path: 'sign-in',
          name: 'signIn',
          component: SignInView
        },
        {
          path: 'sign-up',
          name: 'signUp',
          component: SignUpView
        }
      ]
    }

  ]
})

router.beforeEach(async (to) => {

  const useUserStore = userStore() 
  if (useUserStore.user === undefined){
    await useUserStore._fetchUser()
  }

  const isLoggedIn = useUserStore.user !== null;
  if (!isLoggedIn && to.name !== 'signIn' && to.name !== 'signUp')
    return { name: 'signIn' }
  console.log(useUserStore)

  if ((to.name === 'signIn' || to.name === 'signUp') && isLoggedIn) {
    return { name: 'home' }
  }
})

export default router
