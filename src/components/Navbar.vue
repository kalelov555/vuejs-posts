<template>
  <div class="navbar">
    <router-link to="/"><div>Main</div></router-link>
    <div class="navbar__btns">
      <router-link to="/posts"><my-button>Посты</my-button></router-link>
      <router-link to="/about"><my-button>О Сайте</my-button></router-link>
      <router-link to="/store"><my-button>store</my-button></router-link>
      <router-link to="/composition"
        ><my-button>composition</my-button></router-link
      >
    </div>
  </div>
</template>

<script></script>

<style scoped lang="scss">
.navbar {
  height: 50px;
  background-color: lightgray;
  box-shadow: 2px 2px 4px gray;
  display: flex;
  align-items: center;
  padding: 0 20px;
  &__btns {
    margin-left: auto;
    display: flex;
    gap: 20px;
  }
}
</style>
