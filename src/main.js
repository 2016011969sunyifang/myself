import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueLazyLoad from 'vue-lazyload'
import VueCookie from 'vue-cookie'
import { Message } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'

axios.defaults.baseURL = '/api';

// import VueAwesomeSwiper from 'vue-awesome-swiper'

// // require styles
// import 'swiper/dist/css/swiper.css'

// Vue.use(VueAwesomeSwiper, /* { default global options } */)


axios.defaults.timeout = 8000;

axios.interceptors.response.use(function (response) {
  let res = response.data;
  if (res.status == 0) {
    return res.data;
    //判断是否是首登录
  } else if (res.status == 10) {
    // 这里this没有指向vue不能用this跳转时候用全路径
    window.location.href = '/#/login';
    return Promise.reject(res);
  } else {
    Message.warning(res.msg);
    return Promise.reject(res);
  }
},
  //服务器不通时抑制错误（状态码为500）
  (error) => {
    let res = error.response;
    Message.error(res.data.message);
    return Promise.reject(error);
  });

Vue.use(VueLazyLoad, {
  loading: '/imgs/loading-svg/loading-bars.svg'
  //svg不会失真
})

Vue.use(VueAxios, axios);
Vue.use(VueCookie);

Vue.prototype.$message = Message;
Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
