import {
    getAllTeamApi,
    getAllMatchTeamApi,
    getAllSeasonApi,
    getAllMatchesInSeasonApi,
    getAllMatchApi,
} from "../../apis/teams";

const state = () => {
    return {
        teamList: [],
        matchTeam: [],
        allSeason: [],
        matchesInSeason: [],
        currentSeason: 1,
        matches: [],
    };
};
const getters = {
    // getTeamBySeason(state) {
    //     if (state.teamList.data) {
    //         return state.teamList.data.filter(
    //             (team) => team.season_id == state.currentSeason
    //         );
    //     }
    // },
};
const mutations = {
    setTeamListMutation(state, payload) {
        state.teamList = payload;
    },
    setMatchTeamMutation(state, payload) {
        state.matchTeam = payload;
    },
    setAllSeasonMutation(state, payload) {
        state.allSeason = payload;
    },
    setAllMatchesInSeasonMutation(state, payload) {
        state.matchesInSeason = payload;
    },

    setCurrentSeasonMutation(state, payload) {
        state.currentSeason = payload;
    },

    setAllMatchAction(state, payload) {
        state.matches = payload;
    },
};
const actions = {
    async getAllTeamAction(context) {
        const payload = await getAllTeamApi();
        context.commit("setTeamListMutation", payload);
    },
    async getAllMatchTeamAction(context) {
        const payload = await getAllMatchTeamApi();
        context.commit("setMatchTeamMutation", payload);
    },
    async getAllSeasonAction(context) {
        const payload = await getAllSeasonApi();
        context.commit("setAllSeasonMutation", payload);
    },
    async getAllMatchesInSeasonAction({ commit, state }) {
        const payload = await getAllMatchesInSeasonApi(state.currentSeason);
        commit("setAllMatchesInSeasonMutation", payload);
    },

    async getAllMatchAction({ commit, state }) {
        const payload = await getAllMatchApi();
        commit("setAllMatchAction", payload);
    },

    async getCurrentSeasonAction(context, payload) {
        context.commit("setCurrentSeasonMutation", payload);
        context.dispatch("getAllMatchesInSeasonAction");
    },
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};
