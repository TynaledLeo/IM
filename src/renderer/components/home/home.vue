<template>
  <div id="bg">
    <div id="topbar">
        
    </div>
    <div id="list">

    </div>
    <div id="msg">

    </div>
    <div id="msgdk">

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
            pwd:''
        }
    },
    methods:{

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
</style>    