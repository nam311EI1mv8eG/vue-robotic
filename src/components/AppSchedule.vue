<template>
  <h2>Math Schedule and Results</h2>
    <div class="schedule-result" >
        <div v-for="(val,index) in getScheduleAndResult" :key="index" class="match" :class="val.finish == 1 ? 'finish' : ''">
            <div class="match-order">Q{{ val.order }}</div>
            <div class="red-team red">
                <span v-for="(v,i) in val.red_team" :key="i">
                    {{ v.team.name }}
                </span>
            </div>
            <div class="blue-team blue">
                <span v-for="(v,i) in val.blue_team" :key="i">
                    {{ v.team.name }}
                </span>
            </div>
            <div class="total">
                <span v-if="val.red_score > 0 || val.blue_score > 0" class="red">
                    <b>
                        {{ val.red_score }}<br>
                        {{ val.blue_score }}
                    </b>
                </span>
                <span v-else class="nam">
                    <b>
                        Sân {{ val.field }}<br>
                        {{ convertTime(val.time) }}
                    </b>
                </span>
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

                    if(v.is_finished == 0){
                        var match = {};
                        match.id =  v.id;
                        match.order = v.n_o;
                        match.time = v.time;
                        match.red_team = [];
                        match.blue_team = [];
                        match.red_score = v.red_score;
                        match.blue_score = v.blue_score;
                        match.finish = v.is_finished;
                        match.field = v.field;

                        if(v.match_match_teams.length > 0){
                            const red = v.match_match_teams.filter((x) => {
                                if(x.alliance == 1){
                                    match.red_team.push(x);
                                }
                            });
                            
                            const blue = v.match_match_teams.filter((x) => {                                
                                if(x.alliance == 2){
                                    match.blue_team.push(x);
                                }
                            });                            
                            
                            
                        }
                        schedule.push(match);

                    }
                });

                console.log(schedule);

                schedule.sort((a, b) => a.order > b.order ? 1 : -1);
                return schedule;
            }
        },

        ...mapState({
            matches: (state) => state.matches.data,
            currentSeason: (state) => state.currentSeason
        })  
    },
    methods : {        
        convertTime(time){
            var result = "";
            var date_arr = time.split(":"); 
            var hours = date_arr[0];
            var minutes = date_arr[1];

            var amORpm = hours > 12 ? "PM" : "AM";
            if(hours > 12) hours -= 12;
            result = hours + ":" + minutes + " " + amORpm;
            return result;
        },
        ...mapActions({
            getAllMatchAction : "getAllMatchAction"
        }),        
        
    },
    created(){
        this.getAllMatchAction();
        this.interval = setInterval(() =>{    
            this.getAllMatchAction();        
        },15000);
        
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
        padding: 5px;
        font-weight: bold;
    }
    .schedule-result .match:nth-child(2n){
        background: #f5efef;
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