<template>
 <div class="container">
  <div class="selected">
   <strong :class="{ selected: !this.isActive }"> Активен</strong>
   <strong :class="{ selected: this.isActive }"> Не Активен</strong>
  </div>
  <transition name="switch">
   <div
    v-if="this.isEditing"
    class="radio-out"
    :class="{ active: !this.isActive }"
   >
    <div
     class="radio-in"
     @click="switchState"
     :class="{ active: this.isActive }"
    ></div>
   </div>
  </transition>
 </div>
</template>

<script>
export default {
 props: ["item", "isEditing"],
 emits: ["stausChange"],
 data() {
  return {
   isActive: this.item.isActive,
  };
 },
 mounted() {
  this.isActive = this.item.isActive;
 },
 watch: {
  item: function (val) {
   this.isActive = val.isActive;
  },
 },
 methods: {
  cancleStatusChange() {
   this.isActive = this.item.isActive;
  },
  switchState() {
   this.isActive = !this.isActive;
   this.$emit("stausChange", this.isActive);
  },
 },
 computed: {
  color() {
   if (this.isActive) {
    return "#44b649";
   } else {
    return "#fa3e3e";
   }
  },
 },
};
</script>

<style lang="scss" scoped>
.selected {
 position: relative;
 overflow-x: auto;
 display: flex;
 flex-direction: column;
 overflow: hidden;
}
.radio-out {
 .radio-in {
  box-shadow: 2px 0px 10px #919294;
  cursor: pointer;
  height: 19px;
  width: 19px;
  border-radius: 100%;
  background-color: black;
  transition: 200ms;
  background-color: white;
 }
 .radio-in.active {
  transition: 200ms;
  transform: translateX(25px);
 }
 padding: 3px;
 margin-left: 10px;
 width: 50px;
 height: 25px;
 background-color: #919294;
 border-radius: 20px;
 background-color: #44b649;
}
.radio-out.active {
 background-color: #fa3e3e;
}

.container {
 height: 25px;
 align-items: center;
 display: flex;
 overflow: hidden;
 width: 100%;
}
.left {
 cursor: pointer;
 transform: rotate(90deg);
}
.right {
 cursor: pointer;
 transform: rotate(-90deg);
}

strong {
 position: relative;
 color: v-bind(color);
 transition: 200ms;
}
strong.selected {
 color: v-bind(color);
 z-index: 0;
 position: absolute;
 transform: translateY(40px);
}

.switch-enter-active,
.switch-leave-active {
 animation: in 0.2s;
}
.switch-enter,
.switch-leave-to {
 animation: in 0.2s reverse;
}
@keyframes in {
 from {
  transform: scale(0);
 }
 to {
  transform: scale(1);
 }
}
</style>
