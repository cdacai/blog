import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 基础样式
import './assets/css/base.css'
import './assets/css/icon/iconfont.css'
import "./assets/css/typo.css"
import './assets/css/badge.css'
import './assets/css/decorative-elements.css'

// 去除谷歌链接，覆盖 semantic-ui 的字体设置
import './assets/css/semantic-override.css'
import './assets/css/semantic-ui-css/components/site.min.css'

// semantic-ui 按需引入
import 'semantic-ui-css/components/reset.min.css'
import 'semantic-ui-css/components/container.min.css'
import 'semantic-ui-css/components/grid.min.css'
import 'semantic-ui-css/components/menu.min.css'
import 'semantic-ui-css/components/card.min.css'
import 'semantic-ui-css/components/button.min.css'
import 'semantic-ui-css/components/list.min.css'
import 'semantic-ui-css/components/segment.min.css'
import 'semantic-ui-css/components/image.min.css'
import 'semantic-ui-css/components/header.min.css'
import 'semantic-ui-css/components/divider.min.css'
import 'semantic-ui-css/components/icon.min.css'
import 'semantic-ui-css/components/item.min.css'
import 'semantic-ui-css/components/comment.min.css'
import 'semantic-ui-css/components/label.min.css'
import 'semantic-ui-css/components/message.min.css'
import 'semantic-ui-css/components/transition.min.css'
import 'semantic-ui-css/components/dimmer.min.css'
import 'semantic-ui-css/components/dropdown.min.css'
import 'semantic-ui-css/components/form.min.css'
import 'semantic-ui-css/components/input.min.css'


// Element UI 按需引入
import {
  Menu,
  Submenu,
  MenuItem,
  Form,
  FormItem,
  Input,
  Button,
  Switch,
  Table,
  TableColumn,
  Pagination,
  Tag,
  Dialog,
  MessageBox,
  Message,
  Loading,
  Divider,
  Card,
  Timeline,
  TimelineItem,
  Link,
  Tooltip,
  Backtop,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Scrollbar,
  Autocomplete,
  Collapse,
  CollapseItem,
  Popover,
  RadioGroup,
  Radio,
  Row,
  Col,
} from 'element-ui'

// Element UI 样式补充（仅补充未通过 Vue.use 注册的组件样式）
import 'element-ui/lib/theme-chalk/message.css'
import 'element-ui/lib/theme-chalk/message-box.css'
import 'element-ui/lib/theme-chalk/loading.css'

// 图片预览
import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer'

// 工具和指令
import './util/dateTimeFormatUtils.js'
import './util/directive'
import VueLazyload from 'vue-lazyload'

// 注册 Element UI 组件
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Button)
Vue.use(Switch)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Pagination)
Vue.use(Tag)
Vue.use(Dialog)
Vue.use(Divider)
Vue.use(Card)
Vue.use(Timeline)
Vue.use(TimelineItem)
Vue.use(Link)
Vue.use(Tooltip)
Vue.use(Backtop)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Scrollbar)
Vue.use(Autocomplete)
Vue.use(Collapse)
Vue.use(CollapseItem)
Vue.use(Popover)
Vue.use(RadioGroup)
Vue.use(Radio)
Vue.use(Row)
Vue.use(Col)

// 注册全局服务
Vue.prototype.$loading = Loading.service
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$message = Message

// 注册其他插件
Vue.use(Viewer)
Vue.use(VueLazyload, {
  preLoad: 1.2,
  loading: require('./assets/img/loading.gif'),
})

// 全局方法
Vue.prototype.msgSuccess = function (msg) {
  this.$message.success(msg)
}

Vue.prototype.msgError = function (msg) {
  this.$message.error(msg)
}

Vue.prototype.msgInfo = function (msg) {
  this.$message.info(msg)
}

Vue.prototype.scrollToTop = function () {
  const el = document.documentElement
  const rAF = window.requestAnimationFrame || (func => setTimeout(func, 16))
  const frameFunc = () => {
    el.scrollTop = 0
  }
  rAF(frameFunc)
}

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
