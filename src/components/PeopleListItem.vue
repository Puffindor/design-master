<template>
 <li @dblclick="dblclick">
  <div>
   <p>
    <strong>ФИО</strong><br />
    <input
     :class="{ active: isEditing }"
     v-model="this.itemLocal.name"
     :disabled="!isEditing"
    />
   </p>

   <p>
    <strong>Дата рождения</strong><br />
    <input
     :class="{ active: isEditing }"
     type="date"
     min="1900-01-01"
     max="2020-10-10"
     v-model="this.itemLocal.birthDate"
     :disabled="!isEditing"
    />
   </p>
   <p @click.self="closeDropMenu">
    <strong>Город</strong><br />
    <base-drop-menu
     ref="dropMenuCity"
     :default="this.item.city"
     :options="[
      'Новосибирск',
      'Красноярск',
      'Бердск',
      'Москва',
      'Санкт-Петербург',
      'Екатеринбург',
      'Казань',
      'Калининград',
      'Мурманск',
      'Пермь',
     ]"
     :isEditing="this.isEditing"
     :item="this.item"
     @selectedItem="choseCity"
    />
   </p>
   <p>
    <strong>Адрес</strong><br />

    <input
     :class="{ active: isEditing }"
     :value="this.itemLocal.address"
     @input="this.itemLocal.address = $event.target.value"
     :disabled="!isEditing"
    />
   </p>
  </div>
  <div>
   <p>
    <strong>Телефон</strong><br />

    <input
     :class="{ active: isEditing }"
     @input="formatPhoneNumber"
     v-model="this.itemLocal.phone"
     :disabled="!isEditing"
    />
   </p>
   <p @click.self="closeDropMenu">
    <strong>Пол</strong><br />
    <base-drop-menu
     ref="dropMenuGender"
     :default="this.item.gender"
     :options="['Мужской', 'Женский']"
     :isEditing="this.isEditing"
     :item="this.item"
     @selectedItem="choseGender"
    />
   </p>
   <p>
    <base-status-switch
     ref="stausSwitch"
     :item="this.item"
     :isEditing="this.isEditing"
     @stausChange="stausChange"
    />
   </p>
   <p>
    <strong>Доп информация</strong><br />
    <textarea :value="this.item.info" rows="5" disabled />
   </p>
  </div>
  <div class="avatar-container">
   <img class="avatar" :src="defaultAvatar" />
   <div v-if="isEditing" class="btns edit">
    <button @click="saveChanges(this.item.id)">
     <img src="../assets/SaveIcon.svg" />
    </button>
    <button @click="cancelEdit"><img src="../assets/CancelIcon.svg" /></button>
   </div>
   <div v-else class="btns">
    <button @click="deleteConfirm">
     <img src="../assets/DeleteIcon.svg" />
    </button>
    <button @click="edit"><img src="../assets/EditIcon.svg" /></button>
   </div>
  </div>
 </li>
</template>
<script>
import { AsYouType } from "libphonenumber-js";

import "../assets/CSS/Variables.css";
export default {
 props: ["item"],
 emits: ["delete", "openForm"],
 data() {
  return {
   warning: false,
   isEditing: false,
   itemLocal: {
    name: "",
    birthDate: "",
    city: "",
    address: "",
    phone: "",
    gender: "",
    info: "",
    isActive: true,
   },
  };
 },

 mounted() {
  this.itemLocal = structuredClone(this.item);
 },
 computed: {
  defaultAvatar() {
   if (!this.itemLocal.avatar) {
    return require("../assets/paceholder.png");
   } else {
    return this.itemLocal.avatar;
   }
  },
  getcurrnetEditing() {
   return this.$store.getters.getcurrnetEditing;
  },
 },
 watch: {
  getcurrnetEditing: function (val) {
   if (val === this.item.id) {
    this.isEditing = true;
   } else {
    this.isEditing = false;
   }
  },
  item: function () {
   this.itemLocal = structuredClone(this.item);
  },
 },
 methods: {
  closeDropMenu() {
   this.$refs.dropMenuCity.toggleList(false);
   this.$refs.dropMenuGender.toggleList(false);
  },
  deleteConfirm() {
   this.$emit("delete", this.item.id);
  },
  stausChange(e) {
   this.itemLocal.isActive = e;
  },
  choseCity(e) {
   this.itemLocal.city = e;
  },
  choseGender(e) {
   this.itemLocal.gender = e;
  },
  formatPhoneNumber() {
   if (!this.itemLocal.phone) {
    this.itemLocal.phone = "+7";
   }
   this.itemLocal.phone = new AsYouType("international").input(
    this.itemLocal.phone
   );
  },
  saveChanges(id) {
   this.$store.dispatch("saveChanges", { ...this.itemLocal, id });

   this.edit();
  },
  edit() {
   if (!this.isEditing) {
    this.$store.dispatch("setEditItem", this.item.id);
   } else {
    this.$store.dispatch("setEditItem", null);
   }
  },
  cancelEdit() {
   this.itemLocal = structuredClone(this.item);
   this.$refs.stausSwitch.cancleStatusChange();
   this.$refs.dropMenuCity.cancelSelect();
   this.$refs.dropMenuGender.cancelSelect();
   this.edit();
  },
  dblclick() {
   this.$emit("openForm", [this.itemLocal, this.item]);
  },
 },
};
</script>
<style lang="scss" scoped>
.avatar-container {
 display: flex;
 flex-direction: column;
 align-items: flex-end;
}
li {
 transition: 200ms;
 padding: 5px 15px 15px 15px;
 display: flex;
 width: 99.5%;
 background-color: var(--main-color);
 border-radius: 10px;
 div {
  .avatar {
   margin: 10px 0px 10px 0px;
   width: 250px;
   height: 250px;
  }
  width: 40%;
  p {
   margin-top: 10px;
   input {
    background-color: inherit;
    padding: 2px;
    border-style: hidden;
    color: black;
    font-size: 16px;
    outline: none;
    border-radius: 5px;
    transition: 300ms;
   }
   input.active {
    transition: 300ms;
    background-color: white;
   }
   strong {
    display: inline-block;
    margin-bottom: 5px;
   }
   textarea {
    color: black;
    margin-bottom: 17px;
    font-size: 16px;
    width: 80%;
    height: 150%;
    border-style: hidden;
    resize: none;
    background-color: inherit;
    font-family: "Roboto", sans-serif;
   }
  }
 }
 .btns.edit {
  opacity: 1;
 }
 .btns {
  opacity: 0;
  display: flex;
  width: 100%;
  justify-content: end;
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
 }
}
li:hover {
 transition: 200ms;
 background-color: var(--main-color-hover);
 button {
  display: flex;
 }
}
li:hover .btns {
 opacity: 1;
}
</style>
