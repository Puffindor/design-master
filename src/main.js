import BaseDropMenu from "./components/UI/BaseDropMenu";
import BaseStatusSwitch from "./components/UI/BaseStatusSwitch";
import BasePopup from "./components/UI/BasePopup";
import BaseWarning from "./components/UI/BaseWarning";
import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";

const app = createApp(App);
app.use(store);
app.component("base-warning", BaseWarning);
app.component("base-drop-menu", BaseDropMenu);
app.component("base-status-switch", BaseStatusSwitch);
app.component("base-popup", BasePopup);
app.mount("#app");
