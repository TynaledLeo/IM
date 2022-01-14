<template>
  <div id="bg">
    <div id="topbar">
        <div :class="status">
        </div>
        <div id="total">
        <div class="total_sub">当前{{online}}名好友在线</div>
        <div class="total_sub">共{{all}}名好友</div>
        </div>
        <input id="search" placeholder=" PRESS ENTER TO SEARCH FRIENDS" @keydown.enter="searchFriend" v-model="searchKey" :disabled="isdisabled">
        <div id="invite" @click="showInvite()">
            好友邀请
        </div>
    </div>
    <div id="list">
        <div id="listsubtitle">好友列表</div>
        <div id="friendunit" v-for="item in this.friendsList" :key="item.name" @click="switchChannel(item.name)">{{item.name}}</div>
    </div>
    <div id="msg">

    </div>
    <div id="msgdk">
        <div id="dktitle">

        </div>  
        <textarea name="1" id="textdk" cols="30" rows="10" v-model="textd" @keydown.enter="sendMsg()"></textarea>
    </div>
    <div id="dialogbg" v-if="bishow"></div>
    <div class="dialog" v-if="ishow">
        <div id="showbox">
            <div id="showbx_title">
            用户信息：{{queryuser.name}}
            </div>
            <div>
            ACC:{{queryuser.account}}
            </div>
            <div>
            当前状态:{{queryuser.status}}
            </div>
            <div>
            个人介绍:“{{queryuser.desc}}”
            </div>
            <button class="addf" @click="addFriend()">加为好友</button>
        </div>
        <button @click="toggleClose(1)" id="closebtn">CLOSE</button>
    </div>
    <div class="dialog" v-if="inviteList">

        <div class="invitelsi" v-for="item in this.invitels" :key="item.IM_FRIEND_FROM">
            {{item.IM_FRIEND_FROM}}请求加您为好友<button class="accept" @click="addConfirm(item.IM_FRIEND_FROM,2)">接受</button> <button class="refuse"  @click="addConfirm(item.IM_FRIEND_FROM,0)" >拒绝</button> <button class="refuse"  @click="addConfirm(item.IM_FRIEND_FROM,3)" >封锁</button>
        </div>

        <button @click="toggleClose(2)" id="closebtn">CLOSE</button>
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
            invitels:[],
            bishow:false,
            inviteList:false,
            username:'',
            status:'mystatusG',
            searchKey:'',
            ishow:false,
            online:'',
            all:'',
            isdisabled:false,
            queryuser:{
                username: '',
                account: '',
                status:'',
                desc:''
            },
            defaultqu:{
                username: '',
                id: ''
            },
            friendsList:[],
            textd:'',
            targetUser:' ',
        }
    },

    methods:{
        showInvite(){
            this.bishow = !this.bishow;
            this.inviteList = !this.inviteList;
            this.getInvList()
        },
        addConfirm(from,code){
            this.$axios({
                method:'post',
                url: 'http://localhost:8642/addconfirm',
                data:{
                    to:this.username,
                    from:from,
                    code:code
                }}).then(res=>{
                    console.log(res);
                    this.getInvList();
                })
        },
        getInvList(){
            this.$axios({
                method:'get',
                url: 'http://localhost:8642/getinvitelist',
                params:{
                    user:this.username
                }}).then(res=>{
                    console.log(res.data);
                    this.invitels = res.data;
                })
        },
        addFriend(){
            this.$axios({
                method:'post',
                url: 'http://localhost:8642/addfriend',
                data:{
                    from:this.username,
                    to:this.searchKey
                }
            }).then(res=>{
                if (res.data===1) {
                    alert("你已经发送过申请了，请等待回应");
                }
                if (res.data===2) {
                    alert("你们已经是好友了，可以直接发起聊天");
                }
                if (res.data===3) {
                    alert("对方已经将你封锁，你无法向他发送好友请求");
                }
                if (res.data==="OK") {
                    alert("成功发送了好友邀请");
                }
            })
        },
        disconnect(){
            console.log(1);
        },  
        switchChannel(name){
            this.targetUser = name;
        },
        searchFriend(){
            this.$axios({
            method: 'get',
                url: 'http://localhost:8642/queryuser',
                params:{
                    name : this.searchKey
            }
            }).then((result) => {
                console.log(result.data);
                if(result.data === "ERROR"){
                alert("There are currently no users with this name, please re-enter it")
                }else{
                    this.queryuser = result.data;
                this.toggleClose();
                }
            }).catch((err) => {
                console.log(err);
            });
        },
        toggleClose(x){
            if (x===1) {
                this.queryuser = this.defaultqu;
                this.searchKey = ''
            }
            if (x===2) {
            this.inviteList = !this.inviteList
            this.bishow = !this.bishow;
            return 0;
            }
            this.ishow = !this.ishow;
            this.bishow = !this.bishow;
            this.isdisabled = !this.isdisabled;
        },
        getFriendsList(){
            this.$axios({
            method: 'get',
                url: 'http://localhost:8642/getFriendList',
                params:{
                    name : this.username
                }
            }).then(result=>{
                console.log(result.data);
                this.friendsList = result.data;
            })
        } ,
        sendMsg(){
        this.$socket.emit('msg', {
            from:this.username,
            to:this.targetUser,
            msg:this.textd
        });
        this.textd = ''
        } 
    },
    mounted(){
        this.username = this.$route.query.name;
        this.getFriendsList()
    } ,
    sockets: {
        connect: function () {
            console.log('连接至IM服务');
            console.log('开始监听通讯频道');
            this.sockets.subscribe(`msg_${this.username}`,re=>{
                console.log(re);
            })
            this.sockets.subscribe(`notice_${this.username}`,re=>{
                alert(re.msg)
            })
        },
        customEmit: function (data) {
        },
        // 监听断开连接，函数
        disconnect() {
            console.log('IM服务断开')
        },
        reconnect() {
            console.log('重新链接')
        }
    },
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
.dialog{
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
#showbox{
    position: absolute;
    font-size: 25px;
    width: 80%;
    left: 10%;
    background-color: #f8f5f5;
    height: 30vh;
    top: 10%;
}
#listsubtitle{
    border-radius: 3PX;
    color: rgb(0, 162, 255);
    width: 100%;
    background-color: #f8f5f5;
    font-size: 30PX;
}
#friendunit{
    border-radius: 3PX;
    color: rgb(92, 92, 92);
    width: 100%;
    background-color: #ffffff;
    font-size: 25PX;
    border-top: 1px solid rgb(236, 236, 236);
    border-bottom: 1px solid rgb(236, 236, 236);
    height: 4vh;
}
#friendunit:hover {
    color: rgb(255, 255, 255);
    background-color: #35a9f7;
}
#dktitle{
    position: absolute;
    top: 0;
    width: 100%;
    height: 4vh;
    background-color: #24baff;
    border-radius: 3px;
}
#textdk{
    position: absolute;
    width: 100%;
    height: 24vh;
    border-radius: 3px;
    bottom: 0;
    border: none;
    resize:none;
    outline: none;
}
#showbx_title{
    width: 100%;
    height: 4vh;
    background-color: #0299d8;
    color: white;
}
.addf{
    position: absolute;
    width: 20%;
    height: 3vh;
    background-color: rgb(0, 162, 255);
    border: #ffffff;
    color: white;
    right: 1vw;
    bottom: 1vh;
    border-radius: 5px;
}
#invite{
    background-color: rgb(18, 221, 18);
    position: absolute;
    width: 10%;
    height: 4vh;
    top: 3vh;
    right: 5%;
    border-radius: 3px;
    color: white;
    font-size: 25px;
    text-align: center;
}
.invitelsi{
    width: 100%;
    background-color: #ffffff;
    color: #000000;
    margin-top: 10px;

}
.accept{
    background-color: #35a9f7;
    border: none;
    color: white;
}
.refuse{
    background-color: #ff002b;
    color: white;
    border: none;
}
</style>    