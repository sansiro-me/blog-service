<template>
  <div v-show="show" class="mask">
    <div class="dia-content" :class="dialogClass">
      <i class="icon"></i>
      <p v-text="message"></p>
    </div>
  </div>
</template>

<script>

export default {
  name: 'showMess',
  props: ['show', 'state', 'message'],
  computed: {
    dialogClass () {
      return {
        success: this.state == 'success',
        error: this.state == 'error',
        warning: this.state == 'warning'
      }
    }
  }
}
</script>

<style lang="css" scoped>
.mask {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.322);
  z-index: 99999;
}
.dia-content {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 4rem;
  height: 2.6rem;
  border-radius: .1rem;
  background-color: #fff;
  z-index: 100000;
}
.dia-content p {
  position: absolute;
  text-align: center;
  left: 0;
  bottom: 0;
  width: 100%;
  text-align: center;
  line-height: 1rem;
  font-size: .4rem;
  margin: 0;
  padding: 0;
}
.dia-content .icon {
  display: block;
  position: relative;
  margin: .2rem auto 0;
  width: 1.4rem;
  height: 1.4rem;
  border-radius: 50%;
}
.success .icon {
  background-color: #03ff23;
}
.success .icon::before,
.success .icon::after {
  content: '';
  display: block;
  position: absolute;
  height: .07rem;
  border-radius: .03rem;
  background-color: #fff;
}
.success .icon::before {
  left: 19%;
  top: 63%;
  width: .4rem;
  transform: rotate(40deg);
}
.success .icon::after {
  left: 30%;
  top: 48%;
  width: .9rem;
  transform: rotate(-50deg);
}

.error .icon {
  background-color: #a8a8a8;
}
.error .icon::before,
.error .icon::after {
  content: '';
  display: block;
  position: absolute;
  left: calc(50% - .45rem);
  top: calc(50% - .035rem);
  width: .9rem;
  height: .07rem;
  border-radius: .03rem;
  background-color: #fff;
  transform-origin: center center;
}
.error .icon::before {
  transform: rotate(45deg);
}
.error .icon::after {
  transform: rotate(-45deg);
}

.warning .icon {
  background-color: #00a1e0;
}
.warning .icon::before,
.warning .icon::after {
  content: '';
  display: block;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  border-radius: .03rem;
  background-color: #fff;
}
.warning .icon::before {
  width: .1rem;
  height: .8rem;
  top: 10%;
}
.warning .icon::after {
  width: .15rem;
  height: .15rem;
  top: 75%;
  border-radius: 50%;
}
</style>
