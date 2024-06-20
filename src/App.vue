<template>
  <navbar />
  <div class="app">
    <router-view />
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
export default {
  components: {
    Navbar,
  },
};
</script>

<style lang="scss">
.app {
  padding: 20px;
  &__btns {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
