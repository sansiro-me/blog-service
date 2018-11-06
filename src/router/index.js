import Vue from 'vue'
import Router from 'vue-router'

import home from '@/components/home'
import write from '@/components/write'
import msg from '@/components/msg'
import manage from '@/components/manage'
import edit from '@/components/editArea'
import login from '@/components/login'
import admin from '@/components/admin'

import axios from 'axios'

Vue.use(Router)

// function isLogin() {

//   // return Math.random() > 0.5 ? true : false;
//   axios.get('/topic.php?name=login&op=check')
//     .then(function(data) {
      
//       if(data.data.code == 0) {
//         return true;
//       } else {
//         return false;
//       }
//     }).catch(function() {
//       return false;
//     })
// }

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      redirect: '/login'
    },
    {
      path: '/',
      redirect: '/login'
    },
    {
      meta: {requireAuth: false},
      path: '/login',
      component: login
    },
    {
      path: '/admin',
      component: admin,
      beforeEnter: ((to, from, next) => {
          // next();
        axios.get('/api/login/check')
          .then(function(data) {
            
            if(data.data.code == 0) {
              next();
            } else {
              next({ path: '/login' });
            }
          }).catch(function() {
            next({ path: '/login' });
          })
      }),
      children: [
        {
          path: '/admin/',
          redirect: '/admin/home'
        },
        {
          path: '/admin/home',
          component: home
        },
        {
          path: '/admin/write',
          component: write
        },
        {
          path: '/admin/msg',
          component: msg
        },
        {
          path: '/admin/manage',
          component: manage
        },
        {
          path: '/admin/edit',
          name: 'edit',
          component: edit
        }
      ]
    }
  ]
});
