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
    <!-- <post-pagination
      style="margin-top: 15px"
      v-model="page"
      :totalPages="totalPages"
    /> -->
  </div>
</template>

<script>
import PostForm from "@/components/PostForm.vue";
import PostList from "@/components/PostList.vue";
import MyDialog from "@/components/UI/MyDialog.vue";
import axios from "axios";
import PostPagination from "@/components/PostPagination.vue";
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
      searchQuery: "",
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
    createPost(post) {
      this.posts.push(post);
      this.dialogVisible = false;
    },
    removePost(post) {
      this.posts = this.posts.filter(function (obj) {
        return obj.id !== post.id;
      });
    },
    async fetchPosts() {
      try {
        this.loading = true;
        setTimeout(async () => {
          const response = await axios.get(
            `https://jsonplaceholder.typicode.com/posts`,
            {
              params: {
                _limit: this.limit,
                _page: this.page,
              },
            }
          );
          this.posts = response.data;
          this.totalPages = Math.ceil(
            response.headers["x-total-count"] / this.limit
          );
          this.loading = false;
        }, 1000);
      } catch {
        alert("Invalid");
      } finally {
      }
    },
    async loadMorePosts() {
      this.page += 1;
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/posts`,
          {
            params: {
              _limit: this.limit,
              _page: this.page,
            },
          }
        );
        this.posts = [...this.posts, ...response.data];
        this.totalPages = Math.ceil(
          response.headers["x-total-count"] / this.limit
        );
      } catch {
        alert("Invalid");
      }
    },
  },
  mounted() {
    this.fetchPosts();
  },
  computed: {
    sortedPosts() {
      return [...this.posts].sort((post1, post2) =>
        post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])
      );
    },
    searchAndSortedPosts() {
      return this.sortedPosts.filter(
        (post) =>
          post.title.includes(this.searchQuery.toLowerCase()) ||
          post.body.includes(this.searchQuery.toLowerCase())
      );
    },
  },
  // watch: {
  //   page() {
  //     this.fetchPosts();
  //   },
  // },
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
