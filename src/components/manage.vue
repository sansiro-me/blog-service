<template>
  <div class="manage">
    <p class="title">>文章管理</p>
    <div class="inner">
      <table>
        <tr class="title-area">
          <th>序列号</th>
          <th>状态</th>
          <th>时间</th>
          <th>索引</th>
          <th>标题</th>
          <th>操作</th>
        </tr>
        <tr v-for="todo in articlelist">
          <td v-text="todo.id"></td>
          <td v-text="todo.state == 1 ? '已发布' : '草稿'"></td>
          <td v-text="todo.time"></td>
          <td v-text="todo.name"></td>
          <td v-text="todo.title"></td>
          <td>
            <button class="btn" type="button" @click="editArticle(todo.id)">编辑</button>
            <button v-show="todo.state == 0" class="btn" type="button" @click="submitArticle(todo.id)">上线</button>
            <button class="btn" type="button" @click="removeArticle(todo.id)">删除</button>
          </td>
        </tr>
      </table>
    </div>
    <show-mess :show="showdialog" :state="dialogstate" :message="dialogmessage"></show-mess>
  </div>
</template>

<script>
import showMess from '@/components/showMess';
import axios from 'axios';

export default {
  name: 'manage',
  components: {
    showMess
  },
  data() {
    return {
      articlelist: [],
      showdialog: false,
      dialogstate: '',
      dialogmessage: ''
    }
  },
  mounted () {
    this.getArticelList();
  },
  methods: {
    getArticelList () {
      var _this = this;

      axios.get('/topic.php?name=adminarticle&op=getlist')
        .then(function(data) {
          _this.articlelist = data.data;
        })
    },
    editArticle (articleid) {
      this.$router.push({name: 'edit', params: {articleid: articleid}});
    },
    submitArticle (articleid) {
      var _this = this;
      axios.get('/topic.php?name=adminarticle&op=submit_article', {
        params: {
          articleid: articleid
        }
      }).then(function(data) {
        if(data.data.code == 0) {
          _this.showDialog("success", "文章上线成功");
          _this.getArticelList();
        } else {
          _this.showDialog("error", "文章上线失败");
        }
      }).catch(function(data) {
        _this.showDialog("error", "断网了吧!");
      })
    },
    removeArticle(articleid) {
      var _this = this;
      axios.get('/topic.php?name=adminarticle&op=remove_article', {
        params: {
          articleid: articleid
        }
      }).then(function(data) {
        if(data.data.code == 0) {
          _this.showDialog("success", "文章删除成功");
          _this.getArticelList();
        } else {
          _this.showDialog("error", "文章删除失败");
        }
      }).catch(function(data) {
        _this.showDialog("error", "断网了吧!");
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
}
.inner tr td:first-of-type,
.inner tr th:first-of-type {
  border-left: 0;
}
.inner tr td:first-of-type,
.inner tr th:first-of-type,
.inner tr td:nth-child(2),
.inner tr th:nth-child(2)  {
  width: 8%;
}
.inner tr td:nth-child(3),
.inner tr th:nth-child(3) {
  width: 14%;
}
.inner tr td:nth-child(4),
.inner tr th:nth-child(4) {
  width: 20%;
}
.inner tr td,
.inner tr th {
  width: 25%;
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
  color: #3f3f3f;
  font-size: 12px;
  outline: none;
  cursor: pointer;
  display: inline-block;
  vertical-align: middle;
  line-height: 20px;
}
.btn:first-of-type {
  background-color: #0aff2b;
}
.btn:first-of-type:hover {
  background-color: #01b91a;
}
.btn:nth-child(2) {
  background-color: #fff;
}
.btn:nth-child(2):hover {
  background-color: #cacaca;
}
.btn:last-of-type {
  background-color: #abbfd6;
}
.btn:last-of-type:hover {
  background-color: #8397ad;
}
</style>
