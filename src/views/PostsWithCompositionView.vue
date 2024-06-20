<template>
  <div>
    <h1>Страница с постами</h1>
    <my-input v-focus v-model="searchQuery" placeholder="Поиск...." />
    <div class="app__btns">
      <my-button @click="dialogVisible = true">Открыть форму</my-button>
      <my-select :options="selectOptions" v-model="selectedSort" />
    </div>
    <my-dialog v-model:show="dialogVisible">
      <post-form @create="createPost" />
    </my-dialog>
    <post-list
      v-if="!loading"
      @remove="removePost"
      :posts="searchAndSortedPosts"
    />
    <div v-else>Loading...</div>
    <div v-intersection="loadMorePosts" class="observer"></div>
  </div>
</template>

<script>
import PostForm from "@/components/PostForm.vue";
import PostList from "@/components/PostList.vue";
import MyDialog from "@/components/UI/MyDialog.vue";
import PostPagination from "@/components/PostPagination.vue";
import { usePosts } from "@/hooks/usePosts";
export default {
  name: "PostsView",
  components: {
    PostForm,
    PostList,
    MyDialog,
    PostPagination,
  },
  data() {
    return {
      dialogVisible: false,
      selectOptions: [
        {
          value: "title",
          name: "По названию",
        },
        {
          value: "body",
          name: "По описанию",
        },
      ],
    };
  },
  setup(props) {
    const { posts, loading, totalPages } = usePosts(10);
    return { loading, posts, totalPages };
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.observer {
  height: 50px;
  background: yellowgreen;
}
</style>
