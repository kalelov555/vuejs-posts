import axios from "axios";
export const postModule = {
  state: () => ({
    posts: [],
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
  }),
  getters: {
    sortedPosts(state) {
      return [...state.posts].sort((post1, post2) =>
        post1[state.selectedSort]?.localeCompare(post2[state.selectedSort])
      );
    },
    searchAndSortedPosts(state, getters) {
      return getters.sortedPosts.filter(
        (post) =>
          post.title.includes(state.searchQuery.toLowerCase()) ||
          post.body.includes(state.searchQuery.toLowerCase())
      );
    },
  },
  mutations: {
    setPosts(state, posts) {
      state.posts = posts;
    },
    setLoading(state, loading) {
      state.loading = loading;
    },
    setSelectedSort(state, selectedSort) {
      console.log(selectedSort);
      state.selectedSort = selectedSort;
    },
    setSearchQuery(state, searchQuery) {
      console.log(state, searchQuery);
      state.searchQuery = searchQuery;
    },
    setPage(state, page) {
      state.page = page;
    },
    setTotalPages(state, totalPages) {
      state.totalPages = totalPages;
    },
  },
  actions: {
    async fetchPosts({ state, commit }) {
      try {
        commit("setLoading", true);
        setTimeout(async () => {
          const response = await axios.get(
            `https://jsonplaceholder.typicode.com/posts`,
            {
              params: {
                _limit: state.limit,
                _page: state.page,
              },
            }
          );
          commit("setPosts", response.data);
          commit(
            "setTotalPages",
            Math.ceil(response.headers["x-total-count"] / state.limit)
          );
          commit("setLoading", false);
        }, 1000);
      } catch (errr) {
        console.log(err);
      } finally {
        commit("setLoading", false);
      }
    },
    async loadMorePosts({ state, commit }) {
      commit("setPage", state.page + 1);
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/posts`,
          {
            params: {
              _limit: state.limit,
              _page: state.page,
            },
          }
        );
        commit("setPosts", [...state.posts, ...response.data]);
        commit(
          "setTotalPages",
          Math.ceil(response.headers["x-total-count"] / state.limit)
        );
      } catch (err) {
        console.log(err);
      }
    },
  },
  namespaced: true,
};
