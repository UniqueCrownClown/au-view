import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";
import "vant/lib/index.css";
import routes from "./router";
import {
  Button,
  Pagination,
  Popup,
  Toast,
  Icon,
  List,
  Cell,
  CellGroup,
  NavBar,
} from "vant";
import { createRouter, createWebHashHistory } from "vue-router";
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
const app = createApp(App);
app.use(Button);
app.use(Pagination);
app.use(Toast);
app.use(Popup);
app.use(Icon);
app.use(router);
app.use(List);
app.use(Cell);
app.use(CellGroup);
app.use(NavBar);
app.mount("#app");
