<template>
  <div id="bg">
      <el-card shadow="always" id="logcard">
            <div id="title">
                <span style="color:blue">IM</span>agination
            </div>
            <div class="subtitle">Register</div>
            <div id="inputob">
                <input placeholder="Username" maxlength="20"  class="inputp" v-model="userform.username" :disabled="isdisabled">
                <input placeholder="Account" maxlength="20"  class="inputp" v-model="userform.account"  :disabled="isdisabled">
                <input placeholder="Password" maxlength="20"  class="inputp" type="password" v-model="userform.password"  :disabled="isdisabled" >
                <input placeholder="PhoneNumber" maxlength="11"  class="inputp" v-model="userform.phone"  :disabled="isdisabled">
                <input placeholder="DESC" maxlength="50"  class="inputp" v-model="userform.desc"  :disabled="isdisabled">
                <input placeholder="Birth" type="date"  class="inputp" v-model="userform.birthday" :disabled="isdisabled">
            </div>
            
            <button class="button" @click="regcf()">CONFIRM</button>

      </el-card>
    <button class="reg" @click="reg()">LOGIN</button>
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
    name: 'reg',  
    data(){
        return{
            userform:{
                username:'',
                account:'',
                password:'',
                phone:'',
                desc:'',
                birthday:''
            },
            username:'',
            pwd:'',
            ismax:'MAX',
            ishow:false,
            isdisabled:false,
        }
    },
    methods:{
        regcf(){
            console.log(this.userform);
            if(!this.userform.username||!this.userform.password||!this.userform.account||!this.userform.phone||!this.userform.birthday){
                alert("存在没有填写的项目");
            }else{
                if (this.userform.birthday.length!==10) {
                    alert("?")
                }else{
                    if (this.userform.account<5||this.userform.password<5) {
                        alert("账号密码太短了");
                    }else{
                        this.isdisabled = true;
                        this.ishow = true;
                        //用户存在校验
                        this.$axios({
                            method:'post',
                            url: 'http://localhost:8642/reg',
                            data:this.userform
                        }).then(res=>{
                            if (res.data===101) {
                                    this.isdisabled = false;
                                    this.ishow = false;
                                alert("重复的用户名/账号")
                            }else{
                                if (res.data===201) {
                                    this.$router.push({
                                        path:'/login',
                                        query:{
                                            username:this.userform.username,
                                            password:this.userform.password
                                        }
                                    })
                                }else{
                                    this.isdisabled = false;
                                    this.ishow = false;
                                    alert("unknow err");
                                }
                            }
                        })
                    }
                    
                }
            }
        },
        reg(){
            this.$router.push({
                path:'/login'
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
    position: relative;
    top: -40px;
    padding: 10px;
    margin: 10px;
    margin-top: 5px;
    width: 60%;
    height: 2vh;
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
    font-size: 16px;
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
.reg{
    width: 20%;
    height: 5vh;
    background-color: #0094d9;
    border: gray;
    font-size: 19px;
    position: absolute;
    bottom: 20px;
    left: 20px;
    border-radius: 3px;
    color: #ffffff;
}
</style>    