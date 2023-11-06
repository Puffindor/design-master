<template>
 <base-popup :isOpen="this.warning" Zindex="800">
  <base-warning
   desc="Безвозвратно удалть запись?"
   type="delete"
   :open="this.warning"
   @confirm="deleteItem"
   @cancel="this.warning = false"
  />
 </base-popup>
 <div class="container">
  <div class="head">
   <div class="input">
    <input v-model="searchInput" />
    <div class="drop">
     <base-drop-menu
      @selectedItem="setSort"
      :options="[
       'Город',
       'Имя',
       'Без сортировки',
       'Адрес',
       'Пол',
       'Статус',
       'Дата рождения',
      ]"
      :isEditing="true"
      default="Без сортировки"
     />
     <button @click="setSortOrder">
      <img
       :class="{ active: this.sortReverse }"
       src="../assets//ArrowIcon.svg"
      />
     </button>
    </div>
   </div>
   <button @click="createItem">Добавить</button>
  </div>
  <ul v-if="finalResult.length > 0">
   <li v-for="item in finalResult" :key="item.id">
    <people-list-item
     :item="item"
     @openForm="openForm"
     ref="item"
     @delete="deleteItemConfirm"
    />
   </li>
  </ul>
  <p class="no-data" v-else>Нет записей</p>
 </div>
 <edit-from ref="form" />
</template>

<script>
import EditFrom from "./EditFrom.vue";
import PeopleListItem from "./PeopleListItem.vue";
import "../assets/CSS/Variables.css";
export default {
 components: {
  PeopleListItem,
  EditFrom,
 },
 data() {
  return {
   deleteItemId: null,
   warning: false,
   sortReverse: false,
   sortBy: "Без сортировки",
   searchInput: null,
   searchResult: this.$store.getters.getList,
   finalResult: this.$store.getters.getList,
  };
 },
 computed: {
  getList() {
   return this.$store.getters.getList;
  },
 },
 methods: {
  deleteItemConfirm(id) {
   this.warning = true;
   this.deleteItemId = id;
  },
  deleteItem() {
   this.$store.dispatch("deleteItem", this.deleteItemId);
   this.deleteItemId = null;
   this.warning = false;
  },
  openForm(e) {
   this.$refs.form.toggleForm(e);
  },
  createItem() {
   this.$refs.form.toggleForm(null, true);
  },
  setSortOrder() {
   this.sortReverse = !this.sortReverse;
   this.sortList();
  },
  setSort(e) {
   this.sortBy = e;
   switch (e) {
    case "Город":
     this.sortBy = "city";
     break;
    case "Пол":
     this.sortBy = "gender";
     break;
    case "Имя":
     this.sortBy = "name";
     break;
    case "Статус":
     this.sortBy = "isActive";
     break;
    case "Адрес":
     this.sortBy = "address";
     break;
    case "Дата рождения":
     this.sortBy = "birthDate";
     break;
   }
   this.sortList();
  },
  sortList() {
   if (this.sortBy === "Без сортировки") {
    this.finalResult = this.searchResult;
   } else {
    const sortByField = this.sortBy;
    const reverse = this.sortReverse;
    this.finalResult = this.searchResult.slice().sort(function (a, b) {
     if (a[sortByField] > b[sortByField]) {
      if (reverse) {
       return -1;
      } else {
       return 1;
      }
     }
     if (a[sortByField] < b[sortByField]) {
      if (reverse) {
       return 1;
      } else {
       return -1;
      }
     }

     return 0;
    });
   }
  },
  serach() {
   if (this.searchInput) {
    const result = [];
    this.$store.getters.getList.filter((el) => {
     if (
      el.name
       .toLocaleLowerCase()
       .includes(this.searchInput.toLocaleLowerCase()) ||
      el.city
       .toLocaleLowerCase()
       .includes(this.searchInput.toLocaleLowerCase()) ||
      el.address
       .toLocaleLowerCase()
       .includes(this.searchInput.toLocaleLowerCase())
     ) {
      result.push(el);
     }
    });
    this.searchResult = result;
    this.sortList();
   } else {
    this.searchResult = this.$store.getters.getList;
    this.sortList();
   }
  },
 },
 watch: {
  getList: function () {
   this.serach();
  },
  searchInput: function () {
   this.serach();
  },
 },
};
</script>

<style lang="scss" scoped>
::-webkit-scrollbar {
 width: 5px;
 background-color: var(--main-color);
 border-radius: 10px;
}
::-webkit-scrollbar-thumb {
 width: 5px;
 background-color: #b6b6b6;
 border-radius: 10px;
}

.no-data {
 font-family: "Segoe UI";
 color: rgb(137, 137, 137);
 font-size: 20px;

 margin-top: 100px;
 text-align: center;
}
button {
 font-family: "Roboto", sans-serif;
 padding: 8px;
 border-radius: 10px;
 border-style: hidden;
 background-color: #c7c7c7;
 margin-left: 5px;
 transition: 200ms;
}
button:hover {
 cursor: pointer;
 transition: 200ms;
 background-color: #adadad;
}
.head {
 height: 50px;
 width: 100%;
 border-radius: 10px;
 padding: 10px;
 display: flex;
 justify-content: space-between;
 align-items: center;
 background-color: var(--main-color-hover);
 margin-top: 10px;
 .input {
  height: 100%;
  width: 90%;
  display: flex;
 }
 img {
  transition: 200ms;
 }
 img.active {
  transition: 200ms;
  transform: rotate(180deg);
 }
 .drop {
  display: flex;
  width: 50%;
 }
 input {
  height: 100%;
  margin-right: 7px;
  padding: 2px;
  border-style: hidden;
  color: black;
  font-size: 16px;
  outline: none;
  border-radius: 10px;
  background-color: white;
 }
}
.container {
 font-family: "Roboto", sans-serif;
 width: 50%;
}
ul {
 margin-top: 10px;
 overflow-y: auto;
 width: 100%;
 height: 90vh;

 display: flex;
 flex-direction: column;
 list-style: none;
 li {
  margin-bottom: 10px;
 }
}

@media screen and (max-width: 1281px) {
 .input {
  width: 60%;
 }
 .container {
  width: 60%;
 }
}
</style>
