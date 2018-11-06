<template>
  <div class="top">
    <span class="exit" @click="exit">退出</span>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'index',
  data() {
    return {
      msgShow: '我要显示的内容',
      dilogStatus: false,
      msg: {
        mdValue:'# markdown test'
      }
    }
  },
  components: {
  },
  methods: {
    exit () {
      var _this = this;
      axios.get('/api/login/logout')
        .then(function(data) {
          if(data.data.code == 0) {
            _this.$router.replace('/logn');
          }
        })
    }
  }

}
</script>

<style lang="css" scoped>
.top {
  background-color: #242a2c;
}
.exit {
  font-size: 17px;
  color: #fff;
  line-height: 40px;
  margin-left: 20px;
  cursor: pointer;
}
.exit:hover {
  color: #bbbbbb;
  text-decoration: underline;
}
</style>
