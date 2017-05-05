// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import resource from 'vue-resource'
import store from './vuex/store'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import './api/index'
import VueCordova from 'vue-cordova'

Vue.use(MintUI)
Vue.use(ElementUI)
Vue.use(resource)

Vue.config.productionTip = false

Vue.http.options.emulateJSON = true;
Vue.http.options.crossOrigin = true;
Vue.http.options.emulateHTTP = true;

/******************拦截器设置请参考这部分(开始)******************/
Vue.http.interceptors.push((request, next)  =>{
  //登录成功后将后台返回的TOKEN在本地存下来,每次请求从localStorage中拿到存储的TOKEN值
  const authToken = localStorage.getItem('access_token')
  if(authToken){
    //如果请求时TOKEN存在,就为每次请求的headers中设置好TOKEN,后台根据headers中的TOKEN判断是否放行
    request.headers.set('token',authToken);
  }
  next((response) => {
  if(response.status === 200) {
      console.log('登录成功！')
  }else{
      console.log('登录超时！ '+ response.status+ response.statusText)
    next({
      path: '/login',
            query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
        })
  }
    return response;
  });
});
/******************拦截器设置请参考这部分(结束)******************/

 // 全局导航钩子
router.beforeEach((to, from, next) => { 
  console.log('全局路由控制');
  const authToken = localStorage.getItem('access_token');
  if (to.meta.requireAuth) {
    // console.log(isEmptyObject(store.state.user)) 
    if(authToken) {   
      next();
    }
    else { 
      next({
        path: '/login',
                query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
            })
    }
  }
  else {
    next();
  }
})
/******************拦截器设置请参考这部分(结束)******************/

/******************vue-cordova插件设置请参考这部分(开始)******************/
Vue.use(VueCordova, {
  optionTestKey: 'optionTestValue'
})       
// add cordova.js only if serving the app through file://
if (window.location.protocol === 'file:' || window.location.port === '3000') {
  var cordovaScript = document.createElement('script')
  cordovaScript.setAttribute('type', 'text/javascript')
  cordovaScript.setAttribute('src', 'cordova.js')
  document.body.appendChild(cordovaScript)
}
/******************vue-cordova插件设置请参考这部分(结束)******************/
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
