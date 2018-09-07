<template>
  <div class="home">
    <h2 class="title">欢迎进入 sansiro 的后台</h2>
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
.home {
  background-color: #e9e9e9;
}
.title {
  margin: 20px 0 0 30px;
  font-size: 18px;
}
</style>
