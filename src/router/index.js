import Vue from 'vue'
import Router from 'vue-router'
import login from '../views/login'
import addProduct from '../views/addProduct'
import addSpec from '../views/addSpec'
import Authentication from '../views/Authentication'
import editProduct from '../views/editProduct'
import index from '../views/index'
import mailManage from '../views/mailManage'
import mine from '../views/mine'
import modifySpec from '../views/modifySpec'
import panels from '../views/panels'
import profile from '../views/profile'
import shop from '../views/shop'
import specifications from '../views/specifications'
import activity from '../views/activity'
import groupBuy from '../views/groupBuy'
import order from '../views/order'
import orderDetail from '../views/orderDetail'

let getCookie = function (c_name) {
  if (document.cookie.length > 0) {
    var c_start = document.cookie.indexOf(c_name + "=")
    if (c_start != -1) {
      c_start = c_start + c_name.length + 1
      var c_end = document.cookie.indexOf(";", c_start)
      if (c_end == -1) c_end = document.cookie.length
      return unescape(document.cookie.substring(c_start, c_end))
    }
  }
  return ""
};

Vue.use(Router)
/* 
  linkActiveClass: 'active',
  mode:'history', */
 let Routers = new Router({
    linkActiveClass :"active",
    mode:"history",
    routes: [
      {
        path: '/',
        name: 'index',
        component: index
      },
      {
        path: '/order',
        name: 'order',
        component: order
      },
      {
        path: '/groupBuy',
        name: 'groupBuy',
        component: groupBuy
      },
      {
        path: '/orderDetail',
        name: 'orderDetail',
        component: orderDetail
      },
      
      {
        path: '/addSpec',
        name: 'addSpec',
        component: addSpec
      },
      {
        path: '/activity',
        name: 'activity',
        component: activity
      },
      {
        path: '/login',
        name: 'login',
        component: login
      },
      {
        path: '/Authentication',
        name: 'Authentication',
        component: Authentication
      },
      {
        path: '/mine',
        name: 'mine',
        component: mine
      },
      {
        path: '/shop',
        name: 'shop',
        component: shop
      },
      {
        path: '/profile',
        name: 'profile',
        component: profile
      },
      {
        path: '/panels',
        name: 'panels',
        component: panels
      },
      {
        path: '/specifications',
        name: 'specifications',
        component: specifications
      },
      {
        path: '/mailManage',
        name: 'mailManage',
        component: mailManage
      }
    ]
  })
  Routers.beforeEach((to, from, next) => {

    //console.log(to.name)
     const isLogin = getCookie('token');
     console.log(isLogin)
    if (to.name !== "login") {
      if (!isLogin) {
  
        next({
          path: "/login"
        });
  
      } else {
        next();
      }
    } else {
      next();
    }
  });
export default  Routers
