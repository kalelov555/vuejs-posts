<template>
  <div>
    <h1>Страница сo Store</h1>
    <!-- <h1><strong>State:</strong> {{ $store.state.likes }}</h1>
    <h1><strong>Getter:</strong> {{ $store.getters.doubleLikes }}</h1>
    <my-button @click="$store.commit('incrementLikes')">Like</my-button>
    <my-button @click="$store.commit('decrementLikes')">Dislike</my-button> -->
    <!-- <h1>{{ $store.state.post.limit }}</h1> -->

    <my-input
      :model-value="searchQuery"
      @update:model-value="setSearchQuery"
      v-focus
      placeholder="Поиск...."
    />
    <div class="app__btns">
      <my-button @click="dialogVisible = true">Открыть форму</my-button>
      <my-select
        :model-value="selectedSort"
        @update:model-value="setSelectedSort"
        :options="selectOptions"
      />
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
    <!-- <post-pagination
        style="margin-top: 15px"
        :totalPages="totalPages"
      /> -->
  </div>
</template>

<script>
import PostForm from "@/components/PostForm.vue";
import PostList from "@/components/PostList.vue";
import MyDialog from "@/components/UI/MyDialog.vue";
import PostPagination from "@/components/PostPagination.vue";
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
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
      posts: [],
      dialogVisible: false,
      loading: false,
      selectedSort: "",
      page: 1,
      limit: 10,
      totalPages: 0,
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
  methods: {
    ...mapActions({
      loadMorePosts: "post/loadMorePosts",
      fetchPosts: "post/fetchPosts",
    }),
    ...mapMutations({
      setPage: "post/setPage",
      setSearchQuery: "post/setSearchQuery",
      setSelectedSort: "post/setSelectedSort",
    }),
    createPost(post) {
      this.posts.push(post);
      this.dialogVisible = false;
    },
    removePost(post) {
      this.posts = this.posts.filter(function (obj) {
        return obj.id !== post.id;
      });
    },
  },
  mounted() {
    this.fetchPosts();
  },
  computed: {
    ...mapState({
      posts: (state) => state.post.posts,
      loading: (state) => state.post.loading,
      selectedSort: (state) => state.post.selectedSort,
      searchQuery: (state) => state.post.searchQuery,
      page: (state) => state.post.page,
      limit: (state) => state.post.limit,
      totalPages: (state) => state.post.totalPages,
    }),
    ...mapGetters({
      sortedPosts: "post/sortedPosts",
      searchAndSortedPosts: "post/searchAndSortedPosts",
    }),
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
