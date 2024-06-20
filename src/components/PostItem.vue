<template>
  <div class="post">
    <div>
      <div><strong>ID: </strong> {{ post.id }}</div>
      <div><strong>Название: </strong> {{ post.title }}</div>
      <div><strong>Описание: </strong> {{ post.body }}</div>
    </div>
    <div class="post__btns">
      <my-button @click="$router.push(`/posts/${post.id}`)">Открыть</my-button>
      <my-button @click="$emit('remove', post)">Удалить</my-button>
    </div>
  </div>
</template>

<script>
import MyButton from "./UI/MyButton.vue";
export default {
  components: { MyButton },
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss">
.post {
  padding: 15px;
  border: 3px solid teal;
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  &__btns {
    display: flex;
    gap: 10px;
  }
}
</style>
