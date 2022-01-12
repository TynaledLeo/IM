<template>
  <div id="bg">
      <el-card shadow="always" id="logcard">
            <div id="title">
                <span style="color:blue">IM</span>agination
            </div>
            <div class="subtitle">Authorize Login</div>
            <div id="inputob">
                <input placeholder="Username"  class="inputp" v-model="username" @keydown.enter="login()" :disabled="isdisabled">
                <input placeholder="Password" class="inputp" type="password" v-model="pwd" @keydown.enter="login()" :disabled="isdisabled" >
            </div>
            
            <button class="button" @click="login()">confirm</button>

      </el-card>
    <toolpad></toolpad>
    <div id="dialogbg" v-if="ishow"></div>
    <div id="dialog" v-if="ishow">
        Process Link To Server
    </div>
  </div>
</template>

<script>
import toolpad from '../toolpad/toolpad.vue';
export default {
  components: { toolpad },
    name: 'login',  
    data(){
        return{
            username:'',
            pwd:'',
            ismax:'MAX',
            ishow:false,
            isdisabled:false,
        }
    },
    methods:{
        login(){
            this.isdisabled = true;
            this.ishow = true;
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
                this.$router.push({
                   path:'/home',
                   query:{
                   name:this.username
                   }
                })
              }else{
                    this.isdisabled = false;
                    this.ishow = false;
                    alert("Login failed,Please check your username or password");
              }
            })
        }
    },
    mounted(){

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
    font-size: 30px;
    display: flex;
    justify-content: space-around;
    align-items: center;
}
</style>    