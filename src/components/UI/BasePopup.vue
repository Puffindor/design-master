<template>
 <div class="out" :class="{ active: this.isOpen }">
  <transition name="popUp">
   <slot></slot>
  </transition>
 </div>
</template>

<script>
export default {
 props: ["isOpen", "Zindex"],
};
</script>

<style lang="scss" scoped>
.out {
 display: flex;
 justify-content: center;
 align-items: center;
 z-index: -1;
 width: 100vw;
 height: 100vh;
 transition: 600ms;
 background-color: transparent;
 position: absolute;
}

.out.active {
 display: flex;
 position: fixed;
 z-index: v-bind(Zindex);
 transition: 300ms;
 background-color: rgba(0, 0, 0, 0.497);
}

.popUp-enter-active,
.popUp-leave-active {
 animation: in 0.2s;
}
.popUp-enter,
.popUp-leave-to {
 animation: in 0.2s reverse;
}
@keyframes in {
 0% {
  transform: translateY(1000px);
 }

 100% {
  transform: translateY(0px);
 }
}
</style>
