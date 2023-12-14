<template>
    <div id="season">
        <div v-for="(v, i) in allSeason" :key="i" class="radio">
            <input
                type="radio"
                :id="v.name"
                name="season"
                :value="v.id"
                @change="getCurrentSeasonAction(v.id)"
                :checked="v.id == currentSeason"
            />
            <label :for="v.name">{{ v.name }}</label>
        </div>
    </div>
    <h2>Qualification Rankings</h2>
    <table>
        <tr>
            <th>Rank</th>
            <th>Team</th>
            <th>M5</th>
            <th>M4</th>
            <th>M3</th>
            <th>M2</th>
            <th>M1</th>
            <th>AvgScore</th>
        </tr>
        <tr
            v-for="(value, index) in filterTeamWithScore"
            :key="index"
            :class="index < 4 ? 'top' : ''"
        >
            <td>{{ index + 1 }}</td>
            <td>{{ value.name }} ({{ value.n_order }})</td>
            <td v-for="i in 5" :key="i" :class="i">
                <span v-if="typeof value.score[5 - i] !== 'undefined'">{{
                    value.score[5 - i]
                }}</span>
                <span v-else>-</span>
            </td>
            <td>
                <b class="blue">{{ value.avg }}</b>
            </td>
        </tr>
    </table>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions, mapGetters } = createNamespacedHelpers("team");

export default {
    data() {
        return {
            interval: null,
            standing: [],
            currentSS: null,
        };
    },

    computed: {
        filterTeamWithScore() {
            if (this.teamList !== undefined) {
                const teamWidthSeason = this.teamList.filter(
                    (team) => team.season_id == this.currentSeason
                );
                const standing = [];

                teamWidthSeason.filter((v) => {
                    var teamDetail = {};
                    teamDetail.id = v.id;
                    teamDetail.name = v.name;
                    teamDetail.score = [];
                    teamDetail.avg = v.score;
                    teamDetail.n_order = v.n_order;
                    standing.push(teamDetail);
                });

                if (this.matchesInSeason !== undefined) {
                    this.matchesInSeason.filter((team) => {
                        if (team.match_match_teams !== undefined) {
                            for (
                                let i = 0;
                                i < team.match_match_teams.length;
                                i++
                            ) {
                                let index = standing.find((v, idx) => {
                                    if (
                                        v.id ==
                                        team.match_match_teams[i].team_id
                                    ) {
                                        if (team.is_finished == 1) {
                                            if (
                                                team.match_match_teams[i]
                                                    .alliance == 1
                                            ) {
                                                if (
                                                    team.match_match_teams[i]
                                                        .is_availaibe == 0
                                                ) {
                                                    standing[idx].score.push(
                                                        "Vắng mặt"
                                                    );
                                                } else if (
                                                    team.match_match_teams[i]
                                                        .is_banned == 1
                                                ) {
                                                    standing[idx].score.push(
                                                        "Bị loại"
                                                    );
                                                } else {
                                                    standing[idx].score.push(
                                                        team.red_score
                                                    );
                                                }
                                            }
                                            if (
                                                team.match_match_teams[i]
                                                    .alliance == 2
                                            ) {
                                                if (
                                                    team.match_match_teams[i]
                                                        .is_availaibe == 0
                                                ) {
                                                    standing[idx].score.push(
                                                        "Vắng mặt"
                                                    );
                                                } else if (
                                                    team.match_match_teams[i]
                                                        .is_banned == 1
                                                ) {
                                                    standing[idx].score.push(
                                                        "Bị loại"
                                                    );
                                                } else {
                                                    standing[idx].score.push(
                                                        team.blue_score
                                                    );
                                                }
                                            }
                                        }
                                    }
                                });
                            }
                        }
                    });
                }

                standing.sort((a, b) => (a.avg > b.avg ? -1 : 1));
                return standing;
            }
        },
        ...mapState({
            teamList: (state) => state.teamList.data,
            matchTeam: (state) => state.matchTeam.data,
            allSeason: (state) => state.allSeason.data,
            matchesInSeason: (state) => state.matchesInSeason.data,
            currentSeason: (state) => state.currentSeason,
        }),

        // ...mapGetters({
        //     teamBySeason : "getTeamBySeason"
        // })
    },
    methods: {
        ...mapActions({
            getAllTeamAction: "getAllTeamAction",
            getAllMatchTeamAction: "getAllMatchTeamAction",
            getAllSeasonAction: "getAllSeasonAction",
            getAllMatchesInSeasonAction: "getAllMatchesInSeasonAction",
            getCurrentSeasonAction: "getCurrentSeasonAction",
        }),
    },
    created() {
        this.getAllTeamAction();
        this.getAllMatchTeamAction();
        this.getAllSeasonAction();
        this.getAllMatchesInSeasonAction();

        this.interval = setInterval(() => {
            this.getAllTeamAction();
            this.getAllMatchesInSeasonAction();
        }, 15000);
    },
};
</script>

<style>
table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
}

td,
th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 2px 8px;
    font-size: 14px;
    font-weight: bold;
}
tr {
    background: #fff;
}
tr:nth-child(even) {
    background-color: #f5efef;
}
tr.top {
    background: #6b6bcb;
    color: #fff;
}
tr.top b.blue {
    color: #beff00;
}

#season {
    display: flex;
    gap: 30px;
    font-size: 12px;
}
#season .radio {
    display: flex;
    align-items: center;
    color: #000;
}
#season .radio input {
    margin-bottom: 0;
    margin-top: 0;
}
</style>
