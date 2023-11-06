<template>
 <div class="warning" v-if="this.open">
  <div class="red"><img src="../../assets/WarningIcon.svg" /></div>
  <span>ВНИМАНЕ</span>
  <p>{{ desc }}</p>
  <div>
   <button v-if="this.type === 'form'" class="close-btn" @click="confirm">
    Все равно закрыть
   </button>
   <button v-if="this.type === 'delete'" class="close-btn" @click="confirm">
    Удалить
   </button>
   <button class="back-btn" @click="cancel">Назад</button>
  </div>
 </div>
</template>

<script>
export default {
 props: ["desc", "type", "open"],
 emits: ["confirm", "cancel"],
 methods: {
  confirm() {
   this.$emit("confirm");
  },
  cancel() {
   this.$emit("cancel");
  },
 },
};
</script>

<style lang="scss" scoped>
.warning {
 display: flex;
 flex-direction: column;
 justify-content: space-between;
 align-items: center;
 font-family: "Poppins", sans-serif;
 position: absolute;
 z-index: 6000;
 width: max-content;
 height: max-content;
 border-radius: 10px;
 background-color: #dbdce0;
 img {
  height: 60%;
 }
 .back-btn {
  font-size: 16px;
  font-weight: 500;
  font-family: "Segoe UI";
 }
 .close-btn {
  font-family: "Segoe UI";
  font-weight: 600;
  font-size: 15px;
  background-color: #fa3e3e;
  color: white;
 }
 .close-btn:hover {
  background-color: #e92d2d;
 }
 .red {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  width: 100%;
  height: 30%;
  background-color: #fa3e3e;
  border-radius: 10px 10px 0px 0px;
 }
 p {
  margin-right: 10px;
  margin-left: 10px;
  color: rgb(55, 52, 52);
  margin-bottom: 1%;
  font-size: 17px;
 }
 span {
  font-weight: 700;
  color: #e92d2d;
  font-size: 20px;
 }
 div {
  width: 100%;
  display: flex;
  justify-content: space-between;
  button {
   width: 40%;
   margin: 10px;
  }
 }
}
button {
 justify-content: center;
 align-items: center;
 width: 40px;
 height: 40px;
 margin-left: 10px;
 border-style: hidden;
 background-color: transparent;
 border-radius: 10px;
 transition: 200ms;
}
button:hover {
 cursor: pointer;
 background-color: #c9ccd8;
 transition: 200ms;
}
</style>
