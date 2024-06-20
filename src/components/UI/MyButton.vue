<template>
  <button class="button">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "my-button",
};
</script>

<style>
.button {
  background: none;
  border: 1px solid teal;
  padding: 15px;
  color: teal;
}
</style>
