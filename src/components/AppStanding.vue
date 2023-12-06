<template>

    
    <div id="season">
        <div v-for="(v,i) in allSeason" :key="i" class="radio">
            <input type="radio" :id="v.name" name="season" :value="v.id" @change="getCurrentSeasonAction(v.id)" :checked="v.id == currentSeason">
            <label :for="v.name">{{v.name}}</label>
        </div>
    </div>
    <h3>Qualification Rankings</h3>
    <table>
  <tr>
    <th>Rank</th>
    <th>Team </th>
    <th>M5</th>
    <th>M4</th>
    <th>M3</th>
    <th>M2</th>
    <th>M1</th>
    <th>AvgScore</th>
  </tr>
  <tr v-for="(value,index) in filterTeamWithScore" :key="index">
    <td>{{ index + 1 }}</td>
    <td>{{ value.name }}</td>
    <td v-for="i in 5" :key="i" :class="i">
        <span v-if="typeof value.score[5-i] !== 'undefined'">{{ value.score[5-i] }}</span>
        <span v-else>0</span>
        
    </td>    
    <td>{{value.avg}}</td>
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

                                        if(team.match_match_teams[i].is_availaibe == 0 || team.match_match_teams[i].is_banned == 1){
                                            standing[idx].score.push(0);
                                        }else{
                                            standing[idx].score.push(team.red_score);
                                        }                                       
                                        
                                    }
                                    if(team.match_match_teams[i].alliance == 2){
                                        if(team.match_match_teams[i].is_availaibe == 0 || team.match_match_teams[i].is_banned == 1){
                                            standing[idx].score.push(0);
                                        }else{
                                            standing[idx].score.push(team.blue_score);
                                        }  
                                    }
                                }
                            });
                            
                        }

                    }
                }); 

                for (let i = 0; i < standing.length; i++) {
                    var sum = standing[i].score.reduce((accumulator, currentValue) => {
                        return accumulator + currentValue
                    },0);
                    standing[i].avg = sum / 5;
                }

                standing.sort((a, b) => a.avg > b.avg ? -1 : 1);
                // standing.sort((a, b) => a.avg.localeCompare(b.avg));

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
  background: #fff;
}

tr:nth-child(even) {
  background-color: #ccc;
}

#season{
    display: flex;
    gap: 30px;
}

</style>