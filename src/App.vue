<template>
 <people-list />
</template>

<script>
import PeopleList from "./components/PeopleList.vue";

export default {
 components: { PeopleList },
 mounted() {
  this.$store.dispatch("setList", { ...localStorage });
 },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@600&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");
body {
 overflow: hidden;
}
#app {
 display: flex;
 justify-content: center;
}
* {
 margin: 0;
 padding: 0;
 box-sizing: border-box;
}
</style>
