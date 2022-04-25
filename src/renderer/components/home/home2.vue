<template>
  <el-container id="bg" style="font-family: FTNT">

    <audio src="../../assets/sounds/15234.wav" ref="ring"></audio>
    <el-header class="header">
      <el-card>
        <el-row>
          <el-col :span="4">
            <el-button type="success" @click="selfInfo()">
              欢迎回来：@{{ userInfo.IM_USER_NAME }}
            </el-button>
          </el-col>
          <el-col :span="12" :offset="2">
            <el-input
              @keydown.enter.native="searchFriend"
              v-model="searchKey"
              placeholder="输入要查找的用户 按回车搜索"
              suffix-icon="el-icon-search"
            ></el-input>
          </el-col>
          <el-col :span="2" :offset="3">
            <el-badge :is-dot="true" :hidden="isInvite">
              <el-button @click="inviteWindow">
                朋友邀请 <i class="el-icon-user"></i>
              </el-button>
            </el-badge>
          </el-col>
        </el-row>
      </el-card>
    </el-header>
    <el-container>
      <el-aside class="aside">
        <el-card>
          <el-tabs tab-position="left" style="height: 75vh">
            <el-tab-pane label="好友">
              <el-scrollbar style="height: 40vh">
                <div style="height: auto">
                  <div
                    class="hvr-sweep-to-right friendunit"
                    v-for="item in this.friendsList"
                    :key="item.name"
                    @click="switchChannel(item.name)"
                  >
                    {{ item.name }}
                    <i
                      class="el-icon-more"
                      style="color: rgb(215, 216, 217)"
                      @click="moreatuser(item.name)"
                    ></i>
                  </div>
                </div>
              </el-scrollbar>
            </el-tab-pane>
            <el-tab-pane label="群聊">
              <el-button
                size="mini"
                type="primary"
                style="text-align: center; margin-top: 20px"
                @click="createUnionWindow"
                ><i class="el-icon-plus"></i>新群聊</el-button
              >
              <el-scrollbar style="height: 40vh">
                <div
                  @click="changeUnion(index)"
                  class="hvr-sweep-to-right friendunit"
                  v-for="(index, idx) in this.unionList"
                  :key="idx"
                >
                  <div v-if="index">{{ index[0].IM_UNION_NAME }}</div>
                </div>
              </el-scrollbar>
            </el-tab-pane>
          </el-tabs>
        </el-card>


      </el-aside>
      <el-main class="main">
        <el-card class="dialogWindow">
          <el-scrollbar ref="myScrollbar" style="height: 40vh">
            <el-card
              style="
                position: fixed;
                width: 65vw;
                z-index: 99;
                background-color: #409eff;
              "
            >
              <el-breadcrumb separator="@">
                <el-breadcrumb-item>聊天</el-breadcrumb-item>
                <el-breadcrumb-item>{{ this.targetUser }}</el-breadcrumb-item>
              </el-breadcrumb>
            </el-card>

            <el-timeline style="padding-top: 10vh" v-if="this.currentType==1">
              <el-timeline-item
                :timestamp="item.IM_MSG_TS"
                placement="top"
                v-for="item in this.msgl"
                :key="item.id"
                type="success"
                icon="el-icon-check"
              >
                <el-card class="hvr-underline-from-left">
                  <h4>{{ item.IM_MSG_FROM }}:</h4>
                  <p>{{ item.IM_MSG }}</p>
                </el-card>
              </el-timeline-item>
            </el-timeline>
            <el-timeline style="padding-top: 10vh" v-if="this.currentType==2">
              <el-timeline-item
                :timestamp="item.IM_UMS_TS"
                placement="top"
                v-for="item in this.msgl"
                :key="item.id"
                type="success"
                icon="el-icon-check"
              >
                <el-card class="hvr-underline-from-left">
                  <h4>{{ item.IM_USER_NAME}}:</h4>
                  <p>{{ item.IM_UMSG }}</p>
                </el-card>
              </el-timeline-item>
            </el-timeline>
          </el-scrollbar>
        </el-card>
        <el-card class="dock">
          <textarea
            name="1"
            class="textdk"
            cols="30"
            rows="10"
            v-model="textd"
            :disabled="blockInput"
            @keydown.enter="sendMsg()"
          ></textarea>
        </el-card>
        <el-card
          class="hvr-underline-from-left"
          style="width: 40vw; margin-top: 2vh"
        >
          <i class="el-icon-message-solid" @click="soundSet" v-if="!isMute"></i>
          <i class="el-icon-bell" @click="soundSet" v-if="isMute"></i>
          <i class="el-icon-key" @click="logout"></i>
        </el-card>
      </el-main>
      <toolpad></toolpad>
    </el-container>

    <el-dialog title="新朋友" :visible.sync="friendInvite">
      <el-row v-for="item in this.invList" :key="item.IM_FRIEND_FROM">
        <el-col span="10"> {{ item.IM_FRIEND_FROM }}请求加您为好友 </el-col>
        <el-col span="3" :offset="5">
          <el-button
            size="mini"
            @click="addConfirm(item.IM_FRIEND_FROM, 2)"
            type="primary"
            >接受</el-button
          >
        </el-col>
        <el-col span="3">
          <el-button
            size="mini"
            @click="addConfirm(item.IM_FRIEND_FROM, 0)"
            type="danger"
            >拒绝</el-button
          >
        </el-col>
        <el-col span="3">
          <el-button
            size="mini"
            @click="addConfirm(item.IM_FRIEND_FROM, 3)"
            type="info"
            >封锁</el-button
          >
        </el-col>
      </el-row>
      <el-empty description="暂时没有新的邀请" v-if="isInvite"></el-empty>
    </el-dialog>

    <el-dialog
      title="查询结果"
      :visible.sync="searchUser"
      :before-close="handleClose"
    >
      <el-descriptions title="用户信息" v-if="queryuser.name">
        <el-descriptions-item label="用户名">{{
          queryuser.name
        }}</el-descriptions-item>
        <el-descriptions-item label="序列号">{{
          queryuser.account
        }}</el-descriptions-item>
        <el-descriptions-item label="个人签名">{{
          queryuser.desc
        }}</el-descriptions-item>
        <el-descriptions-item label="当前状态">
          <el-tag size="mini" v-if="queryuser.status == 3">在线</el-tag>
          <el-tag size="mini" v-if="queryuser.status == 1">封禁</el-tag>
          <el-tag size="mini" v-if="queryuser.status == 2">离线</el-tag>
        </el-descriptions-item>
      </el-descriptions>
      <el-button v-if="queryuser.name" @click="addFriend"
        >发出好友邀请</el-button
      >
      <el-empty description="搜索结果为空" v-if="searchNull"></el-empty>
    </el-dialog>
    <el-dialog title="群聊配置" :visible.sync="createUnionV">
      <el-form :model="createUnionProps">
        <el-form-item label="发起人">
          <el-input v-model="createUnionProps.creator" disabled></el-input>
        </el-form-item>
        <el-form-item label="群名称">
          <el-input v-model="createUnionProps.unionName"></el-input>
        </el-form-item>
        <el-form-item label="群描述">
          <el-input v-model="createUnionProps.desc"></el-input>
        </el-form-item>
        <el-form-item label="加入方式">
          <el-radio-group v-model="createUnionProps.status">
            <el-radio-button label="禁用"></el-radio-button>
            <el-radio-button label="邀请加入"></el-radio-button>
            <el-radio-button label="自由加入"></el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-button type="primary" @click="createUnion"> 创建 </el-button>
        <el-button type="danger" @click="closeUnionV"> 取消 </el-button>
      </el-form>
    </el-dialog>
    <el-dialog title="我的" :visible.sync="selfWindow">
      <el-descriptions title="用户信息">
        <el-descriptions-item label="ID">{{
          userInfo.IM_USER_ID
        }}</el-descriptions-item>
        <el-descriptions-item label="用户名">{{
          userInfo.IM_USER_NAME
        }}</el-descriptions-item>
        <el-descriptions-item label="序列号">{{
          userInfo.IM_USER_ACC
        }}</el-descriptions-item>
        <el-descriptions-item label="个人签名">{{
          userInfo.IM_USER_DESC
        }}</el-descriptions-item>
        <el-descriptions-item label="生日">{{
          userInfo.IM_USER_BIRTH_DATE
        }}</el-descriptions-item>
        <el-descriptions-item label="手机号">{{
          userInfo.IM_USER_PHONE
        }}</el-descriptions-item>
        <el-descriptions-item label="激活日期">{{
          userInfo.IM_USER_REG_DATE
        }}</el-descriptions-item>
      </el-descriptions>
      <el-button type="danger"> 修改密码 </el-button>
    </el-dialog>
    <el-dialog title="详情" :visible.sync="moretouser">
      <el-descriptions title="用户信息">
        <el-descriptions-item label="ID">{{
          userInfo.IM_USER_ID
        }}</el-descriptions-item>
        <el-descriptions-item label="用户名">{{
          userInfo.IM_USER_NAME
        }}</el-descriptions-item>
        <el-descriptions-item label="序列号">{{
          userInfo.IM_USER_ACC
        }}</el-descriptions-item>
        <el-descriptions-item label="个人签名">{{
          userInfo.IM_USER_DESC
        }}</el-descriptions-item>
        <el-descriptions-item label="生日">{{
          userInfo.IM_USER_BIRTH_DATE
        }}</el-descriptions-item>
        <el-descriptions-item label="手机号">{{
          userInfo.IM_USER_PHONE
        }}</el-descriptions-item>
        <el-descriptions-item label="激活日期">{{
          userInfo.IM_USER_REG_DATE
        }}</el-descriptions-item>
      </el-descriptions>
      <el-button type="danger"> 修改密码 </el-button>
    </el-dialog>
  </el-container>
</template>

<script>
import toolpad from "../toolpad/toolpad.vue";

export default {
  components: { toolpad },
  name: "home2",
  data() {
    return {
      selfWindow: false,
      userInfo: {},
      username: "",
      friendsList: [],
      msgList: [],
      targetUser: "选择好友发起聊天",
      friendInvite: false,
      invList: [],
      isInvite: true,
      searchKey: "",
      queryuser: {},
      searchUser: false,
      searchNull: false,
      msgl: [],
      textd: "",
      blockInput: false,
      isMute: false,
      createUnionV: false,
      createUnionProps: {
        creator: "",
        unionName: "",
        desc: "",
        status: "自由加入",
      },
      unionList: [],
      moretouser: false,
      currentUnion:{
        id:'',
        uid:'',
        msg:'',
        username:'',
        unionName:''
      },
      currentType:""
    };
  },
  updated: function () {
    this.$nextTick(() => {
      this.$refs["myScrollbar"].wrap.scrollTop =
        this.$refs["myScrollbar"].wrap.scrollHeight;
    });
  },
  methods: {
    selfInfo() {
      this.selfWindow = !this.selfWindow;
    },
    createUnion() {
      if (this.createUnionProps.status == "自由加入") {
        this.createUnionProps.status = 2;
      }
      if (this.createUnionProps.status == "禁用") {
        this.createUnionProps.status = 1;
      }
      if (this.createUnionProps.status == "邀请加入") {
        this.createUnionProps.status = 3;
      }
      this.$axios({
        method: "post",
        url: "http://localhost:8642/createUnion",
        data: this.createUnionProps,
      }).then((res) => {
        if (res.data == "OK") {
          this.closeUnionV();
          this.getUnionList();
        }
      });
    },
    closeUnionV() {
      this.createUnionV = false;
    },
    changeUnion(item){
      this.currentType = 2;
      this.targetUser = item[0].IM_UNION_NAME
      this.currentUnion.uid = item[0].UID
      this.getumsgl();
    },
    createUnionWindow() {
      this.createUnionV = true;
      this.createUnionProps.creator = this.userInfo.IM_USER_NAME;
    },
    logout() {
      localStorage.removeItem("user");
      this.$router.push({
        path: "/login",
      });
    },
    ring() {
      if (!isMute) {
        this.$refs.ring.play();
      }
    },
    soundSet() {
      this.isMute = !this.isMute;
    },
    getUnionList() {
      this.$axios({
        method: "get",
        url: "http://localhost:8642/getUnionList",
        params: {
          id: this.userInfo.IM_USER_ID,
        },
      }).then((res) => {
        this.unionList = res.data;
      });
    },
    addFriend() {
      this.$axios({
        method: "post",
        url: "http://localhost:8642/addfriend",
        data: {
          from: this.userInfo.IM_USER_NAME,
          to: this.searchKey,
        },
      }).then((res) => {
        if (res.data === 1) {
          this.$notify({
            title: "邀请结果",
            message: "你已经发送过申请了，请等待回应",
          });
        }
        if (res.data === 2) {
          this.$notify({
            title: "邀请结果",
            message: "你们已经是好友了，可以直接发起聊天",
          });
        }
        if (res.data === 3) {
          this.$notify({
            title: "邀请结果",
            message: "对方已经将你封锁，你无法发送好友请求",
          });
        }
        if (res.data === "OK") {
          this.$notify({
            title: "邀请结果",
            message: "成功发送了好友邀请",
          });
        }
      });
    },
    handleClose() {
      this.queryuser = {};
      this.searchUser = false;
    },
    searchFriend() {
      this.$axios({
        method: "get",
        url: "http://localhost:8642/queryuser",
        params: {
          name: this.searchKey,
        },
      })
        .then((result) => {
          if (result.data === "ERROR") {
            this.searchNull = true;
          } else {
            this.queryuser = result.data;
            this.searchNull = false;
          }
        })
        .catch((err) => {
          console.log(err);
        });
      this.searchUser = true;
    },
    scrollDown() {
      this.$refs["myScrollbar"].wrap.scrollTop =
        this.$refs["myScrollbar"].wrap.scrollHeight;
    },
    addConfirm(from, code) {
      this.$axios({
        method: "post",
        url: "http://localhost:8642/addconfirm",
        data: {
          to: this.userInfo.IM_USER_NAME,
          from: from,
          code: code,
        },
      }).then((res) => {
        this.getInvList();
        this.getFriendsList();
      });
    },
    getInvList() {
      this.$axios({
        method: "get",
        url: "http://localhost:8642/getinvitelist",
        params: {
          user: this.userInfo.IM_USER_NAME,
        },
      }).then((res) => {
        // console.log(res.data);
        this.invList = res.data;
        if (res.data.length == 0) {
          this.isInvite = true;
        } else {
          this.isInvite = false;
        }
      });
    },
    inviteWindow() {
      this.getInvList();
      this.friendInvite = !this.friendInvite;
    },
    switchChannel(name) {
      this.currentType = 1
      this.blockInput = false;
      this.targetUser = name;
      this.getmsgl();
    },
    getmsgl() {
      this.$axios({
        method: "get",
        url: "http://localhost:8642/getMsgList",
        params: {
          from: this.userInfo.IM_USER_NAME,
          to: this.targetUser,
        },
      })
        .then((res) => {
          // console.log(res);
          this.msgl = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    sendMsg() {
      if (this.currentType==1) {
        this.$socket.emit("msg", {
        from: this.userInfo.IM_USER_NAME,
        to: this.targetUser,
        msg: this.textd,
        });
        this.textd = "";
        this.getmsgl();
      }else{
        this.currentUnion.msg = this.textd
        this.$socket.emit("umsg", this.currentUnion);
        this.textd = "";
        this.getumsgl();
      }

    },
    getumsgl(){
      this.$axios({
        method:"get",
        url:"http://localhost:8642/getUmsgList",
        params:{
          union:this.currentUnion.uid,
          user:this.userInfo.IM_USER_ID
        }
      }).then((result) => {
        console.log(result.data);
        this.msgl = result.data;
      });
    },
    getFriendsList() {
      this.$axios({
        method: "get",
        url: "http://localhost:8642/getFriendList",
        params: {
          name: this.userInfo.IM_USER_NAME,
        },
      }).then((result) => {
        // console.log(result.data);
        this.friendsList = result.data;
      });
    },
    moreatuser(name) {
      this.$axios({
        method: "get",
        url: "http://localhost:8642/getFriendDetail",
        params: {
          name: name,
        },
      });
      this.moretouser = true;
    },
  },
  mounted() {
    this.userInfo = JSON.parse(localStorage.getItem("user"))[0];
    this.$socket.emit("login", this.userInfo.IM_USER_NAME);
    this.getFriendsList();
    this.getInvList();
    this.getUnionList();
    this.currentUnion.id = this.userInfo.IM_USER_ID
    this.currentUnion.name = this.userInfo.IM_USER_NAME
  },
  sockets: {
    connect: function () {
      this.$notify({
        title: "IM ENGINE",
        message: "已连接至IM服务",
      });
    },
    customEmit: function (data) {},
    // 监听断开连接，函数
    disconnect() {
      this.$notify({
        title: "IM ENGINE",
        message: "IM服务已断开",
      });
    },
    reconnect() {
      this.$notify({
        title: "IM ENGINE",
        message: "重新链接",
      });
    },
    recv(msg) {
      if (msg.from === this.targetUser) {
        this.getmsgl();
      } else {
        this.ring();
        this.$notify({
          title: "来自@" + msg.from + "的新消息",
          message: msg.msg,
        });
      }
    },
    urecv(msg){
      console.log(msg,"umsg");

    },
    notice(params) {
      this.getmsgl();
      this.getInvList();
      this.getFriendsList();
      this.$notify({
        title: "提示",
        message: params,
      });
    },
  },
};
</script>

<style scoped>
#bg{height: 100vh;
    background: #0299d8;
    background: linear-gradient(45deg, #365794 0%, #13bdce 33%, #0094d9 66%, #6fc7b5 100%);
    background-size: 400%;
    background-position: 0% 100%;
    animation: gradient 10s ease-in-out infinite;}
 
@keyframes gradient{50%{background-position:100% 0}}


@keyframes gradient {
  50% {
    background-position: 100% 0;
  }
}
.header {
  height: 10vh;
  margin: 20px;
}
.aside {
  padding: 40px;
  padding-top: 20px;
  overflow: hidden;
}
.list {
  height: 80vh;
  width: 20vw;
}
.dialogWindow {
  background-color: aliceblue;
  height: 40vh;
  width: 70vw;
  overflow: hidden;
}
.friendunit {
  margin-top: 18px;
  font-size: 14px;
  display: block;
}

.msgDetail {
  width: 5vw;
  height: 5vh;
}
.dock {
  margin-top: 3vh;
  height: 27vh;
  width: 70vw;
}
.textdk {
  width: 100%;
  height: 24vh;
  border-radius: 3px;
  bottom: 0;
  border: none;
  resize: none;
  outline: none;
}
</style>
<style>
::v-deep .el-scrollbar__wrap {
  overflow: scroll;
  height: 100% !important;
  overflow-x: hidden !important;
}
</style>