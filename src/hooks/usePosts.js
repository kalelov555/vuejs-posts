import { ref, onMounted } from "vue";

export const usePosts = (limit) => {
  const posts = ref([]);
  const totalPages = ref(0);
  const loading = ref(false);
  const fetching = async () => {
    try {
      loading = true;
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
        posts = response.data;
        totalPages = Math.ceil(response.headers["x-total-count"] / this.limit);
        this.loading = false;
      }, 1000);
    } catch {
      alert("Invalid");
    } finally {
      loading = false;
    }
  };

  onMounted(fetching);

  return {
    posts,
    totalPages,
    loading,
  };
};
