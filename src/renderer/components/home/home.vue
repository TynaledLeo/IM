<template>
  <div id="bg">


      <button id="exit" @click="quit()">EXIT</button>
  </div>
</template>

<script>
import { remote } from 'electron';
export default {
    name: 'home',  
    data(){
        return{
            username:'',
            pwd:''
        }
    },
    methods:{
        quit(){
            remote.getCurrentWindow().close();
        }
    }
}
</script>

<style scoped>
*{margin:0px;
  padding:0px;
  font-family: Arial, Helvetica, sans-serif;
 }
#bg{height: 100vh;
    background: #0299d8;
    background: linear-gradient(45deg, #5a3694 0%, #13bdce 33%, #0094d9 66%, #6fc7b5 100%);
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
</style>    