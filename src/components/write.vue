<template>
  <div class="indexContainer">
    <div class="each-area">
      <p>标题</p>
      <input type="text" class="input" v-model="title">
    </div>
    <div class="each-area">
      <p>索引</p>
      <input type="text" class="input" v-model="name">
    </div>
    <div class="each-area">
      <p>摘要<span class="num">(<span v-text="textnum"></span>/200)</span></p>
      <textarea type="text" class="abstract" v-model="abstract" @keyup="calcTextNum"></textarea>
    </div>
    <div class="editorContainer each-area">
      <p>内容</p>
      <markdown class="markdown"
      :mdValuesP="msg.mdValue"
      :fullPageStatusP="false"
      :editStatusP="true"
      :previewStatusP="true"
      :navStatusP="true"
      :icoStatusP="true"
      @childevent="childEventHandler"
      ></markdown>
    </div>
    <div class="each-area bottom">
      <button class="btn btn-sub" :class="{'disable' : isLoadingMsg}" type="button" @click="postArticle">发&nbsp;&nbsp;布</button>
      <button class="btn btn-save" :class="{'disable' : isLoadingMsg}" type="button" @click="saveArticle">存为草稿</button>
      <em class="laoding" v-show="isLoadingMsg"></em>
    </div>
    <show-mess :show="showdialog" :state="dialogstate" :message="dialogmessage"></show-mess>
  </div>
</template>

<script>
import showMess from '@/components/showMess'
import markdown from '@/components/markdown'
import axios from 'axios'
import qs from 'qs'

export default {
  name: 'index',
  data() {
    return {
      title: '',
      name: '',
      abstract: '',
      msg: {
        mdValue:'# 写文章'
      },
      textnum: 0,
      showdialog: false,
      isLoadingMsg: false,
      dialogstate: '',
      dialogmessage: ''
    }
  },
  components: {
    markdown,
    showMess
  },
  methods: {
    childEventHandler:function(res){
      // res会传回一个data,包含属性mdValue和htmlValue，具体含义请自行翻译
      this.msg = res;
    },
    calcTextNum () {
      this.textnum = String(this.abstract).length;
    },
    postArticle () {
      if(!this.title) {
        this.showDialog("warning", "请输入标题");
        return;
      } else if(!this.abstract) {
        this.showDialog("warning", "请输入摘要");
        return;
      } else if(!this.msg.mdValue) {
        this.showDialog("warning", "请输入文章内容");
        return;
      }

      if(this.isLoadingMsg) {
        return;
      }
      var _this = this,
        encodeText = this.htmlEncodeByRegExp(this.msg.mdValue);
      this.isLoadingMsg = true;

      axios.post('/topic.php?name=adminarticle&op=submit', qs.stringify({
        wentitle: _this.title,
        wenname: _this.name,
        wenabstract: _this.abstract,
        wencontent: encodeText
      })).then(function(data) {

        if(data.data.code == 0) {
          _this.showDialog("success", "文章发布成功");
          setTimeout(() => {
            _this.$router.replace('/admin/manage');
          }, 1350);
        } else {
          _this.showDialog("error", data.data.msg);
        }

        _this.isLoadingMsg = false;
      }).catch(function() {
        _this.showDialog("error", "您的网络有问题吧！");
        _this.isLoadingMsg = false;
      })

    },
    saveArticle () {
      if(!this.title) {
        this.showDialog("warning", "请输入标题");
        return;
      } else if(!this.abstract) {
        this.showDialog("warning", "请输入摘要");
        return;
      } else if(!this.msg.mdValue) {
        this.showDialog("warning", "请输入文章内容");
        return;
      }

      if(this.isLoadingMsg) {
        return;
      }
      var _this = this;
      this.isLoadingMsg = true;
      axios.post('/topic.php?name=adminarticle&op=save', qs.stringify({
        wentitle: _this.title,
        wenname: _this.name,
        wenabstract: _this.abstract,
        wencontent: _this.htmlEncodeByRegExp(_this.msg.mdValue)
      })).then(function(data) {

        if(data.data.code == 0) {
          _this.showDialog("success", "草稿保存成功");
          setTimeout(() => {
            _this.$router.replace('/admin/manage');
          }, 1350);
        } else {
          _this.showDialog("error", data.data.msg);
        }

        _this.isLoadingMsg = false;
      }).catch(function() {
        _this.showDialog("error", "网络出现问题");
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
      }, 1300);
    },
    htmlEncodeByRegExp (str){
      var s = "";
      if(str.length == 0) return "";
      s = str.replace(/&/g,"&amp;");
      s = s.replace(/</g,"&lt;");
      s = s.replace(/>/g,"&gt;");
      s = s.replace(/ /g,"&nbsp;");
      s = s.replace(/\'/g,"&#39;");
      s = s.replace(/\"/g,"&quot;");
      return s;
    },
  }
}
</script>

<style lang="css" scoped>
.each-area {
  position: relative;
  margin: 10px 20px;
  font-size: 16px;
}
.each-area > p {
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 5px;
}
.input,
.abstract {
  padding: 5px 8px;
  outline: none;
  border: 1px solid #ddd;
  border-radius: 4px;
}
.input {
  width: 60%;
  height: 22px;
}
.abstract {
  width: 60%;
  height: 100px;
  resize: none;
}
.markdown {
  height: 500px;
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
}
.num {
  margin-left: 10px;
  color: #aaa;
  font-style: italic;
}
.btn {
  width: 100px;
  height: 35px;
  border-radius: 4px;
  color: #fff;
  font-size: 16px;
  outline: none;
}
.btn-sub {
  margin-left: 5px;
  background-color: #5579ed;
}
.btn-sub:hover {
  background-color: #3765fc;
}
.btn-save {
  margin-left: 20px;
  background-color: #727272;
}
.btn-save:hover {
  background-color: #494747;
}
.bottom {
  margin-bottom: 100px;
}
.laoding {
  display: inline-block;
  vertical-align: -5px;
  width: 20px;
  height: 20px;
  margin-left: 10px;
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
.disable {
  color: #a3a3a3;
}
.disable:hover {
  cursor: not-allowed;
}
</style>


// WEBPACK FOOTER //
// index.vue?21f2a5bf
