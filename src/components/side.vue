<template>
  <div class="side">
    <ul class="side-ul">
      <li><router-link class="each-side" :to="{path: '/admin/home'}">首页</router-link></li>
      <li><router-link class="each-side" :to="{path: '/admin/write'}">发布</router-link></li>
      <li><router-link class="each-side" :to="{path: '/admin/manage'}">管理</router-link></li>
      <li><router-link class="each-side" :to="{path: '/admin/msg'}">留言</router-link></li>
    </ul>
  </div>
</template>

<script>
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
  }
}
</script>

<style lang="css" scoped>
.side {
  background-color: #373e40;;
}
.side ul {
  margin: 0;
  padding: 0;
  width: 100%;
  font-size: 20px;
  text-align: center;
  line-height: 2;
  list-style-type: none;
}
.each-side {
  display: block;
  margin: 10px 0;
  color: #fff;
  text-decoration: none;
  transition: .2s;
}
.each-side:hover {
  background-color: #a2b4ba;
}
</style>
