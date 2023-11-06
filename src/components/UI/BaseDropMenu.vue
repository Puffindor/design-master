<template>
 <div class="container">
  <p
   @click="this.isOpen ? toggleList(false) : toggleList(true)"
   class="selected"
   :class="{ open: isEditing }"
  >
   {{ this.selected }}
  </p>
  <ul :class="{ active: isOpen }">
   <li @click="selectOption(option)" v-for="option in options" :key="option">
    {{ option }}
   </li>
  </ul>
 </div>
</template>

<script>
export default {
 props: ["isEditing", "item", "options", "default"],
 emits: ["selectedItem"],
 data() {
  return {
   isOpen: false,
   selected: "",
  };
 },
 mounted() {
  this.selected = this.default;
 },
 methods: {
  cancelSelect() {
   this.selected = this.default;
  },

  selectOption(city) {
   this.selected = city;
   this.toggleList(false);
   this.$emit("selectedItem", this.selected);
  },
  toggleList(state) {
   if (this.isEditing) {
    this.isOpen = state;
   }
  },
 },
 watch: {
  default: function (val) {
   this.selected = val;
  },
  isEditing: function () {
   if (!this.isEditing) {
    this.isOpen = false;
   }
  },
 },
};
</script>

<style scoped lang="scss">
::-webkit-scrollbar {
 width: 3px;
 background-color: #c7c7c7;
 border-radius: 10px;
}
::-webkit-scrollbar-thumb {
 width: 5px;
 background-color: rgb(97, 95, 103);
 border-radius: 10px;
}
.container {
 position: relative;
 width: fit-content;
}
p {
 width: 100%;
 transition: 200ms;
 background-color: transparent;
}
p.open {
 transition: 200ms;
 cursor: pointer;
 padding: 5px;
 background-color: #c7c7c7;
 border-radius: 10px;
}
p.open:hover {
 background-color: #adadad;
}

ul.active {
 z-index: 100;

 min-height: min-content;
 max-height: 15vh;
 transform: scaleY(1);
 padding: 5px 5px 0px 5px;
 transition: 200ms;
}

ul {
 width: fit-content;
 min-height: min-content;
 max-height: 15vh;
 margin-top: 5px;
 transition: 200ms;
 display: flex;
 transform: scaleY(0) translateY(-70%);
 padding: 0;
 overflow-y: auto;
 justify-content: space-between;
 background-color: #c7c7c7;
 border-radius: 10px;
 flex-direction: column;
 position: absolute;
 z-index: 410;
 list-style: none;

 li {
  transition: 300ms;
  background-color: #dbdce0;
  padding: 5px;
  margin-bottom: 5px;
  border-radius: 5px;
 }
 li:hover {
  transition: 300ms;
  background-color: #ababae;
  cursor: pointer;
 }
}
</style>
