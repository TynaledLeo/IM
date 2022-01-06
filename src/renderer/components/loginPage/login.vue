<template>
  <div id="bg">
      <el-card shadow="always" id="logcard">
            <div id="title">
                <span style="color:blue">IM</span>agination
            </div>
            <div class="subtitle">Authorize Login</div>
            <div id="inputob">
                <input placeholder="Username"  class="inputp" v-model="username">
                <input placeholder="Password" class="inputp" type="password" v-model="pwd">
            </div>
            
            <button class="button" @click="login()">confirm</button>

      </el-card>
      <button id="exit" @click="quit()">EXIT</button>
  </div>
</template>

<script>
import { remote } from 'electron';
export default {
    name: 'login',  
    data(){
        return{
            username:'',
            pwd:''
        }
    },
    methods:{
        quit(){
            remote.getCurrentWindow().close();
        },
        login(){
    
    
    this.$axios({
    method: 'post',
        url: 'http://42.193.107.6:8642/login',
        data:{
        username:this.username,
        password:this.pwd
    }
    }).then(res=>{
      console.log(res);
      if (res.data==='OK') {   
        this.$router.push('/home')
      }
    })
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
#logcard{
    border-radius: 5px;
    position: fixed;
    top: 15%;
    left: 30%;
    height: 70vh;
    width: 40vw;
    background-color: white;
}
#title{
    padding: 10px;
    font-size: 35px;
}
.subtitle{
    padding: 10px;
    font-size: 20px;
}
#inputob{
    top: 35%;
    position: absolute;
    left: 22%;

}
.inputp{
    padding: 10px;
    margin: 10px;
    margin-top: 30px;
    width: 60%;
    height: 4vh;
    border-radius: 3px;
    border: rgb(77, 77, 77);
    box-shadow: 0 0 3px rgb(85, 85, 85);
    font-size: 18px;
}
.button{
    width: 20%;
    height: 5vh;
    background-color: #0094d9;
    border: gray;
    font-size: 19px;
    position: absolute;
    bottom: 20px;
    right: 20px;
    border-radius: 3px;
    color: #ffffff;
}
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