<template>
 <base-popup :isOpen="this.warning" Zindex="600">
  <base-warning
   desc="Изменения будут потеряны, все равно закрыть?"
   type="form"
   :open="this.warning"
   @confirm="cancelChanges"
   @cancel="this.warning = false"
  />
 </base-popup>

 <base-popup :isOpen="this.isOpen" Zindex="400">
  <form @click.prevent v-if="this.isOpen">
   <div class="content">
    <div>
     <p>
      <strong>ФИО</strong><br />
      <input class="active" v-model="this.itemLocal.name" />
     </p>

     <p>
      <strong>Дата рождения</strong><br />
      <input
       class="active"
       type="date"
       min="1900-01-01"
       max="2020-10-10"
       v-model="this.itemLocal.birthDate"
      />
     </p>
     <p>
      <strong>Город</strong><br />
      <base-drop-menu
       ref="dropMenuCity"
       :default="this.itemLocal.city"
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
       :isEditing="true"
       :item="this.itemGlobal"
       @selectedItem="choseCity"
      />
     </p>
     <p>
      <strong>Адрес</strong><br />
      <input
       class="active"
       :value="this.itemLocal.address"
       @input="this.itemLocal.address = $event.target.value"
      />
     </p>
    </div>
    <div>
     <p>
      <strong>Телефон</strong><br />
      <input
       class="active"
       @input="formatPhoneNumber"
       v-model="this.itemLocal.phone"
      />
     </p>
     <p>
      <strong>Пол</strong><br />
      <base-drop-menu
       ref="dropMenuGender"
       :default="this.itemLocal.gender"
       :options="['Мужской', 'Женский']"
       :isEditing="true"
       :item="this.itemGlobal"
       @selectedItem="choseGender"
      />
     </p>
     <p>
      <base-status-switch
       ref="stausSwitch"
       :item="this.itemLocal"
       :isEditing="true"
       @stausChange="stausChange"
      />
     </p>
     <p>
      <strong>Доп информация</strong><br />
      <textarea v-model="this.itemLocal.info" rows="5"> </textarea>
     </p>
    </div>
    <div class="avatar-input">
     <img class="avatar" :src="defaultAvatar" />
     <div>
      <input placeholder="Ссылка на изображение" v-model="this.avatarLink" />
      <button @click="setAvatar">
       <img src="../assets/SaveIcon.svg" />
      </button>
     </div>
    </div>
   </div>
   <div class="btns">
    <button @click="saveChanges(this.itemLocal.id)">
     <img src="../assets/SaveIcon.svg" />
    </button>
    <button @click="cancelChangesConfirm">
     <img src="../assets/CancelIcon.svg" />
    </button>
   </div>
  </form>
 </base-popup>
</template>

<script>
import { AsYouType } from "libphonenumber-js";
export default {
 data() {
  return {
   warning: false,
   creatingNewItem: false,
   avatarLink: "",
   isOpen: false,
   itemGlobal: null,
   itemLocal: {
    id: null,
    avatar: "",
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
 computed: {
  defaultAvatar() {
   if (!this.itemLocal.avatar) {
    return require("../assets/paceholder.png");
   } else {
    return this.itemLocal.avatar;
   }
  },
 },
 methods: {
  cancelChangesConfirm() {
   const local = Object.values(this.itemLocal);
   const global = Object.values(this.itemGlobal);
   for (let i = 0; i <= 9; i++) {
    if (local[i] !== global[i]) {
     this.warning = true;
     return;
    }
   }
   this.$store.dispatch("setEditItem", null);
   this.isOpen = false;
  },
  cancelChanges() {
   this.isOpen = false;
   this.warning = false;
   this.$store.dispatch("setEditItem", null);
  },
  formatPhoneNumber() {
   if (!this.itemLocal.phone) {
    this.itemLocal.phone = "+7";
   }
   this.itemLocal.phone = new AsYouType("international").input(
    this.itemLocal.phone
   );
  },
  setAvatar() {
   this.itemLocal.avatar = this.avatarLink;
  },
  stausChange(i) {
   this.itemLocal.isActive = i;
  },
  choseGender(i) {
   this.itemLocal.gender = i;
  },
  choseCity(i) {
   this.itemLocal.city = i;
  },
  saveChanges(id) {
   this.setAvatar();
   if (!this.creatingNewItem) {
    this.$store.dispatch("saveChanges", { ...this.itemLocal, id });
    this.isOpen = false;
   } else {
    this.$store.dispatch("createNewItem", { ...this.itemLocal });
    this.isOpen = false;
    this.creatingNewItem = false;
   }
  },
  toggleForm(e, crete = false) {
   this.avatarLink = "";
   if (crete) {
    this.isOpen = true;
    this.creatingNewItem = true;
    this.itemLocal = {
     id: Math.random(),
     avatar: "",
     name: "",
     birthDate: "",
     city: "Город",
     address: "",
     phone: "+7",
     gender: "Пол",
     info: "",
     isActive: true,
    };
    this.itemGlobal = {};
   } else {
    this.isOpen = true;
    this.itemLocal = structuredClone(e[0]);
    this.itemGlobal = structuredClone(e[1]);
   }
  },
 },
};
</script>

<style lang="scss" scoped>
.avatar-input {
 display: flex;
 flex-direction: column;
 align-items: center;
 div {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  input {
   width: 100%;
   height: 60%;
  }
 }
}
.content {
 display: flex;
 width: 100%;
}
.avatar {
 width: 250px;
 height: 250px;
 margin-bottom: 10px;
}

form {
 font-family: "Roboto", sans-serif;
 padding: 20px;
 justify-content: space-between;
 display: flex;
 position: fixed;
 z-index: 500;
 width: 60%;
 height: max-content;
 background-color: #dbdce0;
 flex-direction: column;
 border-radius: 10px;
}

div {
 width: 40%;
 p {
  margin-top: 10px;

  strong {
   display: inline-block;
   margin-bottom: 5px;
  }
  textarea {
   padding: 2px;
   border-radius: 5px;
   outline: none;
   background-color: white;
   margin-bottom: 17px;
   font-size: 16px;
   width: 80%;
   height: 150%;
   border-style: hidden;
   resize: none;
   font-family: "Roboto", sans-serif;
  }
 }
}
input {
 background-color: inherit;
 padding: 2px;
 border-style: hidden;
 color: black;
 font-size: 16px;
 outline: none;
 border-radius: 5px;
 background-color: white;
}
.btns {
 display: flex;
 width: 100%;
 justify-content: end;
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
