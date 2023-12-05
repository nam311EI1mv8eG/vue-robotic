import { createStore } from "vuex";
import team from "./module/team";
const store = createStore({
    modules: {
        team,
    },
});

export default store;
