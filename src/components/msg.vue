<template>
  <div class="manage">
    <p class="title">>留言管理</p>
    <div class="options">
      <select v-model="articleid" class="option-area">
        <option v-for="todo in articlelist" :value="todo.id">{{ todo.title }}</option>
      </select>
    </div>
    <div class="inner">
      <table>
        <tr class="title-area">
          <th>序列号</th>
          <th>时间</th>
          <th>名称</th>
          <th>内容</th>
          <th>邮箱</th>
          <th>操作</th>
        </tr>
        <tr v-for="todo in msglist">
          <td v-text="todo.id"></td>
          <td v-text="todo.time"></td>
          <td v-text="todo.name"></td>
          <td v-text="todo.content"></td>
          <td v-text="todo.email"></td>
          <td>
            <button class="btn" type="button" @click="removeArticle(todo.id)">删除</button>
          </td>
        </tr>
      </table>
    </div>
    <show-mess :show="showdialog" :state="dialogstate" :message="dialogmessage"></show-mess>
  </div>
</template>

<script>
import showMess from '@/components/showMess'
import axios from 'axios';

export default {
  name: 'manage',
  data() {
    return {
      articlelist: [],
      articleid: '',
      msglist: [],
      showdialog: false,
      dialogstate: '',
      dialogmessage: ''
    }
  },
  components: {
    showMess
  },
  mounted () {
    // this.getMessageList();
    this.getArticleList();
  },
  watch: {
    articleid () {
      this.getMessageList(this.articleid);
      // console.log("change" + this.articlename)
    }
  },
  methods: {
    getArticleList() {
      var _this = this;

      axios.get('/topic.php?name=article&op=adminlist')
        .then(function(data) {
          _this.articlelist = data.data;
          _this.articlelist.push({
            id: 0,
            title: '留言板'
          });
        })
    },
    getMessageList (name) {
      var _this = this;

      axios.get('/topic.php?name=message&op=getlist&select=' + name)
        .then(function(data) {
          _this.msglist = data.data;
        })
    },
    removeArticle(msgid) {
      var _this = this;
      axios.get('/topic.php?name=message&op=remove', {
        params: {
          msgid: msgid
        }
      }).then(function(data) {
        if(data.data.code == 0) {
          _this.showDialog("success", "删除留言成功~"); 
          _this.getMessageList(_this.articleid);
        } else {
          _this.showDialog("error", "删除失败"); 
        }
      }).catch(function(data) {
        _this.showDialog("error", "网不好吧"); 
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
    }
  }
}
</script>

<style lang="css" scoped>
.manage {
  background-color: #f6f8f9;
}
.title {
  font-size: 18px;
  margin: 20px 0 10px 18px;
}
.inner {
  position: relative;
  font-size: 16px;
  margin: 0 20px 60px;
  background-color:#bbbbbb;
}
.inner table {
  width: 100%;
  padding: 0;
  margin: 0;
  border-spacing: 0;
}
.inner tr {
  display: flex;
  width: 100%;
  text-align: center;
  line-height: 30px;
  word-break: break-all;
}
.inner tr td:first-of-type,
.inner tr th:first-of-type,
/* .inner tr td:nth-child(2),
.inner tr th:nth-child(2), */
.inner tr td:last-of-type,
.inner tr th:last-of-type {
  width: 8%;
}
.inner tr td:first-of-type,
.inner tr th:first-of-type {
  border-left: 0;
}
.inner tr td:nth-child(4),
.inner tr th:nth-child(4) {
  width: 34%;
}
.inner tr td:nth-child(5),
.inner tr th:nth-child(5) {
  width: 10%;
}
.inner tr td,
.inner tr th {
  width: 20%;
  border-left: 1px solid #fff;
}
.inner tr:nth-child(even) {
  background-color: #dae3f7;
}
.inner tr:nth-child(odd) {
  background-color: #ecefdb;
}
tr.title-area {
  background-color: #474747 !important;
  color: #fff;
}
.btn {
  width: 50px;
  height: 20px;
  border: none;
  border-radius: 5px;
  font-size: 12px;
  background-color: #7e7e7e;
  color: #fff;
  outline: none;
  cursor: pointer;
  display: inline-block;
  vertical-align: middle;
  line-height: 20px;
}
.btn:hover {
  background-color: #525252;
}
.options {
  margin-left: 20px;
  margin-bottom: 20px;
}
.option-area {
  width: 400px;
  height: 35px;
  font-size: 17px;
  border: 1px solid #afafaf;
  border-radius: 3px;
}
.option-area option {
  height: 35px;
  font-size: 18px;
}
</style>
