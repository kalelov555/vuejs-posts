<template>
  <form @submit.prevent>
    <h4>Создание поста</h4>
    <my-input
      v-focus
      v-model.trim="post.title"
      placeholder="Название"
      name="title"
    />
    <my-input v-model.trim="post.body" placeholder="Описание" name="body" />
    <my-button @click="createPost">Создать</my-button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      post: {
        title: "",
        body: "",
      },
    };
  },
  methods: {
    createPost() {
      this.post.id = Date.now();
      this.$emit("create", this.post);
      this.post = {
        title: "",
        body: "",
      };
    },
  },
};
</script>

<style>
form {
  display: flex;
  flex-direction: column;
}

input {
  width: 100%;
  padding: 15px;
  border: 1px solid teal;
  margin-top: 15px;
}
</style>
