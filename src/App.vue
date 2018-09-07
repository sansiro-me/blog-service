<template>
  <div id="app">
    <router-view class="main"></router-view>
  </div>
</template>

<script>
import top from '@/components/top'
import side from '@/components/side'
// import haha from '@/components/haha.vue'

export default {
  name: 'App',
  components: {
    top,
    side
    // haha
  }
}
</script>

<style>
body {
  height: 100%;
  margin: 0;
  padding: 0;
}
#app {
  height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  font-size: 0;
}
#app:after {
  content: '';
  display: block;
  visibility: hidden;
  height: 0;
  clear: both;
}
.header-top {
  width: 100%;
  height: 40px;
}
.side-left, .main-area {
  height: calc(100vh - 40px);
  display: inline-block;
  /* font-size: 0; */
  vertical-align: top;
  float: left;
}
@media screen and (max-width: 600px) {
  .side-left {
    width: 60px;
  }
  .main-area {
    width: calc(100% - 60px);
  }
}
@media screen and (min-width: 601px) and (max-width: 1300px) {
  .side-left {
    width: 10%;
  }
  .main-area {
    width: 90%;
  }
}
@media screen and (min-width: 1301px) {
  .side-left {
    width: 130px;
  }
  .main-area {
    width: calc(100% - 130px);
  }
}
.main-area {
  position: relative;
  overflow-x: hidden;
  overflow-y: scroll;
}
</style>
