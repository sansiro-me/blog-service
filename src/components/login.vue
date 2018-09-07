<template>
  <div class="page" @keyup.enter="login">
    <div class="login">
      <div class="login-area">
        <h2 class="title">Login</h2>
        <div class="area name-area">
          <input class="input" type="text" v-model="nickname" placeholder="请输入用户名">
        </div>
        <div class="area pass-area">
          <input class="input" type="password" v-model="password" placeholder="请输入密码">
        </div>
        <button class="btn" :class="{'disable' : isLoadingMsg}" type="button" @click="login">登&nbsp;&nbsp;&nbsp;录</button>
        <em class="laoding" v-show="isLoadingMsg"></em>
      </div>
    </div>
    <show-mess :show="showdialog" :state="dialogstate" :message="dialogmessage"></show-mess>
    <div class="bottom">Copyright © 2018 sansiro.me</div>
  </div>
</template>

<script>
import showMess from '@/components/showMess'
import axios from 'axios';
import qs from 'qs';

export default {
  name: 'index',
  data() {
    return {
      nickname: '',
      password: '',
      isLoadingMsg: false,
      showdialog: false,
      dialogstate: '',
      dialogmessage: ''
    }
  },
  components: {
    showMess
  },
  methods: {
    toHome () {
      console.log("go");
      this.$router.replace('/admin');
    },
    login () {

      // this.toHome();return;
      var _this = this;

      this.isLoadingMsg = true;
      axios.post('/topic.php?name=login',qs.stringify({
        nickname: _this.nickname,
        password: _this.password
      })).then(function(data) {
        if(data.data.code == 0) {
          _this.showDialog("success", "登陆成功");
        }
        else {
          _this.showDialog("error", "用户名或密码错误");
        }

        _this.isLoadingMsg = false;
      }).catch(function(data) {
         _this.showDialog("error", "您的网络有问题吧");
        _this.isLoadingMsg = false;
      })
    },
    showDialog (state, msg) {
      this.showdialog = true;
      this.dialogstate = state;
      this.dialogmessage = msg;

      var _this = this;

      setTimeout(function() {
        _this.showdialog = false;
        _this.dialogstate = '';
        _this.dialogmessage = '';

        if(state == 'success') {
          console.log("跳转");
          _this.toHome();
        }
      }, 1300);
    }
  }
}
</script>

<style lang="css" scoped>
.page {
  background-color: #888;
  width: 100%;
  height: 100%;
  font-size: 30px;
  background-image: url("../../static/img/back.jpg");
  background-size: cover;
  background-position: center center;
}
.login {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  /* background-color: rgba(158, 158, 158, 0.137); */
  background-color: rgba(236, 236, 236, 0.795);
  /* border: 1px solid #c9c9c9; */
  border-radius: 9px;
}
@media screen and (max-width: 400px) {
  .login {
    width: 80%;
    height: 230px;
  }
}
@media screen and (min-width: 401px) {
  .login {
    width: 350px;
    height: 230px;
  }
}
.btn {
  font-size: 18px;
}
.login-area {
  position: relative;
  margin: 7% 10%;
}
.area {
  display: flex;
  height: 30px;
  border-bottom: 1px solid #afafaf;
  margin-top: 20px;
  overflow: hidden;
  background-color: transparent;
}
.area .input {
  display: block;
  flex-grow: 1;
  outline: none;
  border: none;
  padding: 0 10px;
  font-size: 16px;
  color: #414141;
  background-color: inherit;
}
.area::before {
  content: '';
  display: block;
  width: 18%;
  background-color: #fff;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: auto 65%;
  background-color: inherit;
}
.name-area:before {
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAANlBMVEUAAACKioqPj4+KioqJiYmKioqKioqKioqKioqJiYmHh4eJiYmJiYmJiYmLi4uKioqKioqKioqdrda7AAAAEXRSTlMA8BDAgOAwYLCgIHDQUEDPkH/ly34AAADaSURBVDjLrZPdrsMgDIMXAi1/Xfe9/8uecrQKRpB2M18R2SmOUx6/xTMJoMWtaZd4IzyX/AlE71MA9oVAQfP/qQCb4XeI93mDYASB0L15e8nVVIZSSPaGPJSRcxJ4mMpvAplD/JxM0TkmRlsZXvOYcfxEbJbtnHIrUgvNoID4ltWh3KEZxcUoF+py4btwI2ZL57MxolppKMajNAtX49sEyfLJ9dhkVtRpv67C8bkJP1kSxHW9UGdTx9izg/2PK2GIPixiGZYjvKzA9TC29TsIfWOqbhV9OB6/wB9qJAtn8cFcHAAAAABJRU5ErkJggg==)
}
.pass-area:before {
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgBAMAAACBVGfHAAAALVBMVEUAAACJiYmKioqJiYmJiYmJiYmKioqJiYmLi4uHh4ePj4+KioqKioqJiYmKior92ZBAAAAADnRSTlMA0DCA4PCQoEAgELBvUHsvfKUAAAB7SURBVCjPYyAWqPk9zETmL3/37t3TAwg+l1yYAm/dc4QA90MFBgaOOAO4QF8kmHwJF6gDy7E/gwvIKYBIpodwgXdQinyBlHdw4Azis71DAiD7WR8hnKznACT4HkB5YDYJAowCyAIIkrAAphlkuQPTL8zovmUwQQkPwgAAQJRbiqWDgjsAAAAASUVORK5CYII=)
}
.btn {
  display: block;
  width: 100%;
  height: 30px;
  margin-top: 20px;
  outline: none;
  border: none;
  background-color: #1eb2f7;
  border-radius: 6px;
  color: #fff;
  cursor: pointer;
}
.btn:hover {
  background-color: #14a2e4;
}
.disable {
  background-color: #0f90cc;
  color: #d3d3d3;
  cursor: not-allowed;
}
.disable:hover {
  background-color: #0f90cc;
}
.title {
  font-size: 18px;
  line-height: 20px;
  text-align: center;
  margin: 0;
  padding: 0;
  font-weight: normal;
}
.laoding {
  position: absolute;
  left: 62%;
  bottom: 5px;
  width: 20px;
  height: 20px;
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAANlBMVEUAAACKioqKioqLi4uJiYmPj4+KioqKioqHh4eJiYmJiYmJiYmKioqJiYmKioqJiYmKioqKiorBiPhaAAAAEXRSTlMAwIBA8BCwMCDfoNBgUOBwkLPq8tEAAAEcSURBVDjLnZLbsoMgDEUDhLuI+f+fPdtCFcHpw1kP7QwsSbIn9MTH6OkXSkS932wS/SD45aEdN4OQxUyCE5FyCXUtFCBE2wXLsraqYeguHHKMV0Vpe34FI6CSw2uMA2BaI4zHN8wBwXjnPPqpBGBzHwAoT0kyfTjODq1m2Qt180Q/c4nCqNwxWcB4f4ikMB5Ufk6e1ByUxcE7QX+ollbuGYCbc2so4nch9eNMXjcC/Z8eVn60oPxjRi1gWr3D3rEyrrnQlBzXywbI3bP6xmjxKtLui8mYMTSRyLkzGk0gKNnbwiTT9loSGRFDRaQNbcayNgrbJpBqsS3ZVuqCx+8SBKPgV2jLtTxgbsGybJNQONEt0Ia/hUv4SZ6L/wEeQA63kttCVAAAAABJRU5ErkJggg==);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  animation: loading 1.3s linear infinite;
}
@keyframes loading {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
.bottom {
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  color: #fff;
  font-size: 15px;
  white-space: nowrap;
}
</style>
