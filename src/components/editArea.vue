<template>
  <div class="indexContainer">
    <div class="info-top">
      <div class="info-left">
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
      </div>
      <div class="info-right">
        <p>封面图</p>
        <input type="text" class="input" v-model="img">
        <div class="right-img">
          <img :src="img" alt="">
        </div>
      </div>
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
      <button class="btn btn-save" :class="{'disable' : isLoadingMsg}" type="button" @click="saveChange">保存修改</button>
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
import { setTimeout } from 'timers';

export default {
  name: 'index',
  data() {
    return {
      id: this.$route.params.articleid,
      title: '',
      name: '',
      abstract: '',
      msg: {
        mdValue: 'test'
      },
      textnum: 0,
      showdialog: false,
      isLoadingMsg: false,
      dialogstate: '',
      dialogmessage: '',
      edit: '',
      img: ''
    }
  },
  components: {
    markdown,
    showMess
  },
  mounted () {
    this.getArticleInfo();
  },
  methods: {
    childEventHandler:function(res){
      // res会传回一个data,包含属性mdValue和htmlValue，具体含义请自行翻译
      this.msg = res;
    },
    getArticleInfo () {
      var _this = this;
      axios.get('/api/adminarticle/get_edit_info', {
        params: {
          articleid: this.id
        }
      }).then(function(data) {
        _this.title = data.data.title;
        _this.name = data.data.name;
        _this.abstract = data.data.abstract;
        _this.img = data.data.headpic;
        _this.msg.mdValue = _this.htmlDecodeByRegExp(data.data.content);
        _this.calcTextNum();
      })
    },
    calcTextNum () {
      this.textnum = String(this.abstract).length;
    },
    saveChange () {

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
      axios.post('/api/adminarticle/save_change', qs.stringify({
        wenid: _this.id,
        wenname: _this.name,
        wentitle: _this.title,
        wenabstract: _this.abstract,
        wenimg: _this.img,
        wencontent: _this.htmlEncodeByRegExp(_this.msg.mdValue)
      })).then(function(data) {

        if(data.data.code == 0) {
          _this.showDialog("success", "文章修改成功");          
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
        _this.$router.replace('/admin/manage');
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
    htmlDecodeByRegExp (str){  
      var s = "";
      if(str.length == 0) return "";
      s = str.replace(/&amp;/g,"&");
      s = s.replace(/&lt;/g,"<");
      s = s.replace(/&gt;/g,">");
      s = s.replace(/&nbsp;/g," ");
      s = s.replace(/&#39;/g,"\'");
      s = s.replace(/&quot;/g,"\"");
      return s;  
    }
  }
}
</script>

<style lang="css" scoped>
.indexContainer {
  background: #f6f8f9;
  position: relative;
}
.each-area {
  position: relative;
  margin: 10px 20px;
  font-size: 16px;
}
.info-top p {
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
  width: calc(100% - 20px);
  height: 22px;
}
.abstract {
  width: calc(100% - 20px);
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
  background-color: #27b4ec;
}
.btn:hover {
  background-color: #1a9acc;
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
.info-top {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
}
.info-left {
  /* flex-grow: 5.8; */
  width: 58%;
}
.info-right { 
  /* flex-grow: 4.2; */
  width: 42%;
  padding: 10px 20px 10px 0;
  font-size: 16px;
  box-sizing: border-box;
}
.right-img {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 213px;
  margin-top: 13px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #ddd;
  padding: 5px;
  box-sizing: border-box;
}
.right-img img {
  max-width: 100%;
  max-height: 100%;
}
</style>


// WEBPACK FOOTER //
// index.vue?21f2a5bf