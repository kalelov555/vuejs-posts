<template>
  <div class="post-page">
    <h1>
      Это страница поста под ID: <strong>{{ $route.params.id }}</strong>
    </h1>
  </div>
</template>

<script>
export default {
  name: "PostView",
};
</script>

<style></style>
