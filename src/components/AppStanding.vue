<template>

    <h3>Season</h3>
    <div id="season">

        <div v-for="(v,i) in allSeason" :key="i" class="radio">
            <input type="radio" id="jack" name="season" :value="v.id" @change="getCurrentSeasonAction(v.id)" :checked="v.id == currentSeason">
            <label for="jack">{{v.name}}</label>
        </div>
    </div>
    <h3>Bảng xếp hạng</h3>
    <table>
  <tr>
    <th>STT</th>
    <th>Team </th>
    <th>Trận 5</th>
    <th>Trận 4</th>
    <th>Trận 3</th>
    <th>Trận 2</th>
    <th>Trận 1</th>
    <th>Điểm TB</th>
  </tr>
  <tr v-for="(value,index) in filterTeamWithScore" :key="index">
    <td>{{ value.id }}</td>
    <td>{{ value.name }}</td>
    <td v-for="(n,i) in 5" :key="i" :class="i">
        <span v-if="typeof value.score[i] !== 'undefined'">{{ value.score[i] }}</span>
        <span v-else>0</span>
    </td>    
    <td>{{calculateScore(value.score)}}</td>
  </tr>
  
</table>


</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState,mapActions ,mapGetters} = createNamespacedHelpers("team");


export default {
    data(){
        return {
            interval : null,
            standing : [],
            currentSS : null
        }
    },

    
    computed : {

        filterTeamWithScore(){

            if (this.teamList !== undefined) {

                const teamWidthSeason = this.teamList.filter((team) => team.season_id == this.currentSeason);

                // console.log(teamWidthSeason);

                const standing = [];
                const standingInit = teamWidthSeason.filter((v) => {
                    var teamDetail = {};
                    teamDetail.id =  v.id;
                    teamDetail.name = v.name;
                    teamDetail.score = [];
                    standing.push(teamDetail);
                });  

                this.matchesInSeason.filter((team) => {
                    if(team.match_match_teams !== undefined){  
                        for (let i = 0; i < team.match_match_teams.length; i++) {
                            let index = standing.find((v, idx) => {
                                if(v.id == team.match_match_teams[i].team_id){
                                    if(team.match_match_teams[i].alliance == 1){
                                        standing[idx].score.push(team.red_score);
                                    }
                                    if(team.match_match_teams[i].alliance == 2){
                                        standing[idx].score.push(team.blue_score);
                                    }
                                }
                            });
                            
                        }

                    }
                }); 

                console.log(standing);

                return standing;
                
                // console.log(standing);
            }
            //return this.teamList;
           
        },
        ...mapState({
            teamList: (state) => state.teamList.data,
            matchTeam: (state) => state.matchTeam.data,
            allSeason: (state) => state.allSeason.data,
            matchesInSeason: (state) => state.matchesInSeason.data,
            currentSeason: (state) => state.currentSeason
        }),

        // ...mapGetters({
        //     teamBySeason : "getTeamBySeason"
        // })
        
        
    },
    methods : {

        calculateScore(arr){
            var sum = arr.reduce((accumulator, currentValue) => {
                return accumulator + currentValue
            },0);
            return sum;
        },

        ...mapActions({
            getAllTeamAction : "getAllTeamAction",
            getAllMatchTeamAction : "getAllMatchTeamAction",
            getAllSeasonAction : "getAllSeasonAction",
            getAllMatchesInSeasonAction : "getAllMatchesInSeasonAction",
            getCurrentSeasonAction : "getCurrentSeasonAction"
        }),        
        
    },
    created(){
        //this.interval = setInterval(() =>{            
        //},30000);
        this.getAllTeamAction();
        this.getAllMatchTeamAction();
        this.getAllSeasonAction();
        this.getAllMatchesInSeasonAction();
    },
    
}
</script>

<style>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}

#season{
    display: flex;
    gap: 30px;
}
</style>