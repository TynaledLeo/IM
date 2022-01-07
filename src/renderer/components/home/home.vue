<template>
  <div id="bg">
    <div id="topbar">
        <div :class="status">
        </div>
        <div id="total">
        <div class="total_sub">Now {{online}} Users Online</div>
        <div class="total_sub">Total {{all}} Users</div>
        </div>
        <input id="search" placeholder=" PRESS ENTER TO SEARCH FRIENDS" @keydown.enter="searchFriend" v-model="searchKey" :disabled="isdisabled">

    </div>
    <div id="list">

    </div>
    <div id="msg">

    </div>
    <div id="msgdk">
    </div>
    <div id="dialogbg" v-if="ishow"></div>
    <div id="dialog" v-if="ishow">
        <button @click="toggleClose" id="closebtn">CLOSE</button>
    </div>
    <toolpad></toolpad>
    <span id="title">IM:Welcome Back , {{username}} :)  </span>
  </div>
</template>

<script>
import toolpad from '../toolpad/toolpad.vue'
export default {
  components: { toolpad },
    name: 'home',  
    data(){
        return{
            username:'',
            status:'mystatusG',
            searchKey:'',
            ishow:false,
            online:'',
            all:'',
            isdisabled:false
        }
    },
    methods:{
        searchFriend(){
            this.toggleClose();
        },
        toggleClose(){
            this.ishow = !this.ishow;
            this.isdisabled = !this.isdisabled;
        }   
    },
    mounted(){
        this.username = this.$route.query.name;
    }
}
</script>

<style scoped>
*{margin:0px;
  padding:0px;
  font-family: Arial, Helvetica, sans-serif;
  z-index: 1;
 }
#bg{height: 100vh;
    background: #0299d8;
    background: linear-gradient(45deg, #365794 0%, #13bdce 33%, #0094d9 66%, #6fc7b5 100%);
    background-size: 400%;
    background-position: 0% 100%;
    animation: gradient 10s ease-in-out infinite;}
 
@keyframes gradient{50%{background-position:100% 0}}

#exit{
    width: 15%;
    height: 5vh;
    background-color: #ffffff;
    border: gray;
    font-size: 19px;
    position: absolute;
    bottom: 20px;
    right: 20px;
    border-radius: 3px;
}
#topbar{
    border-radius: 5px;
    position: absolute;
    top: 2vh;
    left: 5%;
    background-color: white;
    width: 90vw;
    height: 10vh;
}
#list{
    border-radius: 5px;
    position: absolute;
    top: 14vh;
    left: 5%;
    background-color: white;
    width: 20vw;
    height: 83vh;
}
#msg{
    border-radius: 5px;
    position: absolute;
    top: 14vh;
    left: 27%;
    background-color: white;
    width: 47vw;
    height: 45vh;
}
#msgdk{
    border-radius: 5px;
    position: absolute;
    top: 62vh;
    left: 27%;
    background-color: white;
    width: 47vw;
    height: 28vh;
}
#title{
    position: absolute;
    bottom: 2vh;
    left: 30%;
    color: #ffffff;
    font-size: 20px;
}
.mystatusG{
    border-radius: 5px;
    box-shadow: 0 0 3px rgb(51, 255, 0);
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgb(51, 255, 0);
    width: 1vw;
    height: 10vh;
}
#total{
    position: absolute;
    top: 0;
    left: .5vw;
    background-color: rgb(253, 253, 253);
    height: 10vh;
}
.total_sub{
    margin: 10px;
    margin-top: 20px;
    font-size: 15px;
}
#search{
    position: absolute;
    top: 2vh;
    left: 25vw;
    background-color: rgb(224, 224, 224);
    height: 6vh;
    width: 40vw;
    border: #0094d9;
    box-shadow: 0 0 3px #d1d1d1;
    border-radius: 3px;
    font-size: 22px;
    padding: 5px;
}
#dialogbg{
    position: fixed;
    width: 99%;
    height: 100%;
    left: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.5);
}
#dialog{
    border-radius: 5px;
    position: absolute;
    top: 25vh;
    left: 25%;
    background-color: white;
    width: 50vw;
    height: 50vh;
    z-index: 100;
}
#closebtn{
    position: absolute;
    width: 10%;
    height: 3vh;
    background-color: red;
    border: #ffffff;
    color: white;
    right: 1vw;
    bottom: 1vh;
    border-radius: 5px;

}
</style>    