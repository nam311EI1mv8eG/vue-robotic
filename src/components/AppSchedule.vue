<template>
  <h4>Math Schedule and Results</h4>
    <div class="schedule-result">
        <div v-for="(val,index) in getScheduleAndResult" :key="index" class="match">
            <div class="match-order">Q{{ val.order }}</div>
            <div class="red-team red">
                <span v-for="(v,i) in val.red_team[0]" :key="i">
                    {{ v.team.score }}
                </span>
            </div>
            <div class="blue-team blue">
                <span v-for="(v,i) in val.blue_team[0]" :key="i">
                    {{ v.team.score }}
                </span>
            </div>
            <div class="total">
                <span class="red">{{ val.red_score }}</span>
                <span class="blue">{{ val.blue_score }}</span>
            </div>
        </div>
    </div>

</template>

<script>

import { createNamespacedHelpers } from "vuex";
const { mapState,mapActions} = createNamespacedHelpers("team");

export default {
    data(){
        return {
        }
    },

    
    computed : { 

        getScheduleAndResult(){
            if (this.matches !== undefined) {
                const teamWidthSeason = this.matches.filter((team) => team.season_id == this.currentSeason);

                const schedule = [];
                teamWidthSeason.filter((v) => {
                    var match = {};
                    match.id =  v.id;
                    match.order = v.n_o;
                    match.time = v.time;
                    match.red_team = [];
                    match.blue_team = [];
                    match.red_score = v.red_score;
                    match.blue_score = v.blue_score;
                    match.finish = v.is_finished;

                    if(v.match_match_teams.length > 0){
                        const red = v.match_match_teams.filter((x) => {
                            return x.alliance == 1;
                        });
                        match.red_team.push(red);
                        const blue = v.match_match_teams.filter((x) => {
                            return x.alliance == 2;
                        });
                        console.log(blue);
                        match.blue_team.push(blue);
                        
                    }
                    schedule.push(match);
                });

                schedule.sort((a, b) => a.n_o > b.n_o ? -1 : 1);

                console.log(schedule);

                return schedule;
            }
        },

        ...mapState({
            matches: (state) => state.matches.data,
            currentSeason: (state) => state.currentSeason
        })  
    },
    methods : {        

        ...mapActions({
            getAllMatchAction : "getAllMatchAction"
        }),        
        
    },
    created(){
        //this.interval = setInterval(() =>{            
        //},30000);
        this.getAllMatchAction();
    },
}
</script>

<style>
    .schedule-result{
        
    background: #fff;
    margin-left: 20px;
    }
    .schedule-result .match{
        display: flex;
        align-items: center;
    }
    .schedule-result .match:nth-child(2n){
        background: #ccc;
    }
    .schedule-result .match > div{
        flex:1;
    }
    .schedule-result .match .red-team,
    .schedule-result .match .blue-team,
    .schedule-result .match .total{
        display: flex;
        flex-direction: column;
    }
    .red{
    color: red;
}
.blue{
    color: blue;
}
</style>