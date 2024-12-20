import 'nprogress/nprogress.css'
import './router.transition.less'
import nprogress from 'nprogress'
import pathToClassname from '@/utils/path-to-classname'
import { createRouter, createWebHistory } from 'vue-router/auto'
import transition from './router.transition'

const doc = document
const body = doc.body
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
})

console.log(router.getRoutes())

router.beforeEach((to, from, next) => {
  nprogress.start()
  // const user = useUserStore()
  // if (to.meta.authentication && !user.authed) {
  //   user.login()
  //   return
  // }
  next()
})

router.afterEach((to, from) => {
  nprogress.done()
  window.scrollTo(0, 0)
  doc.title = to.meta.title || doc.title
  body.classList.remove(...pathToClassname(from.path, 'body-'))
  body.classList.add(...pathToClassname(to.path, 'body-'))

  to.meta.transition = transition(to, from)
})

export default router
